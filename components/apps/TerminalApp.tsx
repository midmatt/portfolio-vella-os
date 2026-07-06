"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  contact,
  coursework,
  education,
  identity,
  skills,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { APPS } from "@/lib/apps";

const PROMPT_USER = `${identity.handle}@${identity.hostname}`;

interface Line {
  id: number;
  node: ReactNode;
}

export default function TerminalApp() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (node: ReactNode) =>
    setLines((ls) => [...ls, { id: idRef.current++, node }]);

  useEffect(() => {
    push(
      <div className="mb-2 text-ink-dim">
        <p>
          vella-os 1.0.0 — welcome to{" "}
          <span className="text-ember">{identity.name}</span>&apos;s terminal.
        </p>
        <p>
          Type <Cmd>help</Cmd> to see available commands.
        </p>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(
      <p>
        <span className="text-moss">{PROMPT_USER}</span>
        <span className="text-ink-faint">:~$</span> {raw}
      </p>
    );
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistoryIdx(-1);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);
    // Simple command matcher on purpose — not a shell parser.
    switch (name) {
      case "help":
        push(
          <Output>
            <p className="text-ink-dim">available commands:</p>
            {[
              ["whoami", "one-line intro"],
              ["about", "the longer story"],
              ["skills", "tech stack & security skills"],
              ["education", "degrees & certifications"],
              ["projects", "shipped & in-progress work"],
              ["contact", "email & socials"],
              ["neofetch", "system info, sort of"],
              ["open <app>", "launch an app (terminal, projects, resume, contact, links, chat)"],
              ["clear", "clear the screen"],
            ].map(([c, d]) => (
              <p key={c}>
                <span className="inline-block w-32 text-ember">{c}</span>
                <span className="text-ink-dim">{d}</span>
              </p>
            ))}
          </Output>
        );
        break;

      case "whoami":
        push(<Output>{identity.shortBio}</Output>);
        break;

      case "about":
        push(
          <Output>
            {identity.bio.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {p}
              </p>
            ))}
            <p className="mt-2">{identity.careerFocus}</p>
          </Output>
        );
        break;

      case "skills":
        push(
          <Output>
            {skills.map((g) => (
              <div key={g.group} className="mb-1.5">
                <p className="text-ember">{g.group}</p>
                <p className="text-ink-dim">{g.items.join(" · ")}</p>
              </div>
            ))}
            <p className="mt-1 italic text-ink-faint">{identity.positioning}</p>
          </Output>
        );
        break;

      case "education":
        push(
          <Output>
            {education.map((e) => (
              <p key={e.title}>
                <span className="text-ember">▸</span> {e.title} —{" "}
                <span className="text-ink-dim">{e.detail}</span>
              </p>
            ))}
            <p className="mt-1.5 text-ink-dim">{coursework}</p>
          </Output>
        );
        break;

      case "projects":
        push(
          <Output>
            {projects.map((p) => (
              <p key={p.id}>
                <span className="inline-block w-44 text-ember">{p.fileName}</span>
                <span className="text-ink-dim">
                  {p.tagline}
                  {p.status ? ` (${p.status.toLowerCase()})` : ""}
                </span>
              </p>
            ))}
            <p className="mt-1.5 text-ink-faint">
              run <Cmd>open projects</Cmd> for the full file manager view.
            </p>
          </Output>
        );
        break;

      case "contact":
        push(
          <Output>
            <p>
              <span className="inline-block w-24 text-ember">email</span>
              <a className="underline decoration-dotted hover:text-ember" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
            <p>
              <span className="inline-block w-24 text-ember">linkedin</span>
              <a className="underline decoration-dotted hover:text-ember" href={contact.linkedin} target="_blank" rel="noreferrer">
                {contact.linkedin.replace("https://www.", "")}
              </a>
            </p>
            <p>
              <span className="inline-block w-24 text-ember">github</span>
              <a className="underline decoration-dotted hover:text-ember" href={contact.github} target="_blank" rel="noreferrer">
                {contact.github.replace("https://", "")}
              </a>
            </p>
          </Output>
        );
        break;

      case "neofetch":
        push(<Neofetch />);
        break;

      case "open": {
        const target = APPS.find((a) => a.id === args[0]);
        if (target) {
          push(<Output>opening {target.title}…</Output>);
          router.push(target.route);
        } else {
          push(
            <Output>
              usage: open &lt;{APPS.map((a) => a.id).join("|")}&gt;
            </Output>
          );
        }
        break;
      }

      case "sudo":
        push(
          <Output>
            {identity.handle} is not in the sudoers file. This incident will be
            reported.
          </Output>
        );
        break;

      case "clear":
        setLines([]);
        break;

      default:
        push(
          <Output>
            <span className="text-alert">{name}</span>: command not found — try{" "}
            <Cmd>help</Cmd>
          </Output>
        );
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="app-scroll h-full cursor-text overflow-y-auto bg-term-bg p-3 font-mono text-[13px] leading-relaxed text-[#cfd2c8]"
    >
      {lines.map((l) => (
        <div key={l.id}>{l.node}</div>
      ))}
      <div className="flex items-center">
        <span className="shrink-0">
          <span className="text-moss">{PROMPT_USER}</span>
          <span className="text-ink-faint">:~$</span>
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="terminal input"
          className="ml-2 w-full bg-transparent caret-[#e8863a] outline-none"
        />
      </div>
    </div>
  );
}

const Cmd = ({ children }: { children: ReactNode }) => (
  <span className="rounded bg-white/[0.06] px-1 text-ember">{children}</span>
);

const Output = ({ children }: { children: ReactNode }) => (
  <div className="mb-2 mt-0.5">{children}</div>
);

function Neofetch() {
  const facts: [string, string][] = [
    ["user", `${identity.handle}@${identity.hostname}`],
    ["role", identity.title],
    ["school", "FIU Honors College — Cybersecurity"],
    ["cert", "Security+ (in progress, target Dec)"],
    ["shipped", "AlarmQR · VoiceLocal · CyberSimply"],
    ["goal", "CIO via federal/gov cybersecurity"],
    ["shell", "vella-sh 1.0"],
    ["theme", "ember-on-graphite"],
  ];
  return (
    <Output>
      <div className="flex gap-5">
        <pre className="hidden leading-tight text-ember sm:block">{`
 ██╗   ██╗
 ██║   ██║
 ██║   ██║
 ╚██╗ ██╔╝
  ╚████╔╝
   ╚═══╝ `}</pre>
        <div>
          {facts.map(([k, v]) => (
            <p key={k}>
              <span className="inline-block w-20 text-ember">{k}</span>
              <span className="text-ink-dim">{v}</span>
            </p>
          ))}
        </div>
      </div>
    </Output>
  );
}
