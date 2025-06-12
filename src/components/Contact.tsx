'use client'

import { Mail, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from './sub-components/SectionTitle'
import SectionDescription from './sub-components/SectionDescription'
import { getRecaptchaToken } from '@/hooks/useRecaptchaToken'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactSection() {
  console.log('✅ ContactSection chargé')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log('🧪 Demande du token reCAPTCHA...')
    const token = await getRecaptchaToken('contact_form')
    console.log('📥 Token reçu :', token)

    if (!token) {
      toast.error('Erreur de vérification reCAPTCHA.')
      setIsSubmitting(false)
      return
    }

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    console.log(`🚀 Envoi de la requête à ${apiURL}/send-mail...`)

    try {
      const res = await fetch(`${apiURL}/send-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      })

      if (!res.ok) throw new Error()

      toast.success('Votre message a bien été envoyé !')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('❌ Erreur lors de l’envoi :', err)
      toast.error("Erreur lors de l'envoi du message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative z-10 py-32 px-6 flex flex-col items-center gap-20 text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <SectionTitle>Contact</SectionTitle>
        <SectionDescription>
          Une question, une idée, un projet ? N'hésitez pas à me laisser un message.
        </SectionDescription>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-[var(--card-bg)] text-[var(--highlight)]">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">Email</p>
                <p className="text-sm text-[var(--icon-color)]">contact@paul-fournier.dev</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-[var(--card-bg)] text-[var(--highlight)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">Localisation</p>
                <p className="text-sm text-[var(--icon-color)]">Bordeaux, France</p>
              </div>
            </div>
          </div>

          <div
            data-contact-form
            className="bg-white dark:bg-[var(--card-bg)] rounded-xl p-6 md:p-8 shadow-lg border border-zinc-200 dark:border-zinc-700"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 rounded-md text-white font-medium flex items-center justify-center gap-2 bg-[var(--highlight)] hover:opacity-90 transition disabled:opacity-60"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
