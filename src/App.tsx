/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import wideLandingImg from '@/images/wide-landing.png';
import illCleaning from '@/images/small-illustration-cleaning.png';
import illJunkRemoval from '@/images/small-illustration-JunkRemoval.png';
import illResidence from '@/images/small-illustration-residence.png';
import illThumbsUp from '@/images/small-illustration-ThumbsUp.png';
import serviceAreaMapImg from '@/images/map.png';
import servicesCardImg from '@/images/services-card.png';
import {
  Car,
  Trash2,
  Home,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Star,
  Quote,
  Warehouse,
  Backpack,
  Truck,
  Users,
  ChevronDown,
  Check
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cleanouts', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Neighbourhoods', href: '#area' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md py-3' : 'py-5 shadow-sm'}`}>
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
            <span className="font-display font-black text-2xl tracking-tighter leading-none text-brand-navy">
              GARAGE<span className="text-brand-orange">REBOOT</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Calgary's Local Choice
            </span>
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
          <div className="h-4 w-px mx-2 bg-gray-200" />
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-8%']);
  const beforeOpacity = useTransform(scrollYProgress, [0.03, 0.14], [1, 0]);
  const afterOpacity  = useTransform(scrollYProgress, [0.03, 0.14], [0, 1]);

  return (
    <section ref={heroRef} className="relative bg-brand-navy overflow-hidden">

      {/* ── MOBILE: floating image ── */}
      <div className="lg:hidden mt-20 px-4 pt-5 pb-2">
        <div className="relative">
          <img
            src="https://www.image2url.com/r2/default/images/1779108806945-2316eeed-e2c8-4770-ae6d-b4fc1dd0adb0.png"
            alt="Calgary Garage Before — Aspen Woods"
            className="w-full h-auto object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-brand-orange/95 text-white px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg backdrop-blur-sm">
            Your garage today?
          </div>
        </div>
      </div>

      {/* ── DESKTOP: right image panel — before → after crossfade on scroll ── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[52%] overflow-hidden">
        {/* Before */}
        <motion.img
          src="https://www.image2url.com/r2/default/images/1779108806945-2316eeed-e2c8-4770-ae6d-b4fc1dd0adb0.png"
          alt="Calgary Garage Before — Aspen Woods"
          style={{ y: imgY, opacity: beforeOpacity }}
          className="absolute inset-0 w-full h-[115%] object-cover"
          referrerPolicy="no-referrer"
        />
        {/* After */}
        <motion.img
          src="https://www.image2url.com/r2/default/images/1779108810514-57bb9fc8-cf96-4558-a5bb-820e64eb3350.png"
          alt="Calgary Garage After — Aspen Woods"
          style={{ y: imgY, opacity: afterOpacity }}
          className="absolute inset-0 w-full h-[115%] object-cover"
          referrerPolicy="no-referrer"
        />
        {/* "After" badge — fades in with the after image */}
        <motion.div
          style={{ opacity: afterOpacity }}
          className="absolute top-6 left-6 z-10 flex items-center gap-1.5 bg-brand-green/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">After</span>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/20 to-transparent" />
      </div>

      {/* ── DESKTOP: navy diagonal panel ── */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 bg-brand-navy z-10 pointer-events-none"
        style={{ width: '60%', clipPath: 'polygon(0 0, 100% 0, calc(100% - 100px) 100%, 0 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FF6A00 0, #FF6A00 1px, transparent 0, transparent 50%)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Warm orange glow anchored bottom-left — bridges visually to the green marquee below */}
        <div className="absolute bottom-0 left-0 w-96 h-40 bg-brand-orange/10 blur-3xl rounded-full translate-y-1/2" />
      </div>

      {/* ── Bottom fade bridge — hero → navy marquee ── */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-brand-navy/40 to-transparent z-10 pointer-events-none" />

      {/* ── CONTENT (shared, stacks on mobile / overlays on desktop) ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-20"
      >
        <div className="lg:min-h-screen flex flex-col justify-center pt-4 pb-7 sm:pb-14 lg:pt-32 lg:pb-20">
          <div className="relative lg:max-w-[620px] xl:max-w-[680px]">

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-wrap items-center gap-2 mb-3 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-brand-orange/15 text-brand-orange px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-black text-[9px] sm:text-[10px] uppercase tracking-widest border border-brand-orange/30">
                <span className="text-red-400 text-sm">🍁</span>
                <span>100% Calgarian Owned</span>
              </div>
              <div className="rotator-card hidden lg:inline-flex">
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
            </motion.div>

            {/* Headline */}
            <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_128px] items-center gap-1 sm:block">
              <motion.h1
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="font-display font-black tracking-tighter uppercase leading-[0.84] mb-3 sm:mb-8"
              >
                <span className="block text-white/25 text-[17px] sm:text-[38px] lg:text-[50px] xl:text-[58px]">Your</span>
                <span className="block text-brand-orange text-[55px] sm:text-[100px] lg:text-[126px] xl:text-[148px]">Garage.</span>
                <span className="block text-white text-[38px] sm:text-[64px] lg:text-[84px] xl:text-[100px]">
                  Reclaimed.
                </span>
              </motion.h1>

              <motion.img
                src={illThumbsUp}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="pointer-events-none -mr-6 mb-3 w-[148px] max-w-none justify-self-end self-center drop-shadow-2xl sm:hidden"
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 text-[15px] sm:text-lg lg:text-xl xl:text-2xl text-white/72 mb-4 sm:mb-10 leading-relaxed font-medium max-w-none sm:max-w-md"
            >
              Alberta's trusted team for{' '}
              <span className="text-white font-bold">garage cleanouts, junk removal &amp; moving</span>.{' '}
              Residential &amp; commercial — done fast.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-10 grid grid-cols-2 gap-2 sm:flex sm:gap-4 mb-4 sm:mb-12"
            >
              <a
                href="#contact"
                className="bg-brand-orange text-white px-4 sm:px-10 py-3.5 sm:py-5 rounded-xl font-black text-sm sm:text-lg uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-brand-orange/30 text-center"
              >
                Book Now
              </a>
              <a
                href="#gallery"
                className="bg-transparent text-white border-2 border-white/25 px-4 sm:px-10 py-3.5 sm:py-5 rounded-xl font-black text-sm sm:text-lg uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all text-center"
              >
                Before/After
              </a>
            </motion.div>

            {/* Social proof — compact mobile cards, full row on larger screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative z-10 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-6 pt-3 sm:pt-8 border-t border-white/10"
            >
              {/* Avatars + stars */}
              <div className="flex min-h-[70px] items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.045] p-3 sm:min-h-0 sm:border-0 sm:bg-transparent sm:p-0 shrink-0">
                <div className="flex -space-x-2 shrink-0">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-brand-navy overflow-hidden bg-gray-600 shrink-0">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-brand-orange">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={10} />)}
                  </div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-0.5">120+ Families</p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/15 shrink-0 hidden sm:block" />

              {/* Google rating */}
              <div className="flex min-h-[70px] items-center rounded-xl border border-white/10 bg-white/[0.045] p-3 sm:min-h-0 sm:border-0 sm:bg-transparent sm:p-0 shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-xl font-black text-white leading-none">5.0</span>
                  <span className="text-[9px] font-black text-brand-orange uppercase tracking-widest">★ Google</span>
                </div>
              </div>

              <div className="w-px h-8 bg-white/15 shrink-0 hidden sm:block" />

              {/* Service area */}
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest">We Drive Anywhere</p>
                <p className="text-[9px] text-white/40 tracking-wide">
                  Calgary · Okotoks · Airdrie · High River · Lethbridge
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── DESKTOP: review chip ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="hidden lg:block absolute right-16 xl:right-24 z-30 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 xl:p-6 max-w-[250px] xl:max-w-[270px]"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        {/* Stars */}
        <div className="flex text-brand-orange mb-3">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={13} />)}
        </div>
        <p className="text-brand-navy text-sm font-semibold italic leading-snug mb-4">
          "I can finally park my car in the garage again. Absolutely unbelievable transformation!"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/100?img=11" alt="Sarah J." className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-brand-navy text-xs font-black uppercase tracking-tight leading-none">Sarah J.</p>
            <p className="text-gray-400 text-[10px] font-medium mt-0.5">Calgary, AB · Google Review</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const featured = [
    {
      num: '01',
      title: 'Garage Cleanouts',
      desc: 'Full junk removal, heavy lifting, and a final sweep — your space, completely reclaimed.',
      badge: 'Local Favourite',
      accentColor: 'from-brand-orange/20 to-transparent',
      borderColor: 'border-brand-orange/20',
      ill: illCleaning,
    },
    {
      num: '02',
      title: 'Junk Removal',
      desc: 'Old fridge, broken appliances, clutter — cleared efficiently and responsibly. Same-day available.',
      badge: 'Rapid Response',
      accentColor: 'from-brand-green/20 to-transparent',
      borderColor: 'border-brand-green/20',
      ill: illJunkRemoval,
    },
  ];

  const secondary = [
    { num: '03', title: 'Student Moving', desc: 'Semester transitions, done.', badge: 'Semester Deal', ill: illResidence },
    { num: '04', title: 'Move-Out', desc: 'Clear leftovers, stay on schedule.', badge: 'Realtor Pick', ill: illThumbsUp },
    { num: '05', title: 'Full Moving', desc: 'Packing to delivery, handled.', badge: 'Elite Precision', ill: illResidence },
    { num: '06', title: 'Commercial', desc: 'Office & retail clear-outs.', badge: 'B2B Priority', ill: illJunkRemoval },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-brand-navy overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4"
        >
          <div>
            <div className="text-brand-green font-black uppercase text-[10px] tracking-[0.4em] mb-3">What We Do · 6 Services</div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-[88px] font-black uppercase tracking-tighter leading-none text-white">
              Our <span className="text-brand-orange">Impact</span>
            </h2>
          </div>
          <p className="md:max-w-[240px] text-sm text-white/35 font-medium leading-relaxed md:text-right">
            From heavy lifting to the final sweep — we reclaim every square inch.
          </p>
        </motion.div>

        {/* Featured: 2 large bento cards */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          {featured.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`group relative rounded-2xl overflow-hidden border ${svc.borderColor} bg-white/[0.05] min-h-[300px] sm:min-h-[340px] flex flex-col p-7 sm:p-10`}
            >
              {/* Ambient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${svc.accentColor} pointer-events-none`} />

              {/* Ghost number */}
              <span className="absolute -bottom-6 -right-2 font-display text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                {svc.num}
              </span>

              {/* Floating illustration */}
              <img
                src={svc.ill}
                alt=""
                className="absolute bottom-0 right-0 h-44 sm:h-56 w-auto object-contain pointer-events-none
                           translate-x-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-out drop-shadow-2xl"
              />

              {/* Content — max-width keeps it clear of illustration */}
              <div className="relative z-10 flex flex-col flex-1 max-w-[58%] sm:max-w-[55%]">
                <span className="inline-block self-start px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest mb-6">
                  {svc.badge}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-3">
                  {svc.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed flex-1 mb-8">
                  {svc.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-brand-navy font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl self-start hover:bg-brand-orange hover:text-white transition-colors duration-300 shadow-lg"
                >
                  Book Now <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary: 4 compact cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {secondary.map((svc, i) => (
            <motion.a
              key={svc.num}
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6 overflow-hidden flex flex-col hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300"
            >
              <img
                src={svc.ill}
                alt=""
                className="absolute -bottom-3 -right-3 h-24 w-auto object-contain opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none"
              />

              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className="font-display text-[10px] font-black text-white/20 tracking-[0.3em]">{svc.num}</span>
                <ArrowRight size={13} className="text-white/15 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all duration-300" />
              </div>

              <h3 className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight mb-2 relative z-10">
                {svc.title}
              </h3>
              <p className="text-xs text-white/35 leading-relaxed flex-1 mb-4 relative z-10">{svc.desc}</p>
              <span className="inline-block self-start px-2.5 py-1 rounded-full border border-white/10 text-white/25 text-[9px] font-black uppercase tracking-widest relative z-10">
                {svc.badge}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   TRUCK DIVIDER
───────────────────────────────────────────────── */
const TruckDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="bg-brand-soft border-y border-brand-navy/8 py-8 sm:py-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">

          {/* Animated truck */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <div className="truckWrapper">
              <div className="truckBody">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 54" fill="none">
                  {/* Cargo box */}
                  <rect x="2" y="2" width="82" height="46" rx="4" fill="#041B4D"/>
                  <rect x="2" y="2" width="82" height="9" rx="4" fill="rgba(255,255,255,0.06)"/>
                  {/* Garage Reboot lettering */}
                  <text x="43" y="30" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FF6A00" fontFamily="Arial, sans-serif" letterSpacing="0.5">GARAGE REBOOT</text>
                  <line x1="2" y1="38" x2="84" y2="38" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  {/* Exhaust stack */}
                  <rect x="74" y="0" width="5" height="9" rx="1.5" fill="#374151"/>
                  {/* Cabin */}
                  <rect x="84" y="6" width="41" height="42" rx="5" fill="#041B4D"/>
                  {/* Window */}
                  <rect x="88" y="10" width="24" height="18" rx="3" fill="#6BCB16" fillOpacity="0.75"/>
                  {/* Driver silhouette */}
                  <ellipse cx="102" cy="14" rx="5" ry="5" fill="#032044"/>
                  {/* Door line */}
                  <line x1="88" y1="30" x2="123" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  {/* Headlight */}
                  <rect x="121" y="18" width="5" height="9" rx="2" fill="#FF6A00"/>
                  {/* Bumper */}
                  <rect x="120" y="38" width="7" height="8" rx="2" fill="#374151"/>
                  {/* Grille lines */}
                  <line x1="121" y1="30" x2="125" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="121" y1="33" x2="125" y2="33" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="truckTires">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#282828"/>
                  <circle cx="12" cy="12" r="6" fill="#444"/>
                  <circle cx="12" cy="12" r="2.5" fill="#666"/>
                  <line x1="12" y1="7" x2="12" y2="17" stroke="#555" strokeWidth="1.2"/>
                  <line x1="7" y1="12" x2="17" y2="12" stroke="#555" strokeWidth="1.2"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#282828"/>
                  <circle cx="12" cy="12" r="6" fill="#444"/>
                  <circle cx="12" cy="12" r="2.5" fill="#666"/>
                  <line x1="12" y1="7" x2="12" y2="17" stroke="#555" strokeWidth="1.2"/>
                  <line x1="7" y1="12" x2="17" y2="12" stroke="#555" strokeWidth="1.2"/>
                </svg>
              </div>
              <div className="truckRoad" />
              <div className="truckLampPost">
                <svg viewBox="0 0 20 90" height="90" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <line x1="10" y1="22" x2="10" y2="90" stroke="#cbd5e1" strokeWidth="2"/>
                  <path d="M10 22 Q10 6 2 6" stroke="#cbd5e1" strokeWidth="2"/>
                  <circle cx="2" cy="6" r="3.5" fill="#FF6A00" opacity="0.7"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-brand-navy tracking-tight leading-tight">
              Dispatching Daily —{' '}
              <span className="text-brand-orange">Calgary &amp; Beyond</span>
            </p>
            <p className="text-sm text-gray-400 font-medium mt-1">Same-day availability · Southern Alberta</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sm:ml-auto flex gap-6 sm:gap-10"
          >
            {[
              { val: '120+', label: 'Jobs Done' },
              { val: '5.0★', label: 'Google' },
              { val: '<1hr', label: 'Response' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl sm:text-2xl font-black text-brand-navy leading-none">{s.val}</div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   PRICING
───────────────────────────────────────────────── */
const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'haul' | 'labor' | 'moving'>('haul');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs = [
    { id: 'haul' as const,   label: 'Haul It Away',    icon: <Trash2 size={15} />,  sub: 'We remove & dispose' },
    { id: 'labor' as const,  label: 'Just the Muscle', icon: <Users size={15} />,   sub: 'You handle disposal' },
    { id: 'moving' as const, label: "I'm Moving",      icon: <Truck size={15} />,   sub: 'Full moving service' },
  ];

  const pricing = {
    haul: [
      { name: 'Mini Load',      from: '$80',  to: '$120', desc: 'A few bags or small items. Quick in, quick out.', tags: ['Up to 6–8 items', 'Dump fees included', '1 crew member'] },
      { name: 'Quarter Truck',  from: '$150', to: '$200', desc: 'A sofa, appliance, or a corner of the garage.', tags: ['~¼ truck volume', 'Dump fees included', '2 crew members'] },
      { name: 'Half Truck',     from: '$250', to: '$350', desc: 'Standard garage cleanout. Most common choice.', tags: ['~½ truck volume', 'Dump fees included', '2 crew members', 'Final sweep'], popular: true },
      { name: 'Full Truck',     from: '$400', to: '$600', desc: 'Total transformation. Full estate or garage.', tags: ['Full truck volume', 'Dump fees included', '2–3 crew members', 'Final sweep'] },
    ],
    labor: [
      { name: '2 Hours',   from: '$120', to: '$160', desc: 'Perfect for loading a rental truck or clearing one room.', tags: ['2 hrs · 2 crew', 'You arrange disposal', 'Great alongside movers'] },
      { name: '4 Hours',   from: '$200', to: '$260', desc: 'Empty a garage or clear multiple rooms. Half-day job.', tags: ['4 hrs · 2 crew', 'You arrange disposal', 'Equipment provided'], popular: true },
      { name: 'Full Day',  from: '$320', to: '$400', desc: 'Big job on your timeline — we provide all the muscle.', tags: ['8 hrs · 2 crew', 'You arrange disposal', 'All equipment included'] },
    ],
    moving: [
      { name: 'Quick Move', from: '$200', to: '$350', desc: 'Studio or 1–2 rooms. Same-city, fast turnaround.', tags: ['2–3 hrs · 2 crew', 'Truck included', 'Blankets & straps'] },
      { name: 'Full Home',  from: '$400', to: '$700', desc: '3+ bedrooms. Full local move, handled with care.', tags: ['4–8 hrs · 2–3 crew', 'Full-size truck', 'Blankets & straps'], popular: true },
      { name: 'Custom',     from: 'Free', to: '',    desc: 'Large estate, long haul, or specialty items? Call us.', tags: ['Tailored scope', 'Multi-day OK', 'Free consultation'] },
    ],
  };

  const faqs = [
    { q: "What's included in the price?", a: "Junk & Haul: labor, truck, dump fees, and equipment. Labor Only: crew time and equipment — you handle disposal. Moving: truck, labor, protective blankets and straps. There are no surprise charges." },
    { q: "I just need hands to empty a space — no disposal needed. Can you do that?", a: "Absolutely — that's exactly what our 'Just the Muscle' packages are for. You handle where things go (donation, bin rental, family pickup), and we provide a 2-person crew for 2, 4, or 8 hours." },
    { q: "How do I know which load size I need?", a: "Most garages with standard clutter are a half-truck load. A single sofa or appliance is a quarter. Send us a photo over text and we'll give you an honest estimate — zero upsell." },
    { q: "Do you take large appliances — fridges, stoves, old hot tubs?", a: "Yes. Appliances are included in all Junk & Haul tiers. Hot tubs may require an add-on due to disassembly — just mention it when booking and we'll quote it upfront." },
    { q: "Is there a minimum charge?", a: "Our minimum job is $80 (mini load). Labor-only bookings start at 2 hours ($120–$160). No charge for a quote." },
    { q: "Do I need to sort or bag items before you arrive?", a: "Nope. We sort on-site — just point us to what goes and we'll handle the rest. If you want to keep anything specific, flag it and we won't touch it." },
    { q: "How far ahead do I need to book?", a: "Same-day bookings are available when crew is free (call for fastest response). Online scheduling is open 24/7 — most jobs confirm within a few hours." },
    { q: "Do you recycle or donate items?", a: "Yes. We go to donation centres first whenever items are in good condition. Recyclables go to proper facilities. The landfill is always our last resort." },
  ];

  const currentTiers = pricing[activeTab];

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="garage-pattern absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-white/[0.82]" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6"
        >
          <div>
            <div className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-3">Investment</div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-[88px] font-black uppercase tracking-tighter leading-none text-brand-navy">
              Fair <span className="text-brand-orange">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-medium mt-3 max-w-sm">
              We charge by <span className="font-black text-brand-navy">volume, not hours</span>. Dump fees always included. No surprises.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={illJunkRemoval}
              alt=""
              className="hidden sm:block h-32 w-auto object-contain -rotate-3 drop-shadow-2xl"
            />
            <div className="flex flex-wrap gap-3">
              {['No Hidden Fees', 'Eco-Friendly', 'Same-Day Available'].map(b => (
                <div key={b} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-soft border border-brand-navy/8 text-[10px] font-black text-brand-navy/60 uppercase tracking-widest">
                  <Check size={10} className="text-brand-green" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scenario tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8 p-2 bg-brand-soft rounded-2xl border border-brand-navy/8"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-4 px-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/20'
                  : 'text-brand-navy/50 hover:text-brand-navy hover:bg-white/50'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-brand-orange' : ''}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`hidden sm:inline text-[9px] font-medium normal-case tracking-normal ${activeTab === tab.id ? 'text-white/50' : 'text-brand-navy/30'}`}>
                — {tab.sub}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Pricing cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            {currentTiers.map((tier, i) => {
              const isPopular = (tier as { popular?: boolean }).popular ?? false;
              const isFree = tier.from === 'Free';
              const priceNum = tier.from.replace('$', '');
              const perLabel = activeTab === 'haul' ? 'per load' : activeTab === 'labor' ? 'per job' : 'per move';

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`plan-card flex flex-col ${isPopular ? 'plan-card-popular' : ''}`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="bg-brand-orange text-white text-center py-1.5 text-[9px] font-black uppercase tracking-[0.2em]">
                      ★ Most Popular
                    </div>
                  )}

                  {/* Card header */}
                  <div className="px-6 pt-5 pb-2">
                    <h3 className={`font-display text-2xl font-black uppercase tracking-tight leading-none ${isPopular ? 'text-white' : 'text-brand-navy'}`}>
                      {tier.name}
                    </h3>
                    <span className={`block mt-1 text-[11px] font-normal leading-snug ${isPopular ? 'text-white/45' : 'text-gray-400'}`}>
                      {tier.desc}
                    </span>
                  </div>

                  {/* Price ribbon */}
                  <div className="px-6 my-4">
                    <div className="plan-ribbon">
                      {isFree ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-display text-3xl font-black leading-none">Free</span>
                          <span className="text-white/70 text-xs font-light">consult</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-0.5">
                            <span className="text-white/75 text-xs font-light self-start mt-1.5">$</span>
                            <span className="text-white font-display text-[2rem] font-black leading-none">{priceNum}</span>
                            {tier.to && (
                              <span className="text-white/55 text-sm font-light ml-2 self-end mb-0.5">– {tier.to}</span>
                            )}
                          </div>
                          <div className="text-white/60 text-[9px] font-medium tracking-wide mt-0.5">
                            {perLabel} · CAD estimate
                          </div>
                        </>
                      )}
                      <div className="plan-ribbon-fold" />
                    </div>
                  </div>

                  {/* Benefits list */}
                  <div className="px-6 flex-1">
                    <ul className="space-y-2">
                      {tier.tags.map(tag => (
                        <li key={tag} className={`flex items-center gap-2 text-[13px] ${isPopular ? 'text-white/65' : 'text-gray-500'}`}>
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6.5" stroke="#6BCB16" strokeWidth="1"/>
                            <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke="#6BCB16" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="font-light">{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex justify-center px-6 pt-5 pb-5">
                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded font-black text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                        isPopular
                          ? 'bg-brand-orange text-white hover:brightness-110'
                          : 'bg-brand-navy text-white hover:bg-brand-orange'
                      }`}
                    >
                      <ArrowRight size={12} />
                      {isFree ? 'Get Free Quote' : 'Book This'}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t-2 border-brand-navy/8 pt-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-navy">Common Questions</h3>
            <span className="px-2.5 py-1 rounded-full bg-brand-soft text-brand-navy/40 text-[10px] font-black uppercase tracking-widest">{faqs.length} answers</span>
          </div>

          <div className="grid md:grid-cols-2 gap-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border border-brand-navy/8 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-3 p-4 sm:p-5 text-left hover:bg-brand-soft/50 transition-colors"
                >
                  <span className="font-black text-sm text-brand-navy leading-snug">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 mt-0.5 text-brand-navy/40"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="faq-answer"
                    >
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-gray-500 leading-relaxed border-t border-brand-navy/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceArea = () => {
  const areas = [
    { name: 'Calgary', sub: 'All 8 Quadrants', eta: 'Home base', tone: 'hub', position: 'left-[50%] top-[50%]' },
    { name: 'Airdrie & Cochrane', sub: 'North Corridor', eta: '30-45 min', tone: 'north', position: 'left-[48%] top-[25%]' },
    { name: 'Okotoks & High River', sub: 'South Foothills', eta: '35-55 min', tone: 'south', position: 'left-[55%] top-[72%]' },
    { name: 'Banff & Canmore', sub: 'Rocky Mountains', eta: 'By route', tone: 'west', position: 'left-[23%] top-[43%]' },
    { name: 'Brooks & Lethbridge', sub: 'Eastern Prairies', eta: 'By route', tone: 'east', position: 'left-[78%] top-[58%]' },
    { name: 'Rural Alberta', sub: 'By Request', eta: 'Scheduled', tone: 'rural', position: 'left-[71%] top-[31%]' },
  ];

  const stats = [
    { val: '3hr', label: 'Drive Radius' },
    { val: '6+', label: 'Communities' },
    { val: '<1hr', label: 'Response' },
    { val: '5.0', label: 'Google Rated' },
  ];

  return (
    <section id="area" className="relative bg-brand-soft text-brand-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(4,27,77,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(4,27,77,0.045)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,106,0,0.12),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(107,203,22,0.16),transparent_26%)]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 md:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 xl:gap-14 items-center">
          <div className="relative rounded-2xl border border-brand-navy/10 bg-white/90 p-5 shadow-sm lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-brand-orange font-black uppercase text-[9px] sm:text-[10px] tracking-[0.26em] sm:tracking-[0.34em] mb-5 shadow-sm"
            >
              <Truck size={12} className="shrink-0" />
              Service Area · Southern Alberta
            </motion.div>

            <div className="mb-5 sm:mb-7">
              {['We Come', 'To You.'].map((line, i) => (
                <div key={line}>
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display font-black uppercase tracking-tighter leading-[0.88] ${
                      i === 1 ? 'text-brand-orange drop-shadow-[0_1px_0_rgba(4,27,77,0.18)]' : 'text-brand-navy'
                    }`}
                    style={{ fontSize: 'clamp(56px, 9vw, 128px)' }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="max-w-xl text-[15px] sm:text-base leading-relaxed text-brand-navy/[0.68] mb-7 sm:mb-9"
            >
              Rockies, prairies, or downtown Calgary - wherever your space needs reclaiming,{' '}
              <span className="text-brand-navy font-black">our crew arrives same day.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-7 sm:mb-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-brand-navy/10 bg-white px-3 py-4 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="font-display text-3xl sm:text-4xl font-black text-brand-navy leading-none">{s.val}</div>
                    {s.label === 'Google Rated' && <Star size={16} className="fill-brand-orange text-brand-orange" />}
                  </div>
                  <div className="text-[9px] font-black text-brand-navy/[0.42] uppercase tracking-widest mt-2">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="rounded-2xl border border-brand-navy/10 bg-white p-3 shadow-sm lg:hidden"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white">
                  <Truck size={18} />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-[10px] text-brand-orange">Mobile Dispatch</p>
                  <p className="mt-1 text-sm leading-snug text-brand-navy/[0.65]">
                    Calgary based, road-ready crews for cleanouts, junk removal, and moving support.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {areas.slice(0, 3).map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 rounded-xl bg-brand-soft px-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-black uppercase tracking-wide text-brand-navy">{area.name}</p>
                      <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-widest text-brand-navy/[0.42]">{area.sub}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-brand-orange">{area.eta}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="hidden lg:flex flex-wrap gap-2">
              {areas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 shadow-sm ${
                    area.tone === 'hub'
                      ? 'border-brand-orange/45 bg-brand-orange/15 text-brand-orange'
                      : 'border-brand-navy/10 bg-white text-brand-navy/75'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${area.tone === 'hub' ? 'bg-brand-orange' : 'bg-brand-green'}`} />
                  <span className="text-[10px] font-black uppercase tracking-wide">{area.name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-7 overflow-hidden rounded-2xl border border-brand-navy/10 bg-brand-navy p-2 shadow-2xl shadow-brand-navy/12 lg:hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/12 via-transparent to-brand-green/10" />
              <img
                src={servicesCardImg}
                alt="Garage Reboot service options overview"
                className="relative z-10 block w-full rounded-xl object-contain"
              />
              <div className="absolute left-4 top-4 z-20 hidden rounded-full bg-brand-orange px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg sm:block">
                Services Ready
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-2xl shadow-brand-navy/10 lg:block"
          >
            <div className="grid grid-cols-[0.72fr_1fr] gap-4">
              <div className="flex flex-col justify-between rounded-xl bg-brand-navy p-5 text-white">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.32em] text-white/35">Dispatch View</p>
                  <h3 className="mt-2 font-display text-3xl font-black uppercase tracking-tight leading-none">
                    Calgary<br />
                    <span className="text-brand-orange">Outward.</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    A compact view of our core routes, mountain corridor, and prairie coverage.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  {stats.slice(0, 2).map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.055] p-3">
                      <p className="font-display text-2xl font-black leading-none text-white">{s.val}</p>
                      <p className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/35">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="relative overflow-hidden rounded-xl bg-brand-navy shadow-2xl shadow-black/20">
                  <img
                    src={serviceAreaMapImg}
                    alt="Garage Reboot Southern Alberta service area map centered on Calgary"
                    className="mx-auto block max-h-[430px] w-auto max-w-full object-contain"
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {areas.slice(0, 4).map((area) => (
                    <div key={area.name} className="rounded-xl border border-brand-navy/8 bg-brand-soft px-3 py-2.5">
                      <p className="truncate text-[10px] font-black uppercase tracking-wide text-brand-navy">{area.name}</p>
                      <p className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-widest text-brand-navy/[0.4]">{area.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-16 md:mt-24 bg-brand-orange overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none">
          <span className="font-display font-black text-white/[0.06] leading-none pr-8" style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}>
            CALL
          </span>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-brand-navy/70 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Direct Line to Dispatch</p>
            <a
              href="tel:4035550123"
              className="font-display font-black tracking-tighter text-white block hover:opacity-85 transition-opacity"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
            >
              (403) 555-0123
            </a>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-navy text-white font-black text-sm uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-white hover:text-brand-navy transition-colors shadow-xl"
          >
            Book Online <ArrowRight size={15} />
          </a>
        </div>
      </motion.div>

    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', details: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(prev => [...prev, ...selected].slice(0, 5));
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const fd = new FormData();
      fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
      fd.append('subject', `Garage Reboot Quote — ${form.service}`);
      fd.append('from_name', 'Garage Reboot Website');
      fd.append('Name', form.name);
      fd.append('Email', form.email);
      fd.append('Phone', form.phone);
      fd.append('Service', form.service);
      fd.append('Details', form.details);
      files.forEach((file, i) => fd.append(`Photo_${i + 1}`, file, file.name));

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', details: '' });
        setFiles([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-gray-50 rounded-sm p-10 md:p-20 border border-gray-100 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="w-20 h-20 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center mx-auto mb-8">
                <Check size={36} className="text-brand-green" strokeWidth={3} />
              </div>
              <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-brand-navy mb-4">
                Quote <span className="text-brand-orange">Sent!</span>
              </h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-10">
                We'll be in touch within 30 minutes.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-brand-navy text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand-orange transition-all"
              >
                Send Another Request
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

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

            <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mx-auto">
              {/* Row 1: Name + Phone */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="contact-input-group">
                  <input required type="text" name="name" value={form.name} onChange={handleChange} className="contact-input" placeholder=" " />
                  <span className="contact-bar" />
                  <label className="contact-label">Full Name</label>
                </div>
                <div className="contact-input-group">
                  <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="contact-input" placeholder=" " />
                  <span className="contact-bar" />
                  <label className="contact-label">Phone Number</label>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="contact-input-group">
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="contact-input" placeholder=" " />
                <span className="contact-bar" />
                <label className="contact-label">Email Address</label>
              </div>

              {/* Row 3: Service */}
              <div className="contact-input-group">
                <select required name="service" value={form.service} onChange={handleChange} className="contact-input appearance-none cursor-pointer uppercase tracking-widest">
                  <option value="" disabled hidden> </option>
                  <option>Full Garage Reboot</option>
                  <option>Junk Removal (Commercial/Res)</option>
                  <option>Student Move Out/In</option>
                  <option>Full Moving Service</option>
                  <option>Estate/Move-Out Service</option>
                </select>
                <span className="contact-bar" />
                <label className="contact-label">Service Required</label>
              </div>

              {/* Row 4: Details */}
              <div className="contact-input-group">
                <textarea required rows={4} name="details" value={form.details} onChange={handleChange} className="contact-input" placeholder=" " />
                <span className="contact-bar" />
                <label className="contact-label">Details & Location</label>
              </div>

              {/* Row 5: Photo upload */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">
                  Attach Photos <span className="font-normal normal-case tracking-normal">(optional · up to 5 images)</span>
                </p>
                <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-brand-orange hover:bg-brand-orange/[0.02] transition-all group">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                  <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <svg className="w-5 h-5 text-brand-navy/40 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-gray-400 group-hover:text-brand-navy transition-colors">
                    {files.length === 0 ? 'Click to upload garage photos' : `${files.length} photo${files.length > 1 ? 's' : ''} selected — click to add more`}
                  </span>
                </label>

                {files.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {files.map((file, i) => (
                      <div key={i} className="relative group/thumb">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-navy text-white text-[10px] flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          ×
                        </button>
                        <p className="text-[9px] text-gray-400 mt-1 w-20 truncate text-center">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-bold text-center -mt-4">
                  Something went wrong — please try again or call us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-navy text-white py-6 rounded-xl font-black text-2xl uppercase tracking-widest hover:bg-brand-orange transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
              >
                {status === 'sending' ? 'Sending…' : 'Reboot My Garage'}
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
  const projects = [
    {
      num: "01",
      before: "https://www.image2url.com/r2/default/images/1779108806945-2316eeed-e2c8-4770-ae6d-b4fc1dd0adb0.png",
      after: "https://www.image2url.com/r2/default/images/1779108810514-57bb9fc8-cf96-4558-a5bb-820e64eb3350.png",
      title: "Aspen Woods Reset",
      loc: "Southwest Calgary",
      service: "Full Garage Cleanout"
    },
    {
      num: "02",
      before: "https://www.image2url.com/r2/default/images/1779113094140-19a1f514-3650-47f6-93d1-7425638cb1c4.png",
      after: "https://www.image2url.com/r2/default/images/1779113099401-74683ad9-a22b-44ae-bbf2-625902ac214e.png",
      title: "Estate Cleanout",
      loc: "Mount Royal",
      service: "Estate Cleanout + Haul"
    }
  ];

  return (
    <section id="gallery" className="relative py-16 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-soft to-transparent pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-9 md:mb-20"
        >
          <div className="text-brand-orange font-black uppercase text-[10px] tracking-[0.32em] sm:tracking-[0.4em] mb-3 sm:mb-4">Before &amp; After</div>
          <h2 className="font-display text-[42px] sm:text-6xl md:text-7xl xl:text-[96px] font-black uppercase tracking-tighter leading-[0.9] text-brand-navy">
            Real Results.<br />
            <span className="text-brand-green">Real Calgary Homes.</span>
          </h2>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-8 md:gap-20">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl border border-brand-navy/10 bg-brand-navy p-3 shadow-[0_16px_45px_rgba(4,27,77,0.18)] sm:bg-white sm:p-0 sm:border-0 sm:shadow-none"
            >
              {/* Ghost project number */}
              <span className="absolute -top-3 right-3 sm:left-0 sm:right-auto font-display text-[74px] sm:text-[100px] md:text-[160px] font-black text-white/[0.08] sm:text-brand-navy/[0.04] leading-none select-none pointer-events-none z-0">
                {proj.num}
              </span>

              <div className="relative z-10 mb-3 flex items-center justify-between gap-3 sm:hidden">
                <div>
                  <p className="text-[9px] text-brand-orange font-black uppercase tracking-[0.28em] flex items-center gap-1.5">
                    <MapPin size={10} /> {proj.loc}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-white leading-none">
                    {proj.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-widest text-white/60">
                  {proj.num}
                </span>
              </div>

              {/* Before + After panels */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-[3px] bg-transparent sm:bg-gray-200 rounded-xl sm:rounded-2xl overflow-visible sm:overflow-hidden sm:shadow-[0_8px_40px_rgba(4,27,77,0.10)]">
                {/* BEFORE */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/25 sm:rounded-none sm:border-0 sm:shadow-none" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={proj.before}
                    alt={`Before — ${proj.title}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-navy/25" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 bg-black/65 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span className="text-white/90 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Before</span>
                  </div>
                </div>

                <div className="relative z-20 -my-1 flex items-center justify-center sm:hidden">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-brand-orange px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-orange/30">
                    <span>Clear</span>
                    <ArrowRight size={12} />
                    <span>Reclaim</span>
                  </div>
                </div>

                {/* AFTER */}
                <div className="relative overflow-hidden rounded-xl border border-brand-green/30 shadow-lg shadow-brand-green/10 sm:rounded-none sm:border-0 sm:shadow-none group" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={proj.after}
                    alt={`After — ${proj.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 bg-brand-green backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md">
                    <div className="w-2 h-2 rounded-full bg-white shrink-0" />
                    <span className="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest">After</span>
                  </div>
                </div>
              </div>

              {/* Project metadata */}
              <div className="hidden sm:flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mt-4 px-1 sm:px-1">
                <div>
                  <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-1 flex items-center gap-1.5">
                    <MapPin size={10} /> {proj.loc}
                  </p>
                  <h3 className="font-display text-2xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-navy leading-none">
                    {proj.title}
                  </h3>
                </div>
                <span className="w-fit px-3 py-1.5 rounded-full bg-brand-soft text-brand-navy/55 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shrink-0 sm:ml-4">
                  {proj.service}
                </span>
              </div>

              <div className="relative z-10 mt-3 flex items-center justify-between gap-3 sm:hidden">
                <span className="min-w-0 rounded-full bg-white px-3 py-2 text-[9px] font-black uppercase tracking-widest text-brand-navy truncate">
                  {proj.service}
                </span>
                <a href="#contact" className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3 py-2 text-[9px] font-black uppercase tracking-widest text-brand-navy">
                  Book Similar <ArrowRight size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t-2 border-brand-navy/8"
        >
          <p className="font-display text-2xl md:text-3xl font-black uppercase text-brand-navy text-center sm:text-left leading-tight">
            Your garage could be{' '}
            <span className="text-brand-green">next.</span>
          </p>
          <a
            href="#contact"
            className="shrink-0 bg-brand-orange text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-orange/25 inline-flex items-center gap-2"
          >
            Get Free Quote <ArrowRight size={16} />
          </a>
        </motion.div>
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

      {/* Wide-landing image — flows directly out of the hero */}
      <div className="hidden lg:block relative bg-brand-navy">
        {/* Top fade pulls the hero into the image seamlessly */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-navy to-transparent z-10 pointer-events-none" />
        <img
          src={wideLandingImg}
          alt="Clean organized Calgary garage after Garage Reboot transformation"
          className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] object-cover block"
        />
        {/* Bottom fade into the navy marquee */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-navy to-transparent z-10 pointer-events-none" />
      </div>

      {/* Transformation Marquee/Bar */}
      <div className="bg-brand-navy py-3 sm:py-5 overflow-hidden whitespace-nowrap border-y-4 border-brand-orange relative z-20">
        <div className="animate-marquee flex gap-12 text-white font-black uppercase tracking-tighter text-lg sm:text-2xl">
          {[1,2,3,4,5].map(i => (
             <div key={i} className="flex gap-12 shrink-0 items-center">
               <span>Park your car again</span>
               <span className="text-brand-orange">★</span>
               <span>Winter-ready storage</span>
               <span className="text-brand-orange">★</span>
               <span>Calgary's #1 Choice</span>
               <span className="text-brand-orange">★</span>
               <span>No more driveway shovelling</span>
               <span className="text-brand-orange">★</span>
             </div>
          ))}
        </div>
      </div>

      <Gallery />

      {/* The Process */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 xl:col-span-3"
            >
              <div className="text-brand-orange font-black uppercase text-xs tracking-[0.4em] mb-4">Our Method</div>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                3 Steps to <span className="text-brand-orange underline underline-offset-8 decoration-8">Freedom</span>
              </h2>
            </motion.div>
            <div className="lg:col-span-8 xl:col-span-9 grid md:grid-cols-3 gap-12 lg:gap-16">
              {[
                { step: "01", title: "Instant Quote", desc: "Send us a photo or book a free on-site estimate. No pressure, just transparent pricing.", ill: illThumbsUp },
                { step: "02", title: "Rapid Reboot", desc: "Our team arrives and clears the clutter. We sweep and do the heavy lifting for you.", ill: illCleaning },
                { step: "03", title: "Park Your Car", desc: "Enjoy your reclaimed space. We handle disposal, recycling, and donations.", ill: illResidence }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl lg:p-6"
                >
                  <span className="absolute -right-2 -top-3 font-black text-7xl xl:text-8xl text-brand-navy/[0.04] group-hover:text-brand-orange/10 transition-all leading-none">{p.step}</span>
                  <div className="relative z-10 mb-6 flex h-32 items-end justify-center rounded-xl bg-brand-soft">
                    <img src={p.ill} alt="" className="h-36 w-auto object-contain drop-shadow-xl" />
                  </div>
                  <h3 className="relative z-10 font-black text-2xl xl:text-3xl uppercase tracking-tighter mb-4 text-brand-navy leading-none">{p.title}</h3>
                  <p className="relative z-10 text-gray-500 font-medium leading-relaxed text-base xl:text-lg opacity-80">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Services />
      <TruckDivider />
      <Pricing />
      <ServiceArea />
      
      {/* Testimonial Section */}
      <section className="py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16 md:mb-24"
           >
              <img
                src={illThumbsUp}
                alt=""
                className="mx-auto mb-5 h-28 w-auto object-contain drop-shadow-xl"
              />
              <div className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4">Real People · Real Results</div>
              <h2 className="font-display text-5xl md:text-8xl xl:text-[100px] font-extrabold mb-4 uppercase tracking-tighter leading-none text-brand-navy">
                What Our <span className="text-brand-orange italic">Neighbours</span> Say
              </h2>
           </motion.div>

           <div className="grid md:grid-cols-3 gap-6 xl:gap-10">
              {[
                { name: "Sarah J.", location: "Calgary", text: "Garage Reboot was professional, fast, and the transformation was night and day. I can finally see the floor!", stars: 5 },
                { name: "Mark T.", location: "Okotoks", text: "They took everything from old tires to broken appliances. No hidden fees, exactly as quoted. Highly recommend.", stars: 5 },
                { name: "Linda R.", location: "High River", text: "Best decision I made during my move. They cleared the garage in 2 hours flat. Saved me so much stress.", stars: 5 }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex text-brand-orange mb-6">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
                  </div>
                  <Quote className="text-brand-orange/15 mb-6" size={40} />
                  <p className="text-base sm:text-lg font-medium text-brand-navy/75 mb-8 leading-relaxed italic flex-1">"{t.text}"</p>
                  <div className="mt-auto pt-6 border-t border-gray-100 w-full text-center">
                    <p className="font-black text-lg uppercase tracking-tighter text-brand-navy">{t.name}</p>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mt-1">{t.location}, Alberta</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
