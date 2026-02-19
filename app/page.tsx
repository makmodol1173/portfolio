import { Navigation } from "@/components/sections/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/sections/footer"
import { SectionDivider } from "@/components/sections/section-divider"
import { HeroSceneClient } from "@/components/three/hero-scene-client"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navigation />

      <div className="relative">
        <HeroSceneClient />
        <HeroSection />
      </div>

      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <BlogSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  )
}
