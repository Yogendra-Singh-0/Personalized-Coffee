import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playPop } from '../utils/soundEffects';

/**
 * Creates a rich, high-resolution procedural Crema texture on an offscreen canvas
 * with golden crema gradients, micro-froth bubbles, and latte marbling swirls.
 */
function createCremaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base concentric crema gradient
  const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
  grad.addColorStop(0, '#F5B064');
  grad.addColorStop(0.35, '#E29A4D');
  grad.addColorStop(0.7, '#C87F32');
  grad.addColorStop(0.92, '#9E5B20');
  grad.addColorStop(1, '#5E2B0C');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Crema foam swirls & latte art marbling
  ctx.strokeStyle = 'rgba(255, 240, 215, 0.45)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 120, 0.2, Math.PI * 1.4);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(100, 40, 10, 0.35)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(256, 256, 170, 1.2, Math.PI * 2.1);
  ctx.stroke();

  // Micro froth bubbles
  for (let i = 0; i < 220; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 210;
    const x = 256 + Math.cos(angle) * dist;
    const y = 256 + Math.sin(angle) * dist;
    const r = 1 + Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 235, 205, 0.55)' : 'rgba(80, 30, 8, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates soft gaussian ambient table drop shadow texture with absolute edge falloff
 */
function createShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 6, 128, 128, 116);
  grad.addColorStop(0, 'rgba(40, 16, 6, 0.42)');
  grad.addColorStop(0.32, 'rgba(40, 16, 6, 0.18)');
  grad.addColorStop(0.64, 'rgba(40, 16, 6, 0.05)');
  grad.addColorStop(0.88, 'rgba(40, 16, 6, 0.01)');
  grad.addColorStop(1, 'rgba(40, 16, 6, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates high-res Siolim brand circular badge texture for ceramic mug decal
 * with immediate synchronous 2D vector fallback so there is never a blank delay.
 */
function createBadgeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  function renderVectorLogo(imgElement) {
    ctx.clearRect(0, 0, 512, 512);

    if (imgElement) {
      ctx.drawImage(imgElement, 0, 0, 512, 512);
    } else {
      // Crisp white porcelain circular disc
      ctx.beginPath();
      ctx.arc(256, 256, 246, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#1D3A7A';
      ctx.stroke();

      // Outer capsule
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(172, 60, 168, 234, 84);
      } else {
        ctx.arc(256, 144, 84, Math.PI, 0);
        ctx.lineTo(340, 210);
        ctx.arc(256, 210, 84, 0, Math.PI);
        ctx.closePath();
      }
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = '#1D3A7A';
      ctx.stroke();

      // Inner capsule
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(180, 68, 152, 218, 76);
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1D3A7A';
      ctx.stroke();

      // Center stem line
      ctx.beginPath();
      ctx.moveTo(256, 68);
      ctx.lineTo(256, 290);
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Palm leaf ribs / herringbone
      const ribs = [
        [80, 18], [96, 32], [114, 46], [132, 58], [150, 68],
        [168, 72], [186, 72], [204, 70], [222, 64], [240, 52], [258, 36]
      ];
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1D3A7A';
      ribs.forEach(([y, span]) => {
        ctx.beginPath();
        ctx.moveTo(256, y);
        ctx.lineTo(256 - span, y + 16);
        ctx.moveTo(256, y);
        ctx.lineTo(256 + span, y + 16);
        ctx.stroke();
      });

      // "siolim" brand wordmark
      ctx.fillStyle = '#1D3A7A';
      ctx.font = 'bold 78px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('siolim', 256, 368);

      // "seraphic experiences" tagline
      ctx.font = '600 20px sans-serif';
      ctx.fillText('seraphic experiences', 256, 416);
    }
  }

  // Draw immediately on frame 0
  renderVectorLogo(null);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Now load official Siolim logo image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/siolim-logo.png';
  img.onload = () => {
    renderVectorLogo(img);
    texture.needsUpdate = true;
  };

  return texture;
}

/**
 * Creates curved badge mesh conforming precisely to the mug's outer cylinder wall
 */
