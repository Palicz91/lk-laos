import { useState, useEffect, useCallback } from 'react';
import translations from './translations';
import { SHOW_SOCIAL_PROOF, WHATSAPP_NUMBER, EMAIL_ADDRESS, SCHEDULE_URL, PORTRAIT_URL, CONTACT_PORTRAIT_URL, PORTFOLIO, MILESTONES, DOCUMENTS, OPPORTUNITIES } from './constants';
import { ScrollReveal } from './hooks/useScrollReveal';

// ═══════════════════════════════════════════════════════
// Design tokens
// ═══════════════════════════════════════════════════════
const C = {
  ivory: '#FDFBF7',
  sand: '#F5F0E8',
  linen: '#F0EBE0',
  white: '#FFFFFF',
  charcoal: '#2C2824',
  warmGray: '#7A7067',
  gold: '#8B6914',
  goldHover: '#A07B1A',
  border: '#E8E2D8',
  shadow: '0 2px 20px rgba(44,40,36,0.06)',
  shadowHover: '0 8px 32px rgba(44,40,36,0.1)',
};

const F = {
  heading: "'Fraunces', serif",
  body: "'Outfit', sans-serif",
};

// ═══════════════════════════════════════════════════════
// Concept icons (simple inline SVG paths)
// ═══════════════════════════════════════════════════════
const conceptIcons = {
  server: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="7" rx="1.5" stroke={C.gold} strokeWidth="1.5"/>
      <rect x="3" y="14" width="18" height="7" rx="1.5" stroke={C.gold} strokeWidth="1.5"/>
      <circle cx="7" cy="6.5" r="1" fill={C.gold}/>
      <circle cx="7" cy="17.5" r="1" fill={C.gold}/>
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 21V6l8-4 8 4v15H4z" stroke={C.gold} strokeWidth="1.5"/>
      <rect x="8" y="9" width="3" height="3" stroke={C.gold} strokeWidth="1"/>
      <rect x="13" y="9" width="3" height="3" stroke={C.gold} strokeWidth="1"/>
      <rect x="10" y="16" width="4" height="5" stroke={C.gold} strokeWidth="1"/>
    </svg>
  ),
  factory: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21V11l5-4v4l5-4v4l5-4v14H3z" stroke={C.gold} strokeWidth="1.5"/>
      <rect x="6" y="14" width="3" height="3" stroke={C.gold} strokeWidth="1"/>
      <rect x="12" y="14" width="3" height="3" stroke={C.gold} strokeWidth="1"/>
    </svg>
  ),
  hotel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 21V4a1 1 0 011-1h12a1 1 0 011 1v17" stroke={C.gold} strokeWidth="1.5"/>
      <path d="M3 21h18" stroke={C.gold} strokeWidth="1.5"/>
      <rect x="9" y="7" width="6" height="4" rx="1" stroke={C.gold} strokeWidth="1"/>
      <rect x="10" y="16" width="4" height="5" stroke={C.gold} strokeWidth="1"/>
    </svg>
  ),
  mountain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20L9 6l4 6 3-4 5 12H3z" stroke={C.gold} strokeWidth="1.5"/>
    </svg>
  ),
  solar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke={C.gold} strokeWidth="1.5"/>
      <path d="M12 1v2M12 14v2M5.6 4.6l1.4 1.4M17 10l1.4 1.4M2 8h3M19 8h3M5.6 11.4l1.4-1.4M17 6l1.4-1.4" stroke={C.gold} strokeWidth="1.2"/>
      <path d="M4 20l4-4h8l4 4" stroke={C.gold} strokeWidth="1.5"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════
