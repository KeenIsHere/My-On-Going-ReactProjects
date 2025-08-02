import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Add these imports at the top
import { useGLTF } from '@react-three/drei';

// Replace the loader.load section with:
const { scene: glassesModel } = useGLTF('/glasses-model.glb');
useEffect(() => {
  if (glassesModel) {
    const glasses = glassesModel.clone();
    glasses.scale.set(0.1, 0.1, 0.1);
    scene.add(glasses);
    sceneRef.current.glasses = glasses;
  }
}, [glassesModel]);

const Glasses3D = ({ face }) => {
  const mountRef = useRef();
  const sceneRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    glasses: null
  });

  useEffect(() => {
    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 3);
    scene.add(directionalLight);

    // Load glasses model
    const loader = new GLTFLoader();
    loader.load(
      '/glasses.glb', // Replace with your model path
      (gltf) => {
        const glasses = gltf.scene;
        glasses.scale.set(0.1, 0.1, 0.1);
        scene.add(glasses);
        sceneRef.current.glasses = glasses;
      },
      undefined,
      (error) => console.error('GLTF loading error:', error)
    );

    sceneRef.current = { scene, camera, renderer };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!face || !sceneRef.current.glasses) return;

    // Smooth transitions using lerp
    const glasses = sceneRef.current.glasses;
    const targetPosition = new THREE.Vector3(
      face.noseTip[0] * 0.01,
      -face.noseTip[1] * 0.01,
      -0.5
    );
    
    glasses.position.lerp(targetPosition, 0.2);
    glasses.rotation.z = THREE.MathUtils.lerp(
      glasses.rotation.z,
      face.rotationAngle || 0,
      0.1
    );
  }, [face]);

  return <div ref={mountRef} className="glasses-overlay" />;
};

export default Glasses3D;