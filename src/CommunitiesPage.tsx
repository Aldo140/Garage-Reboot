import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Truck, ArrowLeft, ChevronRight } from 'lucide-react';
import { TOWNS, CORRIDOR_LABELS, driveLabel, type Corridor } from './towns';

const CORRIDOR_ORDER: Corridor[] = ['north', 'south', 'east', 'northeast', 'west', 'foothills'];

const CORRIDOR_META: Record<Corridor, { dir: string; color: string; bg: string; num: string }> = {
  north:     { dir: 'N',  color: '#6BCB16', bg: 'rgba(107,203,22,0.08)',  num: '01' },
  south:     { dir: 'S',  color: '#FF6A00', bg: 'rgba(255,106,0,0.08)',   num: '02' },
  east:      { dir: 'E',  color: '#FFD166', bg: 'rgba(255,209,102,0.08)', num: '03' },
  northeast: { dir: 'NE', color: '#A8E063', bg: 'rgba(168,224,99,0.08)',  num: '04' },
  west:      { dir: 'W',  color: '#56CFE1', bg: 'rgba(86,207,225,0.08)',  num: '05' },
  foothills: { dir: 'SW', color: '#FF9F1C', bg: 'rgba(255,159,28,0.08)',  num: '06' },
};

function DriveBar({ min }: { min: number }) {
  const max = 180;
  const pct = Math.min((min / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'rgba(255,106,0,0.7)' }}
        />
      </div>
      <span className="text-[10px] font-black text-white/40 tracking-widest shrink-0 w-14 text-right">
        {driveLabel(min)}
      </span>
    </div>
  );
}

export default function CommunitiesPage() {
  const [activeFilter, setActiveFilter] = useState<Corridor | 'all'>('all');

  const visibleCorridors = activeFilter === 'all'
    ? CORRIDOR_ORDER
    : CORRIDOR_ORDER.filter((c) => c === activeFilter);

  return (
    <div className="min-h-screen bg-[#041B4D] text-white" style={{ fontFamily: 'inherit' }}>

      {/* Dot-grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#041B4D]/95 backdrop-blur-sm border-b border-white/[0.07] px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-orange transition-colors text-sm font-black uppercase tracking-widest">
          <ArrowLeft size={14} />
          Back
        </Link>
        <span className="font-display font-black text-lg tracking-tighter">
          GARAGE<span className="text-brand-orange">REBOOT</span>
        </span>
        <a
          href="/#contact"
          className="bg-brand-orange text-white px-4 py-2 text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Free Quote
        </a>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden px-4 sm:px-8 lg:px-20 pt-16 pb-12">
        {/* Giant background text */}
        <div
          className="absolute right-0 top-0 font-display font-black uppercase leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 22vw, 320px)', color: 'rgba(255,255,255,0.025)', lineHeight: 0.85 }}
        >
          AB
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 border border-brand-orange/30 text-brand-orange px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Truck size={11} />
            Southern &amp; Central Alberta
          </div>

          <h1
            className="font-display font-black uppercase leading-[0.85] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
          >
            Where We<br />
            <span className="text-brand-orange">Drive.</span>
          </h1>

          <div className="flex flex-wrap items-end gap-8 mb-10">
            <p className="text-white/50 text-base max-w-sm leading-relaxed">
              47 communities within a 3-hour radius of Calgary. We load up and head your way — same day when available.
            </p>
            <div className="flex gap-6">
              {[['47', 'Communities'], ['3hr', 'Max Drive'], ['6', 'Corridors']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-4xl text-white leading-none">{v}</div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Corridor filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeFilter === 'all'
                  ? 'bg-brand-orange border-brand-orange text-white'
                  : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
              }`}
            >
              All Corridors
            </button>
            {CORRIDOR_ORDER.map((c) => {
              const meta = CORRIDOR_META[c];
              return (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c === activeFilter ? 'all' : c)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                    activeFilter === c
                      ? 'text-[#041B4D]'
                      : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/70'
                  }`}
                  style={activeFilter === c ? { background: meta.color, borderColor: meta.color } : {}}
                >
                  {meta.dir} ·&nbsp;{CORRIDOR_LABELS[c].split('—')[0].trim()}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Corridor sections */}
      <div className="px-4 sm:px-8 lg:px-20 pb-24 space-y-1">
        {visibleCorridors.map((corridor, ci) => {
          const towns = TOWNS.filter((t) => t.corridor === corridor);
          const meta = CORRIDOR_META[corridor];
          return (
            <motion.div
              key={corridor}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.05 }}
            >
              {/* Corridor header — highway-sign style */}
              <div
                className="flex items-center gap-4 py-5 border-b mb-0"
                style={{ borderColor: `${meta.color}22` }}
              >
                <div
                  className="flex-none w-10 h-10 flex items-center justify-center font-display font-black text-sm"
                  style={{ background: meta.color, color: '#041B4D' }}
                >
                  {meta.dir}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span
                      className="font-display font-black text-xl uppercase tracking-tight"
                      style={{ color: meta.color }}
                    >
                      {CORRIDOR_LABELS[corridor].split('—')[1]?.trim() ?? CORRIDOR_LABELS[corridor]}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/25">
                      {towns.length} communities
                    </span>
                  </div>
                </div>
                <span className="font-display font-black text-5xl text-white/[0.04] leading-none select-none">
                  {meta.num}
                </span>
              </div>

              {/* Town cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-white/[0.04] mb-4">
                {towns.map((town, ti) => (
                  <motion.div
                    key={town.slug}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ti * 0.03 }}
                  >
                    <Link
                      to={`/${town.slug}`}
                      className="group relative flex flex-col p-4 bg-[#041B4D] hover:bg-white/[0.05] transition-colors"
                    >
                      {/* Accent line on hover */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: meta.color }}
                      />

                      <div className="flex items-start justify-between mb-1">
                        <span className="font-display font-black text-base uppercase tracking-tight text-white group-hover:text-white leading-tight">
                          {town.name}
                        </span>
                        <ChevronRight
                          size={12}
                          className="shrink-0 mt-0.5 text-white/20 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all"
                        />
                      </div>

                      <DriveBar min={town.driveMin} />

                      <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">
                          Book cleanout
                        </span>
                        <ArrowRight size={8} className="text-brand-orange" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/[0.07] mx-4 sm:mx-8 lg:mx-20" />
      <div className="px-4 sm:px-8 lg:px-20 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Don't see your town?</p>
          <p className="text-white font-display font-black text-2xl uppercase tracking-tight">
            Call us — if we can drive it, <span className="text-brand-orange">we'll do it.</span>
          </p>
        </div>
        <a
          href="/#contact"
          className="shrink-0 inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Get Free Quote <ArrowRight size={15} />
        </a>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-8 lg:px-20 py-6 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-white/20 font-medium">
        <span>© {new Date().getFullYear()} Garage Reboot · Calgary, AB</span>
        <Link to="/" className="hover:text-brand-orange transition-colors">← Main Site</Link>
      </div>
    </div>
  );
}
