'use client'

import { useEffect, useState, useRef } from 'react'

const lines = [
  { prefix: '~ echo $CURRENTLY', delay: 0, type: 'command' },
  { text: 'Recherche d\'un poste de Développeur Web / DevOps', delay: 1500, type: 'output' },
  { prefix: '~ echo $PREVIOUSLY', delay: 3000, type: 'command' },
  { text: 'Chargé du Web & DevOps chez PULSAGENCY', delay: 4500, type: 'output' },
]

const commandResponses: Record<string, string> = {
  help: 'Commandes disponibles : about, skills, experience, contact, clear',
  about: "Je conçois des sites et applications web, ainsi que des solutions DevOps faciles à déployer, maintenir et faire évoluer.",
  skills: 'DevOps: Docker, CI/CD, Terraform | Web: Nuxt.js, React, Node.js | Cloud: Digital Ocean, AWS',
  contact: '📧 contact@paul-fournier.dev | 🔗 github.com/paulfournier | LinkedIn: linkedin.com/paul-fournier-dev/',
  cv: '📄 Télécharger le CV : https://paul-fournier.dev/cv.pdf',
  ls: 'about  skills  contact  projects  cv',
  cd: 'Commande non supportée ici 😅',
  sudo: "🛑 Vous n'avez pas les permissions nécessaires pour exécuter cette commande.",
  "rm -rf /": "😱 Erreur critique : suppression du système...😉",
  coffee: "☕ Chargement de la caféine... Prêt à coder !",
  ascii: `
██████╗  █████╗ ██╗   ██╗██╗     
██╔══██╗██╔══██╗██║   ██║██║     
██████╔╝███████║██║   ██║██║     
██╔═══╝ ██╔══██║██║   ██║██║     
██║     ██║  ██║╚██████╔╝███████╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`,
  clear: '',
}

export default function TerminalCard() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []

    lines.forEach((line, index) => {
      const toDisplay = line.prefix || line.text || ''
      timeouts.push(
        setTimeout(() => {
          for (let i = 0; i <= toDisplay.length; i++) {
            const timeout = setTimeout(() => {
              setDisplayedLines((prev) => {
                const updated = [...prev]
                updated[index] = toDisplay.slice(0, i)
                return updated
              })
            }, i * 50)
            timeouts.push(timeout)
          }
          if (index === lines.length - 1) {
            setTimeout(() => setIsTypingDone(true), toDisplay.length * 50 + 200)
          }
        }, line.delay)
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const command = input.trim().toLowerCase()
      setDisplayedLines((prev) => [...prev, `~ ${input}`])
      if (commandResponses[command] !== undefined) {
        if (command === 'clear') {
          setDisplayedLines([])
        } else {
          setDisplayedLines((prev) => [...prev, commandResponses[command]])
        }
      } else {
        setDisplayedLines((prev) => [...prev, `Commande inconnue: ${command}`])
      }
      setInput('')
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      data-terminal
      className="mt-8 w-full max-w-xl mx-auto rounded-md overflow-hidden shadow-lg bg-[#0d0d0d] font-mono text-white text-left"
      onClick={handleTerminalClick}
      tabIndex={0}
    >
      <div className="bg-zinc-800 text-left text-sm px-4 py-2 text-zinc-300 font-semibold">
        visitor@paul-fournier.dev
      </div>
      <div
        ref={containerRef}
        className="px-4 py-2 leading-relaxed text-sm h-64 overflow-y-auto"
      >
        {displayedLines.map((line, i) => (
          <div key={i}>
            {line.startsWith('~') && line.includes('$')
              ? <span className="text-purple-400">{line}</span>
              : <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />}
          </div>
        ))}

        {isTypingDone && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-purple-400 animate-pulse">~</span>
            <input
              ref={inputRef}
              className="bg-transparent text-white focus:outline-none w-full"
              placeholder="Tapez une commande (ex: help)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}

function highlight(text: string) {
  return text
    .replace(/PYYNE Digital/, '<span class="text-green-400">PYYNE Digital</span>')
    .replace(/Inveterate/, '<span class="text-indigo-400">Inveterate</span>')
    .replace(/PULSAGENCY/, '<span class="text-orange-400">PULSAGENCY</span>')
    .replace(/\n/g, '<br />')
}
