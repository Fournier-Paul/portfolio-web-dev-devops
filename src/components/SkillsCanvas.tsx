"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SkillCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const hoveredRef = useRef<THREE.Sprite | null>(null);

  const icons: string[] = [
    "html5", "css3", "javascript", "typescript", "react", "nodejs", "nextjs", "mongodb",
    "tailwindcss", "git", "github", "figma", "docker", "postgresql", "php", "firebase",
    "bash", "vuejs", "gulp", "jquery", "webpack", "wordpress", "sass", "npm", "python",
    "linux", "ansible", "nginx", "mysql", "terraform", "vscode"
  ];

  const radius = 27;
  const scale = 6;

  const loadSvgAsTexture = (url: string): Promise<THREE.Texture> => {
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
        ctx.drawImage(img, 0, 0, size, size);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        resolve(texture);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(375, 375);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = groupRef.current;
    const sprites: THREE.Sprite[] = [];

    icons.forEach(async (iconSlug: string, i: number) => {
      const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconSlug}/${iconSlug}-original.svg`;
      try {
        const texture = await loadSvgAsTexture(url);
        const phi = Math.acos(-1 + (2 * i) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: texture, transparent: true })
        );
        sprite.scale.set(scale, scale, 1);
        sprite.position.set(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
        group.add(sprite);
        sprites.push(sprite);
      } catch (err) {
        console.error(`Erreur de chargement SVG ${iconSlug}:`, err);
      }
    });

    scene.add(group);

    // Inertie + limitation de vitesse
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

      // Inertie lissée
      rotationX += (targetX - rotationX) * 0.1;
      rotationY += (targetY - rotationY) * 0.1;

      const maxSpeed = 0.01;

      group.rotation.y += THREE.MathUtils.clamp(rotationX, -maxSpeed, maxSpeed);
      group.rotation.x += THREE.MathUtils.clamp(rotationY, -maxSpeed, maxSpeed);

      group.children.forEach((sprite) => {
        (sprite as THREE.Sprite).lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-16 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-1000">
      <h3 className="text-xl font-bold mb-4">Skills</h3>
      <div ref={containerRef} className="w-[375px] h-[375px] mx-auto" />
    </section>
  );
};

export default SkillCanvas;
