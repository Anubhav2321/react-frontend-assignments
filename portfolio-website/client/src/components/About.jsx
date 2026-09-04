import React from 'react';

const journeySteps = [
    {
        title: 'Higher Secondary (12th Pass)',
        institution: 'Naikuri Thakurdas Institution',
        description: 'Completed my school education with a strong academic record, which laid the foundational logical skills required for my entry into the world of computer science.',
        colorTheme: 'primary',
        hexColor: '#00f2fe'
    },
    {
        title: 'Bachelor of Computer Applications (H)',
        institution: 'Techno India University',
        description: 'Currently pursuing my BCA Honours degree. During this period, I have dived deep into coding and successfully built multiple full-stack and AI-based projects.',
        colorTheme: 'accent',
        hexColor: '#8b5cf6'
    },
    {
        title: 'First Technical Internship',
        institution: 'IBM Cloud',
        description: 'Successfully completed my first professional internship focusing on cloud technologies. Gained valuable industry exposure and earned a recognized certificate.',
        colorTheme: 'green-400',
        textColor: 'green-500',
        hexColor: '#4ade80'
    }
];

const statsData = [
    { value: '4', symbol: '+', symbolColor: 'primary', label: 'Projects' },
    { value: '3', symbol: '+', symbolColor: 'accent', label: 'Years Exp.' },
    { value: '6', symbol: '+', symbolColor: 'primary', label: 'Techs' },
    { value: '100', symbol: '%', symbolColor: 'accent', label: 'Solution' }
];

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="gsap-section-title text-center mb-12 md:mb-16">
                  <span className="text-slate-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 block">Get to Know Me</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">About <span className="text-gradient">Me</span></h2>
                  <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                  
                  <div className="glass p-6 md:p-10 rounded-3xl dark:border-white/10 shadow-xl flex flex-col justify-center relative overflow-hidden gsap-vfx-left">
                      <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
                      <i className="fas fa-quote-left text-3xl md:text-4xl text-primary/40 mb-4 md:mb-6 relative z-10"></i>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 relative z-10">My Mission</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg relative z-10">
                          I am a passionate <strong>BCA (Honours)</strong> student with a deep-rooted love for coding and problem-solving. For me, programming isn't just a subject—it's a creative canvas where I can build real-world solutions. 
                          <br /><br />
                          I am dedicated to continuously learning cutting-edge technologies and developing innovative projects. My ultimate mission is to embrace software development not just as a skill, but as my lifelong profession, turning my passion into a successful and impactful career.
                      </p>
                  </div>

                  <div className="glass p-6 md:p-10 rounded-3xl dark:border-white/10 shadow-xl gsap-vfx-right">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                          <i className="fas fa-route text-primary"></i> My Developer Journey
                      </h3>
                      <div className="relative border-l-2 border-primary/30 ml-3 space-y-8 md:space-y-10">
                          {journeySteps.map((step, index) => (
                              <div key={index} className="relative pl-6 md:pl-8 group">
                                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-${step.colorTheme} shadow-[0_0_10px_${step.hexColor}] group-hover:scale-125 transition-transform`}></div>
                                  <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{step.title}</h4>
                                  <p className={`text-${step.textColor || step.colorTheme} text-xs md:text-sm font-medium mb-2 md:mb-3`}>{step.institution}</p>
                                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                              </div>
                          ))}
                      </div>
                  </div>

              </div>
          </div>
      </section>

      <section className="py-12 md:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-slate-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-8 md:mb-10 gsap-vfx-up">Also Working With</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24">
                  {statsData.map((stat, index) => (
                      <div key={index} className="gsap-stat text-center group w-[40%] md:w-auto">
                          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                              {stat.value}<span className={`text-${stat.symbolColor}`}>{stat.symbol}</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </>
  );
}