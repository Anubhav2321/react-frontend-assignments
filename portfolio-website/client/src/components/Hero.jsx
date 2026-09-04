import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 md:pt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
            
            <div className="text-center md:text-left z-20 self-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 md:mb-6 animate-hero-stagger text-slate-900 dark:text-white">
                    Designing the <br />
                    <span className="text-gradient">Future Web</span>
                </h1>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 animate-hero-stagger font-light">
                    I'm Anubhav Samanta, a Full Stack Developer & BCA student fusing cutting-edge technology with immersive design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-hero-stagger">
                    <a href="#projects" className="px-8 py-3.5 md:py-4 rounded-full bg-primary text-dark font-bold hover:shadow-neon hover:-translate-y-1 transition-transform duration-300 text-center flex items-center justify-center gap-2 relative z-50 inline-flex">
                        View Projects <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
                
                <div className="mt-8 md:mt-12 flex gap-6 justify-center md:justify-start animate-hero-stagger relative z-50">
                    <a href="https://github.com/Anubhav2321" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub" className="text-2xl text-slate-500 hover:text-primary transition-transform hover:scale-125"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/anubhav-samanta-187549379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn" className="text-2xl text-slate-500 hover:text-primary transition-transform hover:scale-125"><i className="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/r.d.x___anubhav" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" title="Instagram" className="text-2xl text-slate-500 hover:text-accent transition-transform hover:scale-125"><i className="fab fa-instagram"></i></a>
                </div>
            </div>

            <div className="relative z-10 flex justify-center items-end h-[50vh] sm:h-[60vh] md:h-[90vh] mt-4 md:mt-0">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-primary/20 md:bg-primary/30 rounded-full blur-[70px] md:blur-[90px] -z-10 animate-hero-stagger"></div>
                
                <div className="hero-img-container w-full max-w-[280px] sm:max-w-sm md:max-w-2xl">
                    <img 
                        src="assets/images/profile-cutout.png" 
                        onError={(e) => { e.target.src='WhatsApp%20Image%202025-11-19%20at%2010.34.19%20PM.jpeg' }}
                        alt="Anubhav Samanta" 
                        className="hero-img-custom animate-hero-image transform-gpu w-auto h-auto max-h-[100%] object-contain relative z-10 opacity-0"
                    />
                    
                    <div className="absolute -right-2 md:right-4 top-1/4 md:top-1/3 w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-primary/50 flex items-center justify-center animate-bounce shadow-neon z-20 animate-hero-orbs opacity-0 anim-dur-4s">
                        <i className="fab fa-react text-lg md:text-2xl text-primary animate-spin anim-dur-6s"></i>
                    </div>
                    
                    <div className="absolute -left-2 md:left-4 bottom-[20%] md:bottom-[30%] w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-accent/50 flex items-center justify-center animate-bounce shadow-neon-accent z-20 animate-hero-orbs opacity-0 anim-dur-5s">
                        <i className="fab fa-python text-lg md:text-2xl text-accent animate-spin anim-dur-7s"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}