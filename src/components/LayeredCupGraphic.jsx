import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Creates dynamic drink surface texture (crema, latte art, spices, ice)
 * customized to the specific recipe ingredients.
 */
function createDrinkSurfaceTexture(ingredients, isIced) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const base = ingredients?.base;
  const milk = ingredients?.milk;
  const flavour = ingredients?.flavour;
  const topping = ingredients?.topping;

  const hasMilk = milk && milk.id !== 'no_milk_water';
  const baseColor = base?.visualColor || '#2A1208';
  const milkColor = hasMilk ? (milk?.visualColor || '#F5EDE0') : null;
  const toppingColor = topping?.visualColor || '#B85D32';

  // Base background fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  if (hasMilk) {
    // Rich blended latte microfoam surface
    const foamGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
    foamGrad.addColorStop(0, milkColor || '#FAF3EA');
    foamGrad.addColorStop(0.68, '#F0E2D0');
    foamGrad.addColorStop(0.88, '#C9935E');
    foamGrad.addColorStop(1, '#8A481C');
    ctx.fillStyle = foamGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Golden espresso crema marbling border
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#B45E1B';
    ctx.stroke();

    // Barista Rosetta / Heart Latte Art
    ctx.save();
    ctx.translate(256, 256);

    // Warm caramel-espresso heart silhouette
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.bezierCurveTo(-65, -30, -95, -95, 0, -150);
    ctx.bezierCurveTo(95, -95, 65, -30, 0, 50);
    ctx.fillStyle = '#A3531F';
    ctx.fill();

    // Inner foam heart
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.bezierCurveTo(-48, -22, -72, -75, 0, -125);
    ctx.bezierCurveTo(72, -75, 48, -22, 0, 36);
    ctx.fillStyle = '#FFFDF7';
    ctx.fill();

    // Center stem line
    ctx.beginPath();
    ctx.moveTo(0, -165);
    ctx.lineTo(0, 80);
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = '#A3531F';
    ctx.stroke();

    // Lateral micro-petals
    const petals = [-100, -70, -40, -10];
    petals.forEach((y, idx) => {
      ctx.beginPath();
      const spread = 36 - idx * 6;
      ctx.ellipse(-spread, y, 14, 7, -0.4, 0, Math.PI * 2);
      ctx.ellipse(spread, y, 14, 7, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF7';
      ctx.fill();
    });

    ctx.restore();
  } else {
    // Pure espresso / Americano golden-hazelnut crema marbling
    const espressoGrad = ctx.createRadialGradient(256, 256, 30, 256, 256, 250);
    espressoGrad.addColorStop(0, '#783A14');
    espressoGrad.addColorStop(0.45, '#A35A22');
    espressoGrad.addColorStop(0.75, '#54260D');
    espressoGrad.addColorStop(1, '#2E1105');
    ctx.fillStyle = espressoGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Golden hazelnut crema marbling streaks
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(217, 138, 48, 0.45)';
    ctx.beginPath();
    ctx.arc(256, 256, 175, 0.3, 2.2);
    ctx.stroke();

    ctx.lineWidth = 9;
    ctx.strokeStyle = 'rgba(235, 168, 85, 0.55)';
    ctx.beginPath();
    ctx.arc(256, 256, 110, 2.5, 4.8);
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(217, 138, 48, 0.4)';
    ctx.beginPath();
    ctx.arc(256, 256, 60, 4.2, 7.0);
    ctx.stroke();
  }

  // Flavour Swirl Tint (if syrup/flavour present)
  if (flavour && flavour.id !== 'none') {
    ctx.save();
    ctx.beginPath();
    ctx.arc(256, 256, 160, 0.8, 3.4);
    ctx.lineWidth = 14;
    ctx.strokeStyle = flavour.visualColor || 'rgba(180, 83, 9, 0.35)';
    ctx.stroke();
    ctx.restore();
  }

  // Topping sprinkles (e.g. cinnamon, cocoa powder, spice dusting)
  if (topping && topping.id !== 'none') {
    ctx.fillStyle = toppingColor;
    const spiceDots = [
      [220, 210, 3.2], [280, 225, 2.8], [240, 270, 3.5], [290, 280, 2.4],
      [190, 250, 2.6], [320, 240, 3.0], [256, 185, 2.8], [265, 320, 2.5],
      [175, 290, 2.0], [335, 295, 2.2], [215, 325, 2.0], [305, 195, 2.4]
    ];
    spiceDots.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Iced Coffee Frost Crystalline Cubes
  if (isIced) {
    ctx.save();
    const iceCubes = [
      { x: 195, y: 220, w: 70, h: 64, rot: 0.15 },
      { x: 285, y: 260, w: 65, h: 60, rot: -0.22 },
      { x: 225, y: 310, w: 60, h: 56, rot: 0.32 }
    ];
    iceCubes.forEach((cube) => {
      ctx.save();
      ctx.translate(cube.x, cube.y);
      ctx.rotate(cube.rot);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2.5;
      if (ctx.roundRect) {
        ctx.roundRect(-cube.w / 2, -cube.h / 2, cube.w, cube.h, 10);
      } else {
        ctx.rect(-cube.w / 2, -cube.h / 2, cube.w, cube.h);
      }
      ctx.fill();
      ctx.stroke();

      // Top specular glint
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fillRect(-cube.w / 2 + 6, -cube.h / 2 + 6, cube.w - 12, 10);
      ctx.restore();
    });
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates soft circular ambient table drop shadow texture
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
 * Creates high-res Siolim brand circular badge texture with immediate fallback
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

  renderVectorLogo(null);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

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
 * Generates curved decal mesh geometry conforming to mug's tapered outer wall
 */
function createCurvedBadgeGeometry(width, height, centerY, isBack = false) {
  const segmentsX = 24;
  const segmentsY = 24;
  const geo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const localY = pos.getY(i);
    const worldY = centerY + localY;

    const t = (worldY - (-0.42)) / (0.70 - (-0.42));
    const mugRadius = 0.81 + t * (0.86 - 0.81);
    const offsetRadius = mugRadius + 0.008;

    const safeX = Math.max(-offsetRadius * 0.98, Math.min(offsetRadius * 0.98, x));
    const zBase = Math.sqrt(Math.max(0, offsetRadius * offsetRadius - safeX * safeX));
    const z = isBack ? -zBase : zBase;

    pos.setXYZ(i, x, localY, z);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * 3D Ceramic Coffee Cup (matching landing page cup style with custom drink surface,
 * porcelain glaze, Siolim logo, ceramic saucer, and gentle interactive parallax tilt —
 * WITHOUT 360-degree rotation dragging).
 */
export default function LayeredCupGraphic({ ingredients, isIced = false, size = 'default' }) {
  const mountRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fixed photogenic presentation angle:
  // Slight forward pitch (0.22) so you can look into the latte art / crema surface,
  // and subtle yaw (0.20) showing both the front Siolim badge and handle loop.
  const baseRotationX = 0.22;
  const baseRotationY = 0.20;
  const rotationRef = useRef({ x: baseRotationX, y: baseRotationY });
  const targetRotationRef = useRef({ x: baseRotationX, y: baseRotationY });
  const hoverFactorRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 340;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50);
    camera.position.set(0, 0.38, 5.4);
    camera.lookAt(0, 0.02, 0);

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

    // 2. Lighting Rig (Warm barista showcase ambiance)
    const ambientLight = new THREE.AmbientLight(0xFFF7EC, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    mainLight.position.set(2.8, 4.5, 3.2);
    scene.add(mainLight);

    const warmRimLight = new THREE.DirectionalLight(0xFDBA74, 1.2);
    warmRimLight.position.set(-3.2, 2.5, -2.5);
    scene.add(warmRimLight);

    const bottomBounce = new THREE.PointLight(0xF59E0B, 0.5, 6);
    bottomBounce.position.set(0, -0.8, 1.5);
    scene.add(bottomBounce);

    // 3. Materials
    const mugMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2A170E,             // Dark roasted espresso ceramic
      roughness: 0.12,             // Smooth porcelain glaze
      metalness: 0.06,
      clearcoat: 1.0,              // High-gloss ceramic glaze
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

    // Custom drink crema & latte art surface
    const surfaceTexture = createDrinkSurfaceTexture(ingredients, isIced);
    const cremaMaterial = new THREE.MeshStandardMaterial({
      map: surfaceTexture,
      roughness: 0.38,
      metalness: 0.02
    });

    const shadowTexture = createShadowTexture();
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.48,
      depthWrite: false
    });

    // 4. MUG MESH ASSEMBLY
    const baseMugScale = size === 'large' ? 0.84 : size === 'compact' ? 0.74 : 0.80;
    const mugAssembly = new THREE.Group();
    mugAssembly.scale.set(baseMugScale, baseMugScale, baseMugScale);
    scene.add(mugAssembly);

    // Lathe Profile for Ceramic Mug
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

    // Ergonomic 3D Handle
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

    // Crema / Latte Art Top Surface
    const cremaGeo = new THREE.CircleGeometry(0.76, 64);
    const cremaMesh = new THREE.Mesh(cremaGeo, cremaMaterial);
    cremaMesh.rotation.x = -Math.PI / 2;
    cremaMesh.position.y = 0.638;
    mugAssembly.add(cremaMesh);

    // Subtle Surface Ripple
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

    // SIOLIM BRAND LOGO BADGE (Curved decal on front)
    const badgeTexture = createBadgeTexture();
    const badgeMaterial = new THREE.MeshBasicMaterial({
      map: badgeTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: false
    });
    const frontBadgeGeo = createCurvedBadgeGeometry(0.50, 0.50, 0.08, false);
    const frontBadgeMesh = new THREE.Mesh(frontBadgeGeo, badgeMaterial);
    frontBadgeMesh.position.y = 0.08;
    frontBadgeMesh.renderOrder = 10;
    mugAssembly.add(frontBadgeMesh);

    // Saucer Profile (Matching ceramic plate base)
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
    scene.add(shadowMesh);

    // 5. ANIMATION LOOP
    let clock = new THREE.Clock();
    let rippleProgress = 0;

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth hover interpolation
      const targetHover = isHoveredRef.current ? 1.0 : 0.0;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.12;
      const h = hoverFactorRef.current;

      // Subtle gentle breathing float
      const idleBob = Math.sin(elapsedTime * 1.8) * 0.006;
      const idlePitch = Math.cos(elapsedTime * 1.2) * 0.008;

      // Smooth spring towards target rotation (subtle mouse parallax only, NO 360 drag!)
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.12;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.12;

      mugAssembly.rotation.x = rotationRef.current.x + idlePitch;
      mugAssembly.rotation.y = rotationRef.current.y;

      // Gentle hover lift & scale
      mugAssembly.position.y = THREE.MathUtils.lerp(0, 0.03, h) + idleBob;
      mugAssembly.position.z = THREE.MathUtils.lerp(0, 0.06, h);
      const currentScale = baseMugScale * THREE.MathUtils.lerp(1.0, 1.025, h);
      mugAssembly.scale.set(currentScale, currentScale, currentScale);

      // Shadow response
      shadowMesh.position.y = -0.57;
      shadowMesh.scale.setScalar(baseMugScale * THREE.MathUtils.lerp(1.0, 0.94, h));
      shadowMaterial.opacity = THREE.MathUtils.lerp(0.48, 0.24, h);

      // Light response
      mainLight.intensity = THREE.MathUtils.lerp(2.2, 2.5, h);

      // Crema gentle ripple
      rippleProgress = (rippleProgress + 0.012) % 1.0;
      const scaleVal = 0.1 + rippleProgress * 4.2;
      rippleMesh.scale.set(scaleVal, scaleVal, 1);
      rippleMesh.material.opacity = Math.max(0, (1 - rippleProgress) * 0.45);

      renderer.render(scene, camera);
      return frameId;
    };

    const frameId = requestAnimationFrame(animate);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 340;
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
  }, [ingredients, isIced, size]);

  // Gentle Mouse Parallax Tilt (NO 360 rotation drag!)
  const handlePointerMove = (e) => {
    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX ?? 0;
    const clientY = e.clientY ?? 0;
    const nx = ((clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

    // Subtle parallax tilt within comfortable presentation bounds
    targetRotationRef.current.x = baseRotationX - ny * 0.04;
    targetRotationRef.current.y = baseRotationY + nx * 0.06;
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    targetRotationRef.current.x = baseRotationX;
    targetRotationRef.current.y = baseRotationY;
  };

  const handlePointerEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const base = ingredients?.base;
  const milk = ingredients?.milk;
  const topping = ingredients?.topping;
  const hasMilk = milk && milk.id !== 'no_milk_water';

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-1 w-full overflow-visible">
      {/* Hot Barista Steam Wisps */}
      {!isIced && (
        <div className="flex items-center justify-center gap-4 h-6 -mb-2 overflow-visible pointer-events-none">
          <div className="w-1.5 h-6 bg-gradient-to-t from-[#B45309]/25 to-transparent rounded-full animate-steam"></div>
          <div className="w-2 h-7 bg-gradient-to-t from-[#B45309]/30 to-transparent rounded-full animate-steam-delayed"></div>
          <div className="w-1.5 h-5 bg-gradient-to-t from-[#B45309]/20 to-transparent rounded-full animate-steam"></div>
        </div>
      )}

      {/* Iced Indicator Badge */}
      {isIced && (
        <div className="h-6 flex items-center justify-center -mb-2 pointer-events-none">
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100/90 text-blue-900 font-semibold tracking-wide border border-blue-200 shadow-2xs">
            🧊 Chilled over ice
          </span>
        </div>
      )}

      {/* 3D Canvas Mounting Container (Fixed Showcase Angle, NO 360 Drag) */}
      <div
        ref={mountRef}
        onPointerMove={handlePointerMove}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        className={`w-full ${
          size === 'large'
            ? 'max-w-[380px] h-[330px] sm:h-[360px]'
            : size === 'compact'
            ? 'max-w-[240px] h-[220px]'
            : 'max-w-[320px] h-[300px]'
        } flex items-center justify-center relative touch-none transition-all overflow-visible cursor-default`}
      />

      {/* Clean Ingredient Chips below the 3D Mug */}
      <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 max-w-xs text-[11px] font-medium text-[#78350F]">
        {topping && topping.id !== 'none' && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] shadow-2xs">
            ✨ {topping.name}
          </span>
        )}
        {hasMilk && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#F3EBD8] border border-[#E5D7BE] text-[#78350F] shadow-2xs">
            🥛 {milk.name}
          </span>
        )}
        {base && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#EFE3D3] border border-[#D8C2AA] text-[#451A03] shadow-2xs">
            ☕ {base.name}
          </span>
        )}
      </div>
    </div>
  );
}
