"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Asterisk,
  ChevronRight,
  LocateFixed,
  MapPin,
  Maximize2,
  Menu,
  Plus,
  Search,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Strain = {
  name: string;
  drawerName?: [string, string];
  type: string;
  notes: string[];
  statement: string;
  image: string;
  position: string;
  color: string;
};

type LegalPanel = "privacy" | "terms" | null;
type MediaItem = {
  src: string;
  alt: string;
  label: string;
};
type MediaExperience = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  gallery?: MediaItem[];
} | null;

const strains: Strain[] = [
  {
    name: "Afterglow",
    drawerName: ["After", "glow"],
    type: "Sativa dominant",
    notes: ["Citrus zest", "Wild honey", "Soft fuel"],
    statement: "Bright, grounded, and perfectly in rhythm.",
    image: "/media/strain-afterglow.png",
    position: "center 58%",
    color: "#dfff22",
  },
  {
    name: "Dewpoint",
    drawerName: ["Dew", "point"],
    type: "Hybrid",
    notes: ["Meyer lemon", "Fresh basil", "White floral"],
    statement: "Crisp clarity with a soft botanical finish.",
    image: "/media/strain-dewpoint.png",
    position: "center 48%",
    color: "#a8d497",
  },
  {
    name: "Mosslight",
    drawerName: ["Moss", "light"],
    type: "Balanced hybrid",
    notes: ["Green mango", "Lime leaf", "Hinoki"],
    statement: "A centered, verdant rhythm with room to breathe.",
    image: "/media/strain-mosslight.png",
    position: "center 50%",
    color: "#b8d451",
  },
  {
    name: "Slow Bloom",
    type: "Indica hybrid",
    notes: ["Plum skin", "Violet leaf", "Toasted cedar"],
    statement: "Soft edges, deeper colour, and an unhurried finish.",
    image: "/media/strain-slow-bloom.png",
    position: "center 48%",
    color: "#c98eaa",
  },
  {
    name: "Velvet Hour",
    type: "Indica dominant",
    notes: ["Black cherry", "Cocoa", "Dark rose"],
    statement: "A slow, plush landing for the end of the night.",
    image: "/media/strain-nightcap.png",
    position: "center 50%",
    color: "#d6a9c1",
  },
];

const sensory = [
  { title: "See", body: "Crystal-rich flower with colour that looks alive.", x: 71, y: 24, panX: -4, panY: 5 },
  { title: "Touch", body: "Dense, springy structure. Never brittle. Never rushed.", x: 57, y: 54, panX: 1, panY: -2 },
  { title: "Smell", body: "Aroma arrives in layers, not all at once.", x: 35, y: 36, panX: 7, panY: 3 },
  { title: "Taste", body: "Clean expression with a finish worth remembering.", x: 76, y: 72, panX: -6, panY: -6 },
];

const moods = [
  { label: "Energize", product: 0 },
  { label: "Focus", product: 1 },
  { label: "Balance", product: 2 },
  { label: "Unwind", product: 3 },
  { label: "Exhale", product: 4 },
];

const locations = [
  { name: "Greenside Apothecary", area: "Ikoyi, Lagos", hours: "9AM — 9PM", lat: 6.4549, lng: 3.4348 },
  { name: "Flower Lab Lagos", area: "Yaba, Lagos", hours: "10AM — 10PM", lat: 6.5158, lng: 3.3899 },
  { name: "The Botanist", area: "Victoria Island, Lagos", hours: "10AM — 10PM", lat: 6.4281, lng: 3.4219 },
  { name: "Green Haus", area: "Lekki Phase 1, Lagos", hours: "11AM — 11PM", lat: 6.4478, lng: 3.4723 },
];

const brandSignals = [
  { word: "Energy", line: "For the bright side of the day." },
  { word: "Elevation", line: "A little above ordinary." },
  { word: "Ease", line: "Let the edges soften." },
  { word: "Exhale", line: "Where the day lets go." },
];

