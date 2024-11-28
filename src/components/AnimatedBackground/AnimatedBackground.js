import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const forestTexture = loader.load("/img/forest_background.png");
    const forest = new THREE.Mesh(
      new THREE.PlaneGeometry(window.innerWidth / 40, window.innerHeight / 40),
      new THREE.MeshBasicMaterial({ map: forestTexture, transparent: true })
    );
    forest.position.set(0, 0, -10);
    scene.add(forest);

    const cloudTextures = [
      "/img/cloud1.png",
      "/img/cloud2.png",
      "/img/cloud3.png",
      "/img/cloud4.png",
      "/img/cloud5.png",
      "/img/cloud6.png",
    ];

    const clouds = [];
    for (let i = 0; i < 5; i++) {
      const randomTexture = cloudTextures[Math.floor(Math.random() * cloudTextures.length)];
      const cloudMaterial = new THREE.MeshBasicMaterial({
        map: loader.load(randomTexture),
        transparent: true,
      });

      const cloud = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 1.5),
        cloudMaterial
      );

      cloud.position.set(
        Math.random() * 30 - 15,
        Math.random() * 5 - 2.5,
        -5
      );

      scene.add(cloud);
      clouds.push(cloud);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      clouds.forEach((cloud) => {
        cloud.position.x -= 0.01;
        if (cloud.position.x < -20) {
          cloud.position.x = 20;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      forest.geometry.dispose();
      forest.geometry = new THREE.PlaneGeometry(window.innerWidth / 40, window.innerHeight / 40);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1, width: "100%", height: "100%" }} />;
};

export default AnimatedBackground;
