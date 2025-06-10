"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import SectionTitle from "./sub-components/SectionTitle";
import SectionDescription from "./sub-components/SectionDescription";

const icons = [
  "html5", "css3", "javascript", "typescript", "nodejs", "nextjs", "mongodb",
  "tailwindcss", "git", "github", "figma", "docker", "postgresql", "php", "firebase",
  "bash", "vuejs", "jquery", "webpack", "wordpress", "sass", "python",
  "linux", "ansible", "nginx", "mysql", "terraform", "vscode"
];

const radius = 27;
const scale = 6;

const loadPngTexture = (slug: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/icons/png/${slug}.png`,
      (texture) => resolve(texture),
      undefined,
      () => reject(new Error(`Erreur chargement image ${slug}`))
    );
  });
};

const SkillCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef(new THREE.Group());
  const animationIdRef = useRef<number | null>(null);
  const hoveredRef = useRef<THREE.Sprite | null>(null);
  const [initialized, setInitialized] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = groupRef.current;
    const sprites: THREE.Sprite[] = [];

    const loadIcons = async () => {
      for (let i = 0; i < icons.length; i++) {
        const slug = icons[i];
        try {
          const texture = await loadPngTexture(slug);
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
      }

      if (sprites.length > 0) {
        scene.add(group);
        animate();
        setInitialized(true);
      } else {
        console.warn("Aucun sprite chargé pour SkillsCanvas.");
      }
    };

    let targetX = 0, targetY = 0;
    let rotationX = 0, rotationY = 0;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      const isTouch = typeof TouchEvent !== "undefined" && e instanceof TouchEvent;

      if (isTouch) {
        clientX = (e as TouchEvent).touches[0]?.clientX || 0;
        clientY = (e as TouchEvent).touches[0]?.clientY || 0;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      targetX = ((clientX - rect.left) / rect.width - 0.5) * 0.02;
      targetY = -((clientY - rect.top) / rect.height - 0.5) * 0.02;

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

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      rotationX += (targetX - rotationX) * 0.1;
      rotationY += (targetY - rotationY) * 0.1;
      const maxSpeed = 0.01;

      // Ajoute une rotation permanente même sans interaction
      group.rotation.y += 0.002;

      group.rotation.y += THREE.MathUtils.clamp(rotationX, -maxSpeed, maxSpeed);
      group.rotation.x += THREE.MathUtils.clamp(rotationY, -maxSpeed, maxSpeed);
      group.children.forEach((sprite) => (sprite as THREE.Sprite).lookAt(camera.position));
      renderer.render(scene, camera);
    };

    loadIcons();

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationIdRef.current!);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
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
        <SectionDescription>
          Un aperçu des technologies que j’explore dans mon travail
        </SectionDescription>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`w-[250px] h-[250px] rounded-full transition-all duration-700 ${
          initialized ? "hover:drop-shadow-[0_0_20px_rgba(0,191,255,0.3)]" : ""
        }`}
      />
    </section>
  );
};

export default SkillCanvas;
