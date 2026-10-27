import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { Education } from "@/components/home/Education";
import { GitHubActivity } from "@/components/home/GitHubActivity";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-1 focus:outline-none">
        <Hero />
        <About />
        <Skills />
        <SelectedProjects />
        <Education />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
