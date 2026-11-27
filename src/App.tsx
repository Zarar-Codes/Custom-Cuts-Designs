import { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS, ProjectTypeOption } from './data/siteData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ServicePathways } from './components/ServicePathways';
import { FeaturedFabrication } from './components/FeaturedFabrication';
import { CortenCollection } from './components/CortenCollection';
import { ProjectPortfolio } from './components/ProjectPortfolio';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { WhyChooseAndProcess } from './components/WhyChooseAndProcess';
import { TestimonialsAndAbout } from './components/TestimonialsAndAbout';
import { ContactAndFooter } from './components/ContactAndFooter';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectTypeOption>('Corten steel edging');
  const [prefillNote, setPrefillNote] = useState<string>('');
  const [prefillVersion, setPrefillVersion] = useState<number>(0);

  useEffect(() => {
    const observedIds = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const routeToEnquiry = useCallback(
    (projectType: ProjectTypeOption, contextNote = '') => {
      setSelectedProjectType(projectType);
      setPrefillNote(contextNote);
      setPrefillVersion((prev) => prev + 1);
      scrollToSection('contact');
    },
    [scrollToSection]
  );

  const handleSelectPathway = useCallback(
    (sectionId: string, projectType?: ProjectTypeOption) => {
      if (sectionId === 'contact' && projectType) {
        routeToEnquiry(projectType);
      } else {
        scrollToSection(sectionId);
      }
    },
    [routeToEnquiry, scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#202322] overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#202322] focus:text-[#F7F6F2] focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onRequestQuote={() => scrollToSection('contact')}
      />

      <main id="main-content">
        <HeroSection
          onExploreWork={() => scrollToSection('portfolio')}
          onRequestQuote={() => scrollToSection('contact')}
        />

        <IntroSection />

        <ServicePathways onSelectPathway={handleSelectPathway} />

        <FeaturedFabrication
          onEnquireCustom={(projectType) =>
            routeToEnquiry(
              projectType,
              'Custom steel fabrication enquiry — please advise on options and onsite measure availability.'
            )
          }
        />

        <CortenCollection onEnquireProduct={routeToEnquiry} />

        <ProjectPortfolio onEnquireSimilar={routeToEnquiry} />

        <CraftsmanshipSection />

        <WhyChooseAndProcess />

        <TestimonialsAndAbout />

        <ContactAndFooter
          selectedProjectType={selectedProjectType}
          prefillNote={prefillNote}
          prefillVersion={prefillVersion}
          onNavigate={scrollToSection}
        />
      </main>
    </div>
  );
}
