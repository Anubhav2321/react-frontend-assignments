import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gsap-section-title text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Get in <span className="text-gradient">Touch</span></h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                
                <div className="lg:col-span-3 glass dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden gsap-vfx-left">
                    <div className="absolute -top-24 -right-24 w-32 h-32 md:w-48 md:h-48 bg-primary/20 rounded-full blur-3xl z-0"></div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">Send me a message</h3>
                    
                    <form action="https://formsubmit.co/114a777ead01bfcf23a1b61fad80b606" method="POST" className="space-y-4 md:space-y-6 relative z-10">
                        <input type="hidden" name="_subject" value="New Contact Message from Portfolio" />
                        <input type="hidden" name="_captcha" value="false" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">Your Name</label>
                                <input type="text" name="name" required className="w-full px-4 py-2.5 md:py-3 bg-white/50 dark:bg-darker/50 border border-blue-900/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white text-sm md:text-base transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</label>
                                <input type="email" name="email" required className="w-full px-4 py-2.5 md:py-3 bg-white/50 dark:bg-darker/50 border border-blue-900/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white text-sm md:text-base transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">Your Message</label>
                            <textarea name="message" rows="4" required className="w-full px-4 py-2.5 md:py-3 bg-white/50 dark:bg-darker/50 border border-blue-900/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white text-sm md:text-base transition-colors resize-none" placeholder="How can I help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full md:w-auto px-8 py-3 bg-primary text-dark font-bold rounded-xl active:scale-95 hover:shadow-neon transition-transform">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-6 gsap-vfx-right">
                    <div className="glass dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-5">Contact Info</h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <i className="fas fa-map-marker-alt text-lg"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Location</p>
                                    <p className="text-sm md:text-base font-medium text-slate-900 dark:text-white">West Bengal, India</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <i className="fas fa-envelope text-lg"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Email</p>
                                    <a href="mailto:anubhavsamanta2005@gmail.com" className="text-sm md:text-base font-medium text-slate-900 dark:text-white hover:text-primary transition-colors break-all">anubhavsamanta2005@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-5">Follow Me</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://github.com/Anubhav2321" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-sm md:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                <i className="fab fa-github text-lg"></i> GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/anubhav-samanta-187549379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2 text-sm md:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                <i className="fab fa-linkedin text-lg"></i> LinkedIn
                            </a>
                            <a href="mailto:anubhavsamanta2005@gmail.com" aria-label="Email" className="flex items-center gap-2 text-sm md:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                <i className="fas fa-envelope text-lg"></i> Email
                            </a>
                            <a href="https://www.instagram.com/r.d.x___anubhav" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-2 text-sm md:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                <i className="fab fa-instagram text-lg"></i> Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}