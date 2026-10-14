import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProfile, getSkills, getProjects } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [profile, skills, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        {profile && <Hero profile={profile} />}
        {profile && <About profile={profile} />}
        <Skills skills={skills} />
        <Projects projects={projects} />
        {profile && <Contact profile={profile} />}
      </main>
      <Footer />
    </>
  );
}
