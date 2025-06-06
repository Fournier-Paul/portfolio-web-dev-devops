'use client'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) return null

  if (!window.grecaptcha) {
    await new Promise<void>((resolve) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.onload = () => resolve()
      document.body.appendChild(script)
    })
  }

  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action }).then(resolve)
    })
  })
}
