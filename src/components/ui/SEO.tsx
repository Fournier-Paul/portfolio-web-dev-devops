'use client'
import Head from 'next/head'

export default function SEO() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Paul Fournier",
            url: "https://paulfournier.dev",
            jobTitle: "Développeur Web et DevOps",
            // image: "https://paulfournier.dev/images/preview-projects/paul-fournier-portfolio.webp",
            sameAs: [
              "https://github.com/paulfournier",
              "https://linkedin.com/in/paul-fournier-dev"
            ],
            description: "Je suis développeur Full Stack et DevOps passionné, actuellement à la recherche d'une nouvelle opportunité.",
            jobSeekerProfile: {
              "@type": "JobPosting",
              title: "Développeur Web / DevOps",
              description: "Développeur full stack avec expertise CI/CD, Docker, React, Next.js, Ansible et plus. Disponible immédiatement.",
              employmentType: "FULL_TIME"
            }
          })
        }}
      />
    </Head>
  )
}
