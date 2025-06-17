'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const year = new Date().getFullYear();

  const iconSrc =
    resolvedTheme === 'dark'
      ? '/images/icons/git_branch_icon_white.svg'
      : '/images/icons/git_branch_icon.svg';

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-32 py-8 px-4 text-[13px] flex justify-center text-muted-foreground"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <span className="opacity-60">© {year} Paul Fournier</span>

        <span className="text-muted-foreground select-none">·</span>

        <a
          href="https://github.com/Fournier-Paul/portfolio-web-dev-devops"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 hover:text-primary transition-colors duration-1000"
          aria-label="Code source du site sur GitHub"
        >
          <span className="mr-1">Code source</span>
          <Image
            src={iconSrc}
            alt="Icône Git"
            width={14}
            height={14}
            className="object-contain group-hover:-rotate-12 transition-transform duration-1000"
            draggable={false}
          />
        </a>
      </div>
    </motion.footer>
  );
}
