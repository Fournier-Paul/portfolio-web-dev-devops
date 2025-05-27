'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Database,
  PenTool,
  Cloud,
  Wrench,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

type SkillCategory = {
  title: string;
  icon: JSX.Element;
  skills: {
    name: string;
    logo?: string;
  }[];
};

const categories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: <Code className="w-5 h-5 text-blue-500" />,
    skills: [
      { name: 'Nuxt.js', logo: 'nuxtjs' },
      { name: 'Vue.js', logo: 'vuejs' },
      { name: 'Vite', logo: 'vite' },
      { name: 'React', logo: 'react' },
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'Twig', logo: 'twig' },
      { name: 'Tailwind CSS', logo: 'tailwindcss' },
      { name: 'HTML5', logo: 'html5' },
      { name: 'CSS3', logo: 'css3' },
      { name: 'Bootstrap', logo: 'bootstrap' },
      { name: 'jQuery', logo: 'jquery' },
    ],
  },
  {
    title: 'Backend Development',
    icon: <Database className="w-5 h-5 text-green-500" />,
    skills: [
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Python', logo: 'python' },
      { name: 'Symfony', logo: 'symfony' },
      { name: 'PHP', logo: 'php' },
      { name: 'MySQL', logo: 'mysql' },
      { name: 'SQLite', logo: 'sqlite' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'UI/UX Design',
    icon: <PenTool className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: 'Figma', logo: 'figma' },
      { name: 'Responsive Design' },
      { name: 'Wireframing' },
      { name: 'Lucidchart' },
      { name: 'JMerise' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-5 h-5 text-orange-500" />,
    skills: [
      { name: 'Docker', logo: 'docker' },
      { name: 'Terraform', logo: 'terraform' },
      { name: 'DigitalOcean' },
      { name: 'AWS' },
      { name: 'Scaleway' },
      { name: 'OVH' },
      { name: 'CI/CD' },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: <Wrench className="w-5 h-5 text-pink-500" />,
    skills: [
      { name: 'VS Code', logo: 'vscode' },
      { name: 'Redux', logo: 'redux' },
      { name: 'Firebase', logo: 'firebase' },
      { name: 'NPM', logo: 'npm' },
      { name: 'Composer' },
    ],
  },
  {
    title: 'Security & Infra',
    icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
    skills: [
      { name: 'SSH' },
      { name: 'UFW' },
      { name: 'Fail2ban' },
      { name: 'OpenVAS' },
      { name: 'Cloudflare' },
      { name: 'Wireguard VPN' },
      { name: 'Nginx', logo: 'nginx' },
      { name: 'Apache', logo: 'apache' },
    ],
  },
  {
    title: 'Creative Skills',
    icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
    skills: [
      { name: 'UI Animation' },
      { name: 'SVG Animation' },
      { name: '3D Modeling' },
      { name: 'Motion Graphics' },
      { name: 'SEO' },
    ],
  },
];

const SkillCategoryCards: FC = () => {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 p-4 transition-colors duration-1000 bg-[var(--background)] text-[var(--foreground)]">
      {categories.map((cat, i) => (
        <motion.div
          key={i}
          className="rounded-2xl p-5 shadow-md border border-zinc-200 dark:border-zinc-700 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-1000 hover:shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 text-[var(--foreground)] border-zinc-200 dark:bg-white/10 rounded-xl">{cat.icon}</div>
            <h3 className="text-lg font-semibold">{cat.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, j) => (
              <span
                key={j}
                className="flex items-center gap-2 text-sm px-3 py-1 rounded-full border transition-all duration-200
                           bg-gray-100 text-[var(--foreground)] border-zinc-200
                           dark:bg-white/5 dark:text-white dark:border-white/10
                           hover:bg-zinc-100 dark:hover:bg-white/10
                           active:scale-95"
              >
                {skill.logo && (
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.logo}/${skill.logo}-original.svg`}
                    alt={skill.name}
                    className="w-4 h-4 object-contain"
                  />
                )}
                <div
                className='dark:text-black'>
                {skill.name}
                </div>
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default SkillCategoryCards;
