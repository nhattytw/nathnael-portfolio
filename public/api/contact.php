<?php
/**
 * Contact form endpoint for the static site on DirectAdmin.
 *
 *   GET  /api/contact.php?token=1  -> { token }  signed timestamp for the form
 *   POST /api/contact.php          -> 201 when the message was emailed
 *
 * Defences: same-origin only, JSON only, 10 KB body cap, honeypot field,
 * signed token with a minimum fill time, optional Cloudflare Turnstile,
 * per-IP rate limits, strict length and character checks, and a plain-text
 * email with no user input in the From or other headers. Nothing is stored
 * in a database and no input is ever echoed back.
 *
 * Secrets live in contact.config.php OUTSIDE public_html
 * (see private/contact.config.example.php in the repo).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');

const LIMITS = [
    'name' => [2, 80],
    'email' => [6, 254],
    'company' => [0, 100],
    'message' => [20, 2000],
];
const TYPES = ['full-time', 'contract', 'consulting', 'other'];
const MAX_BODY_BYTES = 10240;
const MIN_FILL_SECONDS = 3;
const TOKEN_TTL_SECONDS = 7200;

function respond(int $code, array $body, array $headers = []): void
{
    http_response_code($code);
    foreach ($headers as $header) {
        header($header);
    }
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

$configPath = getenv('CONTACT_CONFIG') ?: dirname(__DIR__, 2) . '/portfolio-private/contact.config.php';
if (!is_file($configPath)) {
    error_log('contact.php: config not found at ' . $configPath);
    respond(500, ['error' => 'not_configured']);
}
$config = require $configPath;
$secret = (string) ($config['secret'] ?? '');
if (strlen($secret) < 32 || empty($config['to']) || empty($config['from'])) {
    error_log('contact.php: config is missing to, from, or a 32+ character secret');
    respond(500, ['error' => 'not_configured']);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ---- Token: a signed timestamp the form fetches when it loads ----
if ($method === 'GET' && isset($_GET['token'])) {
    $issued = (string) time();
    respond(200, ['token' => $issued . '.' . hash_hmac('sha256', $issued, $secret)]);
}

if ($method !== 'POST') {
    respond(405, ['error' => 'method_not_allowed'], ['Allow: GET, POST']);
}

// ---- Same origin only ----
$allowed = array_map('strtolower', (array) ($config['allowed_origins'] ?? []));
$origin = strtolower((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($origin === '') {
    // Some browsers omit Origin on same-origin requests; fall back to the Referer.
    $referer = parse_url((string) ($_SERVER['HTTP_REFERER'] ?? ''));
    if (!empty($referer['scheme']) && !empty($referer['host'])) {
        $origin = strtolower($referer['scheme'] . '://' . $referer['host'] . (isset($referer['port']) ? ':' . $referer['port'] : ''));
    }
}
if (!in_array($origin, $allowed, true)) {
    respond(403, ['error' => 'forbidden']);
}

// ---- JSON body, size-capped ----
if (stripos((string) ($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) {
    respond(415, ['error' => 'unsupported_media_type']);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    respond(413, ['error' => 'too_large']);
}
$raw = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['error' => 'too_large']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['error' => 'bad_request']);
}

// ---- Honeypot: bots fill it, people never see it. Pretend it worked. ----
if (!empty($data['website'])) {
    respond(201, ['status' => 'received']);
}

// ---- Token: genuine, not too fast, not too old ----
$token = is_string($data['token'] ?? null) ? $data['token'] : '';
$parts = explode('.', $token, 2);
if (count($parts) !== 2 || !ctype_digit($parts[0]) || !hash_equals(hash_hmac('sha256', $parts[0], $secret), $parts[1])) {
    respond(422, ['error' => 'expired']);
}
$age = time() - (int) $parts[0];
if ($age < MIN_FILL_SECONDS) {
    respond(422, ['error' => 'too_fast']);
}
if ($age > TOKEN_TTL_SECONDS) {
    respond(422, ['error' => 'expired']);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

// ---- Optional Cloudflare Turnstile ----
$turnstileSecret = (string) ($config['turnstile_secret'] ?? '');
if ($turnstileSecret !== '') {
    $response = is_string($data['turnstileToken'] ?? null) ? $data['turnstileToken'] : '';
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query(['secret' => $turnstileSecret, 'response' => $response, 'remoteip' => $ip]),
            'timeout' => 5,
        ],
    ]);
    $result = json_decode((string) @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context), true);
    if (empty($result['success'])) {
        respond(403, ['error' => 'captcha_failed']);
    }
}

// ---- Clean and validate ----
/** One line of text: no control characters (so no header injection), no invisible direction marks. */
function clean_line($value): string
{
    if (!is_string($value) || !preg_match('//u', $value)) {
        return '';
    }
    $value = preg_replace('/[\x00-\x1F\x7F]|[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2066}-\x{2069}\x{FEFF}]/u', '', $value);
    return trim((string) $value);
}

