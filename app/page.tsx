import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-space-bg">
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:64px_64px] opacity-40" />
      <div className="relative">
        <Nav />
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </div>
    </main>
  );
}
