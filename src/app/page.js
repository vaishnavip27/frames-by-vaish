// File: app/page.js
import Link from 'next/link';

export default function Home() {
  const components = [
    {
      title: 'Parallex scroll Slider',
      path: '/lenis-scroll',
      experimenting: false
    },
  ];

  return (
    <div className="w-full py-20 flex flex-col px-36">
      <h1 className="text-7xl font-black mb-20 tracking-tight">
        Frames by Vaishhh🌻
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="space-y-4">
          {components.slice(0, 9).map((component) => (
            <div key={component.path} className="flex items-center">
              <Link 
                href={component.path}
                className="text-black hover:underline text-xl underline tracking-tighter font-medium"
              >
                {component.title}
              </Link>
              {component.experimenting && (
                <span className="ml-2 text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-md">
                  still experimenting
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          {components.slice(9).map((component) => (
            <div key={component.path} className="flex items-center">
              <Link 
                href={component.path}
                className="text-black hover:underline text-xl underline tracking-tighter font-medium"
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