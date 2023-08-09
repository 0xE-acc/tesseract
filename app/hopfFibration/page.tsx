import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HopfFibration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Three.js components
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Create a sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

    // Create a material for the sphere
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    // Create the sphere mesh
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Add the sphere to the scene
    scene.add(sphereMesh);

    // Set camera position
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the sphere
      sphereMesh.rotation.x += 0.01;
      sphereMesh.rotation.y += 0.01;

      // Render the scene with the camera
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    return () => {
      // Clean up Three.js components
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default HopfFibration;
