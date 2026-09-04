import React, { useState } from 'react';

const certProviders = [
    {
        id: 'ibm',
        name: 'IBM Cloud',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnJw5T42bRetWKq1K9hbJ5HBPXTkXroY32A&s',
        certCount: 3,
        colorTheme: 'primary',
        certificates: [
            { title: 'Intro to Artificial Intelligence', image: 'assets/images/certificates/ibm-ai-intro.jpg', fallback: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=600&q=80' },
            { title: 'Intro to Large Language Models', image: 'assets/images/certificates/ibm-llm.jpg', fallback: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?fit=crop&w=600&q=80' },
            { title: 'Mastering the Art of Prompting', image: 'assets/images/certificates/ibm-prompting.jpg', fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fit=crop&w=600&q=80' }
        ]
    },
    {
        id: 'techno',
        name: 'Techno Billon AI',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQEDSRbvEeevSw/company-logo_200_200/company-logo_200_200/0/1733474164114/techno_billion_ai_logo?e=2147483647&v=beta&t=TFiZGqGYAylK-wiphY6-YjeLLgpxFgfzBtb23KMaG-k',
        certCount: 2,
        colorTheme: 'accent',
        certificates: [
            { title: 'Python for Beginners', image: 'assets/images/certificates/techno-python-beg.jpg', fallback: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?fit=crop&w=600&q=80' },
            { title: 'Python for Data Science', image: 'assets/images/certificates/techno-python-ds.jpg', fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=600&q=80' }
        ]
    }
];

export default function Certifications() {
    const [selectedProvider, setSelectedProvider] = useState(null);

    // Lock body scroll when modal opens
    React.useEffect(() => {
        if (selectedProvider) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [selectedProvider]);

    return (
        <>
            <section id="certifications" className="py-16 md:py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="gsap-section-title text-center mb-12 md:mb-16">
                        <span className="text-slate-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 block">Proof of Knowledge & Skills</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Certified <span className="text-gradient">Expertise</span></h2>
                        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm sm:max-w-lg mx-auto">
                        {certProviders.map(provider => (
                            <div key={provider.id} className="cert-provider-card glass p-4 rounded-2xl dark:border-white/10 shadow-md flex flex-col items-center text-center group active:scale-95 md:hover:-translate-y-1 transition-transform duration-300 border border-slate-200/50 dark:border-white/5">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform overflow-hidden border border-slate-200">
                                    <img src={provider.logo} loading="lazy" alt={`${provider.name} Logo`} className="w-full h-full object-contain p-1.5" />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">{provider.name}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-[10px] font-medium mb-4">{provider.certCount} Certifications</p>
                                <button onClick={() => setSelectedProvider(provider)} aria-label={`View ${provider.name} Certificates`} className={`px-4 py-1.5 text-xs rounded-full bg-${provider.colorTheme}/10 border border-${provider.colorTheme} text-${provider.colorTheme} font-bold active:bg-${provider.colorTheme} active:text-${provider.colorTheme === 'primary' ? 'dark' : 'white'} md:hover:bg-${provider.colorTheme} md:hover:text-${provider.colorTheme === 'primary' ? 'dark' : 'white'} transition-colors`}>
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Modal */}
            <div id="cert-modal" onClick={(e) => { if(e.target.id === 'cert-modal') setSelectedProvider(null) }} className={`fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 dark:bg-black/90 backdrop-blur-md transition-opacity duration-300 px-4 ${selectedProvider ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {selectedProvider && (
                    <div className={`modal-content bg-white dark:bg-[#0a0a0a] p-5 md:p-8 rounded-3xl w-full ${selectedProvider.certificates.length > 2 ? 'max-w-4xl' : 'max-w-2xl'} max-h-[85vh] overflow-y-auto transform transition-all duration-300 relative border border-slate-200 dark:border-white/10 shadow-2xl ${selectedProvider ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                        <button onClick={() => setSelectedProvider(null)} aria-label="Close Modal" title="Close" className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-red-500 hover:text-white transition-colors z-50">
                            <i className="fas fa-times"></i>
                        </button>
                        <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 text-center pt-2"><span className={`text-${selectedProvider.colorTheme}`}>{selectedProvider.name}</span></h3>
                        
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${selectedProvider.certificates.length > 2 ? 'md:grid-cols-3' : ''} gap-4 md:gap-6`}>
                            {selectedProvider.certificates.map((cert, index) => (
                                <div key={index} className="bg-slate-50 dark:bg-[#111] p-3 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col">
                                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3">
                                        <img src={cert.image} loading="lazy" onError={(e) => { e.target.src = cert.fallback }} alt={cert.title} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-3 text-center px-1">{cert.title}</h4>
                                    <a href={cert.image} download className={`mt-auto block text-center py-2 bg-${selectedProvider.colorTheme}/10 text-${selectedProvider.colorTheme} active:bg-${selectedProvider.colorTheme} active:text-${selectedProvider.colorTheme === 'primary' ? 'dark' : 'white'} md:hover:bg-${selectedProvider.colorTheme} md:hover:text-${selectedProvider.colorTheme === 'primary' ? 'dark' : 'white'} rounded-xl text-xs md:text-sm font-bold transition-colors`}>
                                        <i className="fas fa-download mr-1"></i> Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
