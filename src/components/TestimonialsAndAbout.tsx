import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS, BUSINESS_INFO, TESTIMONIALS } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

export function TestimonialsAndAbout() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTestimonial = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <>
      {/* SECTION 10 — CUSTOMER FEEDBACK (Genuine Verbatim Reviews) */}
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="bg-[#F7F6F2] text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <p className="text-sm font-medium text-[#A65335] mb-3">
                Client feedback
              </p>
              <h2
                id="testimonials-heading"
                className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.1]"
              >
                What our clients say.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tabular-nums text-[#585A55] mr-1">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous customer review"
                className="w-11 h-11 inline-flex items-center justify-center border border-[#202322]/20 text-[#202322] hover:bg-[#202322] hover:text-[#F7F6F2] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next customer review"
                className="w-11 h-11 inline-flex items-center justify-center border border-[#202322]/20 text-[#202322] hover:bg-[#202322] hover:text-[#F7F6F2] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editorial Testimonial Stage */}
          <div className="border-t border-b border-[#202322]/14 py-10 sm:py-14 lg:py-16">
            <AnimatePresence mode="wait">
              <motion.figure
                key={currentTestimonial.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl"
              >
                <blockquote className="font-[Fraunces] italic text-[clamp(1.45rem,2.7vw,2.35rem)] leading-[1.35] text-[#202322]">
                  “{currentTestimonial.quote}”
                </blockquote>

                <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-[Sora] font-semibold text-[#202322]">
                    {currentTestimonial.author}
                  </span>
                  <span aria-hidden="true" className="text-[#AAA9A2]">·</span>
                  <span className="text-[#585A55]">{currentTestimonial.context}</span>
                  {currentTestimonial.verifiedRatingNote && (
                    <>
                      <span aria-hidden="true" className="text-[#AAA9A2]">·</span>
                      <span className="font-medium text-[#A65335]">
                        {currentTestimonial.verifiedRatingNote}
                      </span>
                    </>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Direct Selector Strip */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Select client review">
              {TESTIMONIALS.map((review, idx) => (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    idx === activeIndex
                      ? 'text-[#202322] border-b-2 border-[#A65335]'
                      : 'text-[#585A55] hover:text-[#202322]'
                  }`}
                >
                  {review.author}
                </button>
              ))}
            </div>

            <a
              href="https://www.customcutsdesigns.com.au/testimonials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#585A55] hover:text-[#A65335] transition-colors whitespace-nowrap"
            >
              Source: customcutsdesigns.com.au/testimonials
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 11 — ABOUT THE BUSINESS */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-[#E9E2D7]/35 text-[#202322] py-20 sm:py-24 lg:py-32"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-[#A65335] mb-3">
                  About {BUSINESS_INFO.name}
                </p>
                <h2
                  id="about-heading"
                  className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3.1vw,2.85rem)] leading-[1.1]"
                >
                  Practical metalwork led by hands-on experience.
                </h2>

                <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-[1.7] text-[#585A55] max-w-[58ch]">
                  <p>
                    Founded and directed by <strong className="font-semibold text-[#202322]">{BUSINESS_INFO.founder}</strong>,{' '}
                    {BUSINESS_INFO.name} is an Australian-owned and operated custom steel
                    fabrication and landscaping business based in Melbourne, Victoria.
                  </p>
                  <p>
                    Built around the principle of <span className="italic font-[Fraunces] text-[#202322]">“{BUSINESS_INFO.tagline}”</span>,
                    the business unites in-house fabrication with landscape construction and
                    professional onsite installation. That combined capability removes the gap
                    between how a feature is drawn in the workshop and how it sits in your garden or
                    commercial space.
                  </p>
                  <p>
                    With over a decade of industry experience, we work directly with homeowners,
                    landscape designers and commercial clients across Melbourne and regional
                    Victoria to deliver Corten steel features, custom metalwork, retaining walls,
                    fencing and integrated outdoor builds.
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#202322]/12 text-sm">
                <div>
                  <dt className="text-xs text-[#585A55]">Founder &amp; Director</dt>
                  <dd className="mt-1 font-[Sora] font-semibold text-[#202322]">
                    {BUSINESS_INFO.founder}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#585A55]">Location</dt>
                  <dd className="mt-1 font-[Sora] font-semibold text-[#202322]">
                    Melbourne, VIC
                  </dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs text-[#585A55]">Experience</dt>
                  <dd className="mt-1 font-[Sora] font-semibold text-[#202322]">
                    10+ years in industry
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6">
              <ResilientImage
                src={ASSETS.workshop}
                alt="Inside a metal fabrication workshop showing raw steel sheets and custom folded planter frames resting on a heavy steel bench"
                containerClassName="aspect-[4/3] lg:aspect-auto lg:h-full w-full overflow-hidden border border-[#202322]/12"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
