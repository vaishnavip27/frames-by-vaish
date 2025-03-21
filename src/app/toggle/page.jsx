"use client"

import React, { useState } from 'react'

const Page = () => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div className="bg-black h-screen text-white flex items-center justify-center">
      <div>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={isToggled} 
              onChange={handleToggle}
            />
            {/* Primary ray pointing to bottom left */}
            <div 
              className={`absolute transition-all duration-700 ${isToggled ? 'opacity-80 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                position: 'absolute',
                top: '180px',
                right: '80px',
                width: '0',
                height: '0',
                borderTop: '40px solid transparent',
                borderRight: '240px solid rgba(150,180,255,0.7)',
                borderBottom: '12px solid transparent',
                transformOrigin: 'right top',
                transform: 'rotate(125deg) translateX(40px)',
                filter: 'blur(8px)',
                zIndex: '5'
              }}
            ></div>
            
            {/* Secondary ray for fuller effect */}
            <div 
              className={`absolute transition-all duration-700 ${isToggled ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                position: 'absolute',
                top: '100px',
                right: '70px',
                width: '0',
                height: '0',
                borderTop: '30px solid transparent',
                borderRight: '160px solid rgba(100,150,255,0.5)',
                borderBottom: '10px solid transparent',
                transformOrigin: 'right top',
                transform: 'rotate(140deg) translateX(35px)',
                filter: 'blur(10px)',
                zIndex: '5'
              }}
            ></div>
            
            {/* Small initial circle that appears when toggled */}
            <div 
              className={`absolute right-1 top-1 h-10 w-10 rounded-full transition-all duration-700 ${isToggled ? 'opacity-60 bg-blue-300' : 'opacity-0 bg-transparent'}`}
              style={{
                filter: 'blur(3px)',
                zIndex: '6'
              }}
            ></div>
            
            <div className={`block w-23 h-12 border border-black rounded-full ${isToggled ? 'bg-[#1C2239]' : 'bg-[#D5D4E2]'} relative overflow-visible`}>
              {/* Circle behind moon icon */}
              <div className={`absolute right-1 top-1 h-10 w-10 rounded-full ${isToggled ? 'bg-[#1C2239]' : 'bg-white'} z-20`}></div>
              
              {/* Moon icon on the right side */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute right-2.5 top-2.5 h-6 w-6 z-30" 
                fill={isToggled ? '#1C2239' : 'none'}
                viewBox="0 0 24 24" 
                stroke={isToggled ? 'white' : 'gray'}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
              
              {/* Stars around the moon - with faster random movement animations */}
              <div 
                className={`absolute right-4 top-0 h-0.5 w-0.5 rounded-full bg-white z-40 transition-opacity duration-500 ${isToggled ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  boxShadow: '0 0 0.5px 0.5px rgba(255, 255, 255, 0.7)',
                  animation: 'starFloat1 1.8s ease-in-out infinite alternate'
                }}
              ></div>
              <div 
                className={`absolute right-8 top-3 h-0.5 w-0.5 rounded-full bg-white z-40 transition-opacity duration-500 ${isToggled ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  boxShadow: '0 0 0.5px 0.5px rgba(255, 255, 255, 0.7)',
                  animation: 'starFloat2 2.2s ease-in-out infinite alternate'
                }}
              ></div>
              <div 
                className={`absolute right-1 top-10 h-0.5 w-0.5 rounded-full bg-white z-40 transition-opacity duration-500 ${isToggled ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  boxShadow: '0 0 0.5px 0.5px rgba(255, 255, 255, 0.7)',
                  animation: 'starFloat3 2.5s ease-in-out infinite alternate'
                }}
              ></div>
              <div 
                className={`absolute right-9 top-9 h-0.5 w-0.5 rounded-full bg-white z-40 transition-opacity duration-500 ${isToggled ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  boxShadow: '0 0 0.5px 0.5px rgba(255, 255, 255, 0.5)',
                  animation: 'starFloat4 2s ease-in-out infinite alternate'
                }}
              ></div>
            </div>
            <div className={`absolute left-1 top-1 w-10 h-10 rounded-full transition-transform z-10 bg-white border-2 border-white ${isToggled ? 'transform translate-x-10' : ''}`}>
            </div>
          </div>
        </label>
      </div>

      {/* Add keyframe animations for the stars */}
      <style jsx>{`
        @keyframes starFloat1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(6px, 6px); }
        }
        @keyframes starFloat2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-6px, 6px); }
        }
        @keyframes starFloat3 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(6px, -6px); }
        }
        @keyframes starFloat4 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-6px, -6px); }
        }
      `}</style>
    </div>
  )
}

export default Page