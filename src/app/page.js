// File: app/page.js
import Link from "next/link";

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
      title: "Horizontal Scroll",
      path: "/horizontal-scroll",
    },
  ];

  return (
    <div className="w-full py-24 px-4 md:px-24 flex flex-col items-center md:items-start">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-10 md:mb-12 w-full ">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-center">
          Frames by Vaishhh
        </h1>
        <Link
          href="https://github.com/vaishnavip27/frames-by-vaish"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-black text-white py-3 px-5 rounded-sm hover:bg-slate-950/80 cursor-pointer">
            Star on Github
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
        <div className="space-y-4">
          {components.slice(0, 9).map((component) => (
            <div
              key={component.path}
              className="flex items-center justify-center md:justify-start "
            >
              <Link
                href={component.path}
                className="text-purple-950 text-xl md:text-xl font-medium rounded-sm underline"
              >
                {component.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {components.slice(9).map((component) => (
            <div
              key={component.path}
              className="flex items-center justify-center md:justify-start"
            >
              <Link
                href={component.path}
                className="text-black hover:underline text-md md:text-xl underline tracking-tighter font-medium"
              >
                {component.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
