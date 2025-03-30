"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

const Page = () => {
  const cursorRef = useRef({ x: 0, y: 0 });
  const trailRefs = useRef([]);
  const cursorHistoryRef = useRef([]);
  const [isCursorActive, setIsCursorActive] = useState(false);

  const trailConfig = {
    trailLength: 8,
    imageSize: 200,
    images: [
      "/images/image-1.jpg",
      "/images/image-2.jpg",
      "/images/image-8.jpg",
      "/images/image-9.jpg",
      "/images/image-10.jpg",
    ],
    spacing: 5,
  };

  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.1 });
    const scrollHandler = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollHandler);
    };
    requestAnimationFrame(scrollHandler);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    let timeoutId;
    cursorHistoryRef.current = Array(trailConfig.trailLength * trailConfig.spacing).fill({ x: 0, y: 0 });

    const updateTrailPositions = () => {
      trailRefs.current.forEach((element, index) => {
        if (!element) return;
        const historyIndex = Math.min(index * trailConfig.spacing, cursorHistoryRef.current.length - 1);
        const targetPos = cursorHistoryRef.current[historyIndex];

        gsap.to(element, {
          x: targetPos.x,
          y: targetPos.y,
          opacity: isCursorActive ? 1 : 0,
          scale: isCursorActive ? 1 : 0.5,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      if (!isCursorActive) setIsCursorActive(true);
      cursorRef.current = { x: e.clientX, y: e.clientY };
      cursorHistoryRef.current.unshift({ x: e.clientX, y: e.clientY });
      cursorHistoryRef.current.pop();
      updateTrailPositions();

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsCursorActive(false), 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isCursorActive]);

  const createTrailImages = () => {
    return Array.from({ length: trailConfig.trailLength }).map((_, index) => {
      const imageIndex = index % trailConfig.images.length;
      return (
        <img
          key={index}
          ref={(el) => (trailRefs.current[index] = el)}
          src={trailConfig.images[imageIndex]}
          className="absolute pointer-events-none z-30 rounded-md object-cover"
          style={{
            width: `${trailConfig.imageSize}px`,
            height: `${trailConfig.imageSize}px`,
            transform: "translate(-50%, -50%) scale(0.5)",
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      );
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f5f5f5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tl from-black/90 via-black/80 to-black/50 z-10"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <h1 className="text-7xl font-black text-white/20">MOVE YOUR CURSOR AROUND!</h1>
      </div>
      {createTrailImages()}
    </div>
  );
};

export default Page;