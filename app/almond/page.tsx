import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AlmondAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shapeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const init = () => {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }
      rendererRef.current = renderer;

      createAlmondShape();
    };

    const createAlmondShape = () => {
      const curve = new THREE.Shape();
      curve.moveTo(0, 0);
      curve.quadraticCurveTo(1, -2, 2, 0);
      curve.quadraticCurveTo(1, 2, 0, 0);

      const geometry = new THREE.ShapeGeometry(curve);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

      const shape = new THREE.Mesh(geometry, material);
      shapeRef.current = shape;
      sceneRef.current?.add(shape);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (shapeRef.current) {
        //shapeRef.current.rotation.y += 0.005;
        shapeRef.current.rotation.y += 0.00;

        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
      }
    };

    init();
    animate();
  }, []);

  return <div ref={containerRef} />;
};

export default AlmondAnimation;
