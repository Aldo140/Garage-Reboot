/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { TOWNS, CORRIDOR_LABELS, driveLabel, type Corridor } from './towns';
import { Analytics } from './analytics';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group } from 'three';
import wideLandingImg from '@/images/hero/wide-banner.webp';
import logoImg from '@/images/logo.png';
import heroBeforeImg from '@/images/hero/before.webp';
import heroAfterImg from '@/images/hero/after.webp';
import extra1Img from '@/images/hero/slide-1.webp';
import extra2Img from '@/images/hero/slide-2.webp';
import extra3Img from '@/images/hero/slide-3.webp';
import illCleaning from '@/images/illustrations/cleaning.png';
import illJunkRemoval from '@/images/illustrations/junk-removal.png';
import illResidence from '@/images/illustrations/residence.png';
import illThumbsUp from '@/images/illustrations/thumbs-up.png';
import serviceAreaMapImg from '@/images/sections/service-area-map.webp';
import servicesCardImg from '@/images/sections/services-card.webp';
import reviewsImg from '@/images/illustrations/reviews.png';
import qnaImg from '@/images/illustrations/qna.png';
import illProcessQuote from '@/images/illustrations/process-quote.png';
import illProcessReboot from '@/images/illustrations/process-reboot.png';
import illProcessComplete from '@/images/illustrations/process-complete.png';
import teamIndoorImg from '@/images/team/indoor-cleanout.webp';
import teamGarageImg from '@/images/team/garage-haul.webp';
import teamTruckImg from '@/images/team/truck-load.webp';
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
              src={logoImg}
              alt="Garage Reboot Logo"
              className="w-full h-full object-contain"
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

