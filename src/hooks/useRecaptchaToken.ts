'use client'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (typeof window === 'undefined') {
    console.warn('❌ reCAPTCHA appelé côté serveur, annulé')
    return null
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) {
    console.warn('❌ NEXT_PUBLIC_RECAPTCHA_SITE_KEY manquant')
    return null
  }

  if (!window.grecaptcha) {
    console.log('📡 Chargement du script reCAPTCHA...')
    await new Promise<void>((resolve) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.onload = () => {
        console.log('✅ Script reCAPTCHA chargé')
        resolve()
      }
      document.body.appendChild(script)
    })
  }

  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action }).then((token: string) => {
        console.log('🔐 Token reCAPTCHA obtenu :', token)
        resolve(token)
      }).catch((err) => {
        console.error('❌ Échec reCAPTCHA :', err)
        resolve(null)
      })
    })
  })
}
