import React from 'react';

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gsap-section-title text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">My <span className="text-gradient">Projects</span></h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[]}
            </div>
        </div>
    </section>
  );
}