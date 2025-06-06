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
  icon: React.ReactElement
  skills: {
    name: string;
    logo?: string;
  }[];
};

const categories: SkillCategory[] = [
  {
    title: 'Développement Frontend',
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
      { name: 'Seo', logo: 'seo' },
    ],
  },
  {
    title: 'Développement Backend',
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
    title: 'Outils & Technologies',
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
    title: 'Sécurité & Infrastructure',
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
    title: 'Design UX/UI',
    icon: <PenTool className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: 'Figma', logo: 'figma' },
      { name: 'Responsive Design' },
      { name: 'Wireframe' },
      { name: 'Lucidchart' },
      { name: 'JMerise' },
    ],
  },
];

const SkillCategoryCards: FC = () => {
  return (
    <section className="relative z-10 mb-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid w-full max-w-6xl md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="rounded-2xl p-5 shadow-md border border-zinc-200 dark:border-zinc-700
               transition-transform duration-1000 hover:scale-[1.02] 
               hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(100,116,139,0.4)]"
            initial="hidden"
            animate="visible"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 border-zinc-200 dark:bg-white/10 rounded-xl">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, j) => (
                <span
                  key={j}
                  className="flex items-center gap-2 text-sm px-3 py-1 rounded-full border transition-all duration-1000
                             bg-[var(--card-bg)] border-zinc-200
                             dark:bg-white/5 dark:border-white/10
                             dark:hover:bg-white/10
                             active:scale-95"
                >
                  {skill.logo && (
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.logo}/${skill.logo}-original.svg`}
                      alt={skill.name}
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  <span className="text-[var(--text-main)]">{skill.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillCategoryCards;
