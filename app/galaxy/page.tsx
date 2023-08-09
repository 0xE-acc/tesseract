import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Galaxy: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const init = () => {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      createStars();
    };

    const createStars = () => {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.05 });

      const stars = new THREE.Points(geometry, material);
      starsRef.current = stars;
      sceneRef.current?.add(stars);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (starsRef.current) {
        starsRef.current.rotation.x += 0.001;
        starsRef.current.rotation.y += 0.001;

        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
      }
    };

    init();
    animate();
  }, []);

  return null;
};

export default Galaxy;
