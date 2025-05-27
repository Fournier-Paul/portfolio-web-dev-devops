import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import Projects from "@/components/Projects"
import SkillsCanvas from '@/components/SkillsCanvas'
import SkillCategoryCards from "@/components/SkillCategoryCards";



export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
         <Projects />
         <SkillsCanvas />
         <SkillCategoryCards />
      </main>
      <Footer />
    </>
  )
}
