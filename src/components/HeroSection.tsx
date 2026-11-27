import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS, BUSINESS_INFO } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreWork: () => void;
  onRequestQuote: () => void;
}

export function HeroSection({ onExploreWork, onRequestQuote }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Custom Cuts & Designs overview"
      className="relative min-h-[680px] lg:min-h-[820px] h-[100svh] max-h-[1040px] w-full overflow-hidden bg-[#202322] text-[#F7F6F2] flex flex-col justify-end"
    >
      {/* Full-bleed architectural photography with subtle reveal */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.35, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <ResilientImage
          src={ASSETS.hero}
          alt="Curved weathered Corten steel retaining wall and garden edging flanking bluestone paving at a contemporary Australian residence"
          loading="eager"
          fetchPriority="high"
          containerClassName="w-full h-full relative"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Measured contrast scrims preserving architectural clarity while guaranteeing WCAG AA+ legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#202322]/92 via-[#202322]/48 to-[#202322]/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#202322]/75 via-[#202322]/25 to-transparent"
      />

      {/* Editorial Hero Content */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 pt-28 pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium tracking-[0.06em] text-[#E9E2D7] mb-5"
          >
            Design <span className="text-[#A65335] mx-1.5" aria-hidden="true">·</span> Fabrication{' '}
            <span className="text-[#A65335] mx-1.5" aria-hidden="true">·</span> Installation
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-[Sora] font-semibold tracking-[-0.03em] text-[#F7F6F2] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.04]"
          >
            Built from an idea.
            <br />
            Made to last.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#E9E2D7]/92 max-w-[54ch] font-normal"
          >
            Custom steel fabrication, Corten features and outdoor solutions — designed, made and
            installed with precision across {BUSINESS_INFO.serviceArea}.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#A65335] text-[#F7F6F2] text-sm sm:text-[15px] font-semibold hover:bg-[#8A4329] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore our work</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onRequestQuote}
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#F7F6F2]/45 bg-[#202322]/40 text-[#F7F6F2] text-sm sm:text-[15px] font-medium hover:bg-[#F7F6F2] hover:text-[#202322] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request a quote
            </button>
          </motion.div>
        </div>

        {/* Bottom Architectural Footer Strip inside Hero */}
        <div className="mt-12 sm:mt-16 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#E9E2D7]/80">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Melbourne, Victoria</span>
            <span aria-hidden="true" className="text-[#AAA9A2]">·</span>
            <span>Australian owned &amp; operated</span>
            <span aria-hidden="true" className="text-[#AAA9A2]">·</span>
            <span>Free onsite measure &amp; quote</span>
          </div>

          <a
            href="#concept"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[#E9E2D7] hover:text-white transition-colors self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#A65335]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
