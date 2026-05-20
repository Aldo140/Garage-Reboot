import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Truck, Star, ArrowRight, Check, Phone } from 'lucide-react';
import { TOWNS, SERVICES, driveLabel } from './towns';

const SERVICES_DETAIL = [
  {
    name: 'Garage Cleanout',
    desc: 'Full garage clear-out — we haul every last bag, box, and broken appliance. Includes sweep.',
    from: '$250',
  },
  {
    name: 'Junk Removal',
    desc: 'Single items to full truck loads. Appliances, furniture, yard waste — dump fees included.',
    from: '$80',
  },
  {
    name: 'Estate Cleanout',
    desc: 'Respectful, efficient full-property clear-outs. Garages, basements, storage rooms.',
    from: '$400',
  },
  {
    name: 'Moving Service',
    desc: 'Local moves with truck, blankets, and 2-person crew. No hidden fees.',
    from: '$200',
  },
];

export default function TownPage() {
  const { slug } = useParams<{ slug: string }>();
  const town = TOWNS.find((t) => t.slug === slug);

  useEffect(() => {
    if (town) {
      document.title = `${town.name} Garage Cleanout & Junk Removal | Garage Reboot`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Garage Reboot serves ${town.name}, AB — garage cleanouts, junk removal, estate cleanouts & moving. ${driveLabel(town.driveMin)} from Calgary. Same-day available. Free quote.`
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://garagereboot.vercel.app/${town.slug}`);
      }
      // inject per-town Service schema
      const existingScript = document.getElementById('town-schema');
      if (existingScript) existingScript.remove();
      const script = document.createElement('script');
      script.id = 'town-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Garage Cleanout ${town.name}`,
        serviceType: 'Garage Cleanout',
        provider: { '@id': 'https://garagereboot.vercel.app/#business' },
        areaServed: { '@type': 'City', name: town.name, containedInPlace: { '@type': 'State', name: 'Alberta' } },
        description: `Professional garage cleanout, junk removal, and estate cleanout service in ${town.name}, Alberta. Serving ${town.name} and surrounding area. ${driveLabel(town.driveMin)} from Calgary. Free quotes, same-day available.`,
        offers: { '@type': 'Offer', price: '80', priceCurrency: 'CAD' },
      });
      document.head.appendChild(script);
    }
    return () => {
      document.getElementById('town-schema')?.remove();
    };
  }, [town]);

  if (!town) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-soft text-brand-navy">
        <h1 className="text-3xl font-black">Area not found</h1>
        <Link to="/" className="text-brand-orange font-bold underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md py-3 px-4 flex items-center justify-between">
        <Link to="/" className="font-display font-black text-xl tracking-tighter">
          GARAGE<span className="text-brand-orange">REBOOT</span>
        </Link>
        <a
          href="/#contact"
          className="bg-brand-orange text-white px-5 py-2 text-sm font-black uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
        >
          Free Quote
        </a>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-brand-soft">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 text-brand-orange text-[10px] font-black uppercase tracking-widest mb-5 shadow-sm">
            <MapPin size={11} />
            {town.name}, Alberta · {driveLabel(town.driveMin)} from Calgary
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4">
            Garage Cleanout<br />
            <span className="text-brand-orange">{town.name}</span>
          </h1>
          <p className="text-lg text-brand-navy/70 max-w-xl mb-8">
            Garage Reboot serves <strong>{town.name}</strong> and the surrounding area. Junk removal, estate cleanouts, and moving — we drive to you. Same-day available. Free quotes.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-7 py-3.5 font-black uppercase tracking-widest text-sm rounded-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Free Quote <ArrowRight size={16} />
            </a>
            <a
              href="tel:5872290648"
              className="inline-flex items-center gap-2 border-2 border-brand-navy text-brand-navy px-7 py-3.5 font-black uppercase tracking-widest text-sm rounded-sm hover:bg-brand-navy hover:text-white transition-all"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-brand-navy text-white py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-6 items-center justify-center text-[11px] font-black uppercase tracking-widest">
          {['5-Star Google Rated', 'Free Quotes', 'Same-Day Available', 'Dump Fees Included', '100% Calgarian Owned'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Star size={11} className="fill-brand-orange text-brand-orange" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter mb-2">
            Services in <span className="text-brand-orange">{town.name}</span>
          </h2>
          <p className="text-brand-navy/60 mb-10">We haul it, you relax. Transparent pricing, no surprises.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES_DETAIL.map((s) => (
              <div key={s.name} className="border border-brand-navy/10 rounded-2xl p-6 hover:border-brand-orange/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-lg">{s.name}</h3>
                  <span className="text-brand-orange font-black text-sm">From {s.from}</span>
                </div>
                <p className="text-brand-navy/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-4 bg-brand-soft">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter mb-8">
            Why {town.name} Chooses Garage Reboot
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              `We drive to ${town.name} — ${driveLabel(town.driveMin)} from our Calgary base`,
              'All-in pricing: truck, labor, and dump fees',
              'Same-day booking when crew is available',
              '2-person uniformed crew, fully insured',
              'We recycle and donate before landfilling',
              'Free quote — no pressure, no upsell',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-brand-orange text-[10px] font-black uppercase tracking-widest mb-4">
            <Truck size={12} /> Serving {town.name} & Surrounding Area
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
            Ready to Reclaim Your Space?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Book your free {town.name} garage cleanout quote. Most jobs confirmed within a few hours.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-4 font-black uppercase tracking-widest text-sm rounded-sm hover:opacity-90 transition-opacity shadow-xl"
          >
            Book Free Quote <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Other areas */}
      <section className="py-12 px-4 border-t border-brand-navy/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-4">Also Serving</p>
          <div className="flex flex-wrap gap-2">
            {TOWNS.filter((t) => t.slug !== slug)
              .slice(0, 18)
              .map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  className="text-xs border border-brand-navy/15 rounded-full px-3 py-1 hover:border-brand-orange hover:text-brand-orange transition-colors font-medium"
                >
                  {t.name}
                </Link>
              ))}
            <Link
              to="/"
              className="text-xs border border-brand-orange/40 text-brand-orange rounded-full px-3 py-1 font-bold"
            >
              All areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-brand-soft text-center text-xs text-brand-navy/40 font-medium">
        © {new Date().getFullYear()} Garage Reboot · Calgary, Alberta ·{' '}
        <Link to="/" className="hover:text-brand-orange transition-colors">garagereboot.vercel.app</Link>
      </footer>
    </div>
  );
}