// Laos SVG map component
// ═══════════════════════════════════════════════════════
function LaosMap({ locations, activeIndex, onLocationClick }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      <path
        d="M45,5 L55,8 L58,15 L62,20 L60,28 L55,32 L58,38 L55,45 L50,48 L52,55 L55,60 L52,68 L48,72 L45,78 L40,82 L38,78 L35,72 L32,65 L35,58 L38,52 L35,48 L32,42 L35,35 L38,28 L42,22 L40,15 L42,10 Z"
        fill="rgba(139,105,20,0.05)"
        stroke={C.gold}
        strokeWidth="1.5"
      />
      <path
        d="M45,35 L48,47 L52,58"
        fill="none"
        stroke={C.gold}
        strokeWidth="0.8"
        strokeDasharray="3,2"
        opacity="0.5"
      />
      {locations.map((loc, i) => (
        <g key={i} onClick={() => onLocationClick(i)} style={{ cursor: 'pointer' }}>
          <circle
            cx={loc.mapX}
            cy={loc.mapY}
            r={activeIndex === i ? 4 : 2.5}
            fill={C.gold}
            opacity={activeIndex === i ? 1 : 0.7}
          >
            <animate
              attributeName="r"
              values={activeIndex === i ? '3.5;4.5;3.5' : '2;3;2'}
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={loc.mapX} cy={loc.mapY} r="6" fill="transparent" />
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════
function getLocalizedName(item, language) {
  const keyMap = { ko: 'nameKO', zh: 'nameZH', lo: 'nameLO' };
  return (keyMap[language] && item[keyMap[language]]) || item.name;
}

function getLocalizedText(obj, language) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj;
  return obj[language] || obj.en || '';
}

function getMilestoneText(m, language) {
  const keyMap = { ko: 'textKO', zh: 'textZH', lo: 'textLO' };
  return (keyMap[language] && m[keyMap[language]]) || m.text;
}

function getLocalizedArray(obj, language) {
  if (Array.isArray(obj)) return obj;
  if (obj && obj[language]) return obj[language];
  if (obj && obj.en) return obj.en;
  return [];
}

const locationNames = {
  vientiane: 'Vientiane Capital',
  vangvieng: 'Vang Vieng',
  feuang: 'Feuang',
  luangprabang: 'Luang Prabang',
};

// ═══════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════
export default function App() {
  const [language, setLanguage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && translations[urlLang]) return urlLang;
    const navLang = (navigator.language || '').slice(0, 2);
    if (translations[navLang]) return navLang;
    return 'en';
  });
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeMapLocation, setActiveMapLocation] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', channel: '', message: '' });

  const t = translations[language] || translations.en;

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const langLabels = { en: 'EN', ko: '한국어', zh: '中文', lo: 'ລາວ' };

  // ═══════════════════════════════════════════════════════
  // SHARED STYLES
  // ═══════════════════════════════════════════════════════
  const sectionLabel = {
    fontFamily: F.body,
    fontSize: 13,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: C.gold,
    marginBottom: 16,
    marginTop: 0,
  };

  const sectionHeading = {
    fontFamily: F.heading,
    fontSize: 'clamp(28px, 4vw, 44px)',
    fontWeight: 500,
    color: C.charcoal,
    lineHeight: 1.2,
    marginBottom: 24,
    marginTop: 0,
  };

  const bodyText = {
    fontFamily: F.body,
    fontSize: 16,
    fontWeight: 300,
    lineHeight: 1.75,
    color: C.warmGray,
    margin: 0,
  };

  const cardBase = {
    background: C.white,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    boxShadow: C.shadow,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const sectionPadding = {
    padding: 'clamp(72px, 10vw, 120px) 24px',
  };

  const maxWidth = {
    maxWidth: 1080,
    margin: '0 auto',
    width: '100%',
  };

  const hoverLift = {
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = C.shadowHover;
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = C.shadow;
    },
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: F.body, color: C.charcoal, background: C.ivory, overflowX: 'hidden' }}>

      {/* ─── NAV ──────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: C.ivory,
        borderBottom: `1px solid ${C.border}`,
        boxShadow: navScrolled ? '0 1px 12px rgba(44,40,36,0.06)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div style={{
          ...maxWidth,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
          padding: '0 24px',
        }}>
          {/* LK monogram */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: F.heading,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 22,
              color: C.gold,
              letterSpacing: 2,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            LK
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {/* Desktop links */}
            <div className="lk-nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              {[
                ['why-laos', t.nav.whyLaos],
                ['approach', t.nav.approach],
                ['opportunities', t.nav.opportunities],
                ['contact', t.nav.contact],
              ].map(([id, label]) => (
                <span
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    fontFamily: F.body,
                    fontSize: 13,
                    fontWeight: 400,
                    color: C.warmGray,
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    letterSpacing: 0.5,
                  }}
                  onMouseEnter={e => e.target.style.color = C.charcoal}
                  onMouseLeave={e => e.target.style.color = C.warmGray}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Language selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.warmGray} strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              <select
                value={language}
                onChange={e => changeLanguage(e.target.value)}
                style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  color: C.warmGray,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {Object.entries(langLabels).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>

            {/* CTA desktop */}
            <button
              className="lk-nav-cta"
              onClick={() => scrollTo('contact')}
              style={{
                fontFamily: F.body,
                fontSize: 13,
                fontWeight: 500,
                background: C.charcoal,
                color: C.ivory,
                border: 'none',
                borderRadius: 999,
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = '#3d3832'}
              onMouseLeave={e => e.target.style.background = C.charcoal}
            >
              {t.nav.contact}
            </button>

            {/* Hamburger mobile */}
            <button
              className="lk-nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" stroke={C.charcoal} strokeWidth="1.5" fill="none">
                {mobileMenuOpen
                  ? <path d="M6 6l12 12M6 18L18 6"/>
                  : <path d="M4 7h16M4 12h16M4 17h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile slide-down */}
        {mobileMenuOpen && (
          <div style={{
            background: C.ivory,
            borderTop: `1px solid ${C.border}`,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            {[
              ['why-laos', t.nav.whyLaos],
              ['approach', t.nav.approach],
              ['opportunities', t.nav.opportunities],
              ['contact', t.nav.contact],
            ].map(([id, label]) => (
              <span
                key={id}
                onClick={() => scrollTo(id)}
                style={{ fontFamily: F.body, fontSize: 15, color: C.warmGray, cursor: 'pointer' }}
              >
                {label}
              </span>
            ))}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {Object.entries(langLabels).map(([code, label]) => (
                <span
                  key={code}
                  onClick={() => { changeLanguage(code); setMobileMenuOpen(false); }}
                  style={{
                    fontFamily: F.body,
                    fontSize: 13,
                    color: language === code ? C.gold : C.warmGray,
                    fontWeight: language === code ? 500 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO (ivory) ─────────────────────────────────── */}
      <section style={{
        background: C.ivory,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        ...sectionPadding,
        paddingTop: 'clamp(120px, 14vw, 180px)',
      }}>
        <div style={{
          ...maxWidth,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }} className="lk-hero-grid">
          {/* Left column */}
          <div>
            <ScrollReveal delay={0}>
              <div style={{ width: 40, height: 1, background: C.gold, marginBottom: 32 }} />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 style={{
                fontFamily: F.heading,
                fontWeight: 500,
                fontSize: 'clamp(36px, 6vw, 64px)',
                lineHeight: 1.1,
                color: C.charcoal,
                margin: '0 0 24px 0',
              }}>
                {t.hero.headline}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p style={{ ...bodyText, fontSize: 18, marginBottom: 20, maxWidth: 520 }}>
                {t.hero.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <p style={{
                fontFamily: F.body,
                fontWeight: 400,
                fontSize: 15,
                color: C.gold,
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: 480,
              }}>
                {t.hero.credibility}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  onClick={() => scrollTo('opportunities')}
                  style={{
                    fontFamily: F.body,
                    fontSize: 15,
                    fontWeight: 500,
                    background: C.charcoal,
                    color: C.ivory,
                    border: 'none',
                    borderRadius: 999,
                    padding: '14px 32px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.background = '#3d3832'}
                  onMouseLeave={e => e.target.style.background = C.charcoal}
                >
                  {t.nav.opportunities}
                </button>
                <button
                  onClick={() => scrollTo('approach')}
                  style={{
                    fontFamily: F.body,
                    fontSize: 15,
                    fontWeight: 400,
                    background: 'transparent',
                    color: C.charcoal,
                    border: `1px solid ${C.border}`,
                    borderRadius: 999,
                    padding: '14px 32px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.borderColor = C.warmGray}
                  onMouseLeave={e => e.target.style.borderColor = C.border}
                >
                  {t.nav.approach}
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column: decorative SVG */}
          <ScrollReveal delay={300}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 360 }}>
                <path
                  d="M45,5 L55,8 L58,15 L62,20 L60,28 L55,32 L58,38 L55,45 L50,48 L52,55 L55,60 L52,68 L48,72 L45,78 L40,82 L38,78 L35,72 L32,65 L35,58 L38,52 L35,48 L32,42 L35,35 L38,28 L42,22 L40,15 L42,10 Z"
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <path
                  d="M45,35 L48,47 L52,58"
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="0.8"
                  strokeDasharray="3,2"
                  opacity="0.4"
                />
                {PORTFOLIO.map((loc, i) => (
                  <circle key={i} cx={loc.mapX} cy={loc.mapY} r="2" fill={C.gold} opacity="0.7">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                ))}
              </svg>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'subtleFloat 3s infinite',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.warmGray} strokeWidth="1.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </section>

      {/* ─── WHY LAOS (sand) ──────────────────────────────── */}
      <section id="why-laos" style={{ background: C.sand, ...sectionPadding }}>
        <div style={maxWidth}>
          <ScrollReveal>
            <p style={sectionLabel}>{t.whyLaos.label}</p>
            <h2 style={sectionHeading}>{t.whyLaos.heading}</h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }} className="lk-why-grid">
            {/* Left: insight cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {t.whyLaos.insights.map((insight, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div
                    style={{ ...cardBase, padding: 24, position: 'relative', overflow: 'hidden' }}
                    {...hoverLift}
                  >
                    <div style={{ width: '100%', height: 2, background: C.gold, position: 'absolute', top: 0, left: 0, opacity: 0.6 }} />
                    <h3 style={{
                      fontFamily: F.heading,
                      fontWeight: 600,
                      fontSize: 18,
                      color: C.charcoal,
                      margin: '0 0 8px 0',
                    }}>
                      {insight.title}
                    </h3>
                    <p style={{ ...bodyText, fontSize: 15 }}>{insight.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right: map + stats */}
            <div>
              <ScrollReveal delay={200}>
                <div style={{
                  background: C.linen,
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 24,
                }}>
                  <div style={{ maxWidth: 280, margin: '0 auto' }}>
                    <LaosMap
                      locations={PORTFOLIO}
                      activeIndex={activeMapLocation}
                      onLocationClick={setActiveMapLocation}
                    />
                  </div>
                  {activeMapLocation !== null && PORTFOLIO[activeMapLocation] && (
                    <div style={{
                      marginTop: 16,
                      padding: '12px 16px',
                      background: C.white,
                      borderRadius: 12,
                      border: `1px solid ${C.border}`,
                      animation: 'fadeIn 0.3s ease',
                    }}>
                      <span style={{
                        fontFamily: F.heading,
                        fontWeight: 600,
                        fontSize: 16,
                        color: C.charcoal,
                      }}>
                        {getLocalizedName(PORTFOLIO[activeMapLocation], language)}
                      </span>
                      <span style={{
                        fontFamily: F.body,
                        fontSize: 13,
                        color: C.warmGray,
                        marginLeft: 12,
                      }}>
                        {PORTFOLIO[activeMapLocation].hectares} ha
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Stats 2x2 */}
              <ScrollReveal delay={300}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginBottom: 24,
                }}>
                  {t.whyLaos.stats.map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                      <div style={{
                        fontFamily: F.heading,
                        fontWeight: 600,
                        fontSize: 36,
                        color: C.gold,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: F.body,
                        fontWeight: 300,
                        fontSize: 13,
                        color: C.warmGray,
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Regulatory callout */}
              <ScrollReveal delay={400}>
                <div style={{
                  background: C.linen,
                  borderLeft: `2px solid ${C.gold}`,
                  padding: '16px 20px',
                  borderRadius: '0 12px 12px 0',
                }}>
                  <p style={{
                    fontFamily: F.body,
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: C.warmGray,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {t.whyLaos.regulatoryNote}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GOLD LINE DIVIDER ────────────────────────────── */}
      <div style={{ background: C.ivory }}>
        <div style={{ maxWidth: 200, margin: '0 auto', height: 1, background: C.gold, opacity: 0.3 }} />
      </div>

      {/* ─── APPROACH (ivory) ─────────────────────────────── */}
      <section id="approach" style={{ background: C.ivory, ...sectionPadding }}>
        <div style={maxWidth}>
          <ScrollReveal>
            <p style={sectionLabel}>{t.approach.label}</p>
            <h2 style={sectionHeading}>{t.approach.heading}</h2>
          </ScrollReveal>

          {/* (a) Intro: portrait + bio */}
          <ScrollReveal delay={100}>
            <div style={{
              display: 'flex',
              gap: 32,
              alignItems: 'flex-start',
              marginBottom: 72,
              flexWrap: 'wrap',
            }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: PORTRAIT_URL ? `url(${PORTRAIT_URL}) center/cover` : C.linen,
                  border: `2px solid ${C.gold}`,
                  marginBottom: 12,
                }} />
                <p style={{
                  fontFamily: F.body,
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: C.charcoal,
                  margin: 0,
                }}>
                  {t.approach.name}
                </p>
                <p style={{
                  fontFamily: F.body,
                  fontSize: 12,
                  color: C.warmGray,
                  margin: '2px 0 0 0',
                }}>
                  {t.approach.title}
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <p style={{ ...bodyText, marginBottom: 24 }}>{t.approach.bio}</p>
                <div style={{ borderLeft: `1px solid ${C.gold}`, paddingLeft: 20, marginLeft: 4 }}>
                  <p style={{ ...bodyText, fontStyle: 'italic' }}>{t.approach.bioIndented}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* (b) Portfolio: 4 cards */}
          <ScrollReveal delay={150}>
            <h3 style={{
              fontFamily: F.heading,
              fontWeight: 600,
              fontSize: 22,
              color: C.charcoal,
              marginBottom: 24,
              marginTop: 0,
            }}>
              {t.approach.portfolioHeading}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
              marginBottom: 16,
            }}>
              {PORTFOLIO.map((p, i) => (
                <div key={i} style={{ ...cardBase, padding: 24 }} {...hoverLift}>
                  <div style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 32,
                    color: C.gold,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontFamily: F.body,
                    fontWeight: 400,
                    fontSize: 16,
                    color: C.charcoal,
                    marginBottom: 4,
                  }}>
                    {getLocalizedName(p, language)}
                  </div>
                  <div style={{
                    fontFamily: F.body,
                    fontWeight: 300,
                    fontSize: 14,
                    color: C.warmGray,
                  }}>
                    {p.hectares} ha &mdash; {p.parcels} parcels
                  </div>
                </div>
              ))}
            </div>
            {/* Summary stats row */}
            <div style={{
              borderTop: '1px solid rgba(139,105,20,0.15)',
              borderBottom: '1px solid rgba(139,105,20,0.15)',
              padding: '16px 0',
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 72,
            }}>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.warmGray }}>
                {PORTFOLIO.length} regions
              </span>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.warmGray }}>
                {PORTFOLIO.reduce((s, p) => s + (parseInt(p.parcels) || 0), 0) || 'TBD'} parcels
              </span>
            </div>
          </ScrollReveal>

          {/* (c) Milestones: vertical timeline */}
          <ScrollReveal delay={150}>
            <h3 style={{
              fontFamily: F.heading,
              fontWeight: 600,
              fontSize: 22,
              color: C.charcoal,
              marginBottom: 32,
              marginTop: 0,
            }}>
              {t.approach.milestonesHeading}
            </h3>
            <div style={{ position: 'relative', paddingLeft: 32, marginBottom: 72 }}>
              <div style={{
                position: 'absolute',
                left: 3,
                top: 4,
                bottom: 4,
                width: 1,
                background: C.border,
              }} />
              {MILESTONES.map((m, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div style={{ marginBottom: 28, position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: -32,
                      top: 5,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: C.gold,
                    }} />
                    <span style={{
                      fontFamily: F.body,
                      fontWeight: 500,
                      fontSize: 14,
                      color: C.gold,
                      display: 'block',
                      marginBottom: 4,
                    }}>
                      {m.year}
                    </span>
                    <span style={{
                      fontFamily: F.body,
                      fontWeight: 300,
                      fontSize: 15,
                      color: C.warmGray,
                      lineHeight: 1.6,
                    }}>
                      {getMilestoneText(m, language)}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* (d) Partnership structures: 3 cards */}
          <ScrollReveal delay={150}>
            <h3 style={{
              fontFamily: F.heading,
              fontWeight: 600,
              fontSize: 22,
              color: C.charcoal,
              marginBottom: 24,
              marginTop: 0,
            }}>
              {t.approach.partnershipsHeading}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 72,
            }}>
              {['jv', 'lease', 'acquisition'].map((key) => (
                <div key={key} style={{ ...cardBase, padding: 28, position: 'relative' }} {...hoverLift}>
                  <div style={{ width: 32, height: 2, background: C.gold, marginBottom: 16 }} />
                  <h4 style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 18,
                    color: C.charcoal,
                    margin: '0 0 10px 0',
                  }}>
                    {t.approach[key].title}
                  </h4>
                  <p style={{ ...bodyText, fontSize: 15 }}>{t.approach[key].text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* (e) Process: 5 connected circles */}
          <ScrollReveal delay={150}>
            <h3 style={{
              fontFamily: F.heading,
              fontWeight: 600,
              fontSize: 22,
              color: C.charcoal,
              marginBottom: 32,
              marginTop: 0,
            }}>
              {t.approach.processHeading}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 0,
              marginBottom: 72,
              flexWrap: 'wrap',
            }}>
              {t.approach.processSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `1.5px solid ${C.gold}`,
                      background: 'rgba(139,105,20,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: F.body,
                      fontWeight: 500,
                      fontSize: 14,
                      color: C.gold,
                      marginBottom: 10,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{
                      fontFamily: F.body,
                      fontWeight: 300,
                      fontSize: 12,
                      color: C.warmGray,
                      display: 'block',
                      maxWidth: 80,
                      lineHeight: 1.4,
                    }}>
                      {step}
                    </span>
                  </div>
                  {i < t.approach.processSteps.length - 1 && (
                    <div style={{
                      width: 40,
                      height: 1,
                      background: C.border,
                      marginTop: 20,
                      marginLeft: 8,
                      marginRight: 8,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* (f) Documents: 4 blurred-doc cards */}
          <ScrollReveal delay={150}>
            <h3 style={{
              fontFamily: F.heading,
              fontWeight: 600,
              fontSize: 22,
              color: C.charcoal,
              marginBottom: 12,
              marginTop: 0,
            }}>
              {t.approach.documentsHeading}
            </h3>
            <p style={{ ...bodyText, marginBottom: 24, maxWidth: 600 }}>{t.approach.documentsNote}</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}>
              {DOCUMENTS.map((doc, i) => (
                <div key={i} style={{
                  background: C.linen,
                  borderRadius: 16,
                  padding: 24,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Fake document text lines */}
                  {[72, 58, 80, 45, 65].map((w, j) => (
                    <div key={j} style={{
                      width: `${w}%`,
                      height: 3,
                      background: C.charcoal,
                      opacity: 0.05 + j * 0.008,
                      borderRadius: 2,
                      marginBottom: 8,
                    }} />
                  ))}
                  {/* Stamp circle */}
                  <div style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `1.5px solid ${C.gold}`,
                    opacity: 0.3,
                  }} />
                  <div style={{
                    fontFamily: F.body,
                    fontWeight: 500,
                    fontSize: 13,
                    color: C.gold,
                    marginTop: 16,
                  }}>
                    {language === 'lo' && doc.typeLO ? doc.typeLO : doc.type}
                  </div>
                  <div style={{
                    fontFamily: F.body,
                    fontWeight: 300,
                    fontSize: 12,
                    color: C.warmGray,
                    marginTop: 2,
                  }}>
                    {doc.region}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SOCIAL PROOF (conditional, linen band) ───────── */}
      {SHOW_SOCIAL_PROOF && (
        <section style={{
          background: C.linen,
          padding: 'clamp(48px, 6vw, 72px) 24px',
        }}>
          <div style={{
            ...maxWidth,
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 32,
          }}>
            {t.socialProof.stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 40,
                    color: C.charcoal,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: F.body,
                    fontWeight: 300,
                    fontSize: 14,
                    color: C.warmGray,
                  }}>
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── OPPORTUNITIES (DARK section) ─────────────────── */}
      <section id="opportunities" style={{ background: C.charcoal, ...sectionPadding }}>
        <div style={maxWidth}>
          <ScrollReveal>
            <p style={{ ...sectionLabel, color: C.gold }}>{t.opportunities.label}</p>
            <h2 style={{ ...sectionHeading, color: C.linen }}>{t.opportunities.heading}</h2>
            <p style={{
              fontFamily: F.body,
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(240,236,224,0.7)',
              marginBottom: 48,
              maxWidth: 600,
            }}>
              {t.opportunities.subtitle}
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {OPPORTUNITIES.map((opp) => {
              const isOpen = expandedCard === opp.id;
              return (
                <ScrollReveal key={opp.id} delay={100}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'background 0.3s',
                  }}>
                    {/* Gold top accent */}
                    <div style={{ height: 2, background: C.gold, opacity: 0.6 }} />

                    {/* Collapsed header */}
                    <div
                      onClick={() => setExpandedCard(isOpen ? null : opp.id)}
                      style={{
                        padding: '28px 32px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{
                          fontFamily: F.body,
                          fontSize: 12,
                          fontWeight: 500,
                          color: C.gold,
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                          display: 'block',
                          marginBottom: 8,
                        }}>
                          {getLocalizedText(opp.category, language)}
                        </span>
                        <h3 style={{
                          fontFamily: F.heading,
                          fontWeight: 500,
                          fontSize: 'clamp(20px, 3vw, 28px)',
                          color: C.linen,
                          margin: '0 0 8px 0',
                        }}>
                          {locationNames[opp.id] || opp.id}
                        </h3>
                        <p style={{
                          fontFamily: F.body,
                          fontSize: 14,
                          fontWeight: 300,
                          color: 'rgba(240,236,224,0.7)',
                          margin: 0,
                          lineHeight: 1.6,
                          maxWidth: 600,
                        }}>
                          {getLocalizedText(opp.summary, language)}
                        </p>
                      </div>
                      {/* + / x button */}
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginLeft: 20,
                        transition: 'transform 0.3s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" stroke={C.linen} strokeWidth="1.5" fill="none">
                          <path d="M7 1v12M1 7h12"/>
                        </svg>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <div style={{ padding: '0 32px 32px 32px' }}>
                        <p style={{
                          fontFamily: F.body,
                          fontSize: 15,
                          fontWeight: 300,
                          color: 'rgba(240,236,224,0.65)',
                          lineHeight: 1.75,
                          marginBottom: 28,
                          maxWidth: 700,
                        }}>
                          {getLocalizedText(opp.description, language)}
                        </p>

                        <p style={{
                          fontFamily: F.body,
                          fontSize: 13,
                          color: C.gold,
                          marginBottom: 24,
                        }}>
                          {getLocalizedText(opp.size, language)}
                        </p>

                        {/* Concept cards */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                          gap: 16,
                          marginBottom: 24,
                        }}>
                          {opp.concepts.map((concept, ci) => (
                            <div key={ci} style={{
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: 12,
                              padding: 20,
                              border: '1px solid rgba(255,255,255,0.05)',
                            }}>
                              <div style={{ marginBottom: 12 }}>
                                {conceptIcons[concept.icon] || null}
                              </div>
                              <h4 style={{
                                fontFamily: F.heading,
                                fontWeight: 500,
                                fontSize: 16,
                                color: C.linen,
                                margin: '0 0 8px 0',
                              }}>
                                {getLocalizedText(concept.title, language)}
                              </h4>
                              <p style={{
                                fontFamily: F.body,
                                fontWeight: 300,
                                fontSize: 14,
                                color: 'rgba(240,236,224,0.6)',
                                lineHeight: 1.65,
                                margin: 0,
                              }}>
                                {getLocalizedText(concept.text, language)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Advantage pills */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                          {getLocalizedArray(opp.advantages, language).map((adv, ai) => (
                            <span key={ai} style={{
                              fontFamily: F.body,
                              fontSize: 12,
                              fontWeight: 500,
                              color: C.gold,
                              background: 'rgba(139,105,20,0.15)',
                              borderRadius: 999,
                              padding: '6px 14px',
                            }}>
                              {adv}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <button
                          onClick={(e) => { e.stopPropagation(); scrollTo('contact'); }}
                          style={{
                            fontFamily: F.body,
                            fontSize: 14,
                            fontWeight: 500,
                            background: C.gold,
                            color: C.charcoal,
                            border: 'none',
                            borderRadius: 999,
                            padding: '12px 28px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.target.style.background = C.goldHover}
                          onMouseLeave={e => e.target.style.background = C.gold}
                        >
                          {t.opportunities.requestBriefing}
                        </button>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT (sand) ───────────────────────────────── */}
      <section id="contact" style={{ background: C.sand, ...sectionPadding }}>
        <div style={maxWidth}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: CONTACT_PORTRAIT_URL ? `url(${CONTACT_PORTRAIT_URL}) center/cover` : C.linen,
                border: `2px solid ${C.gold}`,
                margin: '0 auto 20px auto',
              }} />
              <h2 style={{ ...sectionHeading, textAlign: 'center' }}>{t.contact.heading}</h2>
              <p style={{ ...bodyText, maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
                {t.contact.message}
              </p>
            </div>
          </ScrollReveal>

          {/* 3 contact cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 32,
          }}>
            {/* WhatsApp */}
            <ScrollReveal delay={100}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsapp.prefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ ...cardBase, padding: 28, background: 'rgba(37,211,102,0.03)' }} {...hoverLift}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" style={{ marginBottom: 12 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <h3 style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 18,
                    color: C.charcoal,
                    margin: '0 0 6px 0',
                  }}>
                    {t.contact.whatsapp.title}
                  </h3>
                  <p style={{ ...bodyText, fontSize: 14 }}>{t.contact.whatsapp.text}</p>
                </div>
              </a>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={200}>
              <a href={`mailto:${EMAIL_ADDRESS}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ ...cardBase, padding: 28 }} {...hoverLift}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth="1.5" style={{ marginBottom: 12 }}>
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-10 7L2 7"/>
                  </svg>
                  <h3 style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 18,
                    color: C.charcoal,
                    margin: '0 0 6px 0',
                  }}>
                    {t.contact.email.title}
                  </h3>
                  <p style={{ ...bodyText, fontSize: 14 }}>{t.contact.email.text}</p>
                </div>
              </a>
            </ScrollReveal>

            {/* Schedule */}
            <ScrollReveal delay={300}>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ ...cardBase, padding: 28 }} {...hoverLift}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth="1.5" style={{ marginBottom: 12 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                    <circle cx="12" cy="16" r="1" fill={C.charcoal}/>
                  </svg>
                  <h3 style={{
                    fontFamily: F.heading,
                    fontWeight: 600,
                    fontSize: 18,
                    color: C.charcoal,
                    margin: '0 0 6px 0',
                  }}>
                    {t.contact.schedule.title}
                  </h3>
                  <p style={{ ...bodyText, fontSize: 14 }}>{t.contact.schedule.text}</p>
                </div>
              </a>
            </ScrollReveal>
          </div>

          {/* Platform chips + lang note */}
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              {Object.values(t.contact.platforms).map((p, i) => (
                <span key={i} style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 400,
                  color: C.warmGray,
                  background: C.linen,
                  borderRadius: 999,
                  padding: '6px 14px',
                }}>
                  {p}
                </span>
              ))}
            </div>
            <p style={{ ...bodyText, fontSize: 13, textAlign: 'center', marginBottom: 48 }}>
              {t.contact.langNote}
            </p>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={200}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              style={{ maxWidth: 520, margin: '0 auto' }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="lang" value={language} />

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.charcoal,
                  display: 'block',
                  marginBottom: 6,
                }}>
                  {t.contact.formName}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  style={{
                    width: '100%',
                    fontFamily: F.body,
                    fontSize: 15,
                    padding: '12px 16px',
                    background: C.ivory,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.charcoal,
                  display: 'block',
                  marginBottom: 6,
                }}>
                  {t.contact.formChannel}
                </label>
                <select
                  name="channel"
                  value={formData.channel}
                  onChange={e => setFormData(f => ({ ...f, channel: e.target.value }))}
                  style={{
                    width: '100%',
                    fontFamily: F.body,
                    fontSize: 15,
                    padding: '12px 16px',
                    background: C.ivory,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.border}
                >
                  <option value="">&mdash;</option>
                  {Object.entries(t.contact.platforms).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.charcoal,
                  display: 'block',
                  marginBottom: 6,
                }}>
                  {t.contact.formMessage}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                  style={{
                    width: '100%',
                    fontFamily: F.body,
                    fontSize: 15,
                    padding: '12px 16px',
                    background: C.ivory,
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  fontFamily: F.body,
                  fontSize: 15,
                  fontWeight: 500,
                  background: C.charcoal,
                  color: C.ivory,
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 24px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = '#3d3832'}
                onMouseLeave={e => e.target.style.background = C.charcoal}
              >
                {t.contact.formSubmit}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER (dark) ────────────────────────────────── */}
      <footer style={{
        background: C.charcoal,
        borderTop: '1px solid rgba(139,105,20,0.2)',
        padding: '48px 24px',
      }}>
        <div style={{
          ...maxWidth,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <span style={{
              fontFamily: F.heading,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 20,
              color: C.gold,
              letterSpacing: 2,
            }}>
              LK
            </span>
            <p style={{
              fontFamily: F.body,
              fontSize: 13,
              color: C.warmGray,
              margin: '8px 0 0 0',
            }}>
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
          <a
            href="#"
            style={{
              fontFamily: F.body,
              fontSize: 13,
              color: C.gold,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = C.goldHover}
            onMouseLeave={e => e.target.style.color = C.gold}
          >
            {t.footer.investorGuide}
          </a>
        </div>
      </footer>

      {/* ─── GLOBAL STYLES ────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Outfit:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes subtleFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Desktop nav visible, hamburger hidden */
        .lk-nav-desktop { display: flex !important; }
        .lk-nav-cta { display: inline-flex !important; }
        .lk-nav-hamburger { display: none !important; }

        @media (max-width: 768px) {
          .lk-nav-desktop { display: none !important; }
          .lk-nav-cta { display: none !important; }
          .lk-nav-hamburger { display: flex !important; }

          .lk-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .lk-why-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
        }

        ::selection {
          background: rgba(139,105,20,0.15);
          color: #2C2824;
        }
      `}</style>
    </div>
  );
}
