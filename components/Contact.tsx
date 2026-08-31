"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const payload = { name, email, message };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        useClientFallback?: boolean;
        to?: string;
      };

      // No Gmail SMTP configured — deliver from the browser via FormSubmit.
      if (res.ok && data.useClientFallback && data.to) {
        const fallback = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(data.to)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              message,
              _replyto: email,
              _subject: `New portfolio message from ${name}`,
              _template: "table",
            }),
          }
        );

        const fallbackData = (await fallback.json().catch(() => ({}))) as {
          success?: string | boolean;
          message?: string;
        };

        if (
          !fallback.ok ||
          fallbackData.success === "false" ||
          fallbackData.success === false
        ) {
          setStatus("error");
          setErrorMsg(
            fallbackData.message ||
              "Something went wrong. Please try again."
          );
          return;
        }
      } else if (!res.ok || data.ok === false) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <Reveal className="mx-auto max-w-content px-6 py-24 sm:px-10 sm:py-32">
        <p className="section-heading">Get in touch</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
          Have a project that needs shipping?
        </h2>
        <p className="prose-body mt-6 max-w-lg text-[15px] leading-relaxed text-ink-muted">
          Currently taking on freelance and contract engineering work from
          Salt Lake City, open to remote engagements worldwide. Send a
          message directly — it lands in my inbox right away.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-6">
          <div>
            <label htmlFor="name" className="section-heading block">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "sending"}
              className="mt-2 w-full border border-space-line bg-space-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-amber disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="email" className="section-heading block">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              className="mt-2 w-full border border-space-line bg-space-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-amber disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="message" className="section-heading block">
              What are you building?
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "sending"}
              className="mt-2 w-full resize-y border border-space-line bg-space-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-amber disabled:opacity-60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="border border-amber bg-amber px-6 py-3 font-mono text-[13px] font-medium text-space-bg transition-colors hover:bg-transparent hover:text-amber disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <span className="font-mono text-[13px] text-amber" role="status">
                Message sent — thanks, I'll get back to you soon.
              </span>
            )}
            {status === "error" && (
              <span className="font-mono text-[13px] text-red-400" role="alert">
                {errorMsg}
              </span>
            )}
          </div>
        </form>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 border border-space-line py-2 pl-2 pr-6 font-mono text-[13px] text-ink transition-colors hover:border-amber hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-space-line bg-space-surface text-ink-muted transition-colors group-hover:border-amber group-hover:text-amber">
              <MailIcon className="h-4 w-4" />
            </span>
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${profile.name} on LinkedIn`}
            className="group flex items-center gap-3 border border-space-line py-2 pl-2 pr-6 font-mono text-[13px] text-ink transition-colors hover:border-amber hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-space-line bg-space-surface text-ink-muted transition-colors group-hover:border-amber group-hover:text-amber">
              <LinkedInIcon className="h-4 w-4" />
            </span>
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${profile.name} on GitHub`}
            className="group flex items-center gap-3 border border-space-line py-2 pl-2 pr-6 font-mono text-[13px] text-ink transition-colors hover:border-amber hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-space-line bg-space-surface text-ink-muted transition-colors group-hover:border-amber group-hover:text-amber">
              <GitHubIcon className="h-4 w-4" />
            </span>
            GitHub
          </a>
        </div>
      </Reveal>

      <footer className="border-t border-space-line px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-content flex-col gap-2 font-mono text-[11px] text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <span>{profile.name} · {profile.location}</span>
          <span>Built with Next.js, deployed on Vercel</span>
        </div>
      </footer>
    </section>
  );
}
