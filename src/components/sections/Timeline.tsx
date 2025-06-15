'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Briefcase, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDescription from '@/components/ui/SectionDescription'


const events = [
  {
    date: '2025',
    title: 'Formation en alternance',
    subtitle: '2023 - 2025',
    description: `Expert en architectures systèmes, réseaux et sécurité informatique chez Puls Agency.`,
    icon: <GraduationCap />,
  },
  {
    date: '2021',
    title: 'Formation en alternance',
    description: `Concepteur développeur d'applications chez Puls Agency.`,
    icon: <GraduationCap />,
  },
  {
    date: '2021',
    title: 'Formation autodidacte',
    description: `OpenClassrooms, Grafikart, Udemy et plein d'autres.\nApprentissage de VueJs.`,
    icon: <GraduationCap />,
  },
  {
    date: '2020',
    title: 'E-commerce',
    description: `Création d’un site internet from-scratch galerie-riva.com.\nApprentissage de Symfony.`,
    icon: <Briefcase />,
  },
  {
    date: '2019',
    title: 'Stage',
    description: `Développement Front-End & Back-End d’un site de gestion de contenu afin d’afficher un diaporama sur un Raspberry.`,
    icon: <Briefcase />,
  },
  {
    date: '2018',
    title: 'Talis Business School',
    description: `Formation Développeur Web Front-End à Bordeaux afin d’obtenir les certifications me permettant de développer des applications Front-End & Back-End.`,
    icon: <GraduationCap />,
  },
]

export default function ExperienceTimeline() {
  return (
    <section id="timeline" aria-label="Mon parcours" className="relative z-10 py-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <SectionTitle>Mon Parcours</SectionTitle>
        <SectionDescription>Retour chronologique sur mon évolution en tant que développeur.</SectionDescription>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-7xl" // 🔧 élargi ici
      >
        <VerticalTimeline lineColor="var(--highlight)">
          {events.map((item, idx) => (
            <VerticalTimelineElement
              key={idx}
              contentStyle={{
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}
              contentArrowStyle={{
                borderRight: '7px solid var(--card-bg)',
              }}
              date={item.date}
              iconStyle={{
                background: 'var(--highlight)',
                color: '#fff',
              }}
              icon={item.icon}
            >
              <h3 className="text-lg font-bold text-[var(--text-main)] uppercase">
                {item.title}
              </h3>
              {item.subtitle && (
                <h4 className="text-sm font-medium text-[var(--highlight)] mt-1">
                  {item.subtitle}
                </h4>
              )}
              <p className="text-sm whitespace-pre-line mt-2 text-[var(--text-main)]">
                {item.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </section>
  )
}
