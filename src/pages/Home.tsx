import { About } from '../components/sections/About';
import { Certifications } from '../components/sections/Certifications';
import { Contact } from '../components/sections/Contact';
import { Education } from '../components/sections/Education';
import { Experience } from '../components/sections/Experience';
import { GitHubActivity } from '../components/sections/GitHubActivity';
import { Hero } from '../components/sections/Hero';
import { Learning } from '../components/sections/Learning';
import { Projects } from '../components/sections/Projects';
import { Resume } from '../components/sections/Resume';
import { Skills } from '../components/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Learning />
      <GitHubActivity />
      <Resume />
      <Contact />
    </>
  );
}
