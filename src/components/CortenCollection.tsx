import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CORTEN_COLLECTION, CortenProduct, ProjectTypeOption } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface CortenCollectionProps {
  onEnquireProduct: (projectType: ProjectTypeOption, contextNote: string) => void;
}

export function CortenCollection({ onEnquireProduct }: CortenCollectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      CORTEN_COLLECTION.map((product) => [product.id, product.configurationOptions[0]])
    )
  );

  const handleOptionSelect = (productId: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: option }));
  };

  const handleEnquire = (product: CortenProduct) => {
    const chosenOption = selectedOptions[product.id] || product.configurationOptions[0];
    onEnquireProduct(
      product.presetProjectType,
      `Enquiry regarding ${product.name} (${chosenOption}). Please advise on dimensions, options and pricing.`
    );
  };

  return (
    <section
      id="corten-collection"
      aria-labelledby="corten-heading"
      className="bg-[#F7F6F2] text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#A65335] mb-3">
              Corten steel collection
            </p>
            <h2
              id="corten-heading"
              className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3.3vw,3rem)] leading-[1.08]"
            >
              Architectural Corten steel, fabricated to your space.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[15px] sm:text-base leading-[1.65] text-[#585A55]">
              Every Corten steel item we fabricate is tailored to project dimensions and site
              conditions. Select an option below to start an accurate, transparent quote — with no
              misleading placeholder prices or guesswork.
            </p>
          </div>
        </div>

        {/* Consistent 2-column architectural product catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CORTEN_COLLECTION.map((product, index) => {
            const activeOption = selectedOptions[product.id];
            return (
              <motion.article
                key={product.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#F7F6F2] border border-[#202322]/14 flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden bg-[#303431]">
                    <ResilientImage
                      src={product.image}
                      alt={product.imageAlt}
                      containerClassName="aspect-[16/10] w-full overflow-hidden"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-medium text-[#585A55] mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-[Sora] text-xl sm:text-2xl font-semibold tracking-tight text-[#202322]">
                      {product.name}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.65] text-[#585A55]">
                      {product.shortDescription}
                    </p>

                    {/* Interactive Configuration Selector (for quote brief, never faking a price calculator) */}
                    <div className="mt-6 pt-5 border-t border-[#202322]/10">
                      <p className="text-xs font-medium text-[#585A55] mb-3">
                        Typical configurations (select to include in your quote request)
                      </p>
                      <div
                        role="group"
                        aria-label={`${product.name} configuration options`}
                        className="flex flex-wrap gap-2"
                      >
                        {product.configurationOptions.map((option) => {
                          const isSelected = activeOption === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleOptionSelect(product.id, option)}
                              aria-pressed={isSelected}
                              className={`px-3 py-1.5 text-xs font-medium border transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                                isSelected
                                  ? 'bg-[#202322] text-[#F7F6F2] border-[#202322]'
                                  : 'bg-transparent text-[#202322] border-[#202322]/20 hover:border-[#A65335] hover:text-[#A65335]'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transparent Consistent Pricing & Enquiry Footer */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5 border-t border-[#202322]/10 bg-[#E9E2D7]/35 space-y-4">
                  <div>
                    <p className="font-[Sora] text-sm font-semibold text-[#202322]">
                      {product.pricingLabel}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#585A55]">
                      {product.pricingGuidance}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEnquire(product)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#202322] text-[#F7F6F2] text-sm font-semibold hover:bg-[#A65335] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <span>Request a custom quote</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
