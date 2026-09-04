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
                {[
                    {
                        title: 'ARIS AI',
                        description: 'A Full Desktop AI Assistant designed to automate and simplify daily tasks seamlessly.',
                        image: 'assets/images/projects/aris-ai.jpg',
                        fallbackImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?fit=crop&w=600&q=80',
                        demoLink: '#',
                        githubLink: '#',
                        tags: [
                            { name: 'Python', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' },
                            { name: 'Flask', style: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20' },
                            { name: 'SQLite', style: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20' },
                            { name: 'HTML', style: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20' }
                        ]
                    },
                    {
                        title: 'BioNexus',
                        description: 'An AI-powered health tracker for analyzing and managing your personal wellness data.',
                        image: 'assets/images/projects/bionexus.jpg',
                        demoLink: '#',
                        githubLink: 'https://github.com/Anubhav2321/Health-Tracker-.git',
                        tags: [
                            { name: 'Python', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' },
                            { name: 'Flask', style: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20' },
                            { name: 'CSS', style: 'bg-blue-600/10 text-blue-700 dark:text-blue-500 border border-blue-600/20' },
                            { name: 'JS', style: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' }
                        ]
                    },
                    {
                        title: 'AI Doc Simplifier',
                        description: 'Intelligently summarizes and simplifies complex documents utilizing advanced NLP techniques.',
                        image: 'assets/images/projects/doc-simplifier.jpg',
                        demoLink: '#',
                        githubLink: 'https://github.com/Anubhav2321/AI-DOC-SIMPLIFOER-.git',
                        tags: [
                            { name: 'Python', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' },
                            { name: 'Flask', style: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20' },
                            { name: 'SQLite', style: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20' }
                        ]
                    },
                    {
                        title: 'Advance LMS',
                        description: 'A modern Learning Management System crafted for streamlined education delivery.',
                        image: 'assets/images/projects/advance-lms.jpg',
                        demoLink: '#',
                        githubLink: 'https://github.com/Anubhav2321/collage-management-.git',
                        tags: [
                            { name: 'Python', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' },
                            { name: 'Django', style: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' },
                            { name: 'CSS', style: 'bg-blue-600/10 text-blue-700 dark:text-blue-500 border border-blue-600/20' },
                            { name: 'JS', style: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' }
                        ]
                    },
                    {
                        title: 'Snake Game',
                        description: 'A classic retro game built seamlessly utilizing Python and interactive JavaScript elements.',
                        image: 'assets/images/projects/snake-game.jpg',
                        demoLink: '#',
                        githubLink: 'https://github.com/Anubhav2321/Snake-game.git',
                        extraClasses: 'sm:col-span-2 lg:col-span-1 lg:col-start-2',
                        tags: [
                            { name: 'Python', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' },
                            { name: 'JS', style: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' }
                        ]
                    }
                ].map((project, index) => (
                    <div key={index} className={`project-card group rounded-2xl overflow-hidden glass dark:border-white/10 shadow-lg flex flex-col ${project.extraClasses || ''}`}>
                        <div className="relative overflow-hidden aspect-video">
                            <img src={project.image} loading="lazy" onError={(e) => { if(project.fallbackImage) e.target.src = project.fallbackImage; }} alt={project.title} className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-white/90 dark:bg-[#050505]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-primary text-dark rounded-full font-bold hover:-translate-y-1 transition-transform"><i className="fas fa-external-link-alt mr-1"></i>Demo</a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm border border-slate-400 dark:border-white/20 text-slate-800 dark:text-white rounded-full font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"><i className="fab fa-github mr-1"></i>GitHub</a>
                            </div>
                        </div>
                        <div className="p-5 md:p-6 bg-transparent flex-grow border-t border-blue-900/10 dark:border-white/5 flex flex-col">
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-light leading-relaxed mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={`px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full ${tag.style}`}>{tag.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}