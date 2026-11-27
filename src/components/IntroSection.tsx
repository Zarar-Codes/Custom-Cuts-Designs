import { motion, useReducedMotion } from 'motion/react';
import { BUSINESS_INFO, INTRO_STAGES } from '../data/siteData';

export function IntroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="concept"
      aria-labelledby="concept-heading"
      className="bg-[#F7F6F2] text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#A65335] mb-3">
              Architectural steel &amp; landscape construction
            </p>
            <h2
              id="concept-heading"
              className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08]"
            >
              From concept to creation.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-[17px] leading-[1.65] text-[#585A55]">
              {BUSINESS_INFO.name} brings custom steel fabrication and outdoor construction under
              one roof in Melbourne. With over a decade of industry experience, we take residential
              and commercial projects from initial idea through in-house metalwork and professional
              onsite installation.
            </p>
          </div>
        </div>

        {/* Connected Horizontal 3-Stage Process Bar */}
        <div className="mt-14 lg:mt-20 relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[21px] left-0 right-0 h-px bg-[#202322]/15"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {INTRO_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pt-1 md:pt-0"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 inline-flex items-center justify-center w-11 h-11 bg-[#F7F6F2] border border-[#202322]/20 font-[Sora] text-sm font-semibold tabular-nums text-[#202322]">
                    {stage.number}
                  </span>
                  <div className="h-px flex-1 bg-[#202322]/15 md:hidden" aria-hidden="true" />
                </div>

                <h3 className="font-[Sora] text-xl font-semibold tracking-tight text-[#202322] mb-2.5">
                  {stage.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#585A55] max-w-[38ch]">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
