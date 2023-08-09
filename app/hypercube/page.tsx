import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hypercube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  let t = 0.0;

  let scene: THREE.Scene;
  let camera: THREE.OrthographicCamera;
  let renderer: THREE.WebGLRenderer;
  let geometry: THREE.BufferGeometry;
  let material: THREE.LineBasicMaterial;
  let edges: THREE.Line[] = [];
  let vertexCoords: THREE.Vector3[] = [];
  let vertexCoords2: THREE.Vector3[] = [];
  let vertexJoins: [number, number][] = [];

  const path = (p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3, p4: THREE.Vector3, i: number): THREE.Vector3 => {
    let vec = new THREE.Vector3(0, 0, 0);

    if (i >= 0 && i < 0.25) {
      vec.x = p4.x + (p1.x - p4.x) * i * 4;
      vec.y = p4.y + (p1.y - p4.y) * i * 4;
      vec.z = p4.z + (p1.z - p4.z) * i * 4;
    } else if (i >= 0.25 && i < 0.5) {
      vec.x = p1.x + (p2.x - p1.x) * (i - 0.25) * 4;
      vec.y = p1.y + (p2.y - p1.y) * (i - 0.25) * 4;
      vec.z = p1.z + (p2.z - p1.z) * (i - 0.25) * 4;
    } else if (i >= 0.5 && i < 0.75) {
      vec.x = p2.x + (p3.x - p2.x) * (i - 0.5) * 4;
      vec.y = p2.y + (p3.y - p2.y) * (i - 0.5) * 4;
      vec.z = p2.z + (p3.z - p2.z) * (i - 0.5) * 4;
    } else if (i >= 0.75 && i < 1.0) {
      vec.x = p3.x + (p4.x - p3.x) * (i - 0.75) * 4;
      vec.y = p3.y + (p4.y - p3.y) * (i - 0.75) * 4;
      vec.z = p3.z + (p4.z - p3.z) * (i - 0.75) * 4;
    }

    return vec;
  };

  const init = () => {
    vertexCoords[0] = new THREE.Vector3(-50, -50, -50);
    vertexCoords[1] = new THREE.Vector3(50, -50, -50);
    vertexCoords[2] = new THREE.Vector3(50, 50, -50);
    vertexCoords[3] = new THREE.Vector3(-50, 50, -50);
    vertexCoords[4] = new THREE.Vector3(-50, -50, 50);
    vertexCoords[5] = new THREE.Vector3(50, -50, 50);
    vertexCoords[6] = new THREE.Vector3(50, 50, 50);
    vertexCoords[7] = new THREE.Vector3(-50, 50, 50);
    vertexCoords[8] = new THREE.Vector3(-100, -100, -100);
    vertexCoords[9] = new THREE.Vector3(100, -100, -100);
    vertexCoords[10] = new THREE.Vector3(100, 100, -100);
    vertexCoords[11] = new THREE.Vector3(-100, 100, -100);
    vertexCoords[12] = new THREE.Vector3(-100, -100, 100);
    vertexCoords[13] = new THREE.Vector3(100, -100, 100);
    vertexCoords[14] = new THREE.Vector3(100, 100, 100);
    vertexCoords[15] = new THREE.Vector3(-100, 100, 100);

    vertexJoins = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 8],
      [1, 9],
      [2, 10],
      [3, 11],
      [4, 12],
      [5, 13],
      [6, 14],
      [7, 15],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 8],
      [8, 12],
      [9, 13],
      [10, 14],
      [11, 15],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 12],
    ];

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
      window.innerWidth / -7,
      window.innerWidth / 7,
      window.innerHeight / 5,
      window.innerHeight / -5,
      1,
      1000
    );
    camera.position.set(200, -100, -300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    for (let i = 0; i < vertexJoins.length; i++) {
      geometry = new THREE.BufferGeometry();
      const positions = [
        vertexCoords[vertexJoins[i][0]].x,
        vertexCoords[vertexJoins[i][0]].y,
        vertexCoords[vertexJoins[i][0]].z,
        vertexCoords[vertexJoins[i][1]].x,
        vertexCoords[vertexJoins[i][1]].y,
        vertexCoords[vertexJoins[i][1]].z,
      ];
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      edges[i] = line;
    }
  };

  const renderScene = () => {
    t = (t + 0.002) % 1;

    vertexCoords2[0] = path(vertexCoords[8], vertexCoords[9], vertexCoords[1], vertexCoords[0], t);
    vertexCoords2[1] = path(vertexCoords[0], vertexCoords[8], vertexCoords[9], vertexCoords[1], t);
    vertexCoords2[9] = path(vertexCoords[1], vertexCoords[0], vertexCoords[8], vertexCoords[9], t);
    vertexCoords2[8] = path(vertexCoords[9], vertexCoords[1], vertexCoords[0], vertexCoords[8], t);

    vertexCoords2[3] = path(vertexCoords[11], vertexCoords[10], vertexCoords[2], vertexCoords[3], t);
    vertexCoords2[2] = path(vertexCoords[3], vertexCoords[11], vertexCoords[10], vertexCoords[2], t);
    vertexCoords2[10] = path(vertexCoords[2], vertexCoords[3], vertexCoords[11], vertexCoords[10], t);
    vertexCoords2[11] = path(vertexCoords[10], vertexCoords[2], vertexCoords[3], vertexCoords[11], t);

    vertexCoords2[4] = path(vertexCoords[12], vertexCoords[13], vertexCoords[5], vertexCoords[4], t);
    vertexCoords2[5] = path(vertexCoords[4], vertexCoords[12], vertexCoords[13], vertexCoords[5], t);
    vertexCoords2[13] = path(vertexCoords[5], vertexCoords[4], vertexCoords[12], vertexCoords[13], t);
    vertexCoords2[12] = path(vertexCoords[13], vertexCoords[5], vertexCoords[4], vertexCoords[12], t);

    vertexCoords2[7] = path(vertexCoords[15], vertexCoords[14], vertexCoords[6], vertexCoords[7], t);
    vertexCoords2[6] = path(vertexCoords[7], vertexCoords[15], vertexCoords[14], vertexCoords[6], t);
    vertexCoords2[14] = path(vertexCoords[6], vertexCoords[7], vertexCoords[15], vertexCoords[14], t);
    vertexCoords2[15] = path(vertexCoords[14], vertexCoords[6], vertexCoords[7], vertexCoords[15], t);

    requestAnimationFrame(renderScene);

    for (let i = 0; i < edges.length; i++) {
      const positions = [
        vertexCoords2[vertexJoins[i][0]].x,
        vertexCoords2[vertexJoins[i][0]].y,
        vertexCoords2[vertexJoins[i][0]].z,
        vertexCoords2[vertexJoins[i][1]].x,
        vertexCoords2[vertexJoins[i][1]].y,
        vertexCoords2[vertexJoins[i][1]].z,
      ];
      edges[i].geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      edges[i].rotation.set(0, 0, 0);
    }

    renderer.render(scene, camera);
  };

  useEffect(() => {
    init();
    renderScene();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} id="hypercube" />;
};

export default Hypercube;
