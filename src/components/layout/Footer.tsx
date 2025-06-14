'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Footer() {
  const { resolvedTheme } = useTheme();

  const iconSrc =
    resolvedTheme === 'dark'
      ? '/images/icons/git_branch_icon_white.svg'
      : '/images/icons/git_branch_icon.svg';

  return (
    <footer className="py-6 text-sm text-muted-foreground text-[var(--foreground)] flex justify-center">
      <div className="flex items-center gap-2">
        <span>© 2025 Paul Fournier</span>

        <span className="text-muted-foreground">|</span>

        <a
          href="https://github.com/Fournier-Paul/portfolio-web-dev-devops"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary transition-colors"
          aria-label="Code source du site"
        >
          <span className="mr-2">Code source</span>
          <Image
            src={iconSrc}
            alt="Icône Git"
            width={12}
            height={12}
            className="object-contain"
            draggable={false}
          />
        </a>
      </div>
    </footer>
  );
}
