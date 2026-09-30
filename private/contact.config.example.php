<?php
/**
 * Copy to contact.config.php in a folder NEXT TO public_html (never inside it):
 *
 *   domains/nathnaeltw.pro.et/portfolio-private/contact.config.php
 *   domains/nathnaeltw.pro.et/public_html/api/contact.php
 *
 * Or point the CONTACT_CONFIG environment variable at it.
 */

return [
    // Where messages go, and the domain mailbox they're sent from.
    'to' => 'you@example.com',
    'from' => 'noreply@nathnaeltw.pro.et',

    // Only the site itself may post to the endpoint.
    'allowed_origins' => ['https://nathnaeltw.pro.et', 'https://www.nathnaeltw.pro.et'],

    // 32+ random characters, e.g. from: php -r "echo bin2hex(random_bytes(32));"
    'secret' => 'replace-with-64-random-hex-characters',

    // Writable folder for rate-limit counters, also outside public_html.
    'data_dir' => __DIR__ . '/contact-data',

    'rate_limit' => [
        'per_10_minutes' => 3,
        'per_day' => 10,
    ],

    // Optional Cloudflare Turnstile secret. Leave empty to skip the check; set
    // NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time when you fill this in.
    'turnstile_secret' => '',
];
