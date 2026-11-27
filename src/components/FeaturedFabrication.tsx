import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS, ProjectTypeOption } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface FeaturedFabricationProps {
  onEnquireCustom: (projectType: ProjectTypeOption) => void;
}

export function FeaturedFabrication({ onEnquireCustom }: FeaturedFabricationProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="custom-fabrication"
      aria-labelledby="fabrication-heading"
      className="bg-[#202322] text-[#F7F6F2] py-20 sm:py-24 lg:py-32"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Top Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#A65335] mb-3">
              In-house custom steel fabrication
            </p>
            <h2
              id="fabrication-heading"
              className="font-[Sora] font-semibold tracking-[-0.025em] text-[#F7F6F2] text-[clamp(2rem,3.6vw,3.35rem)] leading-[1.06]"
            >
              Made to fit.
              <br />
              Built with purpose.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-base leading-[1.68] text-[#E9E2D7]/82">
              Every site has its own lines, levels and architectural context. We fabricate custom
              work in Corten steel, mild steel and stainless steel — including precision laser-cut
              screens, custom gates, letterboxes, fire pits, planter boxes and tailored outdoor
              structures.
            </p>
            <button
              type="button"
              onClick={() => onEnquireCustom('Custom fabrication')}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#A65335] text-[#F7F6F2] text-sm font-semibold hover:bg-[#8A4329] transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              <span>Discuss a custom fabrication brief</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mixed Editorial Photo Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Primary Wide Workshop / Laser-Cut Frame */}
          <motion.figure
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between bg-[#303431]/55 border border-white/10"
          >
            <ResilientImage
              src={ASSETS.customFabrication}
              alt="Custom laser-cut Corten steel privacy screen and pedestrian gate mounted between concrete columns"
              containerClassName="aspect-[4/3] w-full overflow-hidden"
              className="w-full h-full object-cover"
            />
            <figcaption className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
              <span className="font-medium text-[#F7F6F2]">
                Decorative laser-cut screens &amp; custom courtyard gates
              </span>
              <span className="text-xs text-[#AAA9A2]">
                Corten · Mild steel · Stainless steel
              </span>
            </figcaption>
          </motion.figure>

          {/* Right Stacked Asymmetric Editorial Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <motion.figure
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#303431]/55 border border-white/10"
            >
              <ResilientImage
                src={ASSETS.workshop}
                alt="Steel plates and precision folded planter frames resting on a heavy fabrication bench inside a workshop"
                containerClassName="aspect-[16/10] w-full overflow-hidden"
                className="w-full h-full object-cover"
              />
              <figcaption className="p-5 text-sm">
                <p className="font-medium text-[#F7F6F2]">Fabricated in-house to your dimensions</p>
                <p className="mt-1 text-xs leading-relaxed text-[#AAA9A2]">
                  Metal cutting, folding and welding completed to suit residential and commercial
                  site drawings.
                </p>
              </figcaption>
            </motion.figure>

            {/* Editorial Capability Specification Strip (Verified capabilities only) */}
            <div className="flex-1 bg-[#303431]/75 border border-white/10 p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-[#A65335] mb-2">
                  Verified fabrication scope
                </p>
                <h3 className="font-[Sora] text-lg font-semibold text-[#F7F6F2] tracking-tight">
                  Tailored architectural metalwork
                </h3>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-white/10 pt-5">
                <div>
                  <dt className="text-xs text-[#AAA9A2]">Materials worked</dt>
                  <dd className="mt-1 text-[#F7F6F2] font-medium">Corten, mild &amp; stainless</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#AAA9A2]">Production</dt>
                  <dd className="mt-1 text-[#F7F6F2] font-medium">Completed in-house</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#AAA9A2]">Feature types</dt>
                  <dd className="mt-1 text-[#F7F6F2] font-medium">Screens, gates, fire pits</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#AAA9A2]">Delivery &amp; fit</dt>
                  <dd className="mt-1 text-[#F7F6F2] font-medium">Supply or onsite install</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