/** Multi-line text: keeps line breaks and tabs, drops every other control character. */
function clean_text($value): string
{
    if (!is_string($value) || !preg_match('//u', $value)) {
        return '';
    }
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2066}-\x{2069}\x{FEFF}]/u', '', $value);
    return trim((string) $value);
}

$fields = [
    'name' => clean_line($data['name'] ?? ''),
    'email' => clean_line($data['email'] ?? ''),
    'company' => clean_line($data['company'] ?? ''),
    'message' => clean_text($data['message'] ?? ''),
];
$type = in_array($data['type'] ?? '', TYPES, true) ? $data['type'] : 'other';

$invalid = [];
foreach (LIMITS as $key => [$min, $max]) {
    $length = mb_strlen($fields[$key], 'UTF-8');
    if ($length < $min || $length > $max) {
        $invalid[] = $key;
    }
}
if (!in_array('email', $invalid, true) && filter_var($fields['email'], FILTER_VALIDATE_EMAIL) === false) {
    $invalid[] = 'email';
}
if ($invalid) {
    respond(422, ['error' => 'invalid', 'fields' => $invalid]);
}

// ---- Rate limit per IP (hashed, so no raw IPs are kept) ----
$dataDir = rtrim((string) ($config['data_dir'] ?? ''), '/');
if ($dataDir === '' || (!is_dir($dataDir) && !mkdir($dataDir, 0700, true))) {
    error_log('contact.php: data_dir is missing or not writable');
    respond(500, ['error' => 'not_configured']);
}
$perWindow = (int) ($config['rate_limit']['per_10_minutes'] ?? 3);
$perDay = (int) ($config['rate_limit']['per_day'] ?? 10);
$now = time();
$file = $dataDir . '/rl_' . hash_hmac('sha256', $ip, $secret) . '.json';
$handle = fopen($file, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    respond(500, ['error' => 'server_error']);
}
$history = json_decode((string) stream_get_contents($handle), true);
$history = array_values(array_filter(is_array($history) ? $history : [], function ($t) use ($now) {
    return is_int($t) && $t > $now - 86400;
}));
$recent = count(array_filter($history, function ($t) use ($now) {
    return $t > $now - 600;
}));
if ($recent >= $perWindow || count($history) >= $perDay) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(429, ['error' => 'rate_limited'], ['Retry-After: 600']);
}
$history[] = $now;
ftruncate($handle, 0);
rewind($handle);
fwrite($handle, json_encode($history));
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);

// ---- Send a plain-text email ----
$subject = mb_encode_mimeheader('Portfolio contact: ' . $type . ' from ' . $fields['name'], 'UTF-8', 'B', "\r\n");
$body = implode("\n", [
    'New message from the portfolio contact form.',
    '',
    'Name:    ' . $fields['name'],
    'Email:   ' . $fields['email'],
    'Company: ' . ($fields['company'] !== '' ? $fields['company'] : '-'),
    'Type:    ' . $type,
    '',
    $fields['message'],
    '',
    '--',
    'Sent ' . gmdate('Y-m-d H:i') . ' UTC. Reply to this email to answer them.',
]);
$from = (string) $config['from'];
$headers = implode("\r\n", [
    'From: Portfolio <' . $from . '>',
    // The visitor's address only ever goes in Reply-To, after validation.
    'Reply-To: ' . $fields['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail((string) $config['to'], $subject, $body, $headers, '-f' . $from)) {
    error_log('contact.php: mail() failed');
    respond(502, ['error' => 'send_failed']);
}

respond(201, ['status' => 'received']);