const HERO_SLIDES = [heroBeforeImg, heroAfterImg, extra1Img, extra2Img, extra3Img];
const REVEAL_RADIUS = 140;

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const revealPanelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-8%']);

  // Refs for direct DOM updates — zero React re-renders on mouse move
  const cursorWrapRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef  = useRef<HTMLDivElement>(null);
  const cursorDotRef   = useRef<HTMLDivElement>(null);
  const cursorPeekRef  = useRef<HTMLDivElement>(null);
  const clipDivRef     = useRef<HTMLDivElement>(null);
  const hoverHintRef   = useRef<HTMLDivElement>(null);
  const preStateRef    = useRef<HTMLDivElement>(null);
  const postStateRef   = useRef<HTMLDivElement>(null);

  // Mobile slideshow (timer-driven, low frequency — fine as state)
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 3600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    let wasOver = false;
    let lastX = 0, lastY = 0;

    const setOver = (over: boolean) => {
      if (over === wasOver) return;
      wasOver = over;

      const ring = cursorRingRef.current;
      if (ring) {
        ring.style.width        = over ? `${REVEAL_RADIUS * 2}px` : '34px';
        ring.style.height       = over ? `${REVEAL_RADIUS * 2}px` : '34px';
        ring.style.left         = over ? `-${REVEAL_RADIUS}px`    : '-17px';
        ring.style.top          = over ? `-${REVEAL_RADIUS}px`    : '-17px';
        ring.style.borderColor  = over ? 'rgba(255,106,0,0.8)'    : 'rgba(255,255,255,0.55)';
        ring.style.boxShadow    = over ? '0 0 30px rgba(255,106,0,0.22), inset 0 0 30px rgba(255,106,0,0.06)' : 'none';
      }
      if (cursorDotRef.current)  cursorDotRef.current.style.background = over ? '#FF6A00' : '#fff';
      if (cursorPeekRef.current) cursorPeekRef.current.style.display   = over ? 'block'   : 'none';
      if (hoverHintRef.current)  hoverHintRef.current.style.opacity    = over ? '0'       : '1';
      if (preStateRef.current)   preStateRef.current.style.opacity     = over ? '0'       : '1';
      if (postStateRef.current)  postStateRef.current.style.opacity    = over ? '1'       : '0';

      if (clipDivRef.current) {
        if (over) {
          clipDivRef.current.style.transition = 'clip-path 0.12s ease-out';
        } else {
          clipDivRef.current.style.transition = 'clip-path 0.38s ease-in';
          clipDivRef.current.style.clipPath   = `circle(0px at ${lastX}px ${lastY}px)`;
        }
      }

      if (over) Analytics.revealHover();
    };

    const onMove = (e: MouseEvent) => {
      const wrap = cursorWrapRef.current;
      if (wrap) {
        wrap.style.left    = `${e.clientX}px`;
        wrap.style.top     = `${e.clientY}px`;
        wrap.style.opacity = '1';
      }
      if (revealPanelRef.current) {
        const rect = revealPanelRef.current.getBoundingClientRect();
        const inPanel = e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top  && e.clientY <= rect.bottom;
        setOver(inPanel);
        if (inPanel && clipDivRef.current) {
          lastX = e.clientX - rect.left;
          lastY = e.clientY - rect.top;
          clipDivRef.current.style.clipPath = `circle(${REVEAL_RADIUS}px at ${lastX}px ${lastY}px)`;
        }
      }
    };

    const onLeave = () => {
      if (cursorWrapRef.current) cursorWrapRef.current.style.opacity = '0';
      setOver(false);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.body.style.cursor = prev;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative bg-brand-navy overflow-hidden">

      {/* ── Global custom cursor — all updates via DOM refs, no setState ── */}
      <div
        ref={cursorWrapRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ left: -300, top: -300, opacity: 0, transition: 'opacity 0.15s' }}
      >
        <div ref={cursorRingRef} style={{
          position: 'absolute', borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.55)',
          width: 34, height: 34, left: -17, top: -17, boxShadow: 'none',
          transition: 'width 0.38s cubic-bezier(0.16,1,0.3,1), height 0.38s cubic-bezier(0.16,1,0.3,1), left 0.38s cubic-bezier(0.16,1,0.3,1), top 0.38s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, box-shadow 0.2s',
        }} />
        <div ref={cursorDotRef} style={{
          position: 'absolute', width: 5, height: 5, left: -2.5, top: -2.5,
          borderRadius: '50%', background: '#fff', transition: 'background 0.2s',
        }} />
        <div ref={cursorPeekRef} style={{
          display: 'none', position: 'absolute', left: 10, top: -8,
          fontFamily: 'Oswald, sans-serif', fontWeight: 900,
          fontSize: 9, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: '#FF6A00', whiteSpace: 'nowrap',
        }}>
          Peek
        </div>
      </div>

      {/* ── MOBILE: auto-slideshow ── */}
      <div className="md:hidden mt-20">
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <AnimatePresence>
            <motion.img
              key={slideIdx}
              src={HERO_SLIDES[slideIdx]}
              alt="Calgary garage transformation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === slideIdx ? 'w-6 h-1.5 bg-brand-orange' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-brand-orange/95 text-white px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg backdrop-blur-sm">
            Calgary Garages
          </div>
        </div>
      </div>

      {/* ── DESKTOP: right image panel — circular cursor reveal ── */}
      <div
        ref={revealPanelRef}
        className="hidden md:block absolute inset-y-0 right-0 w-[52%] overflow-hidden"
      >
        {/* Before — always fully visible base layer */}
        <motion.img
          src={heroBeforeImg}
          alt="Calgary Garage Before — Aspen Woods"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] object-cover"
          referrerPolicy="no-referrer"
        />

        {/* After — revealed only inside the cursor circle */}
        <div
          ref={clipDivRef}
          className="absolute inset-0"
          style={{ clipPath: 'circle(0px at 0px 0px)', transition: 'clip-path 0.38s ease-in' }}
        >
          <motion.img
            src={heroAfterImg}
            alt="Calgary Garage After — Aspen Woods"
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-[115%] object-cover"
            referrerPolicy="no-referrer"
          />
          {/* After badge — also clipped inside the circle */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 bg-brand-green/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">After</span>
          </div>
        </div>

        {/* Before badge */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 bg-brand-orange/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Before</span>
        </div>

        {/* Hover hint — fades out once user hovers */}
        <div
          ref={hoverHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full pointer-events-none"
          style={{ opacity: 1, transition: 'opacity 0.5s' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-white text-[10px] font-black uppercase tracking-[0.28em]">Hover to reveal</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/20 to-transparent pointer-events-none" />
      </div>

      {/* ── DESKTOP: navy diagonal panel ── */}
      <div
        className="hidden md:block absolute inset-y-0 left-0 bg-brand-navy z-10 pointer-events-none"
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
        <div className="md:min-h-screen flex flex-col justify-center pt-4 pb-7 sm:pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-20">
          <div className="relative md:max-w-[480px] lg:max-w-[620px] xl:max-w-[680px]">

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-wrap items-center gap-2 mb-3 sm:mb-8"
            >
              <span className="text-red-500 text-5xl sm:text-6xl leading-none select-none drop-shadow-lg" aria-hidden="true">🍁</span>
              <div className="rotator-card hidden md:inline-flex">
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
                <span className="block text-white/25 text-[17px] sm:text-[38px] md:text-[42px] lg:text-[50px] xl:text-[58px]">Your</span>
                <span className="block text-brand-orange text-[55px] sm:text-[100px] md:text-[90px] lg:text-[126px] xl:text-[148px]">Garage.</span>
                <span className="block text-white text-[38px] sm:text-[64px] md:text-[58px] lg:text-[84px] xl:text-[100px]">
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
                onClick={() => Analytics.bookCTA('hero')}
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

            {/* Pre / Post state label — crossfades with cursor hover */}
            <div className="hidden md:block relative h-6 mb-8">
              <div ref={preStateRef} className="absolute inset-0 flex items-center gap-2.5" style={{ opacity: 1, transition: 'opacity 0.3s' }}>
                <div className="w-[3px] h-5 bg-brand-orange rounded-full shrink-0" />
                <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.32em]">Pre Garage Reboot</span>
              </div>
              <div ref={postStateRef} className="absolute inset-0 flex items-center gap-2.5" style={{ opacity: 0, transition: 'opacity 0.3s' }}>
                <div className="w-[3px] h-5 bg-brand-green rounded-full shrink-0" />
                <span className="text-brand-green font-black text-[10px] uppercase tracking-[0.32em]">Post Garage Reboot ✓</span>
              </div>
            </div>

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

              {/* Google rating — links to leave a review */}
              <a
                href="https://g.page/r/CerXP-LQnaV0EAI/review"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Analytics.reviewClick()}
                className="flex min-h-[70px] items-center rounded-xl border border-white/10 bg-white/[0.045] p-3 sm:min-h-0 sm:border-0 sm:bg-transparent sm:p-0 shrink-0 hover:opacity-80 transition-opacity"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-xl font-black text-white leading-none">5.0</span>
                    <span className="text-[9px] font-black text-brand-orange uppercase tracking-widest">★ Google</span>
                  </div>
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Leave a review ↗</span>
                </div>
              </a>

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
        className="hidden md:block absolute right-16 xl:right-24 z-30 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 xl:p-6 max-w-[220px] lg:max-w-[250px] xl:max-w-[270px]"
        style={{ top: 'calc(96px + 6vh)', transform: 'none' }}
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

// --- 3D Components ---

const FloatingBoxGroup = () => {
  const groupRef = useRef<Group>(null!);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    groupRef.current.rotation.y = elapsed.current * 0.12;
    groupRef.current.position.y = Math.sin(elapsed.current * 0.55) * 0.18;
  });

  const boxes: { pos: [number,number,number]; scale: [number,number,number]; color: string; rot: [number,number,number] }[] = [
    { pos: [0, 0, 0],        scale: [1.3, 1.3, 1.3], color: '#FF6A00', rot: [0.20,  0.40,  0.10] },
    { pos: [1.9, -0.5, 0.3], scale: [0.9, 0.9, 0.9], color: '#6BCB16', rot: [-0.10, 0.30,  0.20] },
    { pos: [-1.8, 0.4, -0.4],scale: [1.0, 0.75, 1.0],color: '#232323', rot: [0.15, -0.40,  0.10] },
    { pos: [0.5, 1.7, -0.3], scale: [0.6, 0.6, 0.6], color: '#FF6A00', rot: [0.30,  0.50, -0.20] },
    { pos: [-0.7,-1.5, 0.5], scale: [0.7, 0.55, 0.8],color: '#6BCB16', rot: [0.10, -0.30,  0.30] },
    { pos: [2.2,  1.0, -0.2],scale: [0.5, 0.8, 0.5], color: '#041B4D', rot: [0.40,  0.20, -0.10] },
  ];

  return (
    <group ref={groupRef}>
      {boxes.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot} scale={b.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={b.color} roughness={0.35} metalness={0.18} />
        </mesh>
      ))}
    </group>
  );
};

