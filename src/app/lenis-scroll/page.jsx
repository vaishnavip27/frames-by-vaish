"use client";

import { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, motion } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";

const images = [
  "image-1.jpg",
  "image-2.jpg",
  "image-3.jpg",
  "image-4.jpg",
  "image-5.jpg",
  "image-6.jpg",
  "image-7.jpg",
  "image-8.jpg",
  "image-9.jpg",
  "image-10.jpg",
  "image-11.jpg",
  "image-12.jpg",
];

export default function Page() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const { height } = dimension;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2.2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 2.8]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3.6]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      {/* Top spacer */}
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-8xl font-black">Parallex Lenis Scroll</div>
      </div>

      {/* Gallery */}
      <div ref={gallery} className="h-[200vh] overflow-hidden bg-white">
        <div className="relative h-[250vh] flex gap-2 p-8">
          <Column
            images={[
              images[0],
              images[1],
              images[2],
              images[3],
              images[4],
              images[5],
            ]}
            y={y1}
            className="-top-[30%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[3],
              images[4],
              images[5],
              images[6],
              images[7],
              images[8],
              images[2],
            ]}
            y={y2}
            className="-top-[70%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[6],
              images[7],
              images[8],
              images[9],
              images[10],
              images[11],
              images[2],
            ]}
            y={y3}
            className="-top-[30%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[9],
              images[10],
              images[11],
              images[0],
              images[1],
              images[2],
            ]}
            y={y4}
            className="-top-[60%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[6],
              images[7],
              images[8],
              images[9],
              images[10],
              images[11],
              images[2],
            ]}
            y={y1}
            className="-top-[30%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[3],
              images[4],
              images[5],
              images[0],
              images[1],
              images[2],
            ]}
            y={y2}
            className="-top-[70%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[0],
              images[1],
              images[2],
              images[9],
              images[10],
              images[11],
              images[2],
            ]}
            y={y3}
            className="-top-[30%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[9],
              images[10],
              images[11],
              images[3],
              images[4],
              images[5],
            ]}
            y={y4}
            className="-top-[60%]"
            isLastColumn={true}
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[3],
              images[4],
              images[5],
              images[9],
              images[10],
              images[11],
              images[2],
            ]}
            y={y1}
            className="-top-[70%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[6],
              images[7],
              images[8],
              images[3],
              images[4],
              images[5],
            ]}
            y={y2}
            className="-top-[30%]"
            opacity={opacity}
            scale={scale}
          />
          <Column
            images={[
              images[3],
              images[4],
              images[5],
              images[9],
              images[10],
              images[11],
              images[2],
            ]}
            y={y3}
            className="-top-[70%]"
            opacity={opacity}
            scale={scale}
            isLastColumn={true}
          />
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-screen bg-white"></div>
    </main>
  );
}

const Column = ({
  images,
  y,
  className,
  opacity,
  scale,
  isLastColumn = false,
}) => {
  return (
    <motion.div
      className={`relative h-full w-1/4 min-w-[110px] flex flex-col whitespace-nowrap ${className}`}
      style={{ y, opacity, scale }}
      initial={{ y: 0 }}
      key={isLastColumn ? "last-column" : undefined}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-[200px] w-full rounded-lg overflow-hidden"
          style={{
            marginTop: i > 0 ? `calc(${i * 10}% + ${i * 0.2}vw)` : 0,
            opacity,
            scale,
          }}
        >
          <Image
            src={`/images/${src}`}
            alt="image"
            fill
            className="object-cover"
            priority={isLastColumn}
          />
        </div>
      ))}
    </motion.div>
  );
};
