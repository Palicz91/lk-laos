import { useState, useEffect, useRef, useCallback } from 'react';
import translations from './translations';
import {
  SHOW_SOCIAL_PROOF,
  WHATSAPP_NUMBER,
  EMAIL_ADDRESS,
  SCHEDULE_URL,
  HERO_IMAGE_URL,
  PORTRAIT_URL,
  CONTACT_PORTRAIT_URL,
  PORTFOLIO,
  MILESTONES,
  DOCUMENTS,
  OPPORTUNITIES,
} from './constants';
import { useScrollReveal, ScrollReveal } from './hooks/useScrollReveal.jsx';

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  dark: '#0a0a0a',
  darkCard: '#111111',
  cream: '#f8f5ef',
  sand: '#f5f0e8',
  gold: '#b8860b',
  goldLight: 'rgba(184,134,11,0.15)',
  goldFaint: 'rgba(184,134,11,0.06)',
  textLight: '#f0ece4',
  textMuted: '#999999',
  textDark: '#1a1a1a',
  white: '#ffffff',
  whatsappGreen: '#25d366',
};

const FONT = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
};

/* ═══════════════════════════════════════════════════════
   CONCEPT ICONS (inline SVG paths, 24x24, gold fill)
   ═══════════════════════════════════════════════════════ */
const ConceptIcon = ({ type, size = 24, color = C.gold }) => {
  const paths = {
    server: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="6" y1="8" x2="18" y2="8" stroke={color} strokeWidth="1" />
        <line x1="6" y1="12" x2="18" y2="12" stroke={color} strokeWidth="1" />
        <line x1="6" y1="16" x2="18" y2="16" stroke={color} strokeWidth="1" />
        <circle cx="16" cy="6" r="1" fill={color} />
        <circle cx="16" cy="10" r="1" fill={color} />
      </>
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="1" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="7" y="5" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
        <rect x="14" y="5" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
        <rect x="7" y="10" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
        <rect x="14" y="10" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
        <rect x="10" y="17" width="4" height="5" fill={color} opacity="0.3" />
      </>
    ),
    factory: (
      <>
        <rect x="2" y="10" width="20" height="12" rx="1" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="16" y="2" width="4" height="8" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="18" y1="2" x2="18" y2="0" stroke={color} strokeWidth="1" />
        <rect x="5" y="14" width="3" height="4" rx="0.5" fill={color} opacity="0.4" />
        <rect x="10" y="14" width="3" height="4" rx="0.5" fill={color} opacity="0.4" />
        <rect x="15" y="14" width="3" height="4" rx="0.5" fill={color} opacity="0.4" />
      </>
    ),
    hotel: (
      <>
        <rect x="3" y="6" width="18" height="16" rx="1" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1.5" />
        <polygon points="10,2 14,2 12,0" fill={color} />
        <rect x="6" y="9" width="3" height="3" rx="0.5" fill={color} opacity="0.4" />
        <rect x="15" y="9" width="3" height="3" rx="0.5" fill={color} opacity="0.4" />
        <rect x="6" y="14" width="3" height="3" rx="0.5" fill={color} opacity="0.4" />
        <rect x="15" y="14" width="3" height="3" rx="0.5" fill={color} opacity="0.4" />
        <rect x="10" y="17" width="4" height="5" fill={color} opacity="0.3" />
      </>
    ),
    mountain: (
      <>
        <polygon points="2,22 10,4 18,22" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="14,22 19,10 24,22" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      </>
    ),
    solar: (
      <>
        <rect x="2" y="8" width="14" height="10" rx="1" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(-15 9 13)" />
        <line x1="5" y1="11" x2="13" y2="11" stroke={color} strokeWidth="0.7" transform="rotate(-15 9 13)" />
        <line x1="5" y1="14" x2="13" y2="14" stroke={color} strokeWidth="0.7" transform="rotate(-15 9 13)" />
        <circle cx="20" cy="5" r="3" fill="none" stroke={color} strokeWidth="1.5" />
        <line x1="20" y1="0" x2="20" y2="1" stroke={color} strokeWidth="1" />
        <line x1="24" y1="5" x2="23" y2="5" stroke={color} strokeWidth="1" />
        <line x1="20" y1="10" x2="20" y2="9" stroke={color} strokeWidth="1" />
        <line x1="16" y1="5" x2="17" y2="5" stroke={color} strokeWidth="1" />
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {paths[type] || paths.building}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   LANGUAGE HELPERS
   ═══════════════════════════════════════════════════════ */
const LANG_OPTIONS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ko', label: '한국어', full: 'Korean' },
  { code: 'zh', label: '中文', full: 'Chinese' },
  { code: 'lo', label: 'ລາວ', full: 'Lao' },
];

function detectLanguage() {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  if (langParam && translations[langParam]) return langParam;
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('lo')) return 'lo';
  return 'en';
}

