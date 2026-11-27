import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  PortfolioItem,
  ProjectTypeOption,
} from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface ProjectPortfolioProps {
  onEnquireSimilar: (projectType: ProjectTypeOption, contextNote: string) => void;
}

export function ProjectPortfolio({ onEnquireSimilar }: ProjectPortfolioProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All Projects');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'All Projects'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.categories.includes(activeCategory));

  const selectedProject: PortfolioItem | null =
    selectedIndex !== null && filteredItems[selectedIndex] ? filteredItems[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, filteredItems.length]);

  const handleCategoryChange = (category: PortfolioCategory) => {
    setSelectedIndex(null);
    setActiveCategory(category);
  };

  const getGridSpan = (index: number, total: number) => {
    if (activeCategory === 'All Projects' && total >= 6) {
      if (index === 0) return 'lg:col-span-8';
      if (index === 1) return 'lg:col-span-4';
      if (index === 2) return 'lg:col-span-5';
      if (index === 3) return 'lg:col-span-7';
      if (index === 4) return 'lg:col-span-7';
      return 'lg:col-span-5';
    }
    return index === 0 && total > 2 ? 'lg:col-span-8' : 'lg:col-span-4';
  };

  const getAspectClass = (index: number) => {
    if (activeCategory === 'All Projects' && index === 0) {
      return 'aspect-[16/10]';
    }
    return 'aspect-[4/3]';
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="bg-[#E9E2D7]/40 text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Portfolio Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#A65335] mb-3">
              Selected fabrication &amp; outdoor showcase
            </p>
            <h2
              id="portfolio-heading"
              className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3.3vw,3rem)] leading-[1.08]"
            >
              Craftsmanship designed for real outdoor spaces.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#585A55]">
              Explore how Corten steel edging, retaining walls, planters, screens and boundary gates
              resolve site levels and architectural detail. Click any showcase for a full-size view
              and breakdown.
            </p>
          </div>
        </div>

        {/* Interactive Category Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter portfolio by category"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 border-b border-[#202322]/12"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#202322] text-[#F7F6F2]'
                    : 'text-[#585A55] hover:text-[#202322] hover:bg-[#202322]/5'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Varied Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.article
              key={item.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`${getGridSpan(idx, filteredItems.length)} group bg-[#F7F6F2] border border-[#202322]/12 flex flex-col`}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Inspect ${item.title} in full view`}
                className="relative block w-full text-left overflow-hidden bg-[#303431] cursor-pointer"
              >
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  containerClassName={`${getAspectClass(idx)} w-full overflow-hidden`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#202322]/85 text-[#F7F6F2] text-xs font-medium opacity-90 group-hover:bg-[#A65335] transition-colors"
                >
                  <Expand className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </button>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <p className="text-xs font-medium text-[#585A55]">
                    {item.projectType}
                  </p>
                  <h3 className="mt-1.5 font-[Sora] text-lg sm:text-xl font-semibold tracking-tight text-[#202322]">
                    {item.title}
                  </h3>

                  <dl className="mt-4 pt-4 border-t border-[#202322]/10 space-y-2.5 text-sm">
                    <div>
                      <dt className="inline font-semibold text-[#202322]">The requirement: </dt>
                      <dd className="inline text-[#585A55]">{item.requirement}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-[#202322]">The solution: </dt>
                      <dd className="inline text-[#585A55]">{item.solution}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-[#202322]">The finish: </dt>
                      <dd className="inline text-[#585A55]">{item.finish}</dd>
                    </div>
                  </dl>
                </div>

                <div className="pt-3 border-t border-[#202322]/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-[#585A55]">
                    {item.categories.join(' · ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="text-xs font-semibold text-[#202322] hover:text-[#A65335] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open full view
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Honest photography attribution & live gallery link */}
        <div className="mt-10 pt-6 border-t border-[#202322]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#585A55]">
          <p className="max-w-2xl">
            Illustrative architectural photography is displayed in this redesign preview to show
            layout, materiality and proportions pending direct upload of original project photos
            from the Custom Cuts &amp; Designs archive.
          </p>
          <a
            href="https://www.customcutsdesigns.com.au/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#202322] hover:text-[#A65335] transition-colors whitespace-nowrap shrink-0"
          >
            <span>View official photo gallery</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A65335]" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Fullscreen Accessible Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#202322]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-[#F7F6F2] text-[#202322] border border-white/15 overflow-hidden my-auto"
            >
              {/* Modal Top Bar */}
              <div className="px-5 sm:px-7 py-4 border-b border-[#202322]/12 flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-[#585A55] tabular-nums">
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(filteredItems.length).padStart(2, '0')}{' '}
                  <span aria-hidden="true" className="mx-1.5 text-[#AAA9A2]">·</span>
                  {selectedProject.projectType}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + filteredItems.length) % filteredItems.length
                      )
                    }
                    aria-label="Previous showcase"
                    className="w-10 h-10 inline-flex items-center justify-center border border-[#202322]/15 text-[#202322] hover:bg-[#202322] hover:text-[#F7F6F2] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % filteredItems.length)
                    }
                    aria-label="Next showcase"
                    className="w-10 h-10 inline-flex items-center justify-center border border-[#202322]/15 text-[#202322] hover:bg-[#202322] hover:text-[#F7F6F2] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    aria-label="Close full view"
                    className="w-10 h-10 inline-flex items-center justify-center bg-[#202322] text-[#F7F6F2] hover:bg-[#A65335] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 bg-[#202322]">
                  <ResilientImage
                    src={selectedProject.image}
                    alt={selectedProject.imageAlt}
                    containerClassName="aspect-[4/3] lg:aspect-auto lg:h-full w-full"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <h3
                      id="lightbox-title"
                      className="font-[Sora] text-xl sm:text-2xl font-semibold tracking-tight text-[#202322]"
                    >
                      {selectedProject.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#585A55]">{selectedProject.caption}</p>

                    <dl className="mt-6 space-y-4 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-[#A65335]">The requirement</dt>
                        <dd className="mt-1 text-[#585A55] leading-relaxed">
                          {selectedProject.requirement}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#A65335]">The solution</dt>
                        <dd className="mt-1 text-[#585A55] leading-relaxed">
                          {selectedProject.solution}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#A65335]">The finish</dt>
                        <dd className="mt-1 text-[#585A55] leading-relaxed">
                          {selectedProject.finish}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="pt-5 border-t border-[#202322]/12">
                    <button
                      type="button"
                      onClick={() => {
                        const project = selectedProject;
                        setSelectedIndex(null);
                        onEnquireSimilar(
                          project.presetProjectType,
                          `Interested in a similar solution to "${project.title}" (${project.projectType}).`
                        );
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#202322] text-[#F7F6F2] text-sm font-semibold hover:bg-[#A65335] transition-colors cursor-pointer"
                    >
                      <span>Enquire about a similar project</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
