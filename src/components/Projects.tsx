'use client'

import { motion } from "framer-motion"

const projects = [
  {
    title: "Portfolio Vitrine",
    description: "Site vitrine responsive avec React et Tailwind.",
    link: "#",
    tags: ["React", "Tailwind"],
  },
  {
    title: "API REST Node.js",
    description: "Back-end complet avec Express, MongoDB, JWT.",
    link: "#",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Dashboard Admin",
    description: "UI moderne pour la gestion de données en temps réel.",
    link: "#",
    tags: ["Next.js", "Framer Motion"],
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 px-6 transition-colors duration-1000 bg-[var(--background)] text-[var(--foreground)]"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Projets récents
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 rounded-2xl shadow-md border transition-colors duration-1000 bg-[var(--background)] text-[var(--foreground)] border-zinc-200 dark:border-zinc-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-primary">
              {project.title}
            </h3>
            <p className="text-sm opacity-80 mb-4">{project.description}</p>
            <a
              href={project.link}
              className="inline-block text-sm text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le projet →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
