import { motion, useReducedMotion } from 'motion/react';
import { DIFFERENTIATORS, PROCESS_STEPS } from '../data/siteData';

export function WhyChooseAndProcess() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* SECTION 08 — WHY CUSTOM CUTS & DESIGNS */}
      <section
        id="why-us"
        aria-labelledby="why-us-heading"
        className="bg-[#F7F6F2] text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Editorial Thesis */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <p className="text-sm font-medium text-[#A65335] mb-3">
                Why Custom Cuts &amp; Designs
              </p>
              <h2
                id="why-us-heading"
                className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.1]"
              >
                One team accountable from drawing to site finish.
              </h2>
              <p className="mt-5 text-[15px] sm:text-base leading-[1.68] text-[#585A55]">
                Clients choose us when they want custom steelwork that fits the space properly —
                fabricated in-house and installed with care, without handoffs between separate
                suppliers and trades.
              </p>
            </div>

            {/* Right Typographic Editorial Ledger (Not 6 repetitive icon boxes) */}
            <div className="lg:col-span-8 divide-y divide-[#202322]/12 border-t border-b border-[#202322]/12">
              {DIFFERENTIATORS.map((item, idx) => (
                <motion.div
                  key={item.index}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-5 flex items-baseline gap-4">
                    <span className="font-[Sora] text-xs font-semibold tabular-nums text-[#A65335]">
                      {item.index}
                    </span>
                    <h3 className="font-[Sora] text-lg font-semibold tracking-tight text-[#202322]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-7 text-[15px] leading-relaxed text-[#585A55] pl-8 sm:pl-0">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09 — HOW THE PROCESS WORKS */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="bg-[#E9E2D7]/45 text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14 lg:mb-16">
            <p className="text-sm font-medium text-[#A65335] mb-3">
              How the process works
            </p>
            <h2
              id="process-heading"
              className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.1]"
            >
              A clear path from first conversation to completion.
            </h2>
          </div>

          {/* Horizontal Timeline on Desktop / Vertical Timeline on Mobile */}
          <div className="relative">
            {/* Desktop Horizontal Connector */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[#202322]/18"
            />
            {/* Mobile Vertical Connector */}
            <div
              aria-hidden="true"
              className="lg:hidden absolute top-6 bottom-6 left-[21px] w-px bg-[#202322]/18"
            />

            <ol className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.li
                  key={step.step}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-14 lg:pl-0"
                >
                  <div className="absolute left-0 top-0 lg:static lg:mb-6 inline-flex items-center justify-center w-11 h-11 bg-[#F7F6F2] border border-[#202322]/25 font-[Sora] text-sm font-semibold tabular-nums text-[#202322]">
                    {step.step}
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold tracking-tight text-[#202322]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-[#585A55]">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
