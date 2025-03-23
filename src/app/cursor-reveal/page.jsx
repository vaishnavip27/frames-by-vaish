"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [cursorSize, setCursorSize] = useState(40); 
  
  
  const baseCircleRadius = 30; 
  const expandedCircleRadius = 100;
  const circleRadius = cursorSize;

  const revolvingText = "FOLLOW THE CURSOR • FOLLOW THE CURSOR • ";
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const centerText = document.querySelector('.center-text');
      if (centerText) {
        const rect = centerText.getBoundingClientRect();
        const isOverText = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
 
        setCursorSize(isOverText ? expandedCircleRadius : baseCircleRadius);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
 
  useEffect(() => {
    const animateRotation = () => {
      setRotation(prev => (prev + 0.5) % 360);
      requestAnimationFrame(animateRotation);
    };
    
    const animationId = requestAnimationFrame(animateRotation);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">

      <div className="absolute inset-0 flex items-center justify-center">
        <p 
          className="text-yellow-200/40 text-7xl font-bold px-6 py-3 center-text"
          style={{
            textShadow: "0 0 1px rgba(253, 224, 71, 0.7), 0 0 20px rgba(253, 224, 71, 0.5), 0 0 30px rgba(253, 224, 71, 0.3)",
            transition: "transform 0.3s ease"
          }}
        >
          YOU ARE AMAZING
        </p>
      </div>


      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{
          maskImage: `radial-gradient(
            circle ${circleRadius}px at ${position.x}px ${position.y}px, 
            transparent 100%, 
            black 0%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle ${circleRadius}px at ${position.x}px ${position.y}px, 
            transparent 100%, 
            black 0%
          )`,
          transition: "all 0.2s ease-out"
        }}
      ></div>
      

      <div 
        className="absolute pointer-events-none"
        style={{
          width: `${circleRadius * 4.5}px`,
          height: `${circleRadius * 4.5}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,165,0,0) 70%)',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          mixBlendMode: 'lighten',
          transition: "width 0.2s ease-out, height 0.2s ease-out"
        }}
      ></div>
      

      <div 
        className="absolute pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          width: `${circleRadius * 2 + 50}px`, 
          height: `${circleRadius * 2 + 50}px`,
          transition: "width 0.2s ease-out, height 0.2s ease-out"
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          <defs>
            <path
              id="textCirclePath"
              d="M 100, 100 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
              fill="none"
            />
          </defs>
          <text dy="15">
            <textPath 
              xlinkHref="#textCirclePath" 
              fill="rgba(255, 255, 255, 0.3)" 
              startOffset="0"
              method="stretch"
              spacing="auto"
              textLength="628" 
              fontSize="8"
              fontWeight="semi-bold"
              letterSpacing="1"
            >
              {revolvingText.repeat(3)}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Page;