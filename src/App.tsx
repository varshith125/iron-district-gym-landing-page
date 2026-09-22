import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  createLucideIcon,
  type LucideIcon,
} from "lucide-react";

const Facebook: LucideIcon = createLucideIcon("Facebook", [
  ["path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "fb-1" }],
]);

const Instagram: LucideIcon = createLucideIcon("Instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "ig-1" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "ig-2" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "ig-3" }],
]);

const Youtube: LucideIcon = createLucideIcon("Youtube", [
  ["path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17", key: "yt-1" }],
  ["polygon", { points: "10 15 15 12 10 9 10 15", key: "yt-2" }],
]);

/* --------------------------------- Types ---------------------------------- */

interface NavItem {
  id: string;
  label: string;
}

interface HeroStat {
  index: string;
  label: string;
}

interface Principle {
  index: string;
  title: string;
  description: string;
}

interface TrainingProgram {
  id: string;
  index: string;
  title: string;
  description: string;
  frequency: string;
  focus: string;
  image: string;
  alt: string;
}

interface DistrictFeature {
  index: string;
  title: string;
  description: string;
}

interface Coach {
  index: string;
  name: string;
  role: string;
  certification: string;
  specialties: string[];
  image: string;
  alt: string;
}

interface StoryMetric {
  label: string;
  before: string;
  after: string;
}

interface MemberStory {
  name: string;
  age: number;
  goal: string;
  duration: string;
  headlineResult: string;
  resultTags: string[];
  quote: string;
  image: string;
  alt: string;
  metrics: StoryMetric[];
}

interface CommunityStat {
  value: number;
  suffix: string;
  label: string;
}

interface MembershipPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface FooterLink {
  label: string;
  targetId: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  icon: LucideIcon;
  href: string;
}

interface SectionHeadingProps {
  index: string;
  label: string;
  headingId: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
  center?: boolean;
}

interface CTAButtonProps {
  label: string;
  onClick: () => void;
  variant?: "solid" | "outline";
  className?: string;
}

interface BookingModalProps {
  context: string;
  onClose: () => void;
}

/* -------------------------------- Helpers --------------------------------- */

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollToId = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
};

const hideBrokenImage = (event: SyntheticEvent<HTMLImageElement>): void => {
  event.currentTarget.style.opacity = "0";
};

