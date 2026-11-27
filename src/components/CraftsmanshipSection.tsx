import { motion, useReducedMotion } from 'motion/react';
import { ASSETS, CRAFTSMANSHIP_POINTS } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

export function CraftsmanshipSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="craftsmanship"
      aria-labelledby="craftsmanship-heading"
      className="bg-[#202322] text-[#F7F6F2] py-20 sm:py-24 lg:py-32"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Macro Detail Vertical Photography */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <ResilientImage
              src={ASSETS.macroCraftsmanship}
              alt="Close-up architectural photograph showing weathered Corten surface texture, a clean folded 90-degree corner edge and precision laser-cut geometric detail"
              containerClassName="aspect-[3/4] lg:h-full lg:aspect-auto w-full overflow-hidden border border-white/10"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Editorial Materiality & Craftsmanship Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10 py-2">
            <div>
              <p className="text-sm font-medium text-[#A65335] mb-3">
                Craftsmanship &amp; material detail
              </p>
              <h2
                id="craftsmanship-heading"
                className="font-[Sora] font-semibold tracking-[-0.025em] text-[#F7F6F2] text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.08]"
              >
                The details make the difference.
              </h2>
              <p className="mt-5 text-base sm:text-[17px] leading-[1.7] text-[#E9E2D7]/82 max-w-[54ch]">
                In outdoor steelwork, quality shows at the edges — how cleanly a screen is cut, how
                crisply a planter corner folds, and how a retaining line meets paving and planting
                on site.
              </p>
            </div>

            <div className="divide-y divide-white/12 border-t border-b border-white/12">
              {CRAFTSMANSHIP_POINTS.map((point, idx) => (
                <div
                  key={point.title}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-5 flex items-baseline gap-3">
                    <span className="font-[Sora] text-xs font-semibold tabular-nums text-[#A65335]">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[Sora] text-base sm:text-lg font-semibold text-[#F7F6F2]">
                      {point.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-7 text-sm sm:text-[15px] leading-relaxed text-[#E9E2D7]/78">
                    {point.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Secondary Close-Up Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="overflow-hidden border border-white/10">
                <ResilientImage
                  src={ASSETS.firePitFeature}
                  alt="Laser-cut botanical cut-out pattern on weathered Corten steel fire pit"
                  containerClassName="aspect-[16/10] w-full"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-white/10">
                <ResilientImage
                  src={ASSETS.fencingGates}
                  alt="Installed dark charcoal slat fencing beside a freestanding weathered Corten steel letterbox pillar"
                  containerClassName="aspect-[16/10] w-full"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
