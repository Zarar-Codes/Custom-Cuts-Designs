import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectTypeOption, SERVICE_PATHWAYS, ServicePathway } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface ServicePathwaysProps {
  onSelectPathway: (sectionId: string, projectType?: ProjectTypeOption) => void;
}

export function ServicePathways({ onSelectPathway }: ServicePathwaysProps) {
  const prefersReducedMotion = useReducedMotion();
  const [pathwayA, pathwayB, pathwayC] = SERVICE_PATHWAYS;

  const renderPathwayAction = (pathway: ServicePathway) => (
    <button
      type="button"
      onClick={() => onSelectPathway(pathway.targetSection, pathway.presetProjectType)}
      className="group/btn inline-flex items-center gap-2.5 text-sm font-semibold text-[#202322] hover:text-[#A65335] transition-colors duration-150 pt-2 cursor-pointer whitespace-nowrap"
    >
      <span className="border-b border-[#202322]/30 group-hover/btn:border-[#A65335] pb-0.5 transition-colors">
        {pathway.ctaLabel}
      </span>
      <ArrowRight
        className="w-4 h-4 text-[#A65335] transition-transform duration-200 group-hover/btn:translate-x-1"
        aria-hidden="true"
      />
    </button>
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#E9E2D7]/45 text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14 lg:mb-16">
          <p className="text-sm font-medium text-[#A65335] mb-3">
            Three clear ways to work with us
          </p>
          <h2
            id="services-heading"
            className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.1]"
          >
            Choose the pathway that fits your project.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#585A55]">
            Whether you are ordering individual Corten steel products, commissioning bespoke
            metalwork, or coordinating a full outdoor build, start with the scope that matches your
            plans.
          </p>
        </div>

        {/* Pathway A — Featured Horizontal Architectural Split */}
        <motion.article
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group grid grid-cols-1 lg:grid-cols-12 bg-[#F7F6F2] border border-[#202322]/12 mb-8 lg:mb-10"
        >
          <div className="lg:col-span-7 overflow-hidden bg-[#303431]">
            <ResilientImage
              src={pathwayA.image}
              alt={pathwayA.imageAlt}
              containerClassName="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>

          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-medium text-[#585A55] mb-3">
                {pathwayA.code} <span aria-hidden="true" className="mx-1.5 text-[#AAA9A2]">·</span>{' '}
                {pathwayA.label}
              </p>
              <h3 className="font-[Sora] text-2xl sm:text-[28px] font-semibold tracking-tight text-[#202322]">
                {pathwayA.title}
              </h3>
              <p className="mt-3 text-sm font-medium text-[#202322]/85 leading-relaxed">
                {pathwayA.audience}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#585A55]">
                {pathwayA.description}
              </p>

              <ul className="mt-6 pt-5 border-t border-[#202322]/10 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#202322]">
                {pathwayA.categories.map((cat) => (
                  <li key={cat} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-[#A65335] mt-0.5">—</span>
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">{renderPathwayAction(pathwayA)}</div>
          </div>
        </motion.article>

        {/* Pathways B & C — Asymmetric Editorial Pair */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {[
            { pathway: pathwayB, span: 'lg:col-span-6' },
            { pathway: pathwayC, span: 'lg:col-span-6' },
          ].map(({ pathway, span }, idx) => (
            <motion.article
              key={pathway.code}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${span} group bg-[#F7F6F2] border border-[#202322]/12 flex flex-col`}
            >
              <div className="overflow-hidden bg-[#303431]">
                <ResilientImage
                  src={pathway.image}
                  alt={pathway.imageAlt}
                  containerClassName="aspect-[4/3] w-full overflow-hidden"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-7 sm:p-9 lg:p-10 flex-1 flex flex-col justify-between gap-7">
                <div>
                  <p className="text-xs font-medium text-[#585A55] mb-2.5">
                    {pathway.code}{' '}
                    <span aria-hidden="true" className="mx-1.5 text-[#AAA9A2]">·</span>{' '}
                    {pathway.label}
                  </p>
                  <h3 className="font-[Sora] text-2xl font-semibold tracking-tight text-[#202322]">
                    {pathway.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium text-[#202322]/85 leading-relaxed">
                    {pathway.audience}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#585A55]">
                    {pathway.description}
                  </p>

                  <ul className="mt-5 pt-5 border-t border-[#202322]/10 space-y-2 text-sm text-[#202322]">
                    {pathway.categories.map((cat) => (
                      <li key={cat} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#A65335] mt-0.5">—</span>
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>{renderPathwayAction(pathway)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