const CONTAINER = "mx-auto w-full max-w-[1400px] px-5 md:px-10";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1920",
  statement:
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1200",
  muscleGain:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200",
  fatLoss:
    "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=1200",
  performance:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200",
  community:
    "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80&sat=-100&w=1920",
  trial:
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&sat=-100&w=1920",
};

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&display=swap');

  :root { color-scheme: dark; }
  html { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }
  body {
    background-color: #050505;
    color: #ffffff;
    font-family: 'Archivo', ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  .font-display { font-family: 'Anton', 'Archivo', sans-serif; font-weight: 400; }
  ::selection { background-color: #ff5a00; color: #050505; }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #262626; border: 2px solid #050505; }
  ::-webkit-scrollbar-thumb:hover { background: #ff5a00; }
  :focus-visible { outline: 2px solid #ff5a00; outline-offset: 3px; }

  .text-stroke { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.6); color: transparent; }
  @media (min-width: 768px) { .text-stroke { -webkit-text-stroke-width: 2px; } }
  .text-stroke-faint { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.16); color: transparent; }
  .feature-number {
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
    color: transparent;
    transition: color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
  }
  .group:hover .feature-number { color: #ff5a00; -webkit-text-stroke-color: rgba(255, 90, 0, 0.45); }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: opacity, transform;
  }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }

  .grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 240px 240px;
  }

  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 32s linear infinite; }

  @keyframes scroll-line {
    0% { transform: scaleY(0); transform-origin: top; }
    45% { transform: scaleY(1); transform-origin: top; }
    55% { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  .animate-scroll-line { animation: scroll-line 2.2s cubic-bezier(0.76, 0, 0.24, 1) infinite; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .reveal { opacity: 1; transform: none; transition: none; }
    .marquee-track, .animate-scroll-line { animation: none; }
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
`;

/* ---------------------------------- Data ---------------------------------- */

const NAV_LINKS: NavItem[] = [
  { id: "training", label: "TRAINING" },
  { id: "coaches", label: "COACHES" },
  { id: "stories", label: "STORIES" },
  { id: "membership", label: "MEMBERSHIP" },
  { id: "about", label: "ABOUT" },
];

const HERO_STATS: HeroStat[] = [
  { index: "01", label: "EXPERT COACHES" },
  { index: "02", label: "PERFORMANCE TRAINING" },
  { index: "03", label: "REAL COMMUNITY" },
];

const PRINCIPLES: Principle[] = [
  { index: "01", title: "TRAIN WITH PURPOSE", description: "Every session has a reason." },
  { index: "02", title: "PROGRESS WITH STRUCTURE", description: "Training built around measurable progression." },
  { index: "03", title: "STAY ACCOUNTABLE", description: "Consistency creates results." },
  { index: "04", title: "GROW TOGETHER", description: "Your community pushes you forward." },
];

const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "muscle-gain",
    index: "P.01",
    title: "MUSCLE GAIN",
    description:
      "Progressive strength training designed to build lean muscle, power and confidence.",
    frequency: "4–5 DAYS / WEEK",
    focus: "STRENGTH FOCUSED",
    image: IMAGES.muscleGain,
    alt: "Athlete performing a heavy barbell lift in the IRON DISTRICT strength zone",
  },
  {
    id: "fat-loss",
    index: "P.02",
    title: "FAT LOSS",
    description:
      "High-intensity conditioning and strength programming designed to improve body composition.",
    frequency: "3–5 DAYS / WEEK",
    focus: "CONDITIONING + STRENGTH",
    image: IMAGES.fatLoss,
    alt: "Member mid-conditioning drill during a fat loss training session",
  },
  {
    id: "performance",
    index: "P.03",
    title: "PERFORMANCE",
    description:
      "Build speed, mobility, endurance and functional strength for a stronger body.",
    frequency: "3–4 DAYS / WEEK",
    focus: "ATHLETIC PERFORMANCE",
    image: IMAGES.performance,
    alt: "Sprinter accelerating on an outdoor track during performance training",
  },
];

const DISTRICT_FEATURES: DistrictFeature[] = [
  {
    index: "01",
    title: "EXPERT COACHING",
    description:
      "Certified coaches focused on technique, progression and accountability — on every rep, in every session.",
  },
  {
    index: "02",
    title: "STRUCTURED PROGRAMS",
    description:
      "Every session has a purpose. Every program has measurable progress.",
  },
  {
    index: "03",
    title: "REAL COMMUNITY",
    description:
      "Train alongside people who challenge and support each other.",
  },
  {
    index: "04",
    title: "PERFORMANCE MINDSET",
    description: "Build strength that carries beyond the gym.",
  },
];

const COACHES: Coach[] = [
  {
    index: "C.01",
    name: "ARJUN RAO",
    role: "Head Strength Coach",
    certification: "NSCA-CPT · 8 YEARS EXPERIENCE",
    specialties: ["Strength", "Hypertrophy", "Athletic Performance"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900",
    alt: "Black and white portrait of head strength coach Arjun Rao",
  },
  {
    index: "C.02",
    name: "MEERA SHAH",
    role: "Performance Coach",
    certification: "ACE-CPT · SPORTS CONDITIONING",
    specialties: ["Fat Loss", "Conditioning", "Mobility"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
    alt: "Black and white portrait of performance coach Meera Shah",
  },
  {
    index: "C.03",
    name: "RAHUL MENON",
    role: "Strength Coach",
    certification: "ISSA-CPT · 6 YEARS EXPERIENCE",
    specialties: ["Powerlifting", "Strength", "Technique"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=900",
    alt: "Black and white portrait of strength coach Rahul Menon",
  },
  {
    index: "C.04",
    name: "ANANYA REDDY",
    role: "Performance Coach",
    certification: "NASM-CPT · MOBILITY SPECIALIST",
    specialties: ["Functional Training", "Mobility", "Conditioning"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900",
    alt: "Black and white portrait of performance coach Ananya Reddy",
  },
];

const STORIES: MemberStory[] = [
  {
    name: "ROHAN",
    age: 24,
    goal: "Fat Loss + Strength",
    duration: "16 WEEKS",
    headlineResult: "−11 KG",
    resultTags: ["−11 KG", "+ STRENGTH", "+ CONFIDENCE"],
    quote:
      "I stopped chasing quick results and started building a routine I could actually maintain.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200",
    alt: "Portrait of IRON DISTRICT member Rohan after 16 weeks of training",
    metrics: [
      { label: "Body Weight", before: "84 KG", after: "73 KG" },
      { label: "Deadlift", before: "60 KG", after: "130 KG" },
      { label: "Body Fat", before: "24%", after: "14%" },
    ],
  },
  {
    name: "PRIYA",
    age: 29,
    goal: "Fat Loss + Endurance",
    duration: "20 WEEKS",
    headlineResult: "−14 KG",
    resultTags: ["−14 KG", "5K UNDER 27 MIN", "+ ENERGY"],
    quote:
      "I came in for the weight loss. I stayed for the version of myself I found at 6 AM.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
    alt: "Portrait of IRON DISTRICT member Priya after 20 weeks of training",
    metrics: [
      { label: "Body Weight", before: "78 KG", after: "64 KG" },
      { label: "5K Run", before: "38:40", after: "26:52" },
      { label: "Resting HR", before: "82 BPM", after: "61 BPM" },
    ],
  },
  {
    name: "VIKRAM",
    age: 31,
    goal: "Muscle Gain + Strength",
    duration: "24 WEEKS",
    headlineResult: "+8 KG LEAN",
    resultTags: ["+8 KG LEAN", "100 KG BENCH", "+ DISCIPLINE"],
    quote:
      "Two years of saying “I’ll start Monday” ended the day I walked through these doors.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1200",
    alt: "Portrait of IRON DISTRICT member Vikram after 24 weeks of training",
    metrics: [
      { label: "Body Weight", before: "62 KG", after: "70 KG" },
      { label: "Bench Press", before: "40 KG", after: "100 KG" },
      { label: "Back Squat", before: "50 KG", after: "130 KG" },
    ],
  },
];

const COMMUNITY_STATS: CommunityStat[] = [
  { value: 500, suffix: "+", label: "MEMBERS" },
  { value: 20, suffix: "+", label: "WEEKLY CLASSES" },
  { value: 12, suffix: "", label: "CERTIFIED COACHES" },
];

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    name: "FOUNDATION",
    price: "₹2,499",
    period: "/ MONTH",
    description: "Everything you need to start training with structure.",
    features: [
      "Open Gym Access",
      "Basic Movement Assessment",
      "Training Floor Access",
      "Locker & Shower Access",
    ],
    cta: "GET STARTED",
  },
  {
    name: "PERFORMANCE",
    price: "₹4,999",
    period: "/ MONTH",
    description: "Full coaching support and measurable progression.",
    features: [
      "Structured Programs",
      "Coach Support",
      "Progress Tracking",
      "Open Gym Access",
      "Weekly Class Access",
    ],
    cta: "START TRAINING",
    popular: true,
  },
  {
    name: "ELITE",
    price: "₹8,999",
    period: "/ MONTH",
    description: "Maximum accountability. Maximum results.",
    features: [
      "Personal Coaching",
      "Custom Program",
      "Nutrition Guidance",
      "Weekly Progress Review",
      "Priority Class Booking",
    ],
    cta: "TALK TO A COACH",
  },
];

const TRIAL_META = ["60 MINUTES", "1-ON-1 INTRODUCTION", "NO EXPERIENCE REQUIRED"];

const MARQUEE_ITEMS = [
  "STRENGTH",
  "DISCIPLINE",
  "PROGRESS",
  "COMMUNITY",
  "PERFORMANCE",
  "ACCOUNTABILITY",
];

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "TRAINING",
    links: [
      { label: "Strength", targetId: "training" },
      { label: "Fat Loss", targetId: "training" },
      { label: "Performance", targetId: "training" },
      { label: "Personal Training", targetId: "trial" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", targetId: "about" },
      { label: "Coaches", targetId: "coaches" },
      { label: "Stories", targetId: "stories" },
      { label: "Membership", targetId: "membership" },
    ],
  },
];

const SOCIALS: SocialLink[] = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/irondistrict.in" },
  { label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@irondistrict" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/irondistrict" },
];

/* --------------------------------- Hooks ---------------------------------- */

function useInView<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ----------------------------- UI Primitives ------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Enter({
  show,
  delay = 0,
  className = "",
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Counter({ end, duration = 1600 }: { end: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(end);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref}>{value}</span>;
}

function SectionHeading({
  index,
  label,
  headingId,
  title,
  description,
  aside,
  center = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#FF5A00]" aria-hidden="true" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#888888] md:text-xs">
              {index} / {label}
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2
            id={headingId}
            className="mt-5 font-display text-[clamp(2.5rem,6vw,4.75rem)] uppercase leading-[0.95] text-white"
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={240}>
            <p
              className={`mt-5 max-w-xl text-sm leading-relaxed text-[#888888] md:text-base ${
                center ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={300} className={`shrink-0 ${center ? "" : "md:pb-2"}`}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}

function CTAButton({ label, onClick, variant = "solid", className = "" }: CTAButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-[#FF5A00] text-black hover:bg-white"
      : "border border-white/25 text-white hover:border-[#FF5A00] hover:text-[#FF5A00]";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      <span>{label}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </button>
  );
}

/* --------------------------------- Navbar --------------------------------- */

function Navbar({
  activeSection,
  onBook,
}: {
  activeSection: string;
  onBook: (context: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#050505]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`${CONTAINER} flex h-16 items-center justify-between md:h-20`}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
              });
            }}
            aria-label="IRON DISTRICT — back to top"
            className="font-display text-xl uppercase tracking-wide text-white md:text-2xl"
          >
            IRON DISTRICT<span className="text-[#FF5A00]">.</span>
          </button>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNav(link.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative pb-1 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#FF5A00] after:transition-all after:duration-300 ${
                        isActive
                          ? "text-white after:w-full"
                          : "text-[#888888] after:w-0 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onBook("TRIAL CLASS")}
              className="group hidden items-center gap-2 border border-[#FF5A00] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF5A00] transition-colors duration-300 hover:bg-[#FF5A00] hover:text-black lg:inline-flex"
            >
              BOOK A TRIAL
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-[#050505] pt-24 transition-[opacity,visibility] duration-500 lg:hidden ${
          menuOpen
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex-1 px-6" aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.id}
                className="border-b border-white/10"
                style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : "0ms" }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(link.id);
                  }}
                  className={`flex items-baseline gap-4 py-4 transition-all duration-500 ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="font-display text-xs text-[#FF5A00]">
                    0{i + 1}
                  </span>
                  <span className="font-display text-4xl uppercase text-white">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-10" style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onBook("TRIAL CLASS");
            }}
            className="group flex w-full items-center justify-center gap-3 bg-[#FF5A00] py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-white"
          >
            BOOK A TRIAL
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </button>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-[#888888]">
            BENGALURU / STRENGTH & PERFORMANCE
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero({ onBook }: { onBook: (context: string) => void }) {
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setParallax(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="IRON DISTRICT introduction"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={IMAGES.hero}
          alt=""
          onError={hideBrokenImage}
          className="absolute inset-x-0 top-[-20%] h-[140%] w-full object-cover grayscale contrast-125"
          style={{ transform: `translateY(${parallax * 0.2}px)`, willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/35 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/40" />
        <div className="grain absolute inset-0 opacity-[0.08]" />
      </div>

      <div className={`${CONTAINER} relative z-10`}>
        <Enter show={mounted}>
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-10 bg-[#FF5A00]" aria-hidden="true" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B8B8B8] md:text-xs">
              BENGALURU / STRENGTH & PERFORMANCE
            </p>
          </div>
        </Enter>

        <Enter show={mounted} delay={150}>
          <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,9.5rem)] uppercase leading-[0.92]">
            <span className="block text-white">BUILT DIFFERENT.</span>
            <span className="text-stroke block">TRAINED TOGETHER.</span>
          </h1>
        </Enter>

        <Enter show={mounted} delay={300}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#B8B8B8] md:text-base">
            Structured training. Expert coaching. A community built around becoming
            stronger every day.
          </p>
        </Enter>

        <Enter show={mounted} delay={450}>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <CTAButton label="BOOK A TRIAL" onClick={() => onBook("TRIAL CLASS")} />
            <CTAButton
              label="EXPLORE TRAINING"
              variant="outline"
              onClick={() => scrollToId("training")}
            />
          </div>
        </Enter>

        <Enter show={mounted} delay={650} className="mt-14 md:mt-20">
          <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-white/10">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.index}
                className="flex items-center gap-4 py-4 sm:justify-center sm:px-6"
              >
                <span className="font-display text-sm text-[#FF5A00]">{stat.index}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B8B8B8] md:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Enter>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#888888] [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="relative block h-20 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-line absolute inset-0 bg-[#FF5A00]" />
        </span>
      </div>
    </section>
  );
}

/* ----------------------------- Brand Statement ---------------------------- */

function BrandStatement() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-24 md:py-36">
      <span
        aria-hidden="true"
        className="text-stroke-faint pointer-events-none absolute -right-4 top-0 hidden select-none font-display text-[14rem] leading-none lg:block xl:text-[18rem]"
      >
        01
      </span>
      <div className={`${CONTAINER} relative`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#FF5A00]" aria-hidden="true" />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#888888] md:text-xs">
                  01 / THE DISTRICT
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2
                id="about-heading"
                className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5.25rem)] uppercase leading-[0.95] text-white"
              >
                THIS ISN'T JUST
                <br />A <span className="text-stroke">GYM.</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-[#888888] md:text-lg">
                IRON DISTRICT is a training community built for people who take their
                progress seriously.
                <span className="text-white">
                  {" "}
                  No fads. No shortcuts. Just structured work, expert eyes on every rep,
                  and a floor full of people pushing in the same direction.
                </span>
              </p>
            </Reveal>
            <Reveal delay={340}>
              <button
                type="button"
                onClick={() => scrollToId("training")}
                className="group mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white transition-colors hover:text-[#FF5A00]"
              >
                SEE HOW WE TRAIN
                <ArrowRight
                  className="h-4 w-4 text-[#FF5A00] transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:mt-16">
            <Reveal delay={200}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-4 translate-y-4 border border-[#FF5A00]/50"
                />
                <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                  <img
                    src={IMAGES.statement}
                    alt="Coach observing a member during a heavy deadlift session"
                    loading="lazy"
                    decoding="async"
                    onError={hideBrokenImage}
                    className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
                THE FLOOR / IRON DISTRICT HQ
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#888888]">
              THE FOUR PRINCIPLES
            </p>
          </Reveal>
          <div className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.index} delay={i * 100} className="h-full">
                <div className="h-full bg-[#050505] p-7 transition-colors duration-300 hover:bg-[#0D0D0D] md:p-8">
                  <p className="font-display text-sm text-[#FF5A00]">{principle.index}</p>
                  <h3 className="mt-8 font-display text-xl uppercase leading-tight text-white md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#888888]">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Training Programs -------------------------- */

function Programs({ onBook }: { onBook: (context: string) => void }) {
  return (
    <section id="training" aria-labelledby="training-heading" className="py-24 md:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          index="02"
          label="TRAINING"
          headingId="training-heading"
          title={
            <>
              TRAIN FOR YOUR <span className="text-stroke">GOAL.</span>
            </>
          }
          description="Structured programs designed around where you are and where you want to go. Pick a goal — we build the road."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TRAINING_PROGRAMS.map((program, i) => (
            <Reveal key={program.id} delay={i * 120} className={i === 1 ? "lg:mt-12" : ""}>
              <article className="group relative flex min-h-[500px] flex-col justify-end overflow-hidden border border-white/10 bg-[#0D0D0D] transition-colors duration-300 hover:border-[#FF5A00]">
                <img
                  src={program.image}
                  alt={program.alt}
                  loading="lazy"
                  decoding="async"
                  onError={hideBrokenImage}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/10"
                  aria-hidden="true"
                />
                <span className="absolute left-5 top-5 z-10 font-display text-xs tracking-[0.3em] text-white/70">
                  {program.index}
                </span>
                <div className="absolute right-5 top-5 z-10 flex flex-col items-end gap-2">
                  <span className="border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8B8B8] backdrop-blur-sm">
                    {program.frequency}
                  </span>
                  <span className="border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8B8B8] backdrop-blur-sm">
                    {program.focus}
                  </span>
                </div>
                <div className="relative z-10 p-6 transition-transform duration-500 group-hover:-translate-y-2 md:p-7">
                  <h3 className="font-display text-3xl uppercase text-white md:text-4xl">
                    {program.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
                    {program.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => onBook(`${program.title} PROGRAM`)}
                    aria-label={`Enquire about the ${program.title} program`}
                    className="mt-6 flex w-full items-center justify-between border-t border-white/15 pt-5 text-left"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">
                      VIEW PROGRAM
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center border border-white/25 text-white transition-all duration-300 group-hover:border-[#FF5A00] group-hover:bg-[#FF5A00] group-hover:text-black">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Marquee -------------------------------- */

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-white/10 bg-[#0A0A0A] py-6"
    >
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10">
            <span
              className={`font-display text-2xl uppercase md:text-4xl ${
                i % 2 === 0 ? "text-white" : "text-stroke"
              }`}
            >
              {item}
            </span>
            <span className="h-2 w-2 shrink-0 bg-[#FF5A00]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Why IRON DISTRICT ------------------------- */

function WhyDistrict() {
  return (
    <section id="why" aria-labelledby="why-heading" className="py-24 md:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          index="03"
          label="WHY IRON DISTRICT"
          headingId="why-heading"
          title={
            <>
              MORE THAN <span className="text-stroke">TRAINING.</span>
            </>
          }
          description="Four principles behind every session, every program and every result at IRON DISTRICT."
        />
        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {DISTRICT_FEATURES.map((feature, i) => (
            <Reveal key={feature.index} delay={i * 100} className="h-full">
              <div className="group h-full bg-[#050505] p-8 transition-colors duration-300 hover:bg-[#0A0A0A] md:p-12">
                <p aria-hidden="true" className="feature-number font-display text-6xl leading-none md:text-7xl">
                  {feature.index}
                </p>
                <h3 className="mt-8 font-display text-2xl uppercase text-white md:text-3xl">
                  <span className="text-[#FF5A00]">/ </span>
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#888888] md:text-base">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Coaches --------------------------------- */

function Coaches({ onBook }: { onBook: (context: string) => void }) {
  return (
    <section id="coaches" aria-labelledby="coaches-heading" className="py-24 md:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          index="04"
          label="COACHES"
          headingId="coaches-heading"
          title={
            <>
              MEET YOUR <span className="text-stroke">COACHES.</span>
            </>
          }
          description="Certified, experienced and invested in your progress. Every coach trains the way they coach."
          aside={
            <p className="max-w-[240px] text-[11px] font-bold uppercase leading-loose tracking-[0.2em] text-[#888888] lg:text-right">
              12 CERTIFIED COACHES
              <br />
              1 STANDARD — YOUR PROGRESS
            </p>
          }
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COACHES.map((coach, i) => (
            <Reveal key={coach.name} delay={i * 100}>
              <article className="group border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-white/30">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                  <img
                    src={coach.image}
                    alt={coach.alt}
                    loading="lazy"
                    decoding="async"
                    onError={hideBrokenImage}
                    className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 font-display text-xs tracking-[0.3em] text-white/70">
                    {coach.index}
                  </span>
                  <button
                    type="button"
                    onClick={() => onBook(`COACH SESSION — ${coach.name}`)}
                    aria-label={`Book a session with ${coach.name}`}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/60 text-white opacity-70 backdrop-blur-sm transition-all duration-300 hover:border-[#FF5A00] hover:bg-[#FF5A00] hover:text-black group-hover:opacity-100"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FF5A00] transition-all duration-500 group-hover:w-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl uppercase text-white">{coach.name}</h3>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A00]">
                    {coach.role}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-[#888888]">
                    {coach.certification}
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#B8B8B8]">
                    {coach.specialties.join(" / ")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Member Stories ---------------------------- */

function MemberStories() {
  return (
    <section id="stories" aria-labelledby="stories-heading" className="py-24 md:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          index="05"
          label="MEMBER STORIES"
          headingId="stories-heading"
          title={
            <>
              REAL PEOPLE. <span className="text-stroke">REAL WORK.</span>
            </>
          }
          description="No filters. No fakes. Documented timelines from members who showed up and did the work."
          aside={
            <p className="max-w-[240px] text-[11px] font-bold uppercase leading-loose tracking-[0.2em] text-[#888888] lg:text-right">
              DOCUMENTED TIMELINES
              <br />
              VERIFIED BY OUR COACHES
            </p>
          }
        />
        <div className="mt-16 space-y-24 md:mt-24 lg:space-y-36">
          {STORIES.map((story, i) => (
            <article
              key={story.name}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-[#141414]">
                    <img
                      src={story.image}
                      alt={story.alt}
                      loading="lazy"
                      decoding="async"
                      onError={hideBrokenImage}
                      className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-6 right-4 bg-[#FF5A00] px-6 py-4 md:right-8 md:px-8">
                    <p className="font-display text-3xl leading-none text-black md:text-4xl">
                      {story.headlineResult}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-black/70">
                      {story.duration}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF5A00]">
                  CASE {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-4xl uppercase text-white md:text-5xl">
                  {story.name} <span className="text-[#666666]">/ {story.age}</span>
                </h3>

                <div className="mt-6 grid grid-cols-2 border border-white/10">
                  <div className="border-r border-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
                      GOAL
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">{story.goal}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
                      DURATION
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">{story.duration}</p>
                  </div>
                </div>

                <div className="mt-4 border border-white/10">
                  <p className="border-b border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
                    METRICS / BEFORE — AFTER
                  </p>
                  {story.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 last:border-b-0"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8B8B8]">
                        {metric.label}
                      </span>
                      <span className="flex items-center gap-3 md:gap-4">
                        <span className="text-sm text-[#666666]">{metric.before}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 text-[#FF5A00]"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-bold text-white">{metric.after}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <blockquote className="mt-8 border-l-2 border-[#FF5A00] pl-5">
                  <p className="text-base leading-relaxed text-[#B8B8B8] md:text-lg">
                    “{story.quote}”
                  </p>
                </blockquote>

                <div className="mt-6 flex flex-wrap gap-2">
                  {story.resultTags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#FF5A00]/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF5A00]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Community ------------------------------- */

function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="relative overflow-hidden py-28 md:py-44"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ backgroundImage: `url("${IMAGES.community}")` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#050505]/80" />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.08]" />
      <div className={`${CONTAINER} relative`}>
        <SectionHeading
          center
          index="06"
          label="COMMUNITY"
          headingId="community-heading"
          title={
            <>
              YOU DON'T TRAIN <span className="text-stroke">ALONE.</span>
            </>
          }
          description="Different goals. Different starting points. One community pushing forward together."
        />
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 border border-white/15 bg-black/50 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-white/15">
          {COMMUNITY_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120}>
              <div className="px-6 py-10 text-center">
                <p className="font-display text-5xl leading-none text-white md:text-6xl">
                  <Counter end={stat.value} />
                  {stat.suffix && <span className="text-[#FF5A00]">{stat.suffix}</span>}
                </p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8B8B8]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Membership ------------------------------ */

function Membership({ onBook }: { onBook: (context: string) => void }) {
  return (
    <section id="membership" aria-labelledby="membership-heading" className="py-24 md:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          index="07"
          label="MEMBERSHIP"
          headingId="membership-heading"
          title={
            <>
              CHOOSE YOUR <span className="text-stroke">COMMITMENT.</span>
            </>
          }
          description="Straightforward pricing. No hidden fees. Pause or cancel anytime."
          aside={
            <p className="max-w-[240px] text-[11px] font-bold uppercase leading-loose tracking-[0.2em] text-[#888888] lg:text-right">
              ALL PLANS INCLUDE
              <br />
              GOAL SETTING + FLOOR ORIENTATION
            </p>
          }
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {MEMBERSHIP_PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120} className="h-full">
              <div
                className={`relative flex h-full flex-col border p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-[#FF5A00] bg-[#0D0D0D] lg:-translate-y-3"
                    : "border-white/10 bg-[#0A0A0A] hover:border-white/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-8 bg-[#FF5A00] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#888888]">
                  {plan.name}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-5xl text-white md:text-6xl">
                    {plan.price}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888888]">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#888888]">
                  {plan.description}
                </p>
                <ul className="mt-8 flex-1 space-y-3.5 border-t border-white/10 pt-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#B8B8B8]">
                      <Check className="h-4 w-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onBook(`${plan.name} MEMBERSHIP`)}
                  className={`group mt-8 flex w-full items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
                    plan.popular
                      ? "bg-[#FF5A00] text-black hover:bg-white"
                      : "border border-white/25 text-white hover:border-[#FF5A00] hover:text-[#FF5A00]"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA ------------------------------- */

function FinalCTA({ onBook }: { onBook: (context: string) => void }) {
  return (
    <section
      id="trial"
      aria-labelledby="trial-heading"
      className="relative overflow-hidden py-28 md:py-44"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ backgroundImage: `url("${IMAGES.trial}")` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#050505]/85" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60"
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.08]" />

      <div className={`${CONTAINER} relative text-center`}>
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#FF5A00]" aria-hidden="true" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#B8B8B8] md:text-xs">
              08 / YOUR MOVE
            </p>
            <span className="h-px w-10 bg-[#FF5A00]" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2
            id="trial-heading"
            className="mx-auto mt-6 max-w-5xl font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.92] text-white"
          >
            READY TO <span className="text-stroke">START?</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#B8B8B8] md:text-base">
            Your first session starts with one decision. We handle everything after that.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <button
            type="button"
            onClick={() => onBook("TRIAL CLASS")}
            className="group mx-auto mt-10 flex items-center gap-4 bg-[#FF5A00] px-8 py-5 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors duration-300 hover:bg-white sm:px-12"
          >
            BOOK YOUR TRIAL CLASS
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
              aria-hidden="true"
            />
          </button>
        </Reveal>
        <Reveal delay={480}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRIAL_META.map((item, i) => (
              <div key={item} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#FF5A00]" />}
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8B8B8]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className={CONTAINER}>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl uppercase text-white">
              IRON DISTRICT<span className="text-[#FF5A00]">.</span>
            </p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#888888]">
              BUILT DIFFERENT. TRAINED TOGETHER.
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`IRON DISTRICT on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#888888] transition-colors duration-300 hover:border-[#FF5A00] hover:text-[#FF5A00]"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} className="lg:col-span-2" aria-label={`Footer — ${column.title}`}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                {column.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollToId(link.targetId)}
                      className="text-sm text-[#888888] transition-colors duration-300 hover:text-[#FF5A00]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
              CONTACT
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-[#888888]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
                <span>Bengaluru, India</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@irondistrict.in"
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
                  hello@irondistrict.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="overflow-hidden">
          <p className="text-stroke-faint whitespace-nowrap font-display text-[clamp(4rem,13vw,12rem)] leading-[0.85]">
            IRON DISTRICT
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-[11px] uppercase tracking-[0.2em] text-[#888888] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 IRON DISTRICT. ALL RIGHTS RESERVED.</p>
          <p>BENGALURU / STRENGTH & PERFORMANCE</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Booking Modal ----------------------------- */

function BookingModal({ context, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("MUSCLE GAIN");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const fieldClass =
    "mt-2 w-full border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white placeholder:text-[#555555] focus:border-[#FF5A00] focus:outline-none";
  const labelClass =
    "text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a trial session"
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto border border-white/15 bg-[#0D0D0D]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 md:p-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5A00]">
              {context}
            </p>
            <h3 className="mt-2 font-display text-2xl uppercase text-white md:text-3xl">
              {submitted ? "YOU'RE IN." : "BOOK YOUR TRIAL."}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#FF5A00] hover:text-[#FF5A00]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center bg-[#FF5A00]">
              <Check className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#B8B8B8]">
              Thanks, <span className="font-bold text-white">{name.trim()}</span>. Your{" "}
              <span className="font-bold text-white">{context}</span> request is locked in.
              A coach will call <span className="font-bold text-white">{phone.trim()}</span>{" "}
              within 24 hours to schedule your session.
            </p>
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
              {TRIAL_META.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#888888]"
                >
                  <Check className="h-3.5 w-3.5 text-[#FF5A00]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full border border-white/25 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors hover:border-[#FF5A00] hover:text-[#FF5A00]"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
            <div>
              <label htmlFor="booking-name" className={labelClass}>
                FULL NAME
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className={labelClass}>
                PHONE NUMBER
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+91 98765 43210"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="booking-goal" className={labelClass}>
                PRIMARY GOAL
              </label>
              <select
                id="booking-goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className={fieldClass}
              >
                <option>MUSCLE GAIN</option>
                <option>FAT LOSS</option>
                <option>PERFORMANCE</option>
                <option>NOT SURE YET</option>
              </select>
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 bg-[#FF5A00] py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-white"
            >
              CONFIRM BOOKING
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </button>
            <p className="text-center text-[11px] leading-relaxed text-[#888888]">
              60 minutes. 1-on-1 introduction. No experience required.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------- App ---------------------------------- */

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [bookingContext, setBookingContext] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const openBooking = (context: string) => setBookingContext(context);
  const closeBooking = () => setBookingContext(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{GLOBAL_STYLES}</style>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#FF5A00] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-black"
      >
        Skip to content
      </a>

      <Navbar activeSection={activeSection} onBook={openBooking} />

      <main id="main">
        <Hero onBook={openBooking} />
        <BrandStatement />
        <Programs onBook={openBooking} />
        <Marquee />
        <WhyDistrict />
        <Coaches onBook={openBooking} />
        <MemberStories />
        <Community />
        <Membership onBook={openBooking} />
        <FinalCTA onBook={openBooking} />
      </main>

      <Footer />

      {bookingContext !== null && (
        <BookingModal context={bookingContext} onClose={closeBooking} />
      )}
    </div>
  );
}
