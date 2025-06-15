'use client'

import { motion } from 'framer-motion'
import { Calendar, GraduationCap, Landmark, FileText } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDescription from '@/components/ui/SectionDescription'

const formations = [
  {
    titre: "Expert en architectures systèmes, réseaux et sécurité informatique",
    etablissement: "",
    dates: "01/2025",
    description: "Dossier complet disponible sur demande.",
    liens: [{ label: "Référentiel", url: "/docs/Référentiel_EASRSI.pdf" }],
    matieres: []
  },
  {
    titre: "Concepteur développeur d'applications",
    etablissement: "",
    dates: "06/2023",
    description: "Dossier complet disponible sur demande.",
    liens: [
      { label: "Référentiel dossier projet", url: "/docs/dossier_projet_cda.pdf" },
      { label: "Référentiel dossier professionnel", url: "/docs/Dossier_professionnel_CDA.pdf" }
    ],
    matieres: []
  },
  {
    titre: "Développeur Front-End",
    etablissement: "Talis-business-school",
    dates: "05/2019",
    description: "Développer la partie front-end d’une application web ou web mobile en intégrant les recommandations de sécurité.",
    matieres: []
  },
  {
    titre: "Développeur Back-End",
    etablissement: "Talis-business-school",
    dates: "08/2019",
    description: "Développer la partie back-end d’une application web ou web mobile en intégrant les recommandations de sécurité.",
    matieres: []
  }
]

export default function ParcoursScolaire() {
  return (
    <section id="education" aria-label="Mes diplômes" className="relative z-10 py-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl"
    >
    <SectionTitle>Parcours de formation</SectionTitle>
      <SectionDescription>Certifications et spécialisations dans les domaines du développement web et de la sécurité informatique.</SectionDescription>
    </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid w-full max-w-6xl md:grid-cols-2 gap-8"
      >
        {formations.map((formation, i) => (
          <div
            key={i}
            className="bg-[var(--card-bg)] rounded-xl border border-[var(--highlight)] p-6 space-y-4 shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <GraduationCap size={24} className="text-[var(--highlight)]" />
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                {formation.titre}
              </h3>
            </div>

            {formation.etablissement && (
              <div className="flex items-center gap-2 text-sm text-[var(--icon-color)]">
                <Landmark size={16} />
                <span>{formation.etablissement}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-[var(--icon-color)]">
              <Calendar size={16} />
              <span>{formation.dates}</span>
            </div>

            <p className="italic text-[var(--text-main)]">
              {formation.description}
            </p>

            {Array.isArray(formation.liens) && formation.liens.length > 0 && (
              <div>
                {formation.liens.map((lien, idx) => (
                  <p key={idx}>
                    <a
                      href={lien.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80 inline-flex items-center gap-1"
                    >
                      <FileText size={14} />
                      {lien.label}
                    </a>
                  </p>
                ))}
              </div>
            )}

          </div>
        ))}
      </motion.div>
    </section>
  )
}
