'use client'

import { useState, useEffect } from 'react'
import { Github, ExternalLink, Wrench, X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from './sub-components/ProjectsData'
import SectionTitle from './sub-components/SectionTitle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ModalPortal from './sub-components/ModalPortal'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import SectionDescription from './sub-components/SectionDescription'

const categories = ['Tous', 'Web', 'Infra', 'Mobile', 'Automatisation']

export default function ProjectGallery() {
  const [selected, setSelected] = useState('Tous')
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null)
  const [openGallery, setOpenGallery] = useState(false)

  const filtered = selected === 'Tous'
    ? projects
    : projects.filter(p => Array.isArray(p.category) ? p.category.includes(selected) : p.category === selected)

  const openProject = openProjectIndex !== null ? filtered[openProjectIndex] : null

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProjectIndex(null)
      if (typeof openProjectIndex === 'number') {
        if (e.key === 'ArrowLeft' && openProjectIndex > 0) setOpenProjectIndex(openProjectIndex - 1)
        if (e.key === 'ArrowRight' && openProjectIndex < filtered.length - 1) setOpenProjectIndex(openProjectIndex + 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [openProjectIndex, filtered.length])

  return (
    <section className="relative z-10 py-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
      <div className="text-center max-w-3xl">
        <SectionTitle>Mes Projets</SectionTitle>
        <SectionDescription>Une sélection de projets Web, DevOps, Mobile et automatisation que j'ai réalisés.</SectionDescription>
      </div>

      <div className="flex justify-center flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={clsx(
              'px-4 py-1.5 text-sm rounded-full border transition-all',
              selected === cat
                ? 'bg-[var(--highlight)] text-white'
                : 'border-[var(--highlight)] text-[var(--highlight)] hover:bg-[var(--highlight)]/10'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <AnimatePresence mode="wait">
          {filtered.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group bg-[var(--card-bg)] rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-[var(--highlight)] hover:scale-[1.02] ease-in-out"
              onClick={() => setOpenProjectIndex(index)}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <p className="text-xs uppercase text-[var(--highlight)] font-medium">
                    {Array.isArray(project.category) ? project.category.join(' / ') : project.category}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">{project.title}</h3>
                  <p className="text-sm text-[var(--text-main)]">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 items-center">
                  {project.technologies?.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[var(--highlight)]/20 text-[var(--highlight)] px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <button
                      onClick={() => setOpenProjectIndex(index)}
                      className="text-xs bg-[var(--highlight)]/10 text-[var(--highlight)] px-2 py-0.5 rounded-full hover:bg-[var(--highlight)]/20 transition cursor-pointer"
                      title={`Voir ${project.technologies.length - 4} autres technologies`}
                    >
                      +{project.technologies.length - 4} autres
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {openProject && (
          <ModalPortal>
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenProjectIndex(null)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                className="bg-[var(--card-bg)] max-w-4xl w-full p-8 rounded-2xl relative overflow-y-auto max-h-[90vh] shadow-2xl"
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-5 right-5 dark:text-white hover:text-[var(--highlight)] text-[var(--text-main)]"
                  onClick={() => setOpenProjectIndex(null)}
                  autoFocus
                >
                  <X size={22} />
                </button>

                <div className="relative h-48 mb-6 rounded-lg overflow-hidden mt-6 bg-[var(--card-bg)] flex items-center justify-center">
                  <Image
                    src={openProject.image}
                    alt={openProject.title}
                    width={600}
                    height={200}
                    className="h-full w-auto object-contain border border-[var(--highlight)] rounded-xl"
                  />
                </div>

                <header className="mb-6 border-b pb-4">
                  <h2 className="text-3xl font-bold text-[var(--text-main)]">{openProject.title}</h2>
                </header>

                <article className="space-y-4 text-sm text-[var(--text-main)] leading-relaxed">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ ...props }) => <h3 className="text-lg font-semibold text-[var(--highlight)] mt-6" {...props} />,
                      h4: ({ ...props }) => <h4 className="text-base font-medium text-[var(--highlight)] mt-4" {...props} />,
                      p: ({ ...props }) => <p className="text-sm leading-relaxed mt-2" {...props} />,
                      li: ({ ...props }) => <li className="ml-4 list-disc text-sm leading-snug" {...props} />,
                      ul: ({ ...props }) => <ul className="list-disc space-y-1 ml-6 mt-2" {...props} />,
                      blockquote: ({ ...props }) => <blockquote className="border-l-4 border-[var(--highlight)] pl-4 italic opacity-80 text-sm" {...props} />,
                    }}
                  >
                    {openProject.longDescription || openProject.description}
                  </ReactMarkdown>
                </article>

                <footer className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {openProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[var(--highlight)]/10 text-[var(--highlight)] px-3 py-1 rounded-full hover:underline cursor-pointer"
                        onClick={() => setSelected(tech)}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-white justify-end">
                    {openProject.githubLink && (
                      <a href={openProject.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--highlight)] text-[var(--text-main)]">
                        <Github size={18} />
                      </a>
                    )}
                    {openProject.backendGithubLink && (
                      <a href={openProject.backendGithubLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--highlight)] text-[var(--text-main)]">
                        <Github size={18} />
                      </a>
                    )}
                    {openProject.externalLink && (
                      <a href={openProject.externalLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--highlight)] text-[var(--text-main)]">
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {openProject.technicalLink && (
                      <a href={openProject.technicalLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--highlight)] text-[var(--text-main)]">
                        <Wrench size={18} />
                      </a>
                    )}
                    {openProject.gallery?.length > 0 && (
                      <button onClick={() => setOpenGallery(true)} className="hover:text-[var(--highlight)] text-[var(--text-main)]">
                        <ImageIcon size={18} />
                      </button>
                    )}
                  </div>
                </footer>
              </motion.div>

              {openProjectIndex > 0 && (
                <button
                  className="fixed left-4 md:left-8 top-1/2 z-[9999] -translate-y-1/2 bg-white/20 backdrop-blur text-white p-3 rounded-full hover:bg-white/30 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenProjectIndex(openProjectIndex - 1)
                  }}
                >
                  <ChevronLeft size={28} />
                </button>
              )}
              {openProjectIndex < filtered.length - 1 && (
                <button
                  className="fixed right-4 md:right-8 top-1/2 z-[9999] -translate-y-1/2 bg-white/20 backdrop-blur text-white p-3 rounded-full hover:bg-white/30 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenProjectIndex(openProjectIndex + 1)
                  }}
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </motion.div>

            {openGallery && openProject.gallery && (
            <Lightbox
              open={openGallery}
              close={() => setOpenGallery(false)}
              closeOnBackdropClick={true}
              slides={openProject.gallery}
              render={{
                slide: ({ slide }) => {
                  const isVideo =
                    slide.type === 'video' ||
                    slide?.src?.endsWith('.mp4') ||
                    (Array.isArray(slide.sources) && slide.sources[0]?.type?.includes('video'))

                  if (isVideo) {
                    const videoSrc = slide?.src || slide?.sources?.[0]?.src
                    return (
                      <div className="flex items-center justify-center w-full h-full bg-black">
                        <video src={videoSrc} controls autoPlay loop muted className="max-h-full max-w-full" />
                      </div>
                    )
                  }

                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={slide.src} alt={slide.caption || 'image'} className="max-h-full max-w-full object-contain" />
                      {slide.caption && (
                        <div className="absolute bottom-4 text-sm text-white bg-black/70 px-4 py-1 rounded-full">
                          {slide.caption}
                        </div>
                      )}
                    </div>
                  )
                },
              }}
            />

            )}
          </ModalPortal>
        )}
      </AnimatePresence>
    </section>
  )
}