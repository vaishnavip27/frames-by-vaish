import Link from "next/link";
import { ArrowRight, Edit3 } from "lucide-react";

export default function Home() {
  const components = [
    {
      title: "Parallex scroll Slider",
      path: "/lenis-scroll",
    },
    {
      title: "Cursor reveal effect",
      path: "/cursor-reveal",
    },
    {
      title: "Modern gallery",
      path: "/modern-gallery",
    },
    {
      title: "Cursor Image trail",
      path: "/cursor-trail",
    },
    {
      title: "Cursor Image trail",
      path: "/experiment",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white relative">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
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

      <div className="absolute inset-0 bg-gradient-to-tl from-black/90 via-black/70 to-black/10 z-10"></div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-44 overflow-hidden z-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white/80">
            Frames by Vaish
          </h1>
          <p className="text-gray-300 mb-8">
            Beautiful UI components and effects for your next project
          </p>
          <Link
            href="https://github.com/vaishnavip27/frames-by-vaish"
            className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
            target="_blank"
          >
            View on GitHub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-0 shadow-2xl p-2 rotate-12 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="bg-green-600 p-4 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center">🖼️</div>
          </div>
        </div>
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 z-0 shadow-2xl p-2 -rotate-12 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="bg-purple-600 p-4 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center">✨</div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 z-0 shadow-2xl p-2 rotate-12 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="bg-blue-600 p-4 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center">🖱️</div>
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 z-0 shadow-2xl p-2 -rotate-12 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="bg-yellow-600 p-4 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center">🎨</div>
          </div>
        </div>
      </section>

      {/* Component Cards Section */}

      <section className="py-8 md:py-16 relative z-10">
        <div className="container mx-auto px-4 md:px-64">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {components.map((component, index) => (
              <div
                key={index}
                className="bg-gray-600/20 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-800 hover:border-purple-800"
              >
                <Link
                  href={component.path}
                  className="w-full h-full flex items-center justify-between px-10 py-6 hover:bg-gray-700/30 transition-colors group"
                >
                  <h2 className="text-xl text-white/80 font-normal transform transition-transform duration-300 group-hover:-translate-x-2">
                    {component.title}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-0 transition-all duration-300 text-purple-400 group-hover:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
