"use client";

import { content } from "@/lib/content";

export function Skills() {
  const categories = Object.keys(content.skills);

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 border-b border-[#23262D]"
    >
      {/* Header */}
      <div className="max-w-xl mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
          02 / Skills
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] mb-3 [text-wrap:balance]">
          {content.skillsMeta.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8B8F9A] leading-relaxed">
          {content.skillsMeta.sub}
        </p>
      </div>

      {/* Clean 4-Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const items = content.skills[category] || [];

          return (
            <div
              key={category}
              className="bg-[#131518] border border-[#23262D] rounded-[4px] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#EFEFF1] pb-3 mb-4 border-b border-[#23262D]">
                  {category}
                </div>

                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-xs font-mono text-[#8B8F9A] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#585C67] rounded-full shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1C1E23] text-[11px] font-mono text-[#585C67]">
                {items.length} tools
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