/** Get localized text from an opportunity field like { en: "...", ko: "...", ... } */
function loc(obj, lang) {
  if (!obj) return '';
  return obj[lang] || obj.en || '';
}

/** Get localized portfolio name */
function portfolioName(item, lang) {
  if (lang === 'ko') return item.nameKO || item.name;
  if (lang === 'zh') return item.nameZH || item.name;
  if (lang === 'lo') return item.nameLO || item.name;
  return item.name;
}

/** Get localized milestone text */
function milestoneText(item, lang) {
  if (lang === 'ko') return item.textKO || item.text;
  if (lang === 'zh') return item.textZH || item.text;
  if (lang === 'lo') return item.textLO || item.text;
  return item.text;
}

/* ═══════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function App() {
  // ─── State ─────────────────────────────────────────
  const [language, setLanguage] = useState(detectLanguage);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeMapLocation, setActiveMapLocation] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', channel: '', message: '' });
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langDropdownRef = useRef(null);
  const t = translations[language] || translations.en;

  // ─── Scroll listener for nav ───────────────────────
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Close lang dropdown on outside click ──────────
  useEffect(() => {
    const handler = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ─── Close mobile menu on nav click ────────────────
  const navClick = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ─── Railway animation keyframes (injected once) ──
  useEffect(() => {
    if (document.getElementById('lk-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'lk-keyframes';
    style.textContent = `
      @keyframes lk-dash { to { stroke-dashoffset: -24; } }
      @keyframes lk-pulse { 0%,100% { r: 3; opacity: 0.9; } 50% { r: 5; opacity: 1; } }
      @keyframes lk-scrollLine { 0%,100% { height: 20px; opacity: 0.4; } 50% { height: 35px; opacity: 1; } }
      @keyframes lk-fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes lk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: ${FONT.sans}; background: ${C.dark}; color: ${C.textLight}; -webkit-font-smoothing: antialiased; }
      ::selection { background: ${C.gold}; color: ${C.dark}; }
      input, textarea, select, button { font-family: inherit; }
    `;
    document.head.appendChild(style);
  }, []);

  // ═══════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════
  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ─────────────────────────────────────────────
          1. NAV
          ───────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navScrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: navScrolled ? 'blur(12px)' : 'none',
        borderBottom: navScrolled ? `1px solid ${C.gold}` : '1px solid transparent',
        transition: 'all 0.4s ease',
        padding: '0 clamp(20px, 4vw, 60px)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 72,
        }}>
          {/* Monogram */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              fontFamily: FONT.serif, fontSize: 28, fontWeight: 600,
              color: C.gold, textDecoration: 'none', letterSpacing: '0.05em',
            }}>
            LK
          </a>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ display: 'flex', gap: 28 }}
              className="nav-desktop"
            >
              {[
                { id: 'why-laos', label: t.nav.whyLaos },
                { id: 'approach', label: t.nav.approach },
                { id: 'opportunities', label: t.opportunities.label },
                { id: 'contact', label: t.nav.contact },
              ].map((link) => (
                <a key={link.id} href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); navClick(link.id); }}
                  style={{
                    color: C.textMuted, textDecoration: 'none', fontSize: 14,
                    fontWeight: 400, letterSpacing: '0.03em', transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = C.gold}
                  onMouseLeave={(e) => e.target.style.color = C.textMuted}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Language selector */}
            <div ref={langDropdownRef} style={{ position: 'relative' }}>
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  background: 'none', border: `1px solid rgba(184,134,11,0.3)`,
                  borderRadius: 6, padding: '6px 12px', color: C.gold,
                  fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'border-color 0.3s',
                  minHeight: 44,
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = C.gold}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(184,134,11,0.3)'}
              >
                {/* Globe icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
                </svg>
                {LANG_OPTIONS.find(l => l.code === language)?.label || 'EN'}
              </button>
              {langDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 6,
                  background: 'rgba(20,20,20,0.98)', border: `1px solid ${C.gold}`,
                  borderRadius: 8, overflow: 'hidden', minWidth: 120,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                }}>
                  {LANG_OPTIONS.map((opt) => (
                    <button key={opt.code}
                      onClick={() => { setLanguage(opt.code); setLangDropdownOpen(false); }}
                      style={{
                        display: 'block', width: '100%', padding: '10px 16px',
                        background: language === opt.code ? C.goldFaint : 'transparent',
                        border: 'none', color: language === opt.code ? C.gold : C.textMuted,
                        fontSize: 14, textAlign: 'left', cursor: 'pointer',
                        transition: 'all 0.2s', minHeight: 44,
                      }}
                      onMouseEnter={(e) => { e.target.style.background = C.goldLight; e.target.style.color = C.gold; }}
                      onMouseLeave={(e) => {
                        e.target.style.background = language === opt.code ? C.goldFaint : 'transparent';
                        e.target.style.color = language === opt.code ? C.gold : C.textMuted;
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none', background: 'none', border: 'none',
                color: C.gold, cursor: 'pointer', padding: 8, minHeight: 44, minWidth: 44,
              }}
              className="nav-hamburger"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
            background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 32,
          }}>
            {[
              { id: 'why-laos', label: t.nav.whyLaos },
              { id: 'approach', label: t.nav.approach },
              { id: 'opportunities', label: t.opportunities.label },
              { id: 'contact', label: t.nav.contact },
            ].map((link) => (
              <a key={link.id} href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); navClick(link.id); }}
                style={{
                  color: C.textLight, textDecoration: 'none',
                  fontFamily: FONT.serif, fontSize: 28, fontWeight: 400,
                }}>
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* ─────────────────────────────────────────────
          2. HERO
          ───────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', position: 'relative', overflow: 'hidden',
        background: C.dark, padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 60px)',
        paddingBottom: 'clamp(80px, 12vw, 140px)',
      }}>
        {/* Layered radial gradients */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(20,60,20,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20,50,20,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(184,134,11,0.04) 0%, transparent 50%)
          `,
        }} />
        {/* Faint grid texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          {/* Thin gold line */}
          <div style={{
            width: 1, height: 60, background: C.gold, marginBottom: 32,
            animation: 'lk-fadeUp 1s ease forwards',
            opacity: 0, animationDelay: '0.2s', animationFillMode: 'forwards',
          }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: FONT.serif, fontWeight: 400,
            fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1,
            color: C.textLight, maxWidth: 800, marginBottom: 24,
            letterSpacing: '-0.01em',
            animation: 'lk-fadeUp 1s ease forwards',
            opacity: 0, animationDelay: '0.5s', animationFillMode: 'forwards',
          }}>
            {t.hero.headline}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300, color: C.textMuted,
            maxWidth: 600, lineHeight: 1.7, marginBottom: 24,
            animation: 'lk-fadeUp 1s ease forwards',
            opacity: 0, animationDelay: '0.8s', animationFillMode: 'forwards',
          }}>
            {t.hero.subtitle}
          </p>

          {/* Credibility line */}
          <p style={{
            fontSize: 13, fontWeight: 400, color: C.gold, opacity: 0.8,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            animation: 'lk-fadeUp 1s ease forwards',
            opacity: 0, animationDelay: '1.1s', animationFillMode: 'forwards',
          }}>
            {t.hero.credibility}
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'lk-fadeUp 1s ease forwards',
          opacity: 0, animationDelay: '1.5s', animationFillMode: 'forwards',
        }}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', color: C.gold, textTransform: 'uppercase' }}>
            {t.hero ? (t.hero.scroll || '') : ''}
          </span>
          <div style={{
            width: 1, background: C.gold,
            animation: 'lk-scrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. WHY LAOS
          ───────────────────────────────────────────── */}
      <section id="why-laos" style={{
        background: C.cream, color: C.textDark,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{
              fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: C.gold, marginBottom: 12, fontWeight: 500,
            }}>
              {t.whyLaos.label}
            </p>
            <h2 style={{
              fontFamily: FONT.serif, fontWeight: 400,
              fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.15,
              color: C.textDark, marginBottom: 60,
            }}>
              {t.whyLaos.heading}
            </h2>
          </ScrollReveal>

          {/* Two columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 60,
          }}>
            {/* Left: Insight blocks */}
            <div>
              {(t.whyLaos.insights || []).map((insight, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div style={{ marginBottom: 36, display: 'flex', gap: 20 }}>
                    <div style={{
                      width: 2, minHeight: 40, background: C.gold,
                      flexShrink: 0, marginTop: 4,
                    }} />
                    <div>
                      <h3 style={{
                        fontFamily: FONT.serif, fontSize: 20, fontWeight: 500,
                        color: C.textDark, marginBottom: 8,
                      }}>
                        {insight.title}
                      </h3>
                      <p style={{
                        fontSize: 15, fontWeight: 300, lineHeight: 1.7,
                        color: '#555', paddingLeft: 0,
                      }}>
                        {insight.text}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right: SVG map + stats */}
            <div>
              <ScrollReveal delay={200}>
                <div style={{
                  position: 'relative', background: C.cream,
                  borderRadius: 12, overflow: 'hidden', marginBottom: 40,
                }}>
                  <svg viewBox="0 0 100 90" style={{ width: '100%', height: 'auto' }}>
                    {/* Country outline */}
                    <defs>
                      <linearGradient id="laos-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1a3a1a" />
                        <stop offset="100%" stopColor="#0d2a0d" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M45,5 L55,8 L58,15 L62,20 L60,28 L55,32 L58,38 L55,45 L50,48 L52,55 L55,60 L52,68 L48,72 L45,78 L40,82 L38,78 L35,72 L32,65 L35,58 L38,52 L35,48 L32,42 L35,35 L38,28 L42,22 L40,15 L42,10 Z"
                      fill="url(#laos-fill)" stroke={C.gold} strokeWidth="0.5" strokeOpacity="0.4"
                    />

                    {/* Railway line (dashed, animated) */}
                    <path
                      d={`M${PORTFOLIO[3].mapX},${PORTFOLIO[3].mapY} C${PORTFOLIO[3].mapX + 3},${PORTFOLIO[3].mapY + 4} ${PORTFOLIO[1].mapX - 2},${PORTFOLIO[1].mapY + 6} ${PORTFOLIO[1].mapX},${PORTFOLIO[1].mapY} C${PORTFOLIO[1].mapX + 2},${PORTFOLIO[1].mapY - 4} ${PORTFOLIO[0].mapX + 3},${PORTFOLIO[0].mapY + 6} ${PORTFOLIO[0].mapX},${PORTFOLIO[0].mapY}`}
                      fill="none" stroke={C.gold} strokeWidth="0.8" strokeDasharray="4 4"
                      style={{ animation: 'lk-dash 1.5s linear infinite' }}
                    />

                    {/* Location markers */}
                    {PORTFOLIO.map((loc, i) => (
                      <g key={i} style={{ cursor: 'pointer' }}
                        onClick={() => setActiveMapLocation(activeMapLocation === i ? null : i)}
                      >
                        <circle cx={loc.mapX} cy={loc.mapY} r="3" fill={C.gold}
                          style={{ animation: `lk-pulse 2s ease-in-out ${i * 0.3}s infinite` }}
                        />
                        <circle cx={loc.mapX} cy={loc.mapY} r="6" fill="none"
                          stroke={C.gold} strokeWidth="0.5" opacity="0.4"
                        />
                        <text x={loc.mapX + (i === 0 ? -2 : 8)} y={loc.mapY + (i === 0 ? -7 : -3)}
                          fill={C.gold} fontSize="3.5" fontFamily={FONT.sans} fontWeight="400"
                          textAnchor={i === 0 ? 'end' : 'start'}
                        >
                          {(t.whyLaos.mapLocations || translations.en.whyLaos.mapLocations || [])[i] || portfolioName(loc, language)}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Info panel */}
                  {activeMapLocation !== null && (
                    <div style={{
                      padding: '16px 20px', background: 'rgba(26,26,26,0.95)',
                      borderTop: `2px solid ${C.gold}`, borderRadius: '0 0 12px 12px',
                      color: C.textLight, fontSize: 14, fontWeight: 300, lineHeight: 1.6,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <strong style={{ color: C.gold, fontWeight: 500 }}>
                            {(t.whyLaos.mapLocations || [])[activeMapLocation] || portfolioName(PORTFOLIO[activeMapLocation], language)}
                          </strong>
                          <p style={{ marginTop: 6, color: '#ccc' }}>
                            {(t.whyLaos.mapInfoPanels || translations.en.whyLaos.mapInfoPanels || [])[activeMapLocation] || ''}
                          </p>
                        </div>
                        <button onClick={() => setActiveMapLocation(null)}
                          style={{
                            background: 'none', border: 'none', color: C.textMuted,
                            cursor: 'pointer', fontSize: 18, padding: 4, minHeight: 44, minWidth: 44,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Stats 2x2 grid */}
              <ScrollReveal delay={300}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32,
                }}>
                  {(t.whyLaos.stats || []).map((stat, i) => (
                    <div key={i} style={{
                      padding: 20, background: C.white, borderRadius: 8,
                      borderLeft: `3px solid ${C.gold}`,
                    }}>
                      <div style={{
                        fontFamily: FONT.serif, fontSize: 28, fontWeight: 600,
                        color: C.gold, marginBottom: 4,
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 13, color: '#777', fontWeight: 300 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Regulatory callout */}
          <ScrollReveal delay={400}>
            <div style={{
              marginTop: 48, padding: '24px 28px', background: C.white,
              borderRadius: 8, borderLeft: `3px solid ${C.gold}`,
              fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#555',
              fontStyle: 'italic',
            }}>
              {t.whyLaos.regulatoryNote}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. GOLD LINE DIVIDER
          ───────────────────────────────────────────── */}
      <div style={{
        height: 1, margin: '60px 0',
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
      }} />

      {/* ─────────────────────────────────────────────
          5. APPROACH (dark bg)
          ───────────────────────────────────────────── */}
      <section id="approach" style={{
        background: C.dark,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* 5a. Intro */}
          <ScrollReveal>
            <p style={{
              fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: C.gold, marginBottom: 12, fontWeight: 500,
            }}>
              {t.approach.label}
            </p>
            <h2 style={{
              fontFamily: FONT.serif, fontWeight: 400,
              fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.15,
              color: C.textLight, marginBottom: 60,
            }}>
              {t.approach.heading}
            </h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 60, marginBottom: 80,
          }}>
            {/* Portrait placeholder */}
            <ScrollReveal delay={100}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%', maxWidth: 300, aspectRatio: '4/5', borderRadius: 12,
                  background: PORTRAIT_URL
                    ? `url(${PORTRAIT_URL}) center/cover no-repeat`
                    : 'linear-gradient(135deg, #1a3a1a 0%, #0d2a0d 100%)',
                  border: `1px solid rgba(184,134,11,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {!PORTRAIT_URL && (
                    <span style={{
                      fontFamily: FONT.serif, fontSize: 48, color: C.gold, opacity: 0.3,
                    }}>LK</span>
                  )}
                </div>
                <p style={{
                  marginTop: 16, fontFamily: FONT.serif, fontStyle: 'italic',
                  fontSize: 16, color: C.textMuted,
                }}>
                  {t.approach.name}
                </p>
              </div>
            </ScrollReveal>

            {/* Bio + quote */}
            <ScrollReveal delay={200}>
              <div>
                <p style={{
                  fontSize: 16, fontWeight: 300, lineHeight: 1.8,
                  color: '#ccc', marginBottom: 28,
                }}>
                  {t.approach.bio}
                </p>
                <p style={{
                  fontSize: 15, fontWeight: 300, lineHeight: 1.8,
                  color: '#aaa', marginBottom: 32, paddingLeft: 20,
                }}>
                  {t.approach.bioIndented}
                </p>
                {/* Quote */}
                <blockquote style={{
                  borderLeft: `3px solid ${C.gold}`, paddingLeft: 24,
                  marginLeft: 0, marginBottom: 0,
                }}>
                  <p style={{
                    fontFamily: FONT.serif, fontSize: 18, fontStyle: 'italic',
                    lineHeight: 1.7, color: C.textLight, marginBottom: 16,
                  }}>
                    &ldquo;{t.approach.quote || t.approach.bioIndented}&rdquo;
                  </p>
                  <footer style={{ fontSize: 13, color: C.gold }}>
                    {t.approach.name} &mdash; {t.approach.title}
                  </footer>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* 5b. Portfolio at a glance */}
          <ScrollReveal>
            <h3 style={{
              fontFamily: FONT.serif, fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400, color: C.textLight, marginBottom: 32,
            }}>
              {t.approach.portfolioHeading}
            </h3>
          </ScrollReveal>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16, marginBottom: 32,
          }}>
            {PORTFOLIO.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{
                  background: C.darkCard, borderRadius: 8,
                  borderLeft: `3px solid ${C.gold}`, padding: '24px 20px',
                }}>
                  <div style={{
                    fontFamily: FONT.serif, fontSize: 32, fontWeight: 600,
                    color: C.gold, marginBottom: 8, lineHeight: 1,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400, color: C.textLight, marginBottom: 6 }}>
                    {portfolioName(item, language)}
                  </div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>
                    {item.hectares} ha &middot; {item.parcels} parcels
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Summary stats row */}
          <ScrollReveal delay={300}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 80,
              padding: '20px 0', borderTop: `1px solid rgba(184,134,11,0.2)`,
              borderBottom: `1px solid rgba(184,134,11,0.2)`,
            }}>
              {(t.socialProof?.stats || []).map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', flex: '1 1 100px' }}>
                  <div style={{
                    fontFamily: FONT.serif, fontSize: 24, fontWeight: 600, color: C.gold,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 5c. Milestones */}
          <ScrollReveal>
            <h3 style={{
              fontFamily: FONT.serif, fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400, color: C.textLight, marginBottom: 40,
            }}>
              {t.approach.milestonesHeading}
            </h3>
          </ScrollReveal>

          <div style={{ position: 'relative', paddingLeft: 40, marginBottom: 80 }}>
            {/* Vertical gold line */}
            <div style={{
              position: 'absolute', left: 11, top: 8, bottom: 8, width: 2,
              background: `linear-gradient(to bottom, ${C.gold}, rgba(184,134,11,0.2))`,
            }} />
            {MILESTONES.map((ms, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{
                  position: 'relative', marginBottom: 32, paddingLeft: 8,
                }}>
                  {/* Gold circle */}
                  <div style={{
                    position: 'absolute', left: -37, top: 4,
                    width: 12, height: 12, borderRadius: '50%',
                    background: C.gold, border: `2px solid ${C.dark}`,
                  }} />
                  <div style={{
                    fontSize: 13, color: C.gold, fontWeight: 500,
                    letterSpacing: '0.05em', marginBottom: 4,
                  }}>
                    {ms.year}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 300, color: '#ccc', lineHeight: 1.6 }}>
                    {milestoneText(ms, language)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 5d. Partnership structures */}
          <ScrollReveal>
            <h3 style={{
              fontFamily: FONT.serif, fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400, color: C.textLight, marginBottom: 32,
            }}>
              {t.approach.partnershipsHeading}
            </h3>
          </ScrollReveal>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20, marginBottom: 80,
          }}>
            {[t.approach.jv, t.approach.lease, t.approach.acquisition].map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{
                  background: C.darkCard, borderRadius: 8, padding: '28px 24px',
                  borderTop: `3px solid ${C.gold}`,
                }}>
                  <h4 style={{
                    fontFamily: FONT.serif, fontSize: 20, fontWeight: 500,
                    color: C.textLight, marginBottom: 12,
                  }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#999' }}>
                    {p.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 5e. Process */}
          <ScrollReveal>
            <h3 style={{
              fontFamily: FONT.serif, fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400, color: C.textLight, marginBottom: 40,
            }}>
              {t.approach.processHeading}
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 20, marginBottom: 80, position: 'relative',
              padding: '0 20px',
            }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute', top: 20, left: 40, right: 40, height: 2,
                background: `linear-gradient(90deg, ${C.gold}, rgba(184,134,11,0.3))`,
                zIndex: 0, display: 'var(--process-line-display, block)',
              }} />
              {(t.approach.processSteps || []).map((step, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  flex: '1 1 100px', minWidth: 80, position: 'relative', zIndex: 1,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `2px solid ${C.gold}`, background: C.dark,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT.serif, fontSize: 16, color: C.gold, fontWeight: 600,
                    marginBottom: 12,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{
                    fontSize: 12, color: C.textMuted, textAlign: 'center',
                    fontWeight: 300, lineHeight: 1.4,
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 5f. Documents */}
          <ScrollReveal>
            <h3 style={{
              fontFamily: FONT.serif, fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400, color: C.textLight, marginBottom: 12,
            }}>
              {t.approach.documentsHeading}
            </h3>
            <p style={{
              fontSize: 14, fontWeight: 300, color: C.textMuted, marginBottom: 32,
              lineHeight: 1.6, maxWidth: 600,
            }}>
              {t.approach.documentsNote}
            </p>
          </ScrollReveal>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {DOCUMENTS.map((doc, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{
                  background: C.goldFaint, borderRadius: 8, padding: '28px 22px',
                  position: 'relative', overflow: 'hidden',
                  border: `1px solid rgba(184,134,11,0.15)`,
                }}>
                  {/* Fake blurred text lines */}
                  <div style={{ marginBottom: 20, opacity: 0.15 }}>
                    {[80, 95, 60, 88, 70, 50].map((w, j) => (
                      <div key={j} style={{
                        width: `${w}%`, height: 4, background: C.gold,
                        borderRadius: 2, marginBottom: 6,
                      }} />
                    ))}
                  </div>
                  {/* Stamp circle */}
                  <div style={{
                    position: 'absolute', top: 18, right: 18,
                    width: 36, height: 36, borderRadius: '50%',
                    border: `2px solid rgba(184,134,11,0.25)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={C.gold} strokeWidth="2" opacity="0.4">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 400, color: C.textLight, marginBottom: 4,
                  }}>
                    {doc.type}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>
                    {doc.region} {doc.typeLO ? `\u00B7 ${doc.typeLO}` : ''}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          6. SOCIAL PROOF BAND (conditional)
          ───────────────────────────────────────────── */}
      {SHOW_SOCIAL_PROOF && (
        <section style={{
          background: C.dark, padding: '60px clamp(20px, 4vw, 60px)',
          borderTop: `1px solid rgba(184,134,11,0.2)`,
          borderBottom: `1px solid rgba(184,134,11,0.2)`,
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40,
            }}>
              {(t.socialProof?.stats || []).map((stat, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div style={{
                    textAlign: 'center', padding: '20px 32px',
                    borderLeft: i > 0 ? `1px solid rgba(184,134,11,0.2)` : 'none',
                  }}>
                    <div style={{
                      fontFamily: FONT.serif, fontSize: 36, fontWeight: 600, color: C.gold,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          7. OPPORTUNITIES
          ───────────────────────────────────────────── */}
      <section id="opportunities" style={{
        background: '#111', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{
              fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: C.gold, marginBottom: 12, fontWeight: 500,
            }}>
              {t.opportunities.label}
            </p>
            <h2 style={{
              fontFamily: FONT.serif, fontWeight: 400,
              fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.15,
              color: C.textLight, marginBottom: 16,
            }}>
              {t.opportunities.heading}
            </h2>
            <p style={{
              fontSize: 15, fontWeight: 300, color: C.textMuted,
              marginBottom: 48, maxWidth: 600, lineHeight: 1.7,
            }}>
              {t.opportunities.subtitle}
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {OPPORTUNITIES.map((opp, i) => {
              const isExpanded = expandedCard === opp.id;
              return (
                <ScrollReveal key={opp.id} delay={i * 80}>
                  <div style={{
                    background: C.dark, borderRadius: 10,
                    borderLeft: `4px solid ${C.gold}`,
                    overflow: 'hidden', transition: 'all 0.4s ease',
                    border: isExpanded ? `1px solid rgba(184,134,11,0.3)` : `1px solid rgba(255,255,255,0.05)`,
                    borderLeftWidth: 4, borderLeftColor: C.gold,
                  }}>
                    {/* Collapsed header */}
                    <div
                      style={{
                        padding: '24px 28px', cursor: 'pointer',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      }}
                      onClick={() => setExpandedCard(isExpanded ? null : opp.id)}
                    >
                      <div style={{ flex: 1, paddingRight: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <h3 style={{
                            fontFamily: FONT.serif, fontSize: 22, fontWeight: 500,
                            color: C.textLight,
                          }}>
                            {portfolioName(PORTFOLIO.find(p => p.name.toLowerCase().replace(/\s/g, '') === opp.id.replace(/\s/g, '')) || { name: opp.id }, language)}
                          </h3>
                          <span style={{
                            fontSize: 11, padding: '3px 10px', borderRadius: 20,
                            background: C.goldFaint, color: C.gold,
                            fontWeight: 400, whiteSpace: 'nowrap',
                          }}>
                            {loc(opp.category, language)}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 6 }}>
                          {loc(opp.size, language)}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 300, color: '#aaa', lineHeight: 1.6 }}>
                          {loc(opp.summary, language)}
                        </p>
                      </div>
                      <button style={{
                        background: 'none', border: `1px solid rgba(184,134,11,0.4)`,
                        borderRadius: '50%', width: 36, height: 36, minWidth: 36, minHeight: 44,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: C.gold, fontSize: 20, cursor: 'pointer',
                        transition: 'transform 0.3s, background 0.3s',
                        transform: isExpanded ? 'rotate(45deg)' : 'none',
                        flexShrink: 0,
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = C.goldFaint}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        +
                      </button>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div style={{
                        padding: '0 28px 28px',
                        animation: 'lk-fadeUp 0.4s ease',
                      }}>
                        <p style={{
                          fontSize: 15, fontWeight: 300, color: '#bbb',
                          lineHeight: 1.7, marginBottom: 28,
                        }}>
                          {loc(opp.description, language)}
                        </p>

                        {/* Concept cards */}
                        <h4 style={{
                          fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: C.gold, marginBottom: 16, fontWeight: 500,
                        }}>
                          {t.opportunities.requestBriefing ? 'Development concepts' : 'Concepts'}
                        </h4>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                          gap: 16, marginBottom: 24,
                        }}>
                          {(opp.concepts || []).map((concept, ci) => (
                            <div key={ci} style={{
                              background: 'rgba(255,255,255,0.03)', borderRadius: 8,
                              padding: '20px 18px', border: `1px solid rgba(184,134,11,0.1)`,
                            }}>
                              <div style={{ marginBottom: 12 }}>
                                <ConceptIcon type={concept.icon} size={28} />
                              </div>
                              <h5 style={{
                                fontSize: 15, fontWeight: 500, color: C.textLight,
                                marginBottom: 8,
                              }}>
                                {loc(concept.title, language)}
                              </h5>
                              <p style={{
                                fontSize: 13, fontWeight: 300, color: '#999', lineHeight: 1.6,
                              }}>
                                {loc(concept.text, language)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Advantage pills */}
                        <div style={{
                          display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24,
                        }}>
                          {(loc(opp.advantages, language) || []).map((adv, ai) => (
                            <span key={ai} style={{
                              padding: '6px 14px', borderRadius: 20, fontSize: 12,
                              background: C.goldFaint, color: C.gold, fontWeight: 400,
                              border: `1px solid rgba(184,134,11,0.2)`,
                            }}>
                              {adv}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `${(t.contact?.whatsapp?.prefill || 'Hello')} [${opp.id}]`
                          )}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-block', padding: '12px 28px',
                            background: C.gold, color: C.dark, borderRadius: 6,
                            fontSize: 14, fontWeight: 500, textDecoration: 'none',
                            transition: 'opacity 0.3s',
                          }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                          {t.opportunities.requestBriefing}
                        </a>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          8. CONTACT
          ───────────────────────────────────────────── */}
      <section id="contact" style={{
        background: C.sand, color: C.textDark,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Portrait + heading */}
          <ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', marginBottom: 20,
                background: CONTACT_PORTRAIT_URL
                  ? `url(${CONTACT_PORTRAIT_URL}) center/cover no-repeat`
                  : 'linear-gradient(135deg, #1a3a1a 0%, #0d2a0d 100%)',
                border: `2px solid ${C.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {!CONTACT_PORTRAIT_URL && (
                  <span style={{ fontFamily: FONT.serif, fontSize: 24, color: C.gold, opacity: 0.5 }}>LK</span>
                )}
              </div>
              <h2 style={{
                fontFamily: FONT.serif, fontWeight: 400,
                fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.15,
                color: C.textDark, textAlign: 'center', marginBottom: 16,
              }}>
                {t.contact.heading}
              </h2>
              <p style={{
                fontSize: 15, fontWeight: 300, lineHeight: 1.7,
                color: '#666', maxWidth: 560, textAlign: 'center',
              }}>
                {t.contact.message}
              </p>
            </div>
          </ScrollReveal>

          {/* Contact cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16, marginBottom: 40,
          }}>
            {/* WhatsApp */}
            <ScrollReveal delay={0}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact?.whatsapp?.prefill || '')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '28px 24px', borderRadius: 10,
                  background: '#fff', textDecoration: 'none', color: C.textDark,
                  border: '1px solid rgba(37,211,102,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, marginBottom: 14,
                  background: 'rgba(37,211,102,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={C.whatsappGreen}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>
                  {t.contact.whatsapp.title}
                </h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: '#777', lineHeight: 1.5 }}>
                  {t.contact.whatsapp.text}
                </p>
              </a>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={100}>
              <a href={`mailto:${EMAIL_ADDRESS}`}
                style={{
                  display: 'block', padding: '28px 24px', borderRadius: 10,
                  background: '#fff', textDecoration: 'none', color: C.textDark,
                  border: '1px solid rgba(184,134,11,0.15)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(184,134,11,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, marginBottom: 14,
                  background: C.goldFaint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>
                  {t.contact.email.title}
                </h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: '#777', lineHeight: 1.5 }}>
                  {t.contact.email.text}
                </p>
              </a>
            </ScrollReveal>

            {/* Schedule */}
            <ScrollReveal delay={200}>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '28px 24px', borderRadius: 10,
                  background: '#fff', textDecoration: 'none', color: C.textDark,
                  border: '1px solid rgba(184,134,11,0.15)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(184,134,11,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, marginBottom: 14,
                  background: C.goldFaint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>
                  {t.contact.schedule.title}
                </h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: '#777', lineHeight: 1.5 }}>
                  {t.contact.schedule.text}
                </p>
              </a>
            </ScrollReveal>
          </div>

          {/* Language note */}
          <ScrollReveal delay={200}>
            <p style={{
              fontSize: 13, fontWeight: 300, color: '#888', textAlign: 'center',
              marginBottom: 32, fontStyle: 'italic',
            }}>
              {t.contact.langNote}
            </p>
          </ScrollReveal>

          {/* Messaging platforms row */}
          <ScrollReveal delay={250}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: 10, marginBottom: 48,
            }}>
              {['WhatsApp', 'WeChat', 'KakaoTalk', 'Line', 'Telegram'].map((platform) => (
                <span key={platform} style={{
                  padding: '6px 16px', borderRadius: 20, fontSize: 12,
                  background: '#fff', color: '#555', fontWeight: 400,
                  border: '1px solid rgba(0,0,0,0.08)',
                }}>
                  {platform}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={300}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              style={{
                maxWidth: 560, margin: '0 auto',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="hidden" name="form-name" value="contact" />

              <input
                type="text" name="name" placeholder={t.contact.formName}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '14px 18px', borderRadius: 8, fontSize: 15,
                  border: '1px solid rgba(0,0,0,0.1)', background: '#fff',
                  outline: 'none', fontWeight: 300, transition: 'border-color 0.3s',
                  minHeight: 44,
                }}
                onFocus={(e) => e.target.style.borderColor = C.gold}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />

              <select
                name="channel"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                style={{
                  padding: '14px 18px', borderRadius: 8, fontSize: 15,
                  border: '1px solid rgba(0,0,0,0.1)', background: '#fff',
                  outline: 'none', fontWeight: 300, color: formData.channel ? C.textDark : '#999',
                  transition: 'border-color 0.3s', minHeight: 44, cursor: 'pointer',
                }}
                onFocus={(e) => e.target.style.borderColor = C.gold}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              >
                <option value="" disabled>{t.contact.formChannel}</option>
                {Object.values(t.contact.platforms || {}).map((ch) => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>

              <textarea
                name="message" placeholder={t.contact.formMessage}
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '14px 18px', borderRadius: 8, fontSize: 15,
                  border: '1px solid rgba(0,0,0,0.1)', background: '#fff',
                  outline: 'none', fontWeight: 300, resize: 'vertical',
                  transition: 'border-color 0.3s', minHeight: 100,
                  fontFamily: FONT.sans,
                }}
                onFocus={(e) => e.target.style.borderColor = C.gold}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />

              <button type="submit" style={{
                padding: '14px 32px', borderRadius: 8, fontSize: 15,
                background: C.gold, color: '#fff', border: 'none',
                fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.3s',
                minHeight: 48, letterSpacing: '0.02em',
              }}
                onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {t.contact.formSubmit}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          9. FOOTER
          ───────────────────────────────────────────── */}
      <footer style={{
        background: C.dark, borderTop: `1px solid ${C.gold}`,
        padding: '40px clamp(20px, 4vw, 60px)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              fontFamily: FONT.serif, fontSize: 22, fontWeight: 600,
              color: C.gold, letterSpacing: '0.05em',
            }}>
              LK
            </span>
            <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 300 }}>
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#" style={{
              fontSize: 13, color: C.gold, textDecoration: 'none',
              fontWeight: 400, transition: 'opacity 0.3s',
            }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {t.footer.investorGuide}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
