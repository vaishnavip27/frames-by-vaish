"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  const imgRefs = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".img-item",
        scrub: true,
      },
    });

    tl.to(".img-item", {
      stagger: 0.2,
      y: -700,
      scrub: true,
    });

    return () => {
      lenis.destroy();
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  // Array of 9 different image paths
  const imageUrls = [
    "/images/image-1.jpg",
    "/images/image-2.jpg",
    "/images/image-3.jpg",
    "/images/image-4.jpg",
    "/images/image-5.jpg",
    "/images/image-6.jpg",
    "/images/image-7.jpg",
    "/images/image-8.jpg",
    "/images/image-9.jpg",
  ];

  return (
    <div className="w-full overflow-x-hidden overscroll-none min-h-full bg-black">
      <style jsx global>{`
        body::-webkit-scrollbar {
          display: none;
        }

        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
      `}</style>

      <section className="grid grid-cols-3 h-screen mx-auto">
        <div className="border-r border-slate-50/20"></div>
        <div className="border-r border-slate-50/20"></div>
        <div className="border-r border-slate-50/20"></div>
      </section>

      <section className="grid grid-cols-3 h-[200vh] mx-auto">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="img-item relative w-full h-[700px] bg-cover z-0 before:content-[''] before:absolute before:h-screen before:w-full before:z-10 before:top-0 before:left-0 before:border-r before:border-slate-50/20"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          ></div>
        ))}
      </section>

      <section className="grid grid-cols-3 h-screen mx-auto"></section>
    </div>
  );
};

export default ParallaxGallery;
