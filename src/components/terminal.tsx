"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { generalData } from "@/lib/generalData";
import { experienceData } from "@/lib/experienceData";
import { projectData } from "@/lib/projectData";

type Line = { kind: "input" | "output"; text: string };

const PROMPT = "guest@nathnael:~$";

const COMMANDS: Record<string, () => string> = {
  help: () =>
    [
      "Available commands:",
      "  whoami       who I am",
      "  experience   roles, newest first",
      "  projects     featured projects",
      "  skills       stack by category",
      "  metrics      impact in numbers",
      "  contact      how to reach me",
      "  resume       download my CV",
      "  clear        clear the screen",
      "  exit         back to the command palette",
    ].join("\n"),
  whoami: () =>
    `${generalData.name}\n${generalData.title} · Addis Ababa, Ethiopia · remote worldwide\n\n${generalData.tagline}\n${generalData.bio}`,
  experience: () =>
    experienceData
      .map(
        (c) =>
          `▸ ${c.company} (${c.period})\n` +
          c.roles.map((r) => `    ${r.title.padEnd(40)} ${r.period}`).join("\n")
      )
      .join("\n"),
  projects: () =>
    projectData
      .filter((p) => p.featured)
      .map(
        (p) =>
          `▸ ${p.title}: ${p.subtitle}${
            p.category === "public-sector" ? " [restricted access]" : p.liveUrl ? `\n  ${p.liveUrl}` : ""
          }`
      )
      .join("\n"),
  skills: () =>
    Object.entries(generalData.skills)
      .map(([category, items]) => `${category.padEnd(24)} ${items.join(", ")}`)
      .join("\n"),
  metrics: () =>
    generalData.impactMetrics
      .map((m) => `${`${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`.padStart(6)}  ${m.label} (${m.source})`)
      .join("\n"),
  contact: () =>
    `email     ${generalData.contact.email}\nphone     ${generalData.contact.phone}\nlinkedin  ${generalData.socials.linkedin}\ngithub    ${generalData.socials.github}`,
};

interface TerminalProps {
  onExit: () => void;
  onClose: () => void;
}

export function Terminal({ onExit, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: "Welcome! Type `help` to see what you can explore." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const execute = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (cmd) setHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      onExit();
      return;
    }

    let output: string;
    if (!cmd) output = "";
    else if (cmd === "resume") {
      const link = document.createElement("a");
      link.href = generalData.resume.href;
      link.download = generalData.resume.downloadName;
      link.click();
      output = "Downloading CV…";
    } else if (cmd === "sudo hire nathnael" || cmd === "sudo hire") {
      output = "Permission granted ✔  Redirecting you to the contact page…";
      setTimeout(() => {
        onClose();
        window.location.href = "/contact";
      }, 900);
    } else if (COMMANDS[cmd]) output = COMMANDS[cmd]();
    else output = `command not found: ${cmd}. Try \`help\`.`;

    setLines((prev) => [
      ...prev,
      { kind: "input", text: raw },
      ...(output ? [{ kind: "output" as const, text: output }] : []),
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS)
        .concat("clear", "exit", "resume")
        .find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className="flex flex-col bg-[#07142a] text-[#faf0ca] font-mono text-[13px]">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <button
          onClick={onExit}
          className="rounded p-1 text-[#88b0e0] hover:bg-white/10 hover:text-white"
          aria-label="Back to command palette"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 text-xs text-[#88b0e0]">nathnael — zsh</span>
      </div>
      <div
        ref={scrollRef}
        className="h-[360px] overflow-y-auto p-4 space-y-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <pre key={i} className="whitespace-pre-wrap break-words leading-relaxed">
            {line.kind === "input" ? (
              <>
                <span className="text-[#aac6ad]">{PROMPT}</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </pre>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-[#aac6ad] shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none caret-[#aac6ad]"
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
