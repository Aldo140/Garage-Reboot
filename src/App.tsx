/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Trash2, 
  Home, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Menu,
  X,
  Star,
  Quote,
  Warehouse,
  Backpack,
  Truck
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cleanouts', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Neighbourhoods', href: '#area' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-14 h-14 relative flex items-center justify-center transform transition-all group-hover:scale-110">
            <img 
              src="https://www.image2url.com/r2/default/images/1779109344764-ce05d11d-c3e6-483d-a9ad-bde524b2c70c.png" 
              alt="Garage Reboot Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-display font-black text-2xl tracking-tighter text-brand-navy leading-none">
              GARAGE<span className="text-brand-orange">REBOOT</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Calgary's Local Choice</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-bold text-sm uppercase tracking-widest text-gray-500 hover:text-brand-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-4 w-px bg-gray-200 mx-2" />
          <a 
            href="https://www.facebook.com/profile.php?id=61589686545956" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-navy hover:text-brand-orange transition-colors"
            title="Follow us on Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a 
            href="#contact" 
            className="bg-brand-orange text-white px-8 py-3 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-opacity-90 transition-all hover:translate-y-[-2px] shadow-xl shadow-brand-orange/20"
          >
            Free Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-brand-navy py-2 border-b border-gray-50"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold text-center mt-2 shadow-lg shadow-brand-orange/20"
            >
              Get Free Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-28 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 text-brand-navy">
        <img 
          src="https://images.unsplash.com/photo-1558611995-1c390547ba5c?q=80&w=2070" 
          alt="Modern Garage" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 via-white/95 to-white/80" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 w-full h-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 xl:col-span-5 relative z-30"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-sm font-black text-xs uppercase tracking-widest border border-brand-orange/20">
                <span className="text-red-500 italic text-lg">🍁</span> 
                <span>100% Calgarian Owned</span>
              </div>
              
              <div className="rotator-card">
                <div className="rotator-loader">
                  <span>Target:</span>
                  <div className="rotator-words">
                    <span className="rotator-word">Space</span>
                    <span className="rotator-word">Order</span>
                    <span className="rotator-word">Value</span>
                    <span className="rotator-word">Peace</span>
                    <span className="rotator-word">Garage</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="font-display text-[40px] xs:text-[54px] sm:text-[72px] md:text-[90px] xl:text-[130px] font-black leading-[0.85] sm:leading-[0.82] tracking-tighter mb-6 sm:mb-8 uppercase text-brand-navy">
              the <span className="text-brand-orange">Frost.</span><br/>Reclaim Space.
            </h1>
            <p className="text-lg md:text-2xl text-gray-500 mb-10 sm:mb-12 max-w-xl font-medium leading-[1.3] lg:pr-10">
              Calgary's top-rated specialists for <span className="text-brand-navy font-bold">garage cleanouts, moving, and junk removal</span>. Serving a 3-hour radius from Calgary—from Banff to Lethbridge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 relative z-40">
              <a 
                href="#contact" 
                className="bg-brand-orange text-white px-8 py-5 sm:px-10 sm:py-6 rounded-xl font-black text-lg sm:text-xl uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-2xl shadow-brand-orange/40 text-center flex-1"
              >
                Book Now
              </a>
              <a 
                href="#gallery" 
                className="bg-white text-brand-navy border-4 border-brand-navy px-8 py-5 sm:px-10 sm:py-6 rounded-xl font-black text-lg sm:text-xl uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-all text-center flex-1"
              >
                Before/After
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-brand-orange mb-0.5">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>
                <p className="text-sm font-bold text-brand-navy uppercase tracking-widest opacity-60">120+ Calgary Families</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative lg:col-span-6 xl:col-span-7 lg:mt-0 order-first lg:order-last mb-12 lg:mb-0"
          >
            <div className="relative z-10 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[30px_30px_0px_0px_rgba(255,106,0,0.1)] border-[6px] border-white bg-white">
              <div className="w-full overflow-hidden bg-gray-50">
                <img 
                  src="https://www.image2url.com/r2/default/images/1779111295987-e8f54df1-3800-48e2-802f-09c7b019b8ee.png" 
                  alt="Transformed Calgary Garage" 
                  className="w-full h-auto object-contain block max-h-[70vh] lg:max-h-[80vh]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute top-4 left-4 lg:top-8 lg:left-8 flex items-center gap-2 lg:gap-3 bg-brand-green text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md">
                <span className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 bg-white rounded-full animate-ping" />
                Live: YYC Transformation
              </div>
            </div>

            {/* Testimonial Card - Optimized Positioning */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 left-4 right-4 sm:left-auto sm:right-auto sm:-bottom-6 sm:-left-6 lg:-bottom-12 lg:-left-12 xl:-left-20 z-20 bg-white p-6 lg:p-10 rounded-2xl border-4 border-brand-navy shadow-[10px_10px_0px_0px_#FF6A00] sm:shadow-[16px_16px_0px_0px_#FF6A00] max-w-none sm:max-w-md mx-auto"
            >
              <div className="flex gap-4 lg:gap-6 items-start">
                <Quote className="text-brand-orange shrink-0 w-8 h-8 lg:w-12 lg:h-12" />
                <div>
                  <p className="text-brand-navy text-sm lg:text-xl italic font-bold leading-snug mb-3 lg:mb-4 tracking-tight">
                    "I can finally park my car in the garage again. The transformation was unbelievable!"
                  </p>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <div className="w-6 lg:w-10 h-px bg-brand-orange" />
                    <span className="text-brand-orange text-[10px] lg:text-sm font-black uppercase tracking-[0.3em]">Happy Calgarian</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background elements for depth */}
            <div className="absolute -inset-10 bg-brand-orange/5 rounded-[5rem] -rotate-2 z-0 blur-3xl opacity-50" />
            <div className="absolute -inset-6 bg-brand-navy/5 rounded-[5rem] rotate-1 z-0" />
            
            {/* Decorative floaters */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [5, 0, 5] }} 
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-10 bg-brand-orange p-6 lg:p-10 rounded-full shadow-3xl z-20 hidden xl:flex flex-col items-center justify-center border-4 border-white rotate-6"
            >
              <Car size={32} className="text-white mb-1" />
              <div className="text-white font-black uppercase text-[10px] tracking-widest text-center leading-none">
                SPACE<br/>RECLAIMED
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Garage Cleanouts',
      desc: 'Our bread and butter. We handle junk removal, heavy lifting, and sweeping to prep your space for a YYC winter.',
      icon: <Car className="w-8 h-8" />,
      image: "https://www.image2url.com/r2/default/images/1779113102941-f2f76710-6506-4d1f-b5d8-92f16d21fa29.png",
      color: 'bg-brand-navy',
      badge: 'Local Favourite'
    },
    {
      title: 'Junk Removal',
      desc: 'Got an old fridge, broken snowblower, or basement clutter? We clear it out efficiently and responsibly.',
      icon: <Trash2 className="w-8 h-8" />,
      image: "https://www.image2url.com/r2/default/images/1779114222127-e7f1d087-5d7e-4a3e-b0e0-172d14b1d3de.png",
      color: 'bg-brand-orange',
      badge: 'Rapid Response'
    },
    {
      title: 'Commercial Clutter',
      desc: 'Office clear-outs and retail space resets. We handle commercial volumes and store-front junk removal.',
      icon: <Warehouse className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
      color: 'bg-brand-navy',
      badge: 'B2B Priority'
    },
    {
      title: 'Student Moving',
      desc: 'Semester transition specialist. Moving in or out of residence? We clear the chaos between semesters.',
      icon: <Backpack className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
      color: 'bg-brand-green',
      badge: 'Semester Deal'
    },
    {
      title: 'Full Moving',
      desc: 'Local high-speed moving services. From packing to final delivery, we get you to your new home fast.',
      icon: <Truck className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
      color: 'bg-brand-orange',
      badge: 'Elite Precision'
    },
    {
      title: 'Move-Out Service',
      desc: 'Moving houses in the Calgary area? We clear the leftovers so you can stay on schedule with your transition.',
      icon: <Home className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      color: 'bg-brand-green',
      badge: 'Realtor Top Pick'
    }
  ];

  return (
    <section id="services" className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-24 gap-8">
          <div className="max-w-3xl text-center lg:text-left">
            <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">What We Do</div>
            <h2 className="font-display text-5xl md:text-8xl xl:text-[120px] font-bold uppercase tracking-tighter leading-none text-brand-navy">
              Our <span className="text-brand-orange">Impact</span>
            </h2>
          </div>
          <div className="hidden lg:block max-w-sm text-right">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic leading-tight">
              From heavy lifting to the final sweep—we reclaim every square inch of your garage.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/5 rounded-[2rem] overflow-hidden shadow-2xl">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group bg-white p-0 overflow-hidden relative flex flex-col border-b border-black/5 ${(i + 1) % 3 !== 0 ? 'lg:border-r border-black/5' : ''} ${(i + 1) % 2 !== 0 ? 'md:border-r' : 'md:border-r-0 lg:border-r'}`}
            >
              <div className="h-80 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={service.image} alt={service.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply group-hover:bg-transparent transition-all duration-500" />
                {service.badge && (
                  <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {service.badge}
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-10 lg:p-14 flex-1 flex flex-col">
                <div className="text-brand-orange mb-6 sm:mb-8 transform group-hover:rotate-[360deg] transition-transform duration-700 origin-center w-12 h-12 flex items-center justify-center bg-brand-orange/5 rounded-2xl">
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-black mb-4 sm:mb-6 uppercase text-brand-navy leading-none">{service.title}</h3>
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium mb-8 sm:mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </p>
                <a href="#contact" className="mt-auto learn-more group/btn">
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">Book Now</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    { name: 'Small Load', price: '$80–$120', desc: 'A handful of items or small debris clearing.', icon: <CheckCircle2 size={24}/> },
    { name: 'Quarter Truck', price: '$150–$200', desc: 'Perfect for a corner of the garage or a few big items.', icon: <CheckCircle2 size={24}/> },
    { name: 'Half Truck', price: '$250–$350', desc: 'Standard cleanout. Reclaim half your garage space.', icon: <CheckCircle2 size={24}/> },
    { name: 'Full Truck', price: '$400–$600', desc: 'Total transformation. Comprehensive reboot.', icon: <CheckCircle2 size={24}/> },
  ];

  return (
    <section id="pricing" className="py-32 overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">Investment</div>
            <h2 className="font-display text-5xl md:text-8xl xl:text-[100px] font-bold mb-8 uppercase tracking-tighter leading-[0.8] text-brand-navy">
              Fair <span className="text-brand-orange">Pricing</span>
            </h2>
            <p className="text-2xl text-gray-500 mb-12 leading-snug font-medium max-w-md">
              We charge by <span className="font-black text-brand-navy underline decoration-brand-orange decoration-[6px] underline-offset-4">volume, not hours</span>. No surprises.
            </p>
            <div className="space-y-8">
              {[
                { title: 'No Hidden Costs', desc: 'Dump fees and all heavy labour included.' },
                { title: 'Eco-Friendly', desc: 'We recycle and donate whenever possible.' },
                { title: 'Fast Results', desc: 'Most cleanouts done in under 4 hours.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-1.5 h-12 bg-brand-green group-hover:h-16 transition-all duration-300" />
                  <div>
                    <h4 className="font-black text-2xl uppercase tracking-tighter leading-none mb-2 text-brand-navy">{benefit.title}</h4>
                    <p className="text-gray-500 font-medium text-lg">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:gap-12">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`brutal-card ${i === 2 ? 'brutal-card-navy' : (i % 2 === 0 ? 'brutal-card-white' : 'brutal-card-orange')} flex flex-col items-center text-center group`}
                >
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-black rotate-12 group-hover:rotate-0 transition-transform">
                    Calgary Verified
                  </div>
                  <span className={`text-xs uppercase font-black tracking-[0.3em] mb-8 ${i === 2 ? 'text-brand-orange' : (i % 2 === 0 ? 'text-gray-400' : 'text-brand-navy')}`}>
                    {i === 2 ? 'Professional' : 'YYC Local'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black mb-4 uppercase leading-none">{tier.name}</h3>
                  <div className={`text-3xl sm:text-4xl xl:text-6xl font-black mb-8 ${i === 2 ? 'text-brand-orange' : 'text-brand-navy'}`}>
                    {tier.price}
                  </div>
                  <p className={`text-base sm:text-lg xl:text-xl mb-12 font-medium leading-relaxed ${i === 2 || i % 2 !== 0 ? 'text-white/80' : 'text-gray-500'}`}>
                    {tier.desc}
                  </p>
                  <a 
                    href="#contact" 
                    className={`mt-auto w-full py-6 rounded-xl font-black text-base uppercase tracking-widest transition-all border-4 border-brand-navy ${i === 2 ? 'bg-brand-orange text-white hover:bg-white hover:text-brand-navy shadow-[6px_6px_0px_0px_#FF6A00]' : 'bg-brand-navy text-white hover:bg-brand-orange shadow-[6px_6px_0px_0px_#F2F2F2]'}`}
                  >
                    Select Plan
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceArea = () => {
  return (
    <section id="area" className="py-32 bg-brand-navy text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">Location</div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-[100px] xl:text-[140px] font-black mb-6 sm:mb-8 uppercase tracking-tighter leading-[0.8]">
              CALGARY<br/>& <span className="text-brand-orange text-2xl sm:text-3xl md:text-6xl xl:text-8xl align-middle tracking-tight">3HR RADIUS</span>
            </h2>
            <p className="text-2xl xl:text-3xl text-gray-300 mb-12 font-medium leading-tight max-w-xl">
              From <span className="text-white font-black">Banff and Canmore</span> to <span className="text-white font-black">Brooks and Lethbridge</span>—we serve Calgary, Okotoks, High River, and every Southern Alberta community within a 3-hour radius.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {['Calgary (All Corners)', 'Banff & Canmore', 'Okotoks & High River', 'Brooks & Lethbridge', 'Airdrie & Cochrane', 'Rural & Strategic Travel'].map(area => (
                <div key={area} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:translate-x-2">
                  <div className="w-2.5 h-2.5 bg-brand-orange rounded-full shadow-[0_0_15px_rgba(255,100,0,0.5)]" />
                  <span className="font-black text-xl uppercase tracking-tighter whitespace-nowrap">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-14 p-10 lg:p-14 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-3xl text-white shadow-3xl shadow-brand-orange/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-4 text-brand-navy">Direct Line to Dispatch</h4>
              <a href="tel:4035550123" className="inline-flex items-center gap-2 font-black text-5xl xl:text-6xl tracking-tighter italic hover:scale-105 transition-transform origin-left">
                (403) 555-0123
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="absolute inset-0 bg-brand-orange rounded-[4rem] rotate-3 opacity-20 blur-2xl" />
            <div className="relative group cursor-pointer lg:scale-110 xl:scale-125 transition-transform duration-1000 origin-center">
              <div className="absolute inset-0 bg-brand-orange rounded-[4rem] rotate-3 group-hover:rotate-1 transition-transform" />
              <div className="relative bg-white p-4 rounded-[4rem] overflow-hidden shadow-2xl h-[600px] xl:h-[700px]">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200" 
                  alt="Calgary Service Area" 
                  className="w-full h-full object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-transparent transition-all" />
                
                <div className="absolute inset-x-12 bottom-12 bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-3xl border border-white/20 flex items-center justify-between gap-6 text-brand-navy">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-3xl flex items-center justify-center">
                      <Clock size={32} />
                    </div>
                    <div>
                      <span className="block font-black text-xs uppercase text-gray-400 tracking-widest mb-1">Response Time</span>
                      <span className="font-black text-2xl xl:text-3xl italic leading-none">Under 1 Hour</span>
                    </div>
                  </div>
                  <div className="hidden xl:flex items-center gap-2 bg-brand-navy text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Available Now
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient detail */}
            <div className="absolute -top-10 right-0 w-32 h-32 border-4 border-brand-orange/20 rounded-full animate-spin-slow pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-gray-50 rounded-sm p-10 md:p-20 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">Start Reboot</div>
            <h2 className="font-display text-5xl md:text-8xl font-black mb-4 uppercase tracking-tighter leading-none text-brand-navy">
              Get A <span className="text-brand-orange">Quote</span>
            </h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm italic">Response time: ~30 Minutes</p>
            </div>

            <form className="space-y-12 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="contact-input-group">
                  <input required type="text" className="contact-input" placeholder=" " />
                  <span className="contact-bar"></span>
                  <label className="contact-label">Full Name</label>
                </div>
                <div className="contact-input-group">
                  <input required type="tel" className="contact-input" placeholder=" " />
                  <span className="contact-bar"></span>
                  <label className="contact-label">Phone Number</label>
                </div>
              </div>
              
              <div className="contact-input-group">
                <select required className="contact-input appearance-none cursor-pointer uppercase tracking-widest">
                  <option value="" disabled selected hidden> </option>
                  <option>Full Garage Reboot</option>
                  <option>Junk Removal (Commercial/Res)</option>
                  <option>Student Move Out/In</option>
                  <option>Full Moving Service</option>
                  <option>Estate/Move-Out Service</option>
                </select>
                <span className="contact-bar"></span>
                <label className="contact-label">Service Required</label>
              </div>

              <div className="contact-input-group">
                <textarea required rows={4} className="contact-input" placeholder=" "></textarea>
                <span className="contact-bar"></span>
                <label className="contact-label">Details & Location</label>
              </div>

              <button className="w-full bg-brand-navy text-white py-6 rounded-xl font-black text-2xl uppercase tracking-widest hover:bg-brand-orange transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 active:scale-95">
                Reboot My Garage
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white py-16 px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 border-t-8 border-brand-orange">
    <div className="border-l-4 border-brand-orange md:border-l md:border-white/20 pl-6 md:pl-8">
      <p className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] mb-2">Honest Pricing</p>
      <p className="font-black text-3xl md:text-4xl tracking-tighter leading-none">$80 — $600</p>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Volume based in CAD.</p>
    </div>
    <div className="border-l-4 border-brand-orange md:border-l md:border-white/20 pl-6 md:pl-8">
      <p className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] mb-2">Our Territory</p>
      <p className="font-black text-3xl md:text-4xl tracking-tighter leading-none uppercase">3HR RADIUS</p>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">From Calgary to anywhere in Alberta.</p>
    </div>
    <div className="border-l-4 border-brand-orange md:border-l md:border-white/20 pl-6 md:pl-8">
      <p className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] mb-2">Customer Score</p>
      <div className="flex items-center gap-2">
        <p className="font-black text-3xl md:text-4xl tracking-tighter leading-none">5.0</p>
        <div className="flex text-brand-orange"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
      </div>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Local favorites.</p>
    </div>
    <div className="border-l-4 border-brand-orange md:border-l md:border-white/20 pl-6 md:pl-8">
      <p className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em] mb-2">Connect</p>
      <div className="flex gap-4 items-center">
        <a 
          href="https://www.facebook.com/profile.php?id=61589686545956" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-brand-orange transition-colors"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Follow our journey.</p>
    </div>
  </footer>
  );
};

const Gallery = () => {
  const images = [
    {
      before: "https://www.image2url.com/r2/default/images/1779108806945-2316eeed-e2c8-4770-ae6d-b4fc1dd0adb0.png",
      after: "https://www.image2url.com/r2/default/images/1779108810514-57bb9fc8-cf96-4558-a5bb-820e64eb3350.png",
      title: "Aspen Woods Reset",
      loc: "Southwest Calgary"
    },
    {
      before: "https://www.image2url.com/r2/default/images/1779113094140-19a1f514-3650-47f6-93d1-7425638cb1c4.png",
      after: "https://www.image2url.com/r2/default/images/1779113099401-74683ad9-a22b-44ae-bbf2-625902ac214e.png",
      title: "Estate Cleanout",
      loc: "Mount Royal"
    }
  ];

  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <section id="gallery" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-3xl text-center md:text-left">
            <div className="text-brand-green font-black uppercase text-xs tracking-[0.4em] mb-4">Results Delivered</div>
            <h2 className="font-display text-5xl md:text-8xl xl:text-[120px] font-black mb-4 uppercase tracking-tighter leading-none text-brand-navy">
              The <span className="text-brand-green italic">Reset</span>
            </h2>
          </div>
          <div className="flex bg-brand-navy/5 p-2 rounded-2xl w-full md:w-auto shadow-inner border border-brand-navy/5">
            <button 
              onClick={() => setActiveTab('before')}
              className={`flex-1 md:flex-none px-10 xl:px-14 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-500 border-2 ${activeTab === 'before' ? 'bg-brand-navy text-white border-brand-navy shadow-[4px_4px_0px_0px_#FF6A00] translate-y-[-2px]' : 'text-brand-navy/40 border-transparent hover:text-brand-navy'}`}
            >
              Chaos
            </button>
            <button 
              onClick={() => setActiveTab('after')}
              className={`flex-1 md:flex-none px-10 xl:px-14 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-500 border-2 ${activeTab === 'after' ? 'bg-brand-green text-white border-brand-green shadow-[4px_4px_0px_0px_#05060F] translate-y-[-2px]' : 'text-brand-navy/40 border-transparent hover:text-brand-green'}`}
            >
              Control
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[16px_16px_0px_0px_#05060F] aspect-square lg:aspect-video bg-brand-soft border-4 border-brand-navy"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={activeTab === 'after' ? img.after : img.before} 
                  alt={img.title}
                  className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-brand-orange font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 flex items-center gap-2">
                  <MapPin size={12} /> {img.loc}
                </span>
                <h3 className="text-white font-display text-2xl md:text-3xl font-bold uppercase mb-4">{img.title}</h3>
                <div className="flex gap-4">
                   <div className="bg-white/10 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-white/80 text-[10px] md:text-xs font-bold border border-white/10">
                      Clean & Sweep Included
                   </div>
                </div>
              </div>
              
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <div className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${activeTab === 'after' ? 'bg-brand-green/90 border-brand-green text-white' : 'bg-brand-orange/90 border-brand-orange text-white'}`}>
                  {activeTab === 'after' ? 'AFTER: RECLAMATION' : 'BEFORE: GRIDLOCK'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:mt-20 text-center bg-brand-navy p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
           <p className="relative z-10 text-brand-orange font-black uppercase tracking-[0.3em] mb-6 text-xs">Social Transformation</p>
           <h3 className="relative z-10 font-display text-3xl md:text-5xl font-black mb-10 leading-tight">
             Join 100+ Calgary Families<br className="hidden md:block"/><span className="italic underline underline-offset-4 decoration-brand-green"> Reclaiming Their Space.</span>
           </h3>
           <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
             <a 
               href="https://www.facebook.com/profile.php?id=61589686545956" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1877F2] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
             >
               Visit our Facebook <ArrowRight size={20} />
             </a>
             <a 
               href="#contact" 
               className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-orange text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all shadow-xl shadow-brand-orange/20"
             >
               Book Now
             </a>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Transformation Marquee/Bar */}
      <div className="bg-brand-green py-3 sm:py-5 overflow-hidden whitespace-nowrap border-y-4 border-brand-navy relative z-20">
        <div className="animate-marquee flex gap-12 text-white font-black uppercase tracking-tighter text-lg sm:text-2xl">
          {[1,2,3,4,5].map(i => (
             <div key={i} className="flex gap-12 shrink-0 items-center">
               <span>Park your car again</span>
               <span className="text-brand-navy">★</span>
               <span>Winter-ready storage</span>
               <span className="text-brand-navy">★</span>
               <span>Calgary's #1 Choice</span>
               <span className="text-brand-navy">★</span>
               <span>No more driveway shovelling</span>
               <span className="text-brand-navy">★</span>
             </div>
          ))}
        </div>
      </div>

      <Gallery />

      {/* The Process */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">Our Method</div>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                3 Steps to <span className="text-brand-orange underline underline-offset-8 decoration-8">Freedom</span>
              </h2>
            </div>
            <div className="lg:col-span-8 xl:col-span-9 grid md:grid-cols-3 gap-12 lg:gap-16">
              {[
                { step: "01", title: "Instant Quote", desc: "Send us a photo or book a free on-site estimate. No pressure, just transparent pricing." },
                { step: "02", title: "Rapid Reboot", desc: "Our team arrives and clears the clutter. We sweep and do the heavy lifting for you." },
                { step: "03", title: "Park Your Car", desc: "Enjoy your reclaimed space. We handle disposal, recycling, and donations." }
              ].map((p, i) => (
                <div key={i} className="group p-0 lg:p-4 border-l-2 border-gray-100 hover:border-brand-orange transition-all hover:translate-x-2">
                  <span className="block font-black text-6xl xl:text-8xl text-gray-100 group-hover:text-brand-orange/20 transition-all mb-8 leading-none">{p.step}</span>
                  <h3 className="font-black text-2xl xl:text-3xl uppercase tracking-tighter mb-6 text-brand-navy leading-none">{p.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-lg xl:text-xl opacity-80">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Pricing />
      <ServiceArea />
      
      {/* Testimonial Section */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
           <div className="text-center mb-24">
              <h2 className="font-display text-5xl md:text-8xl xl:text-[100px] font-extrabold mb-4 uppercase tracking-tighter leading-none text-brand-navy">
                What Our <span className="text-brand-orange italic">Neighbours</span> Say
              </h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-10 xl:gap-16">
              {[
                { name: "Sarah J.", location: "Calgary", text: "Garage Reboot was professional, fast, and the transformation was night and day. I can finally see the floor!", stars: 5 },
                { name: "Mark T.", location: "Okotoks", text: "They took everything from old tires to broken appliances. No hidden fees, exactly as quoted. Highly recommend.", stars: 5 },
                { name: "Linda R.", location: "High River", text: "Best decision I made during my move. They cleared the garage in 2 hours flat. Saved me so much stress.", stars: 5 }
              ].map((t, i) => (
                <div key={i} className="bg-white p-12 xl:p-16 rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
                  <div className="flex text-brand-orange mb-8 scale-150">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                  </div>
                  <Quote className="text-brand-orange/20 mb-8" size={60} />
                  <p className="text-xl xl:text-2xl font-medium text-brand-navy/80 mb-10 leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-auto">
                    <p className="font-black text-2xl uppercase tracking-tighter text-brand-navy">{t.name}</p>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mt-2">{t.location}, Alberta</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <ContactForm />
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
}

