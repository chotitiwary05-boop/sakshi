import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  Computer,
  Monitor,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INITIAL_WEBSITE_CONFIG } from './mockData';
import { WebsiteConfig, WebsiteSection } from './types';

export default function Website() {
  const [config, setConfig] = React.useState<WebsiteConfig>(INITIAL_WEBSITE_CONFIG);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.header.logo ? (
              <img src={config.header.logo} alt="Logo" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Computer className="w-6 h-6" />
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-primary">
              {config.header.title}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {config.header.menu.map((item) => (
              <a 
                key={item.label} 
                href={item.link} 
                className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
            <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
              Enroll Now
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {config.header.menu.map((item) => (
                <a 
                  key={item.label} 
                  href={item.link} 
                  className="text-2xl font-bold text-center py-4 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="w-full py-6 text-lg rounded-2xl">
                Call Us Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Sections */}
      <div className="pt-20">
        {config.sections.sort((a, b) => a.order - b.order).map((section) => (
          <div key={section.id} id={section.id.split('-')[0]}>
            <SectionRenderer section={section} config={config} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white">{config.header.title}</h3>
            <p className="text-base md:text-lg leading-relaxed max-w-md">
              {config.footer.about}
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Contact Info</h4>
            <div className="space-y-6">
              {config.footer.branches?.map(branch => (
                <div key={branch.name} className="space-y-2">
                  <p className="text-xs font-black text-primary uppercase tracking-widest">{branch.name}</p>
                  <div className="space-y-1">
                    {branch.phones.map(phone => (
                      <div key={phone} className="flex items-center gap-2 text-sm">
                        <Phone className="w-3.5 h-3.5 text-primary/60" />
                        <span>+91 {phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 text-sm pt-2 border-t border-slate-800">
                <Mail className="w-4 h-4 text-primary" />
                <span>{config.footer.contact.email}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-2">
              {config.header.menu.map(item => (
                <li key={item.label}>
                  <a href={item.link} className="hover:text-primary transition-colors text-sm">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs opacity-60">
          <p>© 2026 {config.header.title}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionRenderer({ section, config }: { section: WebsiteSection, config: WebsiteConfig }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} />;
    case 'about':
      return <AboutSection section={section} />;
    case 'courses':
      return <CoursesSection section={section} />;
    case 'contact':
      return <ContactSection section={section} />;
    case 'slider':
      return <SliderSection section={section} />;
    case 'gallery':
      return <GallerySection section={section} />;
    case 'director-message':
      return <DirectorMessageSection section={section} />;
    case 'branches':
      return <BranchesSection section={section} config={config} />;
    default:
      return <CustomSection section={section} />;
  }
}

function DirectorMessageSection({ section }: { section: WebsiteSection }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white overflow-hidden" id="director">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <img 
                src={section.images?.[0] || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'} 
                className="w-full aspect-[4/5] object-cover" 
                alt="Director" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest">
                <Award className="w-4 h-4" />
                Director's Message
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 uppercase italic leading-tight">
                {section.title}
              </h2>
              <div className="w-16 md:w-20 h-1 md:h-1.5 bg-primary rounded-full" />
            </div>

            <div className="relative">
              <span className="absolute -top-6 -left-6 md:-top-8 md:-left-6 text-7xl md:text-9xl text-slate-100 font-serif select-none">“</span>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium italic relative z-10">
                {section.content}
              </p>
              <span className="absolute -bottom-16 md:-bottom-20 -right-4 text-7xl md:text-9xl text-slate-100 font-serif select-none rotate-180">“</span>
            </div>

            <div className="pt-4 md:pt-6">
              <p className="text-lg md:text-xl font-black text-slate-900 italic">{section.subtitle}</p>
              <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-[0.2em]">Director, Sakshi Computer Institute</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BranchesSection({ section, config }: { section: WebsiteSection, config: WebsiteConfig }) {
  const branches = config.footer.branches || [];

  return (
    <section className="py-20 md:py-24 px-6 bg-slate-50 overflow-hidden" id="branches">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-slate-900 italic">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                {branch.image && <img src={branch.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={branch.name} referrerPolicy="no-referrer" />}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest shadow-xl">
                  {branch.name.split(' ')[0]} Campus
                </div>
              </div>
              <div className="p-8 md:p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4 text-center">
                   <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-none">{branch.name}</h3>
                   <div className="flex flex-col items-center gap-2 text-slate-500 font-medium">
                      <MapPin className="w-5 h-5 text-primary" />
                      <p className="text-sm md:text-base px-2">{branch.address}</p>
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 text-center">Contact Numbers</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {branch.phones.map(phone => (
                      <Button 
                        key={phone} 
                        variant="ghost" 
                        className="bg-slate-50 hover:bg-primary/10 hover:text-primary rounded-xl h-12 gap-2 text-xs font-bold"
                        onClick={() => window.location.href = `tel:+91${phone}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {phone}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function handleCTA(action?: string, link?: string) {
  if (!link) return;
  if (action === 'call') {
    window.location.href = `tel:${link}`;
  } else if (action === 'map') {
    window.open(link, '_blank');
  } else {
    // Scroll to link if it starts with #
    if (link.startsWith('#')) {
      const el = document.getElementById(link.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  }
}

function SliderSection({ section }: { section: WebsiteSection }) {
  const [current, setCurrent] = React.useState(0);
  const images = section.images || ['https://picsum.photos/seed/slide/1200/600'];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[400px] md:h-[600px] overflow-hidden bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center text-center text-white px-6">
        <div className="max-w-4xl space-y-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">{section.title}</h2>
          <p className="text-base md:text-lg font-medium opacity-90">{section.subtitle}</p>
          {section.ctaText && (
            <Button 
              size="lg" 
              className="mt-6 rounded-full px-6 md:px-8 h-12 md:h-14 font-bold text-sm md:text-base shadow-2xl"
              onClick={() => handleCTA(section.ctaAction, section.ctaLink)}
            >
              {section.ctaText}
            </Button>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

function CustomSection({ section }: { section: WebsiteSection }) {
  const isList = section.content?.includes('•');
  const isMissionVision = section.content?.includes('###');
  const items = isList ? section.content?.split('\n').filter(i => i.trim()) : [];

  return (
    <section className="py-12 md:py-20 px-6 bg-slate-50 border-b relative overflow-hidden" id={section.id.includes('vision') ? 'vision' : 'features'}>
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">{section.title}</h2>
          <p className="text-base md:text-lg text-slate-500 font-medium">{section.subtitle}</p>
        </div>

        {isList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-base md:text-lg font-bold text-slate-700 leading-tight pt-1">
                  {item.replace('•', '').trim()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : isMissionVision ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {section.content?.split('###').filter(s => s.trim()).map((part, i) => {
              const [title, ...desc] = part.split('\n').filter(t => t.trim());
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white shadow-2xl shadow-primary/5 border border-slate-100 space-y-6"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest">
                    {i === 0 ? <Award className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                    {title}
                  </div>
                  <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed italic">
                    {desc.join(' ')}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-base md:text-lg leading-relaxed text-slate-700 max-w-4xl mx-auto text-center font-medium px-4">
            {section.content}
          </div>
        )}

        {section.ctaText && (
          <div className="flex justify-center pt-8">
            <Button 
              size="lg"
              className="rounded-full px-10 md:px-12 h-14 md:h-16 font-bold text-base md:text-lg shadow-xl shadow-primary/20"
              onClick={() => handleCTA(section.ctaAction, section.ctaLink)}
            >
              {section.ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Check({ className, ...props }: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function HeroSection({ section }: { section: WebsiteSection }) {
  return (
    <section className="relative min-h-[90vh] md:h-screen lg:min-h-[800px] flex items-center overflow-hidden py-24 md:py-32">
      {section.images?.[0] && (
        <div className="absolute inset-0 z-0">
          <img 
            src={section.images[0]} 
            className="w-full h-full object-cover grayscale opacity-40" 
            alt="Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-primary/20" />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-sm font-bold uppercase tracking-widest mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Admissions Open 2026-27
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase italic">
              {section.title}
            </h1>
            <p className="text-base md:text-xl text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {section.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full px-6 md:px-10 h-12 md:h-16 text-sm md:text-lg font-black uppercase shadow-2xl shadow-primary/40 group bg-primary hover:bg-primary/90">
                {section.ctaText}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6 md:px-10 h-12 md:h-16 text-sm md:text-lg font-black uppercase border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-slate-900 transition-all font-mono"
                onClick={() => handleCTA('link', '#features')}
              >
                Why Us?
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-primary rounded-full blur-[120px] opacity-20 animate-pulse" />
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-8 flex flex-col justify-end">
                  <Monitor className="w-10 lg:w-12 h-10 lg:h-12 text-primary mb-4" />
                  <p className="text-xl lg:text-2xl font-black italic">MODERN LABS</p>
                </div>
                <div className="aspect-square bg-slate-900 border border-white/10 rounded-[2rem] p-6 lg:p-8 flex flex-col justify-end overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-700 object-cover" referrerPolicy="no-referrer" />
                  <p className="text-xl lg:text-2xl font-black italic relative z-10">TECH DRIVEN</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-primary rounded-[2rem] p-6 lg:p-8 flex flex-col justify-end shadow-2xl shadow-primary/40">
                  <Award className="w-10 lg:w-12 h-10 lg:h-12 text-white mb-4" />
                  <p className="text-xl lg:text-2xl font-black italic">MCU CERTIFIED</p>
                </div>
                <div className="aspect-square bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-8 flex flex-col justify-end">
                  <BookOpen className="w-10 lg:w-12 h-10 lg:h-12 text-primary mb-4" />
                  <p className="text-xl lg:text-2xl font-black italic">PRACTICAL SKILLS</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ section }: { section: WebsiteSection }) {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAFAFA]" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {section.images?.[0] && (
            <div className="relative z-10 rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={section.images[0]} className="w-full aspect-[4/3] object-cover" alt="About" referrerPolicy="no-referrer" />
            </div>
          )}
          <div className="absolute -bottom-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl z-0" />
          <div className="absolute -top-10 -left-10 w-48 md:w-64 h-48 md:h-64 bg-slate-200 rounded-full blur-3xl z-0" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold uppercase tracking-widest">
            <Award className="w-4 h-4" />
            Trusted Institution
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 uppercase leading-none">
              {section.title}
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-bold leading-relaxed italic border-l-4 border-primary pl-4 md:pl-6">
              {section.subtitle}
            </p>
          </div>
          <div className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            <p>{section.content}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-8">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-primary">12+</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-primary">5000+</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Students Trained</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection({ section }: { section: WebsiteSection }) {
  const images = section.images || [];

  return (
    <section className="py-12 md:py-20 px-6 bg-slate-900 overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white italic">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-slate-400 font-medium">
            {section.subtitle}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={img} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={`Gallery ${i}`} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection({ section }: { section: WebsiteSection }) {
  const defaultCourses = [
    { 
      name: 'DCA', 
      duration: '1 Year', 
      eligibility: '12th Pass',
      seats: '50',
      icon: BookOpen, 
      desc: 'Diploma in Computer Applications',
      highlights: ['Basic computer fundamentals', 'MS Office (Word, Excel, PowerPoint)', 'Internet & Email', 'Operating Systems', 'Introduction to Tally & Accounting']
    },
    { 
      name: 'PGDCA', 
      duration: '1 Year', 
      eligibility: 'Graduate',
      seats: '50',
      icon: Award, 
      desc: 'Post Graduate Diploma in Computer Applications',
      highlights: ['Advanced computer applications', 'Programming basics', 'Database management', 'Software development fundamentals', 'IT tools for professional use']
    }
  ];

  return (
    <section className="py-12 md:py-20 px-6 bg-white overflow-hidden" id="courses">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-slate-900 italic">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {defaultCourses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] border-2 border-slate-100 hover:border-primary/20 transition-all bg-white group shadow-xl shadow-slate-200/20"
            >
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 scale-125 md:scale-150 rotate-12 group-hover:scale-175 transition-transform duration-500">
                 <course.icon className="w-24 h-24 md:w-32 md:h-32" />
              </div>

              <div className="relative z-10 space-y-4 md:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 italic">{course.name}</h3>
                    <p className="text-sm md:text-base font-bold text-primary italic uppercase tracking-widest leading-tight">{course.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-inner">
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl shadow-inner border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Eligibility</p>
                    <p className="text-sm md:text-base font-bold text-slate-700">{course.eligibility}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Seats</p>
                    <p className="text-sm md:text-base font-bold text-slate-700">{course.seats}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary">Course Highlights</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm md:text-base text-slate-600 font-semibold italic">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full h-14 md:h-16 rounded-2xl text-base md:text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group-hover:scale-[1.02] transition-transform">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ section }: { section: WebsiteSection }) {
  return (
    <section className="py-12 md:py-20 px-6 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">
          <div className="lg:w-1/2 p-8 md:p-16 space-y-8 md:space-y-10 bg-primary text-white">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase leading-none italic">
                {section.title}
              </h2>
              <p className="text-primary-foreground/80 text-base md:text-lg font-medium">
                {section.subtitle}
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest opacity-60">Call Us</p>
                  <p className="text-lg md:text-xl font-bold">+91 9926654640</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest opacity-60">Email</p>
                  <p className="text-base md:text-xl font-bold truncate">info@saathicomputer.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  <Globe className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest opacity-60">Website</p>
                  <p className="text-lg md:text-xl font-bold">saathicomputer.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <Button 
                size="lg" 
                className="w-full h-14 md:h-16 rounded-xl bg-white text-primary hover:bg-slate-100 text-base md:text-lg font-black uppercase shadow-xl"
                onClick={() => handleCTA('call', '+919926654640')}
              >
                Enroll Now
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 min-h-[400px] md:min-h-[500px] relative transition-all duration-700 bg-slate-100">
            {/* Mock Map View */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 md:mb-8 animate-bounce transition-all">
                <MapPin className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 md:mb-4 uppercase italic">Visit Us</h3>
              <p className="text-sm md:text-base text-slate-500 font-medium mb-6 md:mb-8 max-w-sm leading-relaxed px-4 md:px-6">
                Come and explore our campus, meet our faculty, and experience our learning environment.
              </p>
              
              <div className="p-5 md:p-6 bg-white rounded-2xl shadow-lg border border-slate-100 text-left w-full max-w-sm mb-6 md:mb-8">
                 <p className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-1 md:mb-2">Campus Address</p>
                 <p className="text-sm md:text-base font-bold text-slate-800 italic leading-snug">
                   Saathi Computer Institute (ASI 6281), Near Jain Mandir, Main Road Mohindra, Panna (M.P.)
                 </p>
              </div>

              <Button 
                variant="outline" 
                className="border-slate-300 rounded-xl px-10 md:px-12 h-12 md:h-14 text-sm md:text-base font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
                onClick={() => handleCTA('map', 'https://goo.gl/maps')}
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
