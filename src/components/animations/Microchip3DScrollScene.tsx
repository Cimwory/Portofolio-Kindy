import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Microchip3DScrollScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b12, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 4.0, 25);
    cyanPointLight.position.set(4, 5, 4);
    scene.add(cyanPointLight);

    const emeraldPointLight = new THREE.PointLight(0x10b981, 3.0, 20);
    emeraldPointLight.position.set(-4, -3, 3);
    scene.add(emeraldPointLight);

    const blueDirLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    blueDirLight.position.set(0, 8, 6);
    scene.add(blueDirLight);

    // --- Microcontroller Group (ESP32 IC Model) ---
    const chipGroup = new THREE.Group();
    scene.add(chipGroup);

    // 1. PCB Base Substrate
    const pcbGeo = new THREE.BoxGeometry(2.4, 0.12, 3.6);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0a1424,
      metalness: 0.25,
      roughness: 0.6,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    chipGroup.add(pcbMesh);

    // 2. PCB Copper/Gold Traces lines
    const traceGeo = new THREE.BufferGeometry();
    const traceCoords: number[] = [];
    for (let i = -1.0; i <= 1.0; i += 0.25) {
      traceCoords.push(i, 0.07, -1.6, i, 0.07, -1.1);
      traceCoords.push(i, 0.07, 1.1, i, 0.07, 1.6);
    }
    traceGeo.setAttribute('position', new THREE.Float32BufferAttribute(traceCoords, 3));
    const traceMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.65 });
    const traces = new THREE.LineSegments(traceGeo, traceMat);
    chipGroup.add(traces);

    // 3. Meander Inverted-F Antenna on top of PCB
    const antennaGeo = new THREE.BufferGeometry();
    const antennaCoords = [
      -0.8, 0.07, -1.55,  0.8, 0.07, -1.55,
       0.8, 0.07, -1.55,  0.8, 0.07, -1.4,
       0.8, 0.07, -1.4,  -0.5, 0.07, -1.4,
      -0.5, 0.07, -1.4,  -0.5, 0.07, -1.25,
      -0.5, 0.07, -1.25,  0.6, 0.07, -1.25,
    ];
    antennaGeo.setAttribute('position', new THREE.Float32BufferAttribute(antennaCoords, 3));
    const antennaMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
    const antennaLines = new THREE.LineSegments(antennaGeo, antennaMat);
    chipGroup.add(antennaLines);

    // 4. Crystal Oscillator (40 MHz)
    const crystalGeo = new THREE.BoxGeometry(0.35, 0.08, 0.28);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.1,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.position.set(-0.7, 0.09, -0.85);
    chipGroup.add(crystalMesh);

    // 5. Silicon Die & Micro-Cores Group (Elevates during Layer 02 Skills Dissection)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.1, 0.1);
    chipGroup.add(coreGroup);

    const coreGeo = new THREE.BoxGeometry(1.2, 0.08, 1.2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Core 0 (ADC, Modbus, Filters)
    const core0Geo = new THREE.BoxGeometry(0.42, 0.04, 0.85);
    const core0Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const core0Mesh = new THREE.Mesh(core0Geo, core0Mat);
    core0Mesh.position.set(-0.25, 0.05, 0);
    coreGroup.add(core0Mesh);

    // Core 1 (FreeRTOS, MQTT-TLS, Flash)
    const core1Geo = new THREE.BoxGeometry(0.42, 0.04, 0.85);
    const core1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const core1Mesh = new THREE.Mesh(core1Geo, core1Mat);
    core1Mesh.position.set(0.25, 0.05, 0);
    coreGroup.add(core1Mesh);

    // Wire Bonding Threads
    const bondGeo = new THREE.BufferGeometry();
    const bondCoords: number[] = [];
    for (let i = -0.4; i <= 0.4; i += 0.2) {
      bondCoords.push(i, 0.05, -0.6, i * 1.5, -0.04, -0.9);
      bondCoords.push(i, 0.05, 0.6, i * 1.5, -0.04, 0.9);
      bondCoords.push(-0.6, 0.05, i, -0.9, -0.04, i * 1.5);
      bondCoords.push(0.6, 0.05, i, 0.9, -0.04, i * 1.5);
    }
    bondGeo.setAttribute('position', new THREE.Float32BufferAttribute(bondCoords, 3));
    const bondMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 });
    const bondLines = new THREE.LineSegments(bondGeo, bondMat);
    coreGroup.add(bondLines);

    // 6. Metal RF Shield / Heat-spreader (Separates high during Layer 01 Experience Dissection)
    const shieldGroup = new THREE.Group();
    chipGroup.add(shieldGroup);

    const shieldGeo = new THREE.BoxGeometry(1.65, 0.16, 2.05);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.22,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0.16, 0.1);
    shieldGroup.add(shieldMesh);

    // Laser engraved label on metal shield
    const canvasLabel = document.createElement('canvas');
    canvasLabel.width = 512;
    canvasLabel.height = 512;
    const ctxLabel = canvasLabel.getContext('2d')!;
    ctxLabel.fillStyle = '#1e293b';
    ctxLabel.fillRect(0, 0, 512, 512);
    ctxLabel.fillStyle = '#06b6d4';
    ctxLabel.font = 'bold 34px monospace';
    ctxLabel.textAlign = 'center';
    ctxLabel.fillText('ESP32-WROOM-32', 256, 160);
    ctxLabel.fillStyle = '#f8fafc';
    ctxLabel.font = 'bold 26px monospace';
    ctxLabel.fillText('ULINNUHA ALKINDI', 256, 220);
    ctxLabel.fillStyle = '#94a3b8';
    ctxLabel.font = '20px monospace';
    ctxLabel.fillText('DUAL-CORE 240MHz RTOS', 256, 270);
    ctxLabel.fillStyle = '#10b981';
    ctxLabel.font = '20px monospace';
    ctxLabel.fillText('MODBUS / MQTT TELEMETRY', 256, 320);
    ctxLabel.fillStyle = '#38bdf8';
    ctxLabel.font = '16px monospace';
    ctxLabel.fillText('PT PETROKIMIA GRESIK // WWTP', 256, 370);

    const labelTexture = new THREE.CanvasTexture(canvasLabel);
    const labelGeo = new THREE.PlaneGeometry(1.45, 1.85);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.95,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(0, 0.25, 0.1);
    shieldGroup.add(labelMesh);

    // 7. Dual-Row Gold Pins (38 IC Pins)
    const pinGeo = new THREE.BoxGeometry(0.24, 0.06, 0.08);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
    });

    const pinMeshes: THREE.Mesh[] = [];
    const pinCountPerSide = 19;
    const pinSpacing = 3.2 / (pinCountPerSide - 1);
    for (let i = 0; i < pinCountPerSide; i++) {
      const zPos = -1.6 + i * pinSpacing;

      // Left pin
      const leftPin = new THREE.Mesh(pinGeo, pinMat);
      leftPin.position.set(-1.26, -0.01, zPos);
      chipGroup.add(leftPin);
      pinMeshes.push(leftPin);

      // Right pin
      const rightPin = new THREE.Mesh(pinGeo, pinMat);
      rightPin.position.set(1.26, -0.01, zPos);
      chipGroup.add(rightPin);
      pinMeshes.push(rightPin);
    }

    // 8. On-board Micro LEDs
    const ledGeo = new THREE.BoxGeometry(0.1, 0.06, 0.1);
    const ledCyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const ledCyan = new THREE.Mesh(ledGeo, ledCyanMat);
    ledCyan.position.set(-0.9, 0.1, -1.4);
    chipGroup.add(ledCyan);

    const ledEmeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledEmerald = new THREE.Mesh(ledGeo, ledEmeraldMat);
    ledEmerald.position.set(-0.7, 0.1, -1.4);
    chipGroup.add(ledEmerald);

    // --- Orbital Holographic Data Rings ---
    const ring1Geo = new THREE.TorusGeometry(2.8, 0.012, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.4, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(4.0, 0.015, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    scene.add(ring3);

    // Orbiting Data Packet Beacons
    const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packetMesh1 = new THREE.Mesh(packetGeo, packetMat);
    const packetMesh2 = new THREE.Mesh(packetGeo, packetMat);
    scene.add(packetMesh1);
    scene.add(packetMesh2);

    // --- 3D Particle Constellation / Field ---
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Scroll & Mouse State ---
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    // --- Animation Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth interpolation (damping)
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Pulse LED brightness
      ledCyanMat.color.setRGB(
        0.02,
        0.5 + Math.sin(elapsedTime * 6) * 0.4,
        0.7 + Math.sin(elapsedTime * 6) * 0.3
      );
      ledEmeraldMat.color.setRGB(
        0.05,
        0.6 + Math.cos(elapsedTime * 4) * 0.4,
        0.3
      );

      // Continuous rotation of orbital rings
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.y = elapsedTime * -0.2;
      ring3.rotation.x = elapsedTime * 0.15;

      // Orbiting packet position along rings
      const angle1 = elapsedTime * 1.4;
      packetMesh1.position.set(
        Math.cos(angle1) * 2.8,
        Math.sin(angle1) * 2.8 * Math.sin(Math.PI / 3),
        Math.sin(angle1) * 2.8 * Math.cos(Math.PI / 3)
      );

      const angle2 = -elapsedTime * 1.1;
      packetMesh2.position.set(
        Math.cos(angle2) * 3.4 * Math.cos(Math.PI / 4),
        Math.sin(angle2) * 3.4,
        Math.cos(angle2) * 3.4 * Math.sin(Math.PI / 4)
      );

      // Gentle floating drift of particle field
      particles.rotation.y = elapsedTime * 0.02 + scrollProgress * 0.8;
      particles.rotation.x = elapsedTime * 0.01 + scrollProgress * 0.4;

      // ========================================================
      // 7-STAGE HARDWARE DISSECTION TIMELINE:
      // Synchronized with Kindy's Portfolio Dissection Experience
      // ========================================================
      const keyframes = [
        {
          progress: 0.0, // Stage 0: Surface Casing / Hero Identity (assembled chip on right)
          posX: 1.85,
          posY: 0.15,
          posZ: -0.2,
          rotX: 0.38,
          rotY: -0.45,
          rotZ: 0.08,
          shieldLift: 0.0,
          coreLift: 0.0,
          coreGlow: 0.35,
        },
        {
          progress: 0.22, // Stage 1: Layer 01 - Lifted RF Shield / Work Experience (shield separates high!)
          posX: -0.55,
          posY: -0.1,
          posZ: 0.35,
          rotX: 0.65,
          rotY: 0.45,
          rotZ: 0.12,
          shieldLift: 1.45,
          coreLift: 0.05,
          coreGlow: 0.9,
        },
        {
          progress: 0.37, // Stage 2: Layer 02 - Exposed Silicon Die / Technical Skills (die elevates & glows!)
          posX: 1.65,
          posY: -0.05,
          posZ: 0.15,
          rotX: 0.78,
          rotY: -0.35,
          rotZ: 0.05,
          shieldLift: 1.25,
          coreLift: 0.35,
          coreGlow: 1.85,
        },
        {
          progress: 0.53, // Stage 3: Layer 03 - Pin Matrix / 4 Engineering Projects (isometric pin focus)
          posX: -0.6,
          posY: -0.15,
          posZ: 0.5,
          rotX: 1.22,
          rotY: 0.4,
          rotZ: 0.25,
          shieldLift: 0.4,
          coreLift: 0.1,
          coreGlow: 0.7,
        },
        {
          progress: 0.70, // Stage 4: Layer 04 - Real-time Bus / Telemetry SCADA Cockpit (centered behind HUD)
          posX: 0.0,
          posY: 0.25,
          posZ: -1.0,
          rotX: 0.42,
          rotY: 0.02,
          rotZ: 0.0,
          shieldLift: 0.0,
          coreLift: 0.0,
          coreGlow: 0.9,
        },
        {
          progress: 0.84, // Stage 5: Layer 05 - PCB Substrate / Formal Education & Stats (exposing board)
          posX: 1.7,
          posY: 0.1,
          posZ: -0.3,
          rotX: 0.9,
          rotY: -0.7,
          rotZ: 0.15,
          shieldLift: 0.0,
          coreLift: 0.0,
          coreGlow: 0.5,
        },
        {
          progress: 1.0, // Stage 6: Layer 06 - Top-down Blueprint / Contact & Link Network
          posX: 0.0,
          posY: 0.9,
          posZ: -0.7,
          rotX: 1.42,
          rotY: 0.0,
          rotZ: 0.0,
          shieldLift: 0.0,
          coreLift: 0.0,
          coreGlow: 0.95,
        },
      ];

      // Find segment
      let kIndex = 0;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (scrollProgress >= keyframes[i].progress && scrollProgress <= keyframes[i + 1].progress) {
          kIndex = i;
          break;
        }
        if (scrollProgress > keyframes[i + 1].progress) {
          kIndex = i + 1;
        }
      }
      kIndex = Math.min(keyframes.length - 2, Math.max(0, kIndex));

      const k1 = keyframes[kIndex];
      const k2 = keyframes[kIndex + 1];
      const span = k2.progress - k1.progress;
      const rawT = span > 0 ? Math.min(1, Math.max(0, (scrollProgress - k1.progress) / span)) : 0;
      const t = rawT * rawT * (3 - 2 * rawT); // Smoothstep curve

      // Responsive X offset factor
      const screenWidth = window.innerWidth;
      const responsiveX = screenWidth < 640 ? 0.25 : screenWidth < 1024 ? 0.6 : 1.0;

      const basePosX = (k1.posX + (k2.posX - k1.posX) * t) * responsiveX;
      const basePosY = k1.posY + (k2.posY - k1.posY) * t;
      const basePosZ = k1.posZ + (k2.posZ - k1.posZ) * t;

      let baseRotX = k1.rotX + (k2.rotX - k1.rotX) * t;
      let baseRotY = k1.rotY + (k2.rotY - k1.rotY) * t;
      let baseRotZ = k1.rotZ + (k2.rotZ - k1.rotZ) * t;

      const shieldLift = k1.shieldLift + (k2.shieldLift - k1.shieldLift) * t;
      const coreLift = k1.coreLift + (k2.coreLift - k1.coreLift) * t;
      const coreGlow = k1.coreGlow + (k2.coreGlow - k1.coreGlow) * t;

      // Add dynamic hover, mouse tilt, and stage-specific rotation
      const hoverY = Math.sin(elapsedTime * 1.5) * 0.06;
      chipGroup.position.x = basePosX + mouseX * 0.25;
      chipGroup.position.y = basePosY + hoverY - mouseY * 0.25;
      chipGroup.position.z = basePosZ;

      // Gentle spin adjustments
      if (scrollProgress < 0.15) {
        baseRotY += elapsedTime * 0.08;
      }

      chipGroup.rotation.x = baseRotX + mouseY * 0.18;
      chipGroup.rotation.y = baseRotY + mouseX * 0.18;
      chipGroup.rotation.z = baseRotZ;

      // Dissected Layer Translations:
      shieldGroup.position.y = shieldLift;
      coreGroup.position.y = 0.1 + coreLift;

      // Silicon core emissive pulse
      coreMat.emissiveIntensity =
        coreGlow + (shieldLift > 0.5 ? Math.sin(elapsedTime * 6) * 0.35 : Math.sin(elapsedTime * 2) * 0.1);

      // Pins light pulse (running lights during pin dissection)
      if (scrollProgress >= 0.45 && scrollProgress <= 0.62) {
        pinMeshes.forEach((pin, idx) => {
          const wave = Math.sin(elapsedTime * 8 - idx * 0.3);
          pin.scale.y = 1 + Math.max(0, wave) * 0.6;
        });
      }

      // Orbital rings follow chip position smoothly
      ring1.position.copy(chipGroup.position);
      ring2.position.copy(chipGroup.position);
      ring3.position.copy(chipGroup.position);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      try {
        if (canvas.parentNode === container) {
          container.removeChild(canvas);
        }
      } catch {}

      // Dispose Three.js objects
      pcbGeo.dispose();
      pcbMat.dispose();
      traceGeo.dispose();
      traceMat.dispose();
      antennaGeo.dispose();
      antennaMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      core0Geo.dispose();
      core0Mat.dispose();
      core1Geo.dispose();
      core1Mat.dispose();
      bondGeo.dispose();
      bondMat.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      ledGeo.dispose();
      ledCyanMat.dispose();
      ledEmeraldMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      labelTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default Microchip3DScrollScene;
