'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Ne monte le contenu qu'après l'hydratation côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {mounted ? children : null}
    </NextThemesProvider>
  );
}
