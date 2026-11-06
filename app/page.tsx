"use client";

import { FullGlobe } from "@/components/ui/globe";

export default function Home() {
  return (
    <div className="relative min-h-[300vh] bg-[#06080c] select-none">
      {/* Fullscreen Globe: No text, no colored dots, pure sharp dot matrix */}
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center">
        <FullGlobe
          scrollRotate={true}
          scrollZoom={true}
          maxScale={2.5}
          autoRotate={false}
          enableDrag={true}
          showAtmosphereGlow={true}
          markers={[]}
          arcs={[]}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
