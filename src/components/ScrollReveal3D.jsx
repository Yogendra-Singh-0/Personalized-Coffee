import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal3D:
 * Wraps any content with a hardware-accelerated 3D scroll reveal animation
 * triggered via IntersectionObserver when scrolled into viewport.
 */
export function ScrollReveal3D({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'pop' | 'flip'
  delay = 0, // delay in ms
  duration = 700, // duration in ms
  className = '',
  distance = 35, // translation distance in px
  threshold = 0.12,
  style = {}
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver, show immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Compute 3D initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `perspective(1000px) rotateX(14deg) translateY(${distance}px) scale(0.96)`;
      case 'down':
        return `perspective(1000px) rotateX(-14deg) translateY(-${distance}px) scale(0.96)`;
      case 'left':
        return `perspective(1000px) rotateY(-16deg) translateX(-${distance}px) scale(0.96)`;
      case 'right':
        return `perspective(1000px) rotateY(16deg) translateX(${distance}px) scale(0.96)`;
      case 'pop':
        return `perspective(800px) translateZ(-60px) scale(0.85)`;
      case 'flip':
        return `perspective(1200px) rotateX(25deg) translateY(${distance}px) scale(0.92)`;
      default:
        return `perspective(1000px) translateY(${distance}px)`;
    }
  };

  const transformStyle = isVisible
    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)'
    : getInitialTransform();

  return (
    <div
      ref={ref}
      className={`transform-gpu ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transformStyle,
        filter: isVisible ? 'blur(0px)' : 'blur(3px)',
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter ${duration}ms ease-out ${delay}ms`,
        willChange: 'transform, opacity, filter',
        ...style
      }}
    >
      {children}
    </div>
  );
}

/**
 * Tilt3D:
 * Interactive 3D Card / Component wrapper that tilts dynamically toward
 * mouse cursor / touch on hover with realistic lighting gloss reflection.
 */
export function Tilt3D({
  children,
  className = '',
  maxTilt = 8, // max degrees
  scale = 1.02,
  glare = true,
  onClick
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-transform duration-200 ease-out select-none ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}

      {/* Dynamic Glass Specular Glare Reflection */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`,
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
}