const brandGlyphs = [
  { letter: "G" },
  { letter: "R" },
  ...brandSignals.map((signal, signalIndex) => ({ letter: "E", signal, signalIndex })),
  { letter: "N" },
];
const navItems = [
  { label: "Flower", href: "#flower", id: "flower", cursor: "GO" },
  { label: "Story", href: "#story", id: "story", cursor: "GO" },
  { label: "Mood lab", href: "#mood", id: "mood", cursor: "PLAY" },
  { label: "Shops", href: "#shops", id: "shops", cursor: "GO" },
];

function MagneticLink({
  href,
  children,
  tone = "acid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "acid" | "outline";
  className?: string;
}) {
  const content = useRef<HTMLSpanElement>(null);

  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    gsap.to(content.current, {
      x: x * 0.08,
      y: y * 0.1,
      duration: 0.22,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const reset = () => {
    gsap.to(content.current, { x: 0, y: 0, duration: 0.3, ease: "power3.out", overwrite: true });
  };

  return (
    <a
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
      className={`magnetic-link magnetic-link--${tone} ${className}`}
      data-cursor="OPEN"
    >
      <span ref={content} className="magnetic-link__inner">
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
      </span>
    </a>
  );
}

export function GreeeenExperience() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const drawerClose = useRef<HTMLButtonElement>(null);
  const legalClose = useRef<HTMLButtonElement>(null);
  const mediaClose = useRef<HTMLButtonElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeStrain, setActiveStrain] = useState(0);
  const [selectedStrain, setSelectedStrain] = useState<Strain | null>(null);
  const [activeSense, setActiveSense] = useState(0);
  const [moodIndex, setMoodIndex] = useState(2);
  const [activeLocation, setActiveLocation] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalPanel, setLegalPanel] = useState<LegalPanel>(null);
  const [mediaExperience, setMediaExperience] = useState<MediaExperience>(null);
  const [mediaZoom, setMediaZoom] = useState(1.75);
  const [mediaItemIndex, setMediaItemIndex] = useState(0);
  const [activeBrandSignal, setActiveBrandSignal] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("Select a shop to see its details.");
  const moodStrain = strains[moods[moodIndex].product];
  const mediaItems = mediaExperience
    ? mediaExperience.gallery ?? [{ src: mediaExperience.src, alt: mediaExperience.alt, label: mediaExperience.title }]
    : [];
  const activeMediaItem = mediaItems[mediaItemIndex] ?? mediaItems[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStrain(null);
        setMenuOpen(false);
        setLegalPanel(null);
        setMediaExperience(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.dataset.locked = selectedStrain || menuOpen || legalPanel || mediaExperience ? "true" : "false";
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.body.dataset.locked;
    };
  }, [legalPanel, mediaExperience, menuOpen, selectedStrain]);

  useEffect(() => {
    if (selectedStrain) drawerClose.current?.focus();
  }, [selectedStrain]);

  useEffect(() => {
    if (legalPanel) legalClose.current?.focus();
  }, [legalPanel]);

  useEffect(() => {
    if (mediaExperience) mediaClose.current?.focus();
  }, [mediaExperience]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || !cursor.current) return;

    const cursorNode = cursor.current;
    const xTo = gsap.quickTo(cursorNode, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursorNode, "y", { duration: 0.35, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor ?? "";
      cursorNode.classList.toggle("is-active", Boolean(target));
      cursorNode.classList.toggle("is-map", text === "MAP");
      if (cursorLabel.current) cursorLabel.current.textContent = text;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    let scrolled = window.scrollY > 42;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
      const nextScrolled = window.scrollY > 42;
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const sections = ["top", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -66% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-nav", { y: -24, opacity: 0, duration: 0.8 })
        .from(".hero-wordmark", { y: 36, opacity: 0, duration: 1, clearProps: "transform,opacity" }, 0.12)
        .from(".hero-copy > *", { y: 24, opacity: 0, duration: 0.75, stagger: 0.11 }, 0.5)
        .from(".hero-orbit", { scale: 0.6, opacity: 0, duration: 1.1 }, 0.55);

      gsap.to(".hero-media img", {
        scale: 1.09,
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 56,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true },
        });
      });

      gsap.to(".marquee-track", {
        xPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 4.8 },
      });

      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".manifesto", start: "top 76%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.to(".sensory-photo-depth", {
        yPercent: -6,
        scale: 1.04,
        ease: "none",
        scrollTrigger: { trigger: ".sensory", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: root },
  );

  const heroMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
    event.currentTarget.style.setProperty("--hero-x", `${(x - 50) * -0.12}px`);
    event.currentTarget.style.setProperty("--hero-y", `${(y - 50) * -0.08}px`);
    event.currentTarget.style.setProperty("--tilt-x", `${(y - 50) * -0.035}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 50) * 0.045}deg`);
  };

  const resetHero = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--hero-x", "0px");
    event.currentTarget.style.setProperty("--hero-y", "0px");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const openMedia = (experience: Exclude<MediaExperience, null>, zoom = 1.75) => {
    setMediaZoom(zoom);
    setMediaItemIndex(0);
    setMediaExperience(experience);
  };

  const collectionGallery: MediaItem[] = strains.map((strain) => ({
    src: strain.image,
    alt: `${strain.name} premium flower product portrait`,
    label: strain.name,
  }));

  const moveMediaFocus = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--media-x", `${x}%`);
    event.currentTarget.style.setProperty("--media-y", `${y}%`);
    event.currentTarget.style.setProperty("--media-tilt-x", `${(50 - y) * 0.055}deg`);
    event.currentTarget.style.setProperty("--media-tilt-y", `${(x - 50) * 0.065}deg`);
    event.currentTarget.style.setProperty("--media-shift-x", `${(x - 50) * 0.12}px`);
    event.currentTarget.style.setProperty("--media-shift-y", `${(y - 50) * 0.1}px`);
  };

  const resetMediaFocus = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--media-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--media-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--media-shift-x", "0px");
    event.currentTarget.style.setProperty("--media-shift-y", "0px");
  };

  const moveSensoryDepth = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--sensory-tilt-x", `${(50 - y) * 0.055}deg`);
    event.currentTarget.style.setProperty("--sensory-tilt-y", `${(x - 50) * 0.065}deg`);
    event.currentTarget.style.setProperty("--sensory-shift-x", `${(x - 50) * 0.1}px`);
    event.currentTarget.style.setProperty("--sensory-shift-y", `${(y - 50) * 0.08}px`);
  };

  const resetSensoryDepth = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--sensory-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--sensory-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--sensory-shift-x", "0px");
    event.currentTarget.style.setProperty("--sensory-shift-y", "0px");
  };

  const showRelativeStrain = (direction: number) => {
    if (!selectedStrain) return;
    const current = strains.findIndex((strain) => strain.name === selectedStrain.name);
    const next = (current + direction + strains.length) % strains.length;
    setSelectedStrain(strains[next]);
    setActiveStrain(next);
  };

  const selectLocation = (index: number) => {
    setActiveLocation(index);
    setLocationStatus(`${locations[index].name} selected. Open ${locations[index].hours}.`);
  };

  const selectLocationFromList = (index: number) => {
    selectLocation(index);
    window.requestAnimationFrame(() => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const locateNearestStore = () => {
    if (!navigator.geolocation) {
      selectLocation(0);
      setLocationStatus("Location is unavailable. Showing central Lagos instead.");
      return;
    }

    setIsLocating(true);
    setLocationStatus("Finding the nearest concept shop…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        let nearest = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        locations.forEach((location, index) => {
          const latDistance = location.lat - coords.latitude;
          const lngDistance = location.lng - coords.longitude;
          const distance = latDistance * latDistance + lngDistance * lngDistance;
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = index;
          }
        });
        setActiveLocation(nearest);
        setLocationStatus(`${locations[nearest].name} is the nearest concept shop in this demo.`);
        setIsLocating(false);
      },
      () => {
        setActiveLocation(0);
        setLocationStatus("Location access was unavailable. Showing central Lagos instead.");
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 },
    );
  };

  return (
    <div ref={root} className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div ref={cursor} className="cursor-loupe" aria-hidden="true">
        <span ref={cursorLabel} />
      </div>

      <header className={`site-nav ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="nav-brand" href="#top" aria-label="GREEEEN home" data-cursor="TOP">
          GREEEEN
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              data-cursor={item.cursor}
              className={activeSection === item.id ? "is-active" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-meta">
          <span>21+ / Concept</span>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.id === "shops" ? "Find a shop" : item.label}<ArrowRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <p>Premium flower. Fictional shops. A very real point of view.</p>
      </div>

      <main className="page-main" id="main-content">
        <section ref={hero} className="hero" id="top" onPointerMove={heroMove} onPointerLeave={resetHero}>
          <div className="hero-media" aria-hidden="true">
            <Image
              src="/media/hero-main.png"
              alt=""
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="hero-image"
            />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-wordmark" role="group" aria-label="The four E's of GREEEEN">
            {brandGlyphs.map((glyph, index) => glyph.signal ? (
              <button
                type="button"
                className={`letter is-e ${activeBrandSignal === glyph.signalIndex ? "is-active" : ""}`}
                aria-label={`${glyph.signal.word}: ${glyph.signal.line}`}
                aria-pressed={activeBrandSignal === glyph.signalIndex}
                onClick={() => setActiveBrandSignal(glyph.signalIndex)}
                key={`${glyph.letter}-${index}`}
              >
                {glyph.letter}
                <span className="e-code" aria-hidden="true">E{glyph.signalIndex + 1}</span>
              </button>
            ) : (
              <span className="letter" aria-hidden="true" key={`${glyph.letter}-${index}`}>
                {glyph.letter}
              </span>
            ))}
          </div>
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} /> Hand-selected premium flower</p>
            <h1>Premium flower.<br />Grown differently.</h1>
            <div className="hero-actions">
              <MagneticLink href="#flower">Explore the flower</MagneticLink>
              <MagneticLink href="#shops" tone="outline">Find a shop</MagneticLink>
            </div>
            <div className="brand-frequency" aria-live="polite">
              <span>Four E&apos;s. One GREEEEN.</span>
              <div>
                <strong>{brandSignals[activeBrandSignal].word}</strong>
                <p>{brandSignals[activeBrandSignal].line}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="hero-orbit"
            data-cursor="MAGNIFY"
            aria-label="Open the flower explorer"
            onClick={() => openMedia({
              src: "/media/hero-main.png",
              alt: "Extreme macro view of premium cannabis flower",
              eyebrow: "Interactive flower study",
              title: "Look closer.",
              gallery: [
                { src: "/media/hero-main.png", alt: "Extreme macro view of premium cannabis flower", label: "Hero flower" },
                ...collectionGallery,
              ],
            })}
          >
            <Search size={30} strokeWidth={1.25} />
            <span>Look closer</span>
          </button>
          <button
            type="button"
            className="hero-expand"
            data-cursor="OPEN"
            onClick={() => openMedia({
              src: "/media/hero-main.png",
              alt: "Extreme macro view of premium cannabis flower",
              eyebrow: "Interactive flower study",
              title: "Every layer. Every trichome.",
              gallery: [
                { src: "/media/hero-main.png", alt: "Extreme macro view of premium cannabis flower", label: "Hero flower" },
                ...collectionGallery,
              ],
            })}
          >
            <Maximize2 aria-hidden="true" size={17} /> Expand view
          </button>
          <a className="scroll-cue" href="#flower" data-cursor="DOWN">
            Scroll to explore <ArrowDown size={15} />
          </a>
        </section>

        <section className="marquee" aria-label="Brand principles">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((set) => (
              <div className="marquee-set" key={set}>
                <span>Four E&apos;s. One GREEEEN</span>
                <Asterisk />
                <span>Nothing ordinary grows here</span>
                <Asterisk />
                <span>Small batch, big character</span>
                <Asterisk />
              </div>
            ))}
          </div>
          <p>Living soil <i /> Hand selected genetics <i /> Never rushed</p>
        </section>

        <section id="flower" className="collection chapter">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">The collection</p>
            <h2>Five frequencies.<br />One high standard.</h2>
            <p>Move across the flower to find the one that meets you where you are.</p>
          </div>

          <div className="strain-accordion" data-reveal>
            {strains.map((strain, index) => (
              <article
                key={strain.name}
                className={`strain-panel ${activeStrain === index ? "is-active" : ""}`}
                style={{ "--strain-accent": strain.color } as React.CSSProperties}
                onPointerEnter={() => setActiveStrain(index)}
                onFocus={() => setActiveStrain(index)}
              >
                <button
                  type="button"
                  className="strain-hit"
                  onClick={() => {
                    setActiveStrain(index);
                    setSelectedStrain(strain);
                  }}
                  aria-label={`Explore ${strain.name}`}
                  data-cursor="VIEW"
                >
                  <span className="strain-number">0{index + 1}</span>
                  <span className="strain-name">{strain.name}</span>
                  <span className="strain-type">{strain.type}</span>
                  <span className="strain-notes">{strain.notes.join(" · ")}</span>
                  <span className="strain-plus"><Plus aria-hidden="true" /></span>
                </button>
                <div className="strain-image" aria-hidden="true">
                  <Image
                    src={strain.image}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 100vw, 60vw"
                    style={{ objectPosition: strain.position }}
                  />
                  <span className="package-label">GREEEEN<small>{strain.name}</small></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="manifesto chapter">
          <p className="eyebrow" data-reveal>Our point of view</p>
          <p className="manifesto-copy" aria-label="Good flower should stop you mid-sentence. So we grow for the senses, not the spreadsheet.">
            {"Good flower should stop you mid-sentence. So we grow for the senses, not the spreadsheet."
              .split(" ")
              .map((word, index) => (
                <span key={`${word}-${index}`} className="manifesto-word">{word} </span>
              ))}
          </p>
          <button
            type="button"
            className="inline-flower"
            data-cursor="DETAIL"
            aria-label="Expand the flower detail"
            onClick={() => openMedia({
              src: "/media/hero-flower.png",
              alt: "Close botanical flower detail",
              eyebrow: "Our point of view",
              title: "The detail is the point.",
            })}
          >
            <Image src="/media/hero-flower.png" alt="" fill sizes="280px" />
          </button>
        </section>

        <section className="sensory chapter">
          <div className="sensory-intro" data-reveal>
            <p className="eyebrow">Sensory by nature</p>
            <h2>Flower you<br />can feel.</h2>
            <p>Every choice—from soil to sun—is made to leave something memorable behind.</p>
          </div>
          <div className="sensory-stage">
            <button
              type="button"
              className="sensory-photo"
              data-cursor="ZOOM"
              aria-label="Open an interactive macro view"
              onPointerMove={moveSensoryDepth}
              onPointerLeave={resetSensoryDepth}
              style={{
                "--sense-x": `${sensory[activeSense].x}%`,
                "--sense-y": `${sensory[activeSense].y}%`,
                "--sense-pan-x": `${sensory[activeSense].panX}%`,
                "--sense-pan-y": `${sensory[activeSense].panY}%`,
              } as React.CSSProperties}
              onClick={() => openMedia({
                src: "/media/hero-flower.png",
                alt: "Macro view of crystalline cannabis flower",
                eyebrow: "Sensory study",
                title: "Get into the texture.",
                gallery: [
                  { src: "/media/hero-flower.png", alt: "Macro view of crystalline cannabis flower", label: "Macro study" },
                  ...collectionGallery,
                ],
              })}
            >
              <span className="sensory-photo-depth">
                <span className="sensory-photo-plane">
                  <Image
                    src="/media/hero-flower.png"
                    alt="Macro view of crystalline cannabis flower"
                    fill
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </span>
              </span>
              <div className="focus-ring" aria-hidden="true" />
              <span className="sensory-zoom"><ZoomIn size={16} /> Open macro view</span>
            </button>
            <div className="sensory-tabs" role="tablist" aria-label="Sensory qualities">
              {sensory.map((sense, index) => (
                <button
                  key={sense.title}
                  type="button"
                  role="tab"
                  id={`sense-tab-${index}`}
                  aria-controls="sense-panel"
                  aria-selected={activeSense === index}
                  className={activeSense === index ? "is-active" : ""}
                  onClick={() => setActiveSense(index)}
                  data-cursor="FEEL"
                >
                  <span>0{index + 1}</span>
                  <strong>{sense.title}</strong>
                </button>
              ))}
            </div>
            <div
              className="sense-copy"
              id="sense-panel"
              role="tabpanel"
              aria-labelledby={`sense-tab-${activeSense}`}
              aria-live="polite"
            >
              <span>{sensory[activeSense].title}</span>
              <p>{sensory[activeSense].body}</p>
            </div>
          </div>
        </section>

        <section id="mood" className="mood-lab chapter">
          <div className="mood-top" data-reveal>
            <div>
              <p className="eyebrow">Find your flower</p>
              <h2>Choose your mood.</h2>
            </div>
            <p>Drag the signal. We’ll introduce a flower curated for where you want the night to go.</p>
          </div>
          <div className="mood-stage" data-reveal>
            <div className="mood-products" aria-hidden="true">
              <Image
                key={moodStrain.image}
                src={moodStrain.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
                style={{ objectPosition: moodStrain.position }}
              />
              <span className="product-word">GREEEEN<small>{moodStrain.name}</small></span>
            </div>
            <div className="mood-result" aria-live="polite">
              <p>{moods[moodIndex].label}</p>
              <h3>{moodStrain.name}</h3>
              <span>{moodStrain.notes.join(" / ")}</span>
              <strong>{moodStrain.statement}</strong>
              <button type="button" onClick={() => setSelectedStrain(moodStrain)} data-cursor="OPEN">
                Meet {moodStrain.name} <ArrowRight size={17} />
              </button>
            </div>
          </div>
          <div className="mood-selector" role="group" aria-label="Choose your mood" data-reveal>
            {moods.map((mood, index) => (
              <button
                key={mood.label}
                type="button"
                className={moodIndex === index ? "is-active" : ""}
                aria-pressed={moodIndex === index}
                onClick={() => setMoodIndex(index)}
                data-cursor="CHOOSE"
              >
                <span>0{index + 1}</span>
                <strong>{mood.label}</strong>
                <small>{strains[mood.product].name}</small>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <section id="shops" className="locator chapter">
          <div ref={mapRef} className="locator-visual" data-reveal>
            <div className="map-grid" role="group" aria-label="Fictional Lagos concept shop map">
              <span className="road road-a" aria-hidden="true" />
              <span className="road road-b" aria-hidden="true" />
              <span className="road road-c" aria-hidden="true" />
              {locations.map((location, index) => (
                <div key={location.name} className={`map-marker pin-${index + 1} ${activeLocation === index ? "is-active" : ""}`}>
                  <button
                    type="button"
                    className="map-pin"
                    onClick={() => selectLocation(index)}
                    aria-label={`Show ${location.name}`}
                    aria-pressed={activeLocation === index}
                    data-cursor="MAP"
                  >
                    <MapPin fill="currentColor" />
                  </button>
                  {activeLocation === index ? (
                    <div className="map-tooltip" aria-live="polite">
                      <span>Selected shop</span>
                      <strong>{location.name}</strong>
                      <small>{location.area}</small>
                      <small>{location.hours} · In-store pickup</small>
                    </div>
                  ) : null}
                </div>
              ))}
              <strong aria-hidden="true">LAGOS</strong>
            </div>
            <div className="locator-heading">
              <p className="eyebrow">Find GREEEEN</p>
              <h2>In Lagos.</h2>
              <p>Premium flower, grown differently. Find a fictional partner store near you.</p>
              <button type="button" data-cursor="LOCATE" onClick={locateNearestStore} disabled={isLocating}>
                <LocateFixed size={17} /> {isLocating ? "Locating…" : "Use my location"}
              </button>
              <span className="locator-status" aria-live="polite">{locationStatus}</span>
            </div>
          </div>
          <div className="location-list" data-reveal>
            {locations.map((location, index) => (
              <button
                key={location.name}
                type="button"
                className={activeLocation === index ? "is-active" : ""}
                onPointerEnter={() => selectLocation(index)}
                onFocus={() => selectLocation(index)}
                onClick={() => selectLocationFromList(index)}
                aria-pressed={activeLocation === index}
                data-cursor="MAP"
              >
                <span className="location-number">0{index + 1}</span>
                <span className="location-name"><strong>{location.name}</strong><small>{location.area}</small></span>
                <span><small>Open today</small>{location.hours}</span>
                <span><small>Service</small>In-store pickup</span>
                <ChevronRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <section className="final-cta chapter">
          <div className="final-flower" aria-hidden="true">
            <Image src="/media/hero-flower.png" alt="" fill sizes="40vw" />
          </div>
          <p className="final-word" data-reveal>GREEEEN</p>
          <div className="final-action" data-reveal>
            <p>Energy. Elevation.<br />Ease. Exhale.</p>
            <h2>Find your GREEEEN.</h2>
            <MagneticLink href="#shops">Find a shop</MagneticLink>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top">GREEEEN</a>
        <p>Fictional brand concept. Adults 21+ only.</p>
        <nav aria-label="Footer navigation">
          <a href="#flower">Flower</a>
          <a href="#story">Story</a>
          <a href="#shops">Shops</a>
          <button type="button" onClick={() => setLegalPanel("privacy")}>Privacy</button>
          <button type="button" onClick={() => setLegalPanel("terms")}>Terms</button>
        </nav>
        <span>© 2026 GREEEEN</span>
      </footer>

      <div
        className={`product-drawer-backdrop ${selectedStrain ? "is-open" : ""}`}
        onClick={() => setSelectedStrain(null)}
        aria-hidden="true"
      />
      <aside
        className={`product-drawer ${selectedStrain ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={selectedStrain ? `${selectedStrain.name} details` : "Product details"}
        aria-hidden={!selectedStrain}
      >
        <button ref={drawerClose} className="drawer-close" type="button" onClick={() => setSelectedStrain(null)} aria-label="Close product details">
          <X />
        </button>
        {selectedStrain && (
          <>
            <div className="drawer-image">
              <Image src={selectedStrain.image} alt={`${selectedStrain.name} flower concept`} fill sizes="(max-width: 720px) 100vw, 48vw" style={{ objectPosition: selectedStrain.position }} />
              <span>GREEEEN<small>{selectedStrain.name}</small></span>
            </div>
            <div className="drawer-copy">
              <p>{selectedStrain.type}</p>
              <h2>
                {selectedStrain.drawerName
                  ? selectedStrain.drawerName.map((line) => <span key={line}>{line}</span>)
                  : selectedStrain.name}
              </h2>
              <strong>{selectedStrain.statement}</strong>
              <ul>{selectedStrain.notes.map((note) => <li key={note}>{note}</li>)}</ul>
              <div className="drawer-strain-nav" aria-label="Browse strains">
                <button type="button" onClick={() => showRelativeStrain(-1)} aria-label="Previous strain"><ArrowLeft /></button>
                <span>{strains.findIndex((strain) => strain.name === selectedStrain.name) + 1} / {strains.length}</span>
                <button type="button" onClick={() => showRelativeStrain(1)} aria-label="Next strain"><ArrowRight /></button>
              </div>
              <a href="#shops" onClick={() => setSelectedStrain(null)}>Find this flower <ArrowRight size={18} /></a>
              <small>Concept product. Availability and locations are fictional.</small>
            </div>
          </>
        )}
      </aside>

      <div
        className={`legal-backdrop ${legalPanel ? "is-open" : ""}`}
        onClick={() => setLegalPanel(null)}
        aria-hidden="true"
      />
      <aside
        className={`legal-panel ${legalPanel ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!legalPanel}
        aria-labelledby="legal-title"
      >
        <button ref={legalClose} className="legal-close" type="button" onClick={() => setLegalPanel(null)} aria-label="Close legal information">
          <X />
        </button>
        <p>GREEEEN / Concept policy</p>
        <h2 id="legal-title">{legalPanel === "terms" ? "Terms of use" : "Privacy"}</h2>
        {legalPanel === "terms" ? (
          <div>
            <p>This experience is a fictional brand prototype for adults aged 21 and over. It does not sell, reserve, deliver, or price cannabis products.</p>
            <p>All products, shops, addresses, availability, and brand claims shown here are creative placeholders. No commercial relationship is implied.</p>
          </div>
        ) : (
          <div>
            <p>This prototype does not create accounts, accept payments, or store personal information.</p>
            <p>If you choose “Use my location,” your browser provides coordinates only long enough to select the nearest fictional shop in the current session. The coordinates are not transmitted or retained.</p>
          </div>
        )}
        <small>Last refined July 2026 · Fictional concept only</small>
      </aside>

      <div
        className={`media-explorer-backdrop ${mediaExperience ? "is-open" : ""}`}
        onClick={() => setMediaExperience(null)}
        aria-hidden="true"
      />
      <aside
        className={`media-explorer ${mediaExperience ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mediaExperience}
        aria-labelledby="media-explorer-title"
      >
        {mediaExperience ? (
          <>
            <div className="media-explorer-head">
              <div>
                <p>{mediaExperience.eyebrow}</p>
                <h2 id="media-explorer-title">{mediaExperience.title}</h2>
              </div>
              <button
                ref={mediaClose}
                type="button"
                className="media-explorer-close"
                onClick={() => setMediaExperience(null)}
                aria-label="Close expanded view"
              >
                <X />
              </button>
            </div>
            <div className="media-explorer-viewport" onPointerMove={moveMediaFocus} onPointerLeave={resetMediaFocus} data-cursor="MOVE">
              <div className="media-explorer-plane">
                <Image
                  src={activeMediaItem.src}
                  alt={activeMediaItem.alt}
                  fill
                  sizes="100vw"
                  style={{
                    "--media-zoom": mediaZoom,
                  } as React.CSSProperties}
                />
              </div>
              <span className="media-focus-point" aria-hidden="true" />
              {mediaItems.length > 1 ? (
                <div className="media-gallery-rail" role="group" aria-label="Switch flower image">
                  {mediaItems.map((item, index) => (
                    <button
                      type="button"
                      className={mediaItemIndex === index ? "is-active" : ""}
                      aria-label={`View ${item.label}`}
                      aria-pressed={mediaItemIndex === index}
                      onClick={() => {
                        setMediaItemIndex(index);
                        setMediaZoom(1.75);
                      }}
                      key={`${item.src}-${item.label}`}
                    >
                      <span className="media-gallery-thumb">
                        <Image src={item.src} alt="" fill sizes="84px" />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="media-explorer-controls">
              <span>Move across the image to inspect</span>
              <div>
                <button type="button" onClick={() => setMediaZoom((zoom) => Math.max(1, Number((zoom - 0.15).toFixed(2))))} aria-label="Zoom out">
                  <ZoomOut />
                </button>
                <strong>{Math.round(mediaZoom * 100)}%</strong>
                <button type="button" onClick={() => setMediaZoom((zoom) => Math.min(2.75, Number((zoom + 0.15).toFixed(2))))} aria-label="Zoom in">
                  <ZoomIn />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
