import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  Copy,
  Instagram,
  Facebook,
  Mail,
  Phone,
  Upload,
  X,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  NAV_ITEMS,
  PROJECT_TYPE_OPTIONS,
  ProjectTypeOption,
} from '../data/siteData';
import { BrandMark } from './Navbar';

interface ContactAndFooterProps {
  selectedProjectType: ProjectTypeOption;
  prefillNote: string;
  prefillVersion: number;
  onNavigate: (sectionId: string) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  projectType: ProjectTypeOption;
  suburb: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormValues | 'attachment', string>>;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function ContactAndFooter({
  selectedProjectType,
  prefillNote,
  prefillVersion,
  onNavigate,
}: ContactAndFooterProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    projectType: selectedProjectType,
    suburb: '',
    description: prefillNote,
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [demoPreviewData, setDemoPreviewData] = useState<FormValues | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (prefillVersion === 0) return;
    setValues((prev) => ({
      ...prev,
      projectType: selectedProjectType,
      description: prefillNote || prev.description,
    }));
    setDemoPreviewData(null);
  }, [selectedProjectType, prefillNote, prefillVersion]);

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!data.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address (for example, name@example.com.au).';
    }

    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    if (!cleanedPhone) {
      nextErrors.phone = 'Please enter a contact phone number.';
    } else if (!/^\+?\d{8,15}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Please enter a valid Australian or international phone number.';
    }

    if (!data.suburb.trim()) {
      nextErrors.suburb = 'Please enter your suburb or project location.';
    }

    if (!data.description.trim() || data.description.trim().length < 15) {
      nextErrors.description =
        'Please include a brief overview of your project, approximate dimensions or goals (at least 15 characters).';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        attachment: 'Please attach a JPG, PNG, WebP image or PDF file.',
      }));
      setAttachment(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        attachment: 'Reference file must be 10 MB or smaller.',
      }));
      setAttachment(null);
      return;
    }

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.attachment;
      return updated;
    });
    setAttachment(file);
  };

  const clearAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const buildPlainSummary = (data: FormValues) => {
    const lines = [
      `New Project Enquiry — ${BUSINESS_INFO.name}`,
      `Full name: ${data.fullName.trim()}`,
      `Email: ${data.email.trim()}`,
      `Phone: ${data.phone.trim()}`,
      `Project type: ${data.projectType}`,
      `Suburb / Location: ${data.suburb.trim()}`,
      attachment ? `Reference file selected: ${attachment.name}` : 'Reference file: None attached',
      '',
      'Project description:',
      data.description.trim(),
    ];
    return lines.join('\n');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setDemoPreviewData(null);
      return;
    }

    setErrors({});
    setDemoPreviewData({ ...values });
    setCopiedSummary(false);
  };

  const handleCopySummary = async () => {
    if (!demoPreviewData) return;
    try {
      await navigator.clipboard.writeText(buildPlainSummary(demoPreviewData));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      setCopiedSummary(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const mailtoHref = demoPreviewData
    ? `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
        `Project Enquiry — ${demoPreviewData.projectType} (${demoPreviewData.suburb.trim()})`
      )}&body=${encodeURIComponent(buildPlainSummary(demoPreviewData))}`
    : BUSINESS_INFO.emailHref;

  const verifiedServiceLinks: { label: string; projectType: ProjectTypeOption }[] = [
    { label: 'Corten steel garden edging', projectType: 'Corten steel edging' },
    { label: 'Corten steel planter boxes', projectType: 'Planter boxes' },
    { label: 'Corten steel retaining walls', projectType: 'Retaining walls' },
    { label: 'Custom steel fabrication', projectType: 'Custom fabrication' },
    { label: 'Fencing, gates & decorative screens', projectType: 'Fencing and screens' },
    { label: 'Landscaping & outdoor builds', projectType: 'Landscaping' },
  ];

  return (
    <>
      {/* SECTION 12 — FINAL ENQUIRY CTA */}
      <section
        aria-labelledby="final-cta-heading"
        className="bg-[#202322] text-[#F7F6F2] py-20 sm:py-24 lg:py-28 border-b border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#A65335] mb-3">
                Free onsite measure &amp; quote
              </p>
              <h2
                id="final-cta-heading"
                className="font-[Sora] font-semibold tracking-[-0.03em] text-[#F7F6F2] text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.05]"
              >
                Have an idea?
                <br />
                Let’s make it real.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#E9E2D7]/82 max-w-[54ch]">
                Whether you’re planning a Corten steel feature, a custom fabrication project or a
                complete outdoor improvement, get in touch to discuss your requirements.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#A65335] text-[#F7F6F2] text-sm font-semibold hover:bg-[#8A4329] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Book a free onsite measure &amp; quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-[#F7F6F2]/35 text-[#F7F6F2] text-sm font-semibold hover:bg-[#F7F6F2] hover:text-[#202322] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#A65335]" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13 — CONTACT FORM */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-[#F7F6F2] text-[#202322] py-20 sm:py-24 lg:py-32 border-b border-[#202322]/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Direct Contact Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-sm font-medium text-[#A65335] mb-3">
                  Start your enquiry
                </p>
                <h2
                  id="contact-heading"
                  ref={formHeadingRef}
                  className="font-[Sora] font-semibold tracking-[-0.025em] text-[#202322] text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.1]"
                >
                  Tell us about your project.
                </h2>
                <p className="mt-4 text-[15px] sm:text-base leading-[1.68] text-[#585A55]">
                  Share your ideas, rough measurements or site suburb below. For immediate
                  conversations, call Jarrod directly or email your plans and reference images.
                </p>
              </div>

              <div className="divide-y divide-[#202322]/12 border-t border-b border-[#202322]/12">
                <div className="py-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#585A55]">Phone</p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-1 inline-block font-[Sora] text-lg font-semibold text-[#202322] hover:text-[#A65335] transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                  <Phone className="w-4 h-4 text-[#A65335] mt-1 shrink-0" aria-hidden="true" />
                </div>

                <div className="py-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#585A55]">Email</p>
                    <a
                      href={BUSINESS_INFO.emailHref}
                      className="mt-1 inline-block font-[Sora] text-base sm:text-lg font-semibold text-[#202322] hover:text-[#A65335] transition-colors break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <Mail className="w-4 h-4 text-[#A65335] mt-1 shrink-0" aria-hidden="true" />
                </div>

                <div className="py-5">
                  <p className="text-xs font-medium text-[#585A55]">Service area</p>
                  <p className="mt-1 font-[Sora] text-base font-semibold text-[#202322]">
                    {BUSINESS_INFO.serviceArea}
                  </p>
                  <p className="mt-1 text-xs text-[#585A55]">
                    Residential &amp; commercial projects · Free onsite measure &amp; quote
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#E9E2D7]/55 border border-[#202322]/12 text-xs leading-relaxed text-[#585A55]">
                <p className="font-semibold text-[#202322] mb-1">
                  Frontend demonstration notice
                </p>
                <p>
                  This redesign preview validates all enquiry inputs on the client side and prepares
                  your formatted enquiry for email handoff. Before production launch, connect the
                  form submission handler to a live mail API or form endpoint (for example, a server
                  route using Resend/SMTP or Formspree) with multipart file storage for uploaded
                  reference photos.
                </p>
              </div>
            </div>

            {/* Right Interactive Enquiry Form */}
            <div id="enquiry-form" className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project quote enquiry form"
                className="bg-[#FFFFFF] border border-[#202322]/14 p-6 sm:p-9 lg:p-10 space-y-6"
              >
                {Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    className="p-4 bg-[#A65335]/10 border border-[#A65335]/40 text-sm text-[#202322] flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-[#A65335] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Please review the highlighted fields below.</p>
                      <p className="text-xs text-[#585A55] mt-0.5">
                        All required details must be completed before preparing your enquiry.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-[#202322] mb-2"
                    >
                      Full name <span className="text-[#A65335]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 bg-[#F7F6F2] border text-sm text-[#202322] placeholder:text-[#585A55]/60 transition-colors ${
                        errors.fullName ? 'border-[#A65335]' : 'border-[#202322]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1.5 text-xs font-medium text-[#A65335]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#202322] mb-2"
                    >
                      Phone number <span className="text-[#A65335]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      placeholder="e.g. 0412 345 678"
                      className={`w-full px-4 py-3 bg-[#F7F6F2] border text-sm text-[#202322] placeholder:text-[#585A55]/60 transition-colors ${
                        errors.phone ? 'border-[#A65335]' : 'border-[#202322]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1.5 text-xs font-medium text-[#A65335]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#202322] mb-2"
                    >
                      Email address <span className="text-[#A65335]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="you@example.com.au"
                      className={`w-full px-4 py-3 bg-[#F7F6F2] border text-sm text-[#202322] placeholder:text-[#585A55]/60 transition-colors ${
                        errors.email ? 'border-[#A65335]' : 'border-[#202322]/20'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs font-medium text-[#A65335]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="suburb"
                      className="block text-sm font-medium text-[#202322] mb-2"
                    >
                      Suburb or project location{' '}
                      <span className="text-[#A65335]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="suburb"
                      name="suburb"
                      type="text"
                      required
                      value={values.suburb}
                      onChange={(e) => handleFieldChange('suburb', e.target.value)}
                      aria-invalid={Boolean(errors.suburb)}
                      aria-describedby={errors.suburb ? 'suburb-error' : undefined}
                      placeholder="e.g. Brighton, Geelong, Mornington"
                      className={`w-full px-4 py-3 bg-[#F7F6F2] border text-sm text-[#202322] placeholder:text-[#585A55]/60 transition-colors ${
                        errors.suburb ? 'border-[#A65335]' : 'border-[#202322]/20'
                      }`}
                    />
                    {errors.suburb && (
                      <p id="suburb-error" className="mt-1.5 text-xs font-medium text-[#A65335]">
                        {errors.suburb}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-[#202322] mb-2"
                  >
                    Project type <span className="text-[#A65335]" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={values.projectType}
                    onChange={(e) =>
                      handleFieldChange('projectType', e.target.value as ProjectTypeOption)
                    }
                    className="w-full px-4 py-3 bg-[#F7F6F2] border border-[#202322]/20 text-sm text-[#202322]"
                  >
                    {PROJECT_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-[#202322] mb-2"
                  >
                    Project description{' '}
                    <span className="text-[#A65335]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={values.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    placeholder="Share approximate lengths, heights, supply-only vs. onsite installation, or any design ideas."
                    className={`w-full px-4 py-3 bg-[#F7F6F2] border text-sm text-[#202322] placeholder:text-[#585A55]/60 transition-colors resize-y ${
                      errors.description ? 'border-[#A65335]' : 'border-[#202322]/20'
                    }`}
                  />
                  {errors.description && (
                    <p id="description-error" className="mt-1.5 text-xs font-medium text-[#A65335]">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Optional Photo or Reference Upload */}
                <div>
                  <label
                    htmlFor="reference-file"
                    className="block text-sm font-medium text-[#202322] mb-2"
                  >
                    Optional site photo or reference sketch
                  </label>

                  {!attachment ? (
                    <label
                      htmlFor="reference-file"
                      className="flex items-center justify-between gap-4 px-4 py-3.5 bg-[#F7F6F2] border border-dashed border-[#202322]/25 hover:border-[#A65335] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3 text-sm text-[#585A55]">
                        <Upload className="w-4 h-4 text-[#A65335] shrink-0" aria-hidden="true" />
                        <span>Attach JPG, PNG, WebP or PDF (up to 10 MB)</span>
                      </span>
                      <span className="text-xs font-semibold text-[#202322] whitespace-nowrap">
                        Choose file
                      </span>
                      <input
                        ref={fileInputRef}
                        id="reference-file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#E9E2D7]/55 border border-[#202322]/15 text-sm">
                      <span className="truncate text-[#202322] font-medium">
                        {attachment.name}{' '}
                        <span className="text-xs font-normal text-[#585A55]">
                          ({(attachment.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={clearAttachment}
                        aria-label="Remove attached file"
                        className="p-1.5 text-[#585A55] hover:text-[#A65335] transition-colors cursor-pointer shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {errors.attachment && (
                    <p className="mt-1.5 text-xs font-medium text-[#A65335]">
                      {errors.attachment}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#202322] text-[#F7F6F2] text-sm font-semibold hover:bg-[#A65335] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Prepare quote enquiry</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <p className="text-xs text-[#585A55]">
                    Frontend demo · Direct email handoff enabled below
                  </p>
                </div>

                {/* Honest Demo Preview Output (No fake "sent" message) */}
                {demoPreviewData && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 p-5 sm:p-6 bg-[#E9E2D7]/60 border border-[#202322]/20 space-y-4"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#A65335]">
                        Frontend demo — Enquiry validated (not yet transmitted automatically)
                      </p>
                      <h3 className="mt-1 font-[Sora] text-base font-semibold text-[#202322]">
                        Your enquiry summary is ready to send
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#585A55]">
                        No backend mail service is connected in this preview build, so this form has
                        not been transmitted automatically. Use your email app below to send these
                        details directly to {BUSINESS_INFO.email}, or connect a server-side form
                        endpoint before launch.
                      </p>
                    </div>

                    <pre className="p-4 bg-[#F7F6F2] border border-[#202322]/10 text-xs text-[#202322] whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                      {buildPlainSummary(demoPreviewData)}
                    </pre>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A65335] text-[#F7F6F2] text-xs font-semibold hover:bg-[#8A4329] transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Send via email app</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#202322]/25 bg-[#F7F6F2] text-[#202322] text-xs font-semibold hover:border-[#202322] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#A65335]" aria-hidden="true" />
                            <span>Copied enquiry details</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy details</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 — FOOTER */}
      <footer className="bg-[#202322] text-[#E9E2D7] pt-16 sm:pt-20 pb-10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('hero');
                }}
                className="inline-flex items-center gap-2.5 font-[Sora] text-lg font-semibold tracking-tight text-[#F7F6F2]"
              >
                <BrandMark light />
                <span>{BUSINESS_INFO.name}</span>
              </a>
              <p className="text-sm leading-relaxed text-[#AAA9A2] max-w-[36ch]">
                Australian-owned custom steel fabrication, Corten garden features and landscape
                construction in Melbourne, Victoria. {BUSINESS_INFO.tagline}
              </p>
              <p className="text-xs text-[#AAA9A2]">
                {BUSINESS_INFO.legalName} · ABN {BUSINESS_INFO.abn}
              </p>
            </div>

            {/* Homepage Section Links */}
            <div className="lg:col-span-2">
              <h3 className="font-[Sora] text-sm font-semibold text-[#F7F6F2] mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-[#AAA9A2]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.id);
                      }}
                      className="hover:text-[#F7F6F2] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Service Categories */}
            <div className="lg:col-span-3">
              <h3 className="font-[Sora] text-sm font-semibold text-[#F7F6F2] mb-4">
                Services &amp; products
              </h3>
              <ul className="space-y-2.5 text-sm text-[#AAA9A2]">
                {verifiedServiceLinks.map((service) => (
                  <li key={service.label}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('contact');
                      }}
                      className="hover:text-[#F7F6F2] transition-colors"
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social Links */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-[Sora] text-sm font-semibold text-[#F7F6F2]">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-[#AAA9A2]">
                <li>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="hover:text-[#F7F6F2] transition-colors font-medium text-[#E9E2D7]"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.emailHref}
                    className="hover:text-[#F7F6F2] transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li>{BUSINESS_INFO.location}</li>
              </ul>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Custom Cuts & Designs on Instagram"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/15 text-xs font-medium text-[#E9E2D7] hover:border-[#A65335] hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#A65335]" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Custom Cuts & Designs on Facebook"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/15 text-xs font-medium text-[#E9E2D7] hover:border-[#A65335] hover:text-white transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#A65335]" aria-hidden="true" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#AAA9A2]">
            <p>
              © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
            </p>
            <p>
              Melbourne, Victoria · Residential &amp; commercial custom steel fabrication
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
