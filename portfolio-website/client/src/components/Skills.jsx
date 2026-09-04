import React from 'react';

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gsap-section-title text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Tech <span className="text-gradient">Arsenal</span></h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {[
                    { name: 'React', icon: 'fab fa-react', colorClass: 'text-cyan-500 dark:text-cyan-400', hoverBorder: 'hover:border-primary/50' },
                    { name: 'Node.js', icon: 'fab fa-node', colorClass: 'text-green-600 dark:text-green-500', hoverBorder: 'hover:border-green-500/50' },
                    { name: 'Python', icon: 'fab fa-python', colorClass: 'text-blue-600 dark:text-blue-400', hoverBorder: 'hover:border-blue-400/50' },
                    { name: 'JavaScript', icon: 'fab fa-js', colorClass: 'text-yellow-500 dark:text-yellow-400', hoverBorder: 'hover:border-yellow-500/50' },
                    { name: 'SQL/Mongo', icon: 'fas fa-database', colorClass: 'text-purple-600 dark:text-purple-400', hoverBorder: 'hover:border-purple-400/50' },
                    { name: 'Git', icon: 'fab fa-git-alt', colorClass: 'text-orange-600 dark:text-orange-500', hoverBorder: 'hover:border-orange-500/50' },
                ].map((skill, index) => (
                    <div key={index} className={`skill-card glass p-4 md:p-6 rounded-2xl dark:border-white/5 flex flex-col items-center justify-center gap-3 md:gap-4 group ${skill.hoverBorder} transition-colors`}>
                        <i className={`${skill.icon} text-4xl md:text-5xl ${skill.colorClass} group-hover:scale-110 transition-transform`}></i>
                        <span className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}