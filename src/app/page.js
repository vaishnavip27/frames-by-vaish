// File: app/page.js
import Link from "next/link";

export default function Home() {
  const components = [
    {
      title: "Parallex scroll Slider",
      path: "/lenis-scroll",
      experimenting: false,
    },
  ];

  return (
    <div className="w-full py-24 px-4 md:px-36 flex flex-col items-center md:items-start">
      <h1 className="text-4xl md:text-7xl font-black mb-10 md:mb-12 tracking-tight text-center md:text-left">
        Frames by Vaishhh🌻
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
        <div className="space-y-4">
          {components.slice(0, 9).map((component) => (
            <div key={component.path} className="flex items-center justify-center md:justify-start ">
              <Link
                href={component.path}
                className="text-white text-sm md:text-md font-medium bg-slate-900 hover:bg-slate-900/80 px-3 md:px-5 py-3 rounded-sm"
              >
                {component.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {components.slice(9).map((component) => (
            <div key={component.path} className="flex items-center justify-center md:justify-start">
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
