import { profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { MailIcon } from "./icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-content items-center justify-between px-6 py-6 sm:px-10">
      <a href="#top" className="font-display text-sm font-medium text-ink">
        Douglas Soule
      </a>
      <nav className="hidden gap-8 sm:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[13px] text-ink-muted transition-colors hover:text-amber"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email Douglas"
          className="flex items-center gap-1.5 font-mono text-[13px] text-ink-muted transition-colors hover:text-amber sm:hidden"
        >
          <MailIcon className="h-3.5 w-3.5" />
          Contact
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
