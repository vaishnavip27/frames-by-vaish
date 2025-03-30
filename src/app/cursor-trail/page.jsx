"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

const Page = () => {
  const cursorRef = useRef({ x: 0, y: 0 });
  const [trailImages, setTrailImages] = useState([]);
  const trailIndex = useRef(0);
  const intervalRef = useRef(null);
  const isCursorMoving = useRef(false);
  const hasMoved = useRef(false); // Track first movement

  const trailConfig = {
    imageWidth: 190,
    imageHeight: 240,
    images: [
      "/images/image-2.jpg",
      "/images/image-7.jpg",
      "/images/image-5.jpg",
      "/images/image-9.jpg",
      "/images/image-10.jpg",
    ],
    delay: 100,
    maxTrailLength: 10,
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
    const handleMouseMove = (e) => {
      if (!hasMoved.current) {
        hasMoved.current = true; // Mark that the cursor has moved
      }

      cursorRef.current = { x: e.clientX, y: e.clientY };
      isCursorMoving.current = true;

      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          if (!isCursorMoving.current) return;

          setTrailImages((prev) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 3;
            const velocity = {
              x: Math.cos(angle) * speed,
              y: Math.sin(angle) * speed,
            };

            const newTrail = [
              ...prev,
              {
                id: Date.now(),
                x: cursorRef.current.x,
                y: cursorRef.current.y,
                vx: velocity.x,
                vy: velocity.y,
                src: trailConfig.images[
                  trailIndex.current % trailConfig.images.length
                ],
              },
            ];
            trailIndex.current++;

            return newTrail.length > trailConfig.maxTrailLength
              ? newTrail.slice(-trailConfig.maxTrailLength)
              : newTrail;
          });
        }, trailConfig.delay);
      }
    };

    const handleMouseStop = () => {
      isCursorMoving.current = false;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseStop);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseStop);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    trailImages.forEach((img, index) => {
      gsap.to(`#img-${img.id}`, {
        x: `+=${img.vx * 10}`,
        y: `+=${img.vy * 10}`,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out",
      });
    });
  }, [trailImages]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#f5f5f5"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tl from-black/100 via-black/90 to-black/80 z-10"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <h1 className="text-7xl font-black tracking-tighter text-white/20">
          MOVE YOUR CURSOR AROUND!
        </h1>
      </div>
      {/* Image Trail */}
      {hasMoved.current && // Show images only after cursor moves
        trailImages.map((img) => (
          <img
            key={img.id}
            id={`img-${img.id}`}
            src={img.src}
            className="absolute pointer-events-none z-30 object-cover"
            style={{
              width: `${trailConfig.imageWidth}px`,
              height: `${trailConfig.imageHeight}px`,
              transform: "translate(-50%, -50%)",
              opacity: 1,
              position: "absolute",
              top: img.y,
              left: img.x,
            }}
          />
        ))}
    </div>
  );
};

export default Page;
