import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, subject, message, recaptchaToken } = body

  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

  const captchaRes = await fetch(verifyUrl, { method: 'POST' })
  const captchaData = await captchaRes.json()

  if (!captchaData.success || captchaData.score < 0.5) {
    return NextResponse.json({ message: 'Échec de reCAPTCHA' }, { status: 400 })
  }

  console.log('📬 Message reçu :', { name, email, subject, message })

  return NextResponse.json({ message: 'Message bien reçu !' })
}
