import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BUSINESS_INFO, NAV_ITEMS } from '../data/siteData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
}

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        stroke={light ? '#F7F6F2' : '#202322'}
        strokeWidth="1.75"
      />
      <path
        d="M15.5 7.5H8.5V16.5H15.5"
        stroke={light ? '#F7F6F2' : '#202322'}
        strokeWidth="1.75"
      />
      <path d="M12.5 12H22" stroke="#A65335" strokeWidth="2" />
    </svg>
  );
}

export function Navbar({ activeSection, onNavigate, onRequestQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  const handleQuoteClick = () => {
    setMobileOpen(false);
    onRequestQuote();
  };

  const isLightHeader = !isScrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          isLightHeader
            ? 'bg-[#202322]/25 backdrop-blur-sm border-b border-white/10 text-[#F7F6F2]'
            : 'bg-[#F7F6F2]/96 backdrop-blur-md border-b border-[#202322]/10 text-[#202322]'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 lg:h-[74px] flex items-center justify-between gap-8">
          {/* Zone 1: Clean single-line Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="inline-flex items-center gap-2.5 font-[Sora] text-base sm:text-[17px] font-semibold tracking-tight whitespace-nowrap shrink-0"
          >
            <BrandMark light={isLightHeader} />
            <span>{BUSINESS_INFO.name}</span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isLightHeader
                      ? isActive
                        ? 'text-white'
                        : 'text-[#E9E2D7]/85 hover:text-white'
                      : isActive
                        ? 'text-[#202322]'
                        : 'text-[#585A55] hover:text-[#202322]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#A65335]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleQuoteClick}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isLightHeader
                  ? 'bg-[#A65335] text-[#F7F6F2] hover:bg-[#8A4329]'
                  : 'bg-[#202322] text-[#F7F6F2] hover:bg-[#A65335]'
              }`}
            >
              Request a quote
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`lg:hidden inline-flex items-center justify-center w-11 h-11 transition-colors cursor-pointer ${
                isLightHeader
                  ? 'text-[#F7F6F2] hover:bg-white/10'
                  : 'text-[#202322] hover:bg-[#202322]/5'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 bg-[#F7F6F2] text-[#202322] lg:hidden overflow-y-auto border-t border-[#202322]/10"
          >
            <div className="px-6 py-8 flex flex-col justify-between min-h-[calc(100svh-4rem)] gap-10">
              <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#202322]/10">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.id);
                      }}
                      className={`py-4 text-xl font-[Sora] font-semibold tracking-tight flex items-center justify-between ${
                        isActive ? 'text-[#A65335]' : 'text-[#202322]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-[Manrope] font-normal text-[#585A55]">
                        View section
                      </span>
                    </a>
                  );
                })}
              </nav>

              <div className="space-y-4 pt-6 border-t border-[#202322]/10">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="w-full py-3.5 px-6 bg-[#202322] text-[#F7F6F2] text-sm font-semibold hover:bg-[#A65335] transition-colors cursor-pointer"
                >
                  Book a free onsite measure &amp; quote
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-[#585A55]">
                  <a href={BUSINESS_INFO.phoneHref} className="hover:text-[#202322] font-medium">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <a href={BUSINESS_INFO.emailHref} className="hover:text-[#202322]">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
