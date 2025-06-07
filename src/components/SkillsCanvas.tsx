"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import SectionTitle from './sub-components/SectionTitle';
import SectionDescription from './sub-components/SectionDescription';

const icons = [
  "html5", "css3", "javascript", "typescript", "react", "nodejs", "nextjs", "mongodb",
  "tailwindcss", "git", "github", "figma", "docker", "postgresql", "php", "firebase",
  "bash", "vuejs", "jquery", "webpack", "wordpress", "sass", "python",
  "linux", "ansible", "nginx", "mysql", "terraform", "vscode"
];

const radius = 27;
const scale = 6;

const loadSvgAsTexture = (slug: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context is null");
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      resolve(texture);
    };
    img.onerror = (e) => reject(`Erreur de chargement de l'icône ${slug}: ${e}`);
    img.src = `/icons/${slug}.svg`;
  });
};

const SkillCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const hoveredRef = useRef<THREE.Sprite | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(250, 250);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = groupRef.current;
    const sprites: THREE.Sprite[] = [];

    icons.forEach(async (slug, i) => {
      try {
        const texture = await loadSvgAsTexture(slug);
        const phi = Math.acos(-1 + (2 * i) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
        sprite.scale.set(scale, scale, 1);
        sprite.position.set(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
        group.add(sprite);
        sprites.push(sprite);
      } catch (err) {
        console.error(err);
      }
    });

    scene.add(group);

    let targetX = 0, targetY = 0;
    let rotationX = 0, rotationY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.02;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.02;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sprites);

      if (hoveredRef.current) {
        hoveredRef.current.scale.set(scale, scale, 1);
        hoveredRef.current = null;
        renderer.domElement.style.cursor = "default";
      }

      if (intersects.length > 0) {
        const sprite = intersects[0].object as THREE.Sprite;
        sprite.scale.set(scale * 1.3, scale * 1.3, 1);
        hoveredRef.current = sprite;
        renderer.domElement.style.cursor = "pointer";
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      rotationX += (targetX - rotationX) * 0.1;
      rotationY += (targetY - rotationY) * 0.1;
      const maxSpeed = 0.01;
      group.rotation.y += THREE.MathUtils.clamp(rotationX, -maxSpeed, maxSpeed);
      group.rotation.x += THREE.MathUtils.clamp(rotationY, -maxSpeed, maxSpeed);
      group.children.forEach((sprite) => (sprite as THREE.Sprite).lookAt(camera.position));
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative z-10 py-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <SectionTitle>Stack technique</SectionTitle>
        <SectionDescription>Un aperçu des technologies que j’explore dans mon travail</SectionDescription>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-[250px] h-[250px] rounded-full hover:drop-shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all duration-700 d-none-first-canva"
      />
    </section>
  );
};

export default SkillCanvas;
