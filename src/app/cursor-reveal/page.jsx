"use client"

import { useState, useEffect } from 'react';

const Page = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* SVG Background Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/images/group-2.svg" 
          alt="Background SVG"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Black overlay that covers everything except cursor spotlight */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          maskImage: `radial-gradient(
            circle 225.5px at ${position.x}px ${position.y}px, 
            transparent 0%, 
            black 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle 225.5px at ${position.x}px ${position.y}px, 
            transparent 0%, 
            black 100%
          )`,
        }}
      ></div>
    </div>
  );
};

export default Page;