const GarageScene3D = () => (
  <div className="hidden xl:block absolute -top-8 right-0 w-[400px] h-[340px] pointer-events-none z-0 opacity-30">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 48 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 5]} intensity={1.8} color="#FF6A00" />
      <pointLight position={[-3, -2, 2]} intensity={0.7} color="#6BCB16" />
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
        <FloatingBoxGroup />
      </Float>
    </Canvas>
  </div>
);

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
    {
      num: '03',
      title: 'Estate Cleanouts',
      desc: 'Handling a loved one\'s home or a full property clear-out? We do it with care, speed, and dignity.',
      badge: 'Full Property',
      accentColor: 'from-white/10 to-transparent',
      borderColor: 'border-white/15',
      ill: illResidence,
    },
  ];

  const secondary = [
    { num: '04', title: 'Student Moving', desc: 'Semester transitions, done.', badge: 'Semester Deal', ill: illResidence },
    { num: '05', title: 'Move-Out', desc: 'Clear leftovers, stay on schedule.', badge: 'Realtor Pick', ill: illThumbsUp },
    { num: '06', title: 'Full Moving', desc: 'Packing to delivery, handled.', badge: 'Elite Precision', ill: illResidence },
    { num: '07', title: 'Commercial', desc: 'Office & retail clear-outs.', badge: 'B2B Priority', ill: illJunkRemoval },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-brand-navy overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <GarageScene3D />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4"
        >
          <div>
            <div className="text-brand-green font-black uppercase text-[10px] tracking-[0.4em] mb-3">What We Do · 7 Services</div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-[88px] font-black uppercase tracking-tighter leading-none text-white">
              Our <span className="text-brand-orange">Impact</span>
            </h2>
          </div>
          <p className="md:max-w-[240px] text-sm text-white/35 font-medium leading-relaxed md:text-right">
            From heavy lifting to the final sweep — we reclaim every square inch.
          </p>
        </motion.div>

        {/* Featured: 2 large bento cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
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
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-navy">Common Questions</h3>
              <span className="px-2.5 py-1 rounded-full bg-brand-soft text-brand-navy/40 text-[10px] font-black uppercase tracking-widest">{faqs.length} answers</span>
            </div>
            <img src={qnaImg} alt="" className="hidden sm:block h-24 w-auto object-contain drop-shadow-xl shrink-0" />
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

const CORRIDOR_ORDER: Corridor[] = ['north', 'south', 'east', 'northeast', 'west', 'foothills'];

const ServiceArea = () => {
  const areas = [
    { name: 'Calgary', sub: 'All 8 Quadrants', eta: 'Home base', tone: 'hub' },
    { name: 'Airdrie & Cochrane', sub: 'North Corridor', eta: '30-45 min', tone: 'north' },
    { name: 'Okotoks & High River', sub: 'South Foothills', eta: '35-55 min', tone: 'south' },
    { name: 'Banff & Canmore', sub: 'Rocky Mountains', eta: 'By route', tone: 'west' },
    { name: 'Brooks & Lethbridge', sub: 'Eastern Prairies', eta: 'By route', tone: 'east' },
    { name: 'Rural Alberta', sub: 'By Request', eta: 'Scheduled', tone: 'rural' },
  ];

  const stats = [
    { val: '3hr', label: 'Drive Radius' },
    { val: '47+', label: 'Communities' },
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

      {/* Communities teaser — links to /communities full directory */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 pb-16"
      >
        {/* Dark dispatch board panel */}
        <div className="relative overflow-hidden bg-brand-navy rounded-2xl p-6 sm:p-8 shadow-2xl shadow-brand-navy/20">
          {/* Dot grid bg */}
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
          {/* Glow accents */}
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-brand-orange/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-brand-green/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30 mb-2">
                  3-Hour Drive Radius · Southern &amp; Central Alberta
                </p>
                <h3
                  className="font-display font-black uppercase tracking-tighter text-white leading-[0.88]"
                  style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
                >
                  47 Communities.<br />
                  <span className="text-brand-orange">One Crew.</span>
                </h3>
              </div>
              <Link
                to="/communities"
                className="shrink-0 inline-flex items-center gap-2 border border-brand-orange text-brand-orange px-5 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all"
              >
                Full Directory <ArrowRight size={13} />
              </Link>
            </div>

            {/* Corridor rows — top towns only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
              {CORRIDOR_ORDER.map((corridor) => {
                const towns = TOWNS.filter((t) => t.corridor === corridor).slice(0, 4);
                const colors: Record<Corridor, string> = {
                  north: '#6BCB16', south: '#FF6A00', east: '#FFD166',
                  northeast: '#A8E063', west: '#56CFE1', foothills: '#FF9F1C',
                };
                const dirs: Record<Corridor, string> = {
                  north: 'N', south: 'S', east: 'E',
                  northeast: 'NE', west: 'W', foothills: 'SW',
                };
                const color = colors[corridor];
                return (
                  <div key={corridor} className="bg-brand-navy p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-6 h-6 flex items-center justify-center font-display font-black text-[10px] shrink-0"
                        style={{ background: color, color: '#041B4D' }}
                      >
                        {dirs[corridor]}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
                        {CORRIDOR_LABELS[corridor].split('—')[1]?.trim() ?? CORRIDOR_LABELS[corridor]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {towns.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/${t.slug}`}
                          className="text-[11px] font-black text-white/70 hover:text-white border border-white/[0.08] hover:border-white/20 px-2 py-1 transition-colors"
                        >
                          {t.name}
                        </Link>
                      ))}
                      <Link
                        to="/communities"
                        className="text-[11px] font-black px-2 py-1 transition-colors"
                        style={{ color }}
                      >
                        +{TOWNS.filter((t) => t.corridor === corridor).length - 4} more →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom strip */}
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                <MapPin size={11} className="text-brand-orange" />
                Calgary Base · Same-day when available
              </div>
              <Link
                to="/communities"
                className="text-[11px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-1"
              >
                See all 47 <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

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
              href="tel:5872290648"
              onClick={() => Analytics.phoneClick()}
              className="font-display font-black tracking-tighter text-white block hover:opacity-85 transition-opacity"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
            >
              (587) 229-0648
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        Analytics.formSubmit(form.service);
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', details: '' });
      } else {
        setErrorMsg(data.message ?? 'Unknown error');
        console.error('Web3Forms error:', data);
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg(String(err));
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
                  <option>Estate Cleanout</option>
                  <option>Student Move Out/In</option>
                  <option>Full Moving Service</option>
                  <option>Move-Out Service</option>
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

              {/* Photos note */}
              <p className="text-sm text-gray-400 font-medium text-center">
                📷 Have garage photos? Text them to us after submitting — we'll reference them in your quote.
              </p>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-bold text-center -mt-4">
                  {errorMsg ? `Error: ${errorMsg}` : 'Something went wrong — please try again or call us directly.'}
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const before1Y = useTransform(galleryScroll, [0, 1], ['-7%', '7%']);
  const after1Y  = useTransform(galleryScroll, [0, 1], ['5%', '-5%']);
  const before2Y = useTransform(galleryScroll, [0, 1], ['-5%', '5%']);
  const after2Y  = useTransform(galleryScroll, [0, 1], ['7%', '-7%']);
  const parallaxBefore = [before1Y, before2Y];
  const parallaxAfter  = [after1Y,  after2Y];

  const projects = [
    {
      num: '01',
      before: heroBeforeImg,
      after: heroAfterImg,
      title: 'Aspen Woods Reset',
      loc: 'Southwest Calgary',
      service: 'Full Garage Cleanout',
    },
    {
      num: '02',
      before: 'https://www.image2url.com/r2/default/images/1779113094140-19a1f514-3650-47f6-93d1-7425638cb1c4.png',
      after:  'https://www.image2url.com/r2/default/images/1779113099401-74683ad9-a22b-44ae-bbf2-625902ac214e.png',
      title: 'Estate Cleanout',
      loc: 'Mount Royal',
      service: 'Estate Cleanout + Haul',
    },
  ];

  return (
    <section ref={sectionRef} id="gallery" className="relative bg-brand-navy overflow-hidden">

      {/* ── Section header ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 pt-20 md:pt-32 pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4">
            Before &amp; After · Transformations
          </div>
          <h2 className="font-display font-black uppercase tracking-tighter leading-[0.88] text-white"
            style={{ fontSize: 'clamp(42px, 8vw, 108px)' }}>
            Real Results.<br />
            <span className="text-brand-green">Real Calgary Homes.</span>
          </h2>
        </motion.div>
      </div>

      {/* ── Projects ── */}
      {projects.map((proj, i) => (
        <div key={i} className="relative">

          {/* Ghost project number */}
          <span
            className="pointer-events-none select-none absolute top-0 right-4 md:right-20 font-display font-black text-white/[0.035] leading-none z-0"
            style={{ fontSize: 'clamp(110px, 20vw, 240px)' }}
          >
            {proj.num}
          </span>

          {/* Image pair */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: i * 0.08 }}
            className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">

              {/* BEFORE */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                style={{ aspectRatio: '4/3' }}
              >
                <motion.img
                  src={proj.before}
                  alt={`Before — ${proj.title}`}
                  style={{ y: parallaxBefore[i] }}
                  className="absolute inset-0 w-full h-[116%] -top-[8%] object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
                {/* Integrated label */}
                <div className="absolute bottom-5 left-5 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-[3px] h-4 bg-brand-orange rounded-full shrink-0" />
                    <span className="text-white font-black text-[10px] uppercase tracking-[0.32em]">Before</span>
                  </div>
                  <p className="text-white/50 text-[11px] font-medium pl-[11px]">{proj.loc}</p>
                </div>
              </div>

              {/* AFTER */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] group"
                style={{ aspectRatio: '4/3' }}
              >
                <motion.img
                  src={proj.after}
                  alt={`After — ${proj.title}`}
                  style={{ y: parallaxAfter[i] }}
                  className="absolute inset-0 w-full h-[116%] -top-[8%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-green/12" />
                {/* Integrated label */}
                <div className="absolute bottom-5 left-5 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-[3px] h-4 bg-brand-green rounded-full shrink-0" />
                    <span className="text-white font-black text-[10px] uppercase tracking-[0.32em]">After</span>
                  </div>
                  <p className="text-white/50 text-[11px] font-medium pl-[11px]">{proj.service}</p>
                </div>
                {/* Subtle green ring for depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-green/18 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Project meta */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 + 0.18 }}
            className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 mt-6 mb-20 md:mb-28"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-brand-orange font-black uppercase text-[10px] tracking-[0.38em] mb-2 flex items-center gap-1.5">
                  <MapPin size={9} className="shrink-0" />
                  {proj.loc} &nbsp;·&nbsp; Project {proj.num}
                </p>
                <h3
                  className="font-display font-black uppercase tracking-tighter text-white leading-none"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 60px)' }}
                >
                  {proj.title}
                </h3>
              </div>
              <a
                href="#contact"
                className="shrink-0 flex items-center gap-2 text-white/30 hover:text-brand-orange transition-colors duration-300 text-[11px] font-black uppercase tracking-widest group/link"
              >
                Book Similar
                <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Divider between projects */}
          {i < projects.length - 1 && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 mb-20 md:mb-28">
              <div className="h-px bg-white/8" />
            </div>
          )}
        </div>
      ))}

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 pb-20 md:pb-32"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-10 border-t border-white/10">
          <p className="font-display text-3xl md:text-4xl font-black uppercase text-white text-center sm:text-left leading-tight">
            Your garage could be{' '}
            <span className="text-brand-green">next.</span>
          </p>
          <a
            href="#contact"
            className="shrink-0 bg-brand-orange text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-orange/25 inline-flex items-center gap-2"
          >
            Get Free Quote <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>

      {/* Fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
};

// --- Process Section ---

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const card0Y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const card1Y = useTransform(scrollYProgress, [0, 1], ['5%',  '-5%']);
  const card2Y = useTransform(scrollYProgress, [0, 1], ['0%',  '6%']);

  const steps = [
    { step: '01', title: 'Instant Quote', desc: 'Send us a photo or book a free on-site estimate. No pressure, just transparent pricing.', ill: illProcessQuote },
    { step: '02', title: 'Rapid Reboot',  desc: 'Our team arrives and clears the clutter. We sweep and do the heavy lifting for you.', ill: illProcessReboot },
    { step: '03', title: 'Park Your Car', desc: 'Enjoy your reclaimed space. We handle disposal, recycling, and donations.', ill: illProcessComplete },
  ];
  const cardY = [card0Y, card1Y, card2Y];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white overflow-hidden">
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
            {steps.map((p, i) => (
              <motion.div
                key={i}
                style={{ y: cardY[i] }}
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
  );
};

// --- Crew In Action ---

const CREW_SHOTS = [
  { img: teamIndoorImg,  label: 'Room & Apartment Cleanouts', caption: 'We clear every corner — boxes, furniture, the works.' },
  { img: teamGarageImg,  label: 'Garage Haul-Away',           caption: 'Bags out, space reclaimed. One trip, done right.' },
  { img: teamTruckImg,   label: 'Full Truck Load-Out',        caption: 'Big jobs, bigger results. Loaded and gone.' },
];

const CrewInAction = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIdx(idx);
  };

  const goTo = (i: number) => {
    scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <section className="bg-brand-charcoal overflow-hidden">
      {/* Top label bar */}
      <div className="border-b border-white/8 px-4 sm:px-8 lg:px-20 py-5 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          <span className="font-black uppercase text-[10px] tracking-[0.4em] text-white/40">Real Crew · Real Work</span>
        </div>
        <span className="font-black uppercase text-[10px] tracking-[0.4em] text-white/20 hidden sm:block">Calgary, AB</span>
      </div>

      {/* Photo strip — swipe on mobile, grid on sm+ */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex sm:grid sm:grid-cols-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CREW_SHOTS.map((shot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden group snap-start shrink-0 w-full sm:w-auto"
            style={{ aspectRatio: '16/10' }}
          >
            <img
              src={shot.img}
              alt={shot.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-[3px] bg-brand-orange scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="font-black uppercase text-[9px] tracking-[0.35em] text-brand-orange mb-1.5">
                {String(i + 1).padStart(2, '0')} — {shot.label}
              </p>
              <p className="text-white/60 text-xs font-medium leading-snug">{shot.caption}</p>
            </div>
            <span className="absolute top-4 right-4 font-display font-black text-white/[0.07] text-6xl leading-none pointer-events-none select-none">
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="flex sm:hidden justify-center gap-2 py-3 bg-brand-charcoal">
        {CREW_SHOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-5 h-1.5 bg-brand-orange' : 'w-1.5 h-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/8 px-4 sm:px-8 lg:px-20 py-5 flex items-center gap-6 max-w-[1440px] mx-auto">
        <span className="font-black uppercase text-[10px] tracking-[0.35em] text-white/25">Garage Reboot Team</span>
        <div className="flex-1 h-px bg-white/8" />
        <a href="#contact" className="font-black uppercase text-[10px] tracking-[0.35em] text-brand-orange hover:text-white transition-colors">
          Book Your Job →
        </a>
      </div>
    </section>
  );
};

// --- Splash Screen ---

const SplashScreen = () => (
  <motion.div
    key="splash"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.55, ease: 'easeInOut' }}
    className="fixed inset-0 z-[9999] bg-brand-navy flex flex-col items-center justify-center gap-8"
  >
    <motion.img
      src={logoImg}
      alt="Garage Reboot"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="w-44 h-44 sm:w-56 sm:h-56 drop-shadow-2xl"
    />
    <div className="relative w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.25, ease: 'easeInOut' }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-brand-orange rounded-full"
      />
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>{loading && <SplashScreen />}</AnimatePresence>
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
      <Process />
      <CrewInAction />
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
                src={reviewsImg}
                alt=""
                className="mx-auto mb-5 h-36 w-auto object-contain drop-shadow-xl"
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
