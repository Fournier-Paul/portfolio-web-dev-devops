'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState('#ffffff88');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !theme) return;
    // Plus contrasté selon le thème
    setColor(theme === 'dark' ? '#ffffff88' : '#00000033');
  }, [theme, mounted]);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          detectRetina: true,
          background: { color: { value: 'transparent' } },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'attract' },
              resize: true,
            },
            modes: {
              attract: { distance: 150, duration: 0.5, factor: 2 },
            },
          },
          particles: {
            number: {
              value: 50,
              density: { enable: true, area: 1000 },
            },
            color: { value: color },
            shape: { type: 'circle' },
            size: {
              value: { min: 0.5, max: 2 },
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 0.3,
                sync: false,
              },
            },
            opacity: {
              value: { min: 0.2, max: 0.7 },
              animation: {
                enable: true,
                speed: 1.2,
                minimumValue: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2.2,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'out' },
            },
            links: { enable: false },
          },
        }}
      />
    </div>
  );
}