function createCurvedBadgeGeometry(width, height, centerY, isBack = false) {
  const geo = new THREE.PlaneGeometry(width, height, 20, 20);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const worldY = y + centerY;

    // Radius of mug lathe wall at this Y
    const mugRadius = 0.81 + ((0.86 - 0.81) / (0.70 - (-0.42))) * (worldY - (-0.42));
    // Position vertex precisely 0.008 units outside mug wall
    const z = Math.sqrt(Math.max(0, mugRadius * mugRadius - x * x)) + 0.008;

    if (isBack) {
      pos.setXYZ(i, -x, y, -z);
    } else {
      pos.setXYZ(i, x, y, z);
    }
  }

  geo.computeVertexNormals();
  return geo;
}

export default function CoffeeDrippingMug({ onMugClick }) {
  const mountRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angles & target rotation:
  // Default: slight forward pitch (0.16) and gentle angle (0.12)
  // so the front Siolim badge and handle are both displayed proudly
  const rotationRef = useRef({ x: 0.16, y: 0.12 });
  const targetRotationRef = useRef({ x: 0.16, y: 0.12 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const hoverFactorRef = useRef(0);
  const lastInteractionTimeRef = useRef(Date.now());

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Generous width and height so the cup is 100% visible with ample margin
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer zoomed to fit complete mug, handle, saucer & dripper with generous margins
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);
    camera.position.set(0, 0.44, 7.2);
    camera.lookAt(0, 0.44, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig (Clean, natural, warm barista ambiance - NO blinding glare!)
    const ambientLight = new THREE.AmbientLight(0xFFF7EC, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    mainLight.position.set(2.8, 4.5, 3.2);
    scene.add(mainLight);

    const warmRimLight = new THREE.DirectionalLight(0xFDBA74, 1.2);
    warmRimLight.position.set(-3.2, 2.5, -2.5);
    scene.add(warmRimLight);

    const bottomBounce = new THREE.PointLight(0xF59E0B, 0.6, 6);
    bottomBounce.position.set(0, -0.8, 1.5);
    scene.add(bottomBounce);

    // 3. Materials
    const mugMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2A170E,             // Rich dark roasted espresso ceramic
      roughness: 0.12,             // Smooth barista porcelain glaze
      metalness: 0.06,
      clearcoat: 1.0,              // High-gloss protective ceramic glaze
      clearcoatRoughness: 0.08,
      ior: 1.52,
      specularIntensity: 0.95,
      specularColor: new THREE.Color(0xFFEADB)
    });

    const saucerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF5EDE2,
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1
    });

    const espressoMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A0904,
      roughness: 0.32,
      metalness: 0.05
    });

    const cremaTexture = createCremaTexture();
    const cremaMaterial = new THREE.MeshStandardMaterial({
      map: cremaTexture,
      roughness: 0.42,
      metalness: 0.02
    });

    const shadowTexture = createShadowTexture();
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });

    const portafilterMaterial = new THREE.MeshStandardMaterial({
      color: 0x7E7268,
      metalness: 0.92,
      roughness: 0.22
    });

    const coffeeDropMaterial = new THREE.MeshStandardMaterial({
      color: 0x361608,
      roughness: 0.18,
      metalness: 0.1
    });

    // 4. MUG MESH ASSEMBLY (Scaled comfortably so handle and saucer never clip)
    const baseMugScale = 0.76;
    const mugAssembly = new THREE.Group();
    mugAssembly.scale.set(baseMugScale, baseMugScale, baseMugScale);
    scene.add(mugAssembly);

    // Lathe Profile for Seamless One-Piece Ceramic Mug (Watertight 3D shape)
    const mugPoints = [];
    mugPoints.push(new THREE.Vector2(0, -0.66));       // Base center
    mugPoints.push(new THREE.Vector2(0.68, -0.66));    // Base flat width
    mugPoints.push(new THREE.Vector2(0.76, -0.62));    // Base rounded corner
    mugPoints.push(new THREE.Vector2(0.81, -0.42));    // Lower wall
    mugPoints.push(new THREE.Vector2(0.86, 0.70));     // Outer top rim lip
    mugPoints.push(new THREE.Vector2(0.84, 0.735));    // Top rim rounded apex
    mugPoints.push(new THREE.Vector2(0.78, 0.735));    // Inner rim rounded apex
    mugPoints.push(new THREE.Vector2(0.77, 0.68));     // Inner wall top
    mugPoints.push(new THREE.Vector2(0.71, -0.45));    // Inner wall bottom
    mugPoints.push(new THREE.Vector2(0.64, -0.52));    // Inner cavity floor
    mugPoints.push(new THREE.Vector2(0, -0.52));       // Inner cavity center

    const mugGeo = new THREE.LatheGeometry(mugPoints, 64);
    const mugMesh = new THREE.Mesh(mugGeo, mugMaterial);
    mugAssembly.add(mugMesh);

    // Ergonomic 3D Handle (Seamless 3D curved tube attached to side)
    const handleCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.82, 0.42, 0),
      new THREE.Vector3(1.52, 0.40, 0),
      new THREE.Vector3(1.48, -0.38, 0),
      new THREE.Vector3(0.74, -0.36, 0)
    );
    const handleGeo = new THREE.TubeGeometry(handleCurve, 40, 0.09, 20, false);
    const handleMesh = new THREE.Mesh(handleGeo, mugMaterial);
    mugAssembly.add(handleMesh);

    // Liquid Body (Espresso column inside cup)
    const liquidGeo = new THREE.CylinderGeometry(0.76, 0.68, 1.15, 64);
    const liquidMesh = new THREE.Mesh(liquidGeo, espressoMaterial);
    liquidMesh.position.y = 0.06;
    mugAssembly.add(liquidMesh);

    // Crema Top Surface
    const cremaGeo = new THREE.CircleGeometry(0.76, 64);
    const cremaMesh = new THREE.Mesh(cremaGeo, cremaMaterial);
    cremaMesh.rotation.x = -Math.PI / 2;
    cremaMesh.position.y = 0.638;
    mugAssembly.add(cremaMesh);

    // Concentric Crema Surface Ripples (Expand on impact)
    const ripples = [];
    for (let i = 0; i < 3; i++) {
      const rippleGeo = new THREE.RingGeometry(0.02, 0.05, 48);
      const rippleMat = new THREE.MeshBasicMaterial({
        color: 0xFFE9CE,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
      rippleMesh.rotation.x = -Math.PI / 2;
      rippleMesh.position.y = 0.641;
      mugAssembly.add(rippleMesh);
      ripples.push({ mesh: rippleMesh, progress: (i * 0.33) });
    }

    // SIOLIM BRAND LOGO BADGES (Curved decals conforming to mug cylinder)
    const badgeTexture = createBadgeTexture();
    const badgeMaterial = new THREE.MeshBasicMaterial({
      map: badgeTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: false
    });

    const badgeWidth = 0.50;
    const badgeHeight = 0.50;
    const badgeCenterY = 0.08;

    // Front badge (facing viewer at rest)
    const frontBadgeGeo = createCurvedBadgeGeometry(badgeWidth, badgeHeight, badgeCenterY, false);
    const frontBadgeMesh = new THREE.Mesh(frontBadgeGeo, badgeMaterial);
    frontBadgeMesh.position.y = badgeCenterY;
    frontBadgeMesh.renderOrder = 10;
    mugAssembly.add(frontBadgeMesh);

    // Back badge (visible when rotated 180 degrees)
    const backBadgeGeo = createCurvedBadgeGeometry(badgeWidth, badgeHeight, badgeCenterY, true);
    const backBadgeMesh = new THREE.Mesh(backBadgeGeo, badgeMaterial);
    backBadgeMesh.position.y = badgeCenterY;
    backBadgeMesh.renderOrder = 10;
    mugAssembly.add(backBadgeMesh);

    // Saucer Profile (Lathe geometry for matching ceramic plate base)
    const saucerPoints = [];
    saucerPoints.push(new THREE.Vector2(0, -0.74));
    saucerPoints.push(new THREE.Vector2(0.55, -0.74));
    saucerPoints.push(new THREE.Vector2(0.68, -0.73));
    saucerPoints.push(new THREE.Vector2(1.15, -0.67));
    saucerPoints.push(new THREE.Vector2(1.20, -0.63));
    saucerPoints.push(new THREE.Vector2(1.16, -0.62));
    saucerPoints.push(new THREE.Vector2(0.72, -0.67));
    saucerPoints.push(new THREE.Vector2(0.38, -0.67));
    saucerPoints.push(new THREE.Vector2(0, -0.67));

    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 64);
    const saucerMesh = new THREE.Mesh(saucerGeo, saucerMaterial);
    mugAssembly.add(saucerMesh);

    // Table Ground Shadow Plane (Stays on table plane, softly fades into background)
    const shadowGeo = new THREE.CircleGeometry(2.0, 48);
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.57;
    scene.add(shadowMesh); // Kept in scene root so it stays grounded!

    // Portafilter Spout Assembly (Hovering overhead with generous clearance)
    const spoutGroup = new THREE.Group();
    spoutGroup.position.set(0, 1.45, 0);

    const spoutCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.12, 32),
      portafilterMaterial
    );
    spoutGroup.add(spoutCollar);

    const spoutCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.34, 0.36, 32),
      portafilterMaterial
    );
    spoutCone.position.y = -0.20;
    spoutCone.rotation.x = Math.PI;
    spoutGroup.add(spoutCone);

    const nozzleTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.05, 0.12, 24),
      portafilterMaterial
    );
    nozzleTip.position.y = -0.42;
    spoutGroup.add(nozzleTip);

    scene.add(spoutGroup);

    // Falling Coffee Droplet
    const dropGeo = new THREE.SphereGeometry(0.055, 16, 16);
    dropGeo.scale(0.85, 1.45, 0.85);
    const dropMesh = new THREE.Mesh(dropGeo, coffeeDropMaterial);
    scene.add(dropMesh);

    // Micro Splash Droplets on Crema Surface
    const splashGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const splashGroup = new THREE.Group();
    splashGroup.position.set(0, 0.64, 0);
    const splashParticles = [
      { mesh: new THREE.Mesh(splashGeo, coffeeDropMaterial), vx: -0.016, vy: 0.045, vz: 0.008 },
      { mesh: new THREE.Mesh(splashGeo, coffeeDropMaterial), vx: 0.018, vy: 0.052, vz: -0.014 },
      { mesh: new THREE.Mesh(splashGeo, coffeeDropMaterial), vx: 0.004, vy: 0.048, vz: 0.018 },
      { mesh: new THREE.Mesh(splashGeo, coffeeDropMaterial), vx: -0.012, vy: 0.038, vz: -0.012 }
    ];
    splashParticles.forEach((sp) => {
      sp.mesh.visible = false;
      splashGroup.add(sp.mesh);
    });
    mugAssembly.add(splashGroup);

    // 5. ANIMATION LOOP
    let dropProgress = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth hover interpolation
      const targetHover = isHoveredRef.current ? 1.0 : 0.0;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.12;
      const h = hoverFactorRef.current;

      // When not dragging, apply inertia and subtle slow showcase autorotate
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += velocityRef.current.y;
        velocityRef.current.y *= 0.92;

        // If untouched for 2.2s, gently autorotate so it's always alive
        if (Date.now() - lastInteractionTimeRef.current > 2200) {
          targetRotationRef.current.y += 0.0032;
        }
      }

      // Smooth rotation spring
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.14;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.14;

      // Apply 3D Rotation to Mug Assembly
      mugAssembly.rotation.x = rotationRef.current.x;
      mugAssembly.rotation.y = rotationRef.current.y;

      // REFINED HOVER EFFECT:
      // Floats forward in Z gently without ever covering the dripper or clipping borders
      const floatBob = Math.sin(elapsedTime * 2.5) * 0.008 * h;
      mugAssembly.position.z = THREE.MathUtils.lerp(0, 0.10, h);
      mugAssembly.position.y = THREE.MathUtils.lerp(0, -0.03, h) + floatBob;
      const currentScale = baseMugScale * THREE.MathUtils.lerp(1.0, 1.025, h);
      mugAssembly.scale.set(currentScale, currentScale, currentScale);

      // GROUND SHADOW DETACHMENT:
      shadowMesh.position.y = -0.57;
      shadowMesh.scale.setScalar(baseMugScale * THREE.MathUtils.lerp(1.0, 0.92, h));
      shadowMaterial.opacity = THREE.MathUtils.lerp(0.48, 0.22, h);

      // Light response
      mainLight.intensity = THREE.MathUtils.lerp(2.2, 2.5, h);

      // DROP-BY-DROP EXTRACTION CYCLE
      dropProgress = (dropProgress + 0.016) % 1.0;
      const dropStartY = 1.03; // Tip of nozzle at y = 1.45 - 0.42 = 1.03

      // Real-time world coordinate tracking of crema center for physical drip landing
      const landingPos = new THREE.Vector3(0, 0.64, 0);
      mugAssembly.localToWorld(landingPos);

      if (dropProgress < 0.84) {
        // Falling phase
        const p = dropProgress / 0.84;
        const fallT = p * p;
        dropMesh.position.x = THREE.MathUtils.lerp(0, landingPos.x, fallT);
        dropMesh.position.y = THREE.MathUtils.lerp(dropStartY, landingPos.y, fallT);
        dropMesh.position.z = THREE.MathUtils.lerp(0, landingPos.z, fallT);
        dropMesh.scale.set(0.85, 1.45, 0.85);
        dropMesh.visible = true;

        splashParticles.forEach((sp) => {
          sp.mesh.visible = false;
        });
      } else {
        // Impact & burst splash phase
        dropMesh.visible = false;
        const impactT = (dropProgress - 0.84) / 0.16; // 0.0 to 1.0

        splashParticles.forEach((sp) => {
          sp.mesh.visible = true;
          const t = impactT * 3.4;
          sp.mesh.position.x = sp.vx * t;
          sp.mesh.position.y = sp.vy * t - 0.5 * 0.18 * t * t;
          sp.mesh.position.z = sp.vz * t;
          const s = Math.max(0, 1 - impactT);
          sp.mesh.scale.set(s, s, s);
        });
      }

      // SURFACE RIPPLES ON CREMA
      ripples.forEach((r) => {
        r.progress = (r.progress + 0.018) % 1.0;
        const scaleVal = 0.1 + r.progress * 4.8;
        r.mesh.scale.set(scaleVal, scaleVal, 1);
        r.mesh.material.opacity = Math.max(0, (1 - r.progress) * 0.75);
      });

      renderer.render(scene, camera);
      return frameId;
    };

    const frameId = requestAnimationFrame(animate);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // POINTER DRAG & 360 ROTATION HANDLERS
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    lastInteractionTimeRef.current = Date.now();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    previousPointerRef.current = { x: clientX, y: clientY };

    if (e.currentTarget?.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // pointer capture fallback
      }
    }
  };

  const handlePointerMove = (e) => {
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

    if (isDraggingRef.current) {
      lastInteractionTimeRef.current = Date.now();
      const deltaX = clientX - previousPointerRef.current.x;
      const deltaY = clientY - previousPointerRef.current.y;

      // Full 360-degree rotation along Y axis with smooth momentum!
      targetRotationRef.current.y += deltaX * 0.015;
      velocityRef.current.y = deltaX * 0.012;

      // Vertical tilt bounded between 0.06 (eye level) and 0.32 (crema view)
      // Keeps mug upright and leaves dripper clearly visible above
      targetRotationRef.current.x = Math.max(
        0.06,
        Math.min(0.32, targetRotationRef.current.x + deltaY * 0.006)
      );

      previousPointerRef.current = { x: clientX, y: clientY };
    } else if (isHoveredRef.current) {
      // Very gentle responsive tilt tracking pointer position
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        const ny = ((clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotationRef.current.x = Math.max(0.12, Math.min(0.24, 0.16 - ny * 0.04));
      }
    }
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      lastInteractionTimeRef.current = Date.now();
    }
    if (e?.currentTarget?.releasePointerCapture && e?.pointerId !== undefined) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // pointer release fallback
      }
    }
  };

  const handleClick = () => {
    playPop();
    if (onMugClick) onMugClick();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none py-1 w-full max-w-[540px] mx-auto overflow-visible"
      title="Click and drag to spin 360°!"
    >
      {/* 3D Canvas Mounting Container with extra width and height so cup is completely visible */}
      <div
        ref={mountRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (!isDraggingRef.current) {
            isHoveredRef.current = false;
            setIsHovered(false);
          }
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsHovered(true);
        }}
        className={`w-full max-w-[520px] h-[430px] sm:h-[470px] flex items-center justify-center relative touch-none transition-all overflow-visible ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* Chic 3D Extraction Pill Badge beneath the mug */}
      <div
        className="mt-1 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2E8] border border-[#ECD9C6] text-[#78350F] text-xs font-semibold tracking-wide shadow-xs transition-all duration-300 card-3d"
        style={{
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 8px 18px -3px rgba(120, 53, 15, 0.16)'
            : '0 2px 4px rgba(120, 53, 15, 0.06)'
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#B45309] animate-ping" />
        <span>Extracting fresh • Drag to spin 360°</span>
      </div>
    </div>
  );
}
