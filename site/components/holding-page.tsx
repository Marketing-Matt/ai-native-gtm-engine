"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { PreviewAudio } from "./PreviewAudio";

type StepId = "t1" | "t2" | "t3" | "t4" | "t5";
type LineId = "l2" | "l3" | "l4" | "l5";

type Step = {
  id: StepId;
  line?: LineId;
  text: string;
  delay: number;
};

const SEQUENCES: Step[][] = [
  [
    { id: "t1", text: "initialising gtmstack.ai...", delay: 0 },
    { id: "t2", line: "l2", text: "Loading skills library...", delay: 800 },
    { id: "t3", line: "l3", text: "✓ 8 functions mapped", delay: 1600 },
    { id: "t4", line: "l4", text: "✓ Brand system committed", delay: 2200 },
    {
      id: "t5",
      line: "l5",
      text: "Launching soon. Follow the build.",
      delay: 3000,
    },
  ],
  [
    { id: "t1", text: 'skill build --function="demand-gen"', delay: 0 },
    { id: "t2", line: "l2", text: "Running: segment-audience.md", delay: 900 },
    { id: "t3", line: "l3", text: "✓ 3 segments generated", delay: 1800 },
    { id: "t4", line: "l4", text: "✓ Time saved: 78% vs manual", delay: 2500 },
    {
      id: "t5",
      line: "l5",
      text: "Skill graded ⭐⭐⭐ · v1.0 committed",
      delay: 3200,
    },
  ],
  [
    { id: "t1", text: 'agent deploy --role="head-of-demand-gen"', delay: 0 },
    { id: "t2", line: "l2", text: "Loading 4 connected skills...", delay: 800 },
    { id: "t3", line: "l3", text: "✓ Audience segmented", delay: 1600 },
    { id: "t4", line: "l4", text: "✓ Campaign briefs generated", delay: 2400 },
    {
      id: "t5",
      line: "l5",
      text: "Agent running. Zero manual effort.",
      delay: 3200,
    },
  ],
];

type TermState = {
  t1: string;
  t2: string;
  t3: string;
  t4: string;
  t5: string;
  l2: boolean;
  l3: boolean;
  l4: boolean;
  l5: boolean;
};

const INITIAL_TERM: TermState = {
  t1: "",
  t2: "",
  t3: "",
  t4: "",
  t5: "",
  l2: false,
  l3: false,
  l4: false,
  l5: false,
};

export default function HoldingPage() {
  const [term, setTerm] = useState<TermState>(INITIAL_TERM);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const beehiivRef = useRef<HTMLDivElement>(null);

  // Track viewport breakpoints
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset host page <html>/<body> styles + smooth scroll
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const body = document.body;
    const html = document.documentElement;
    const orig = {
      bodyMargin: body.style.margin,
      bodyBackground: body.style.background,
      bodyOverflowX: body.style.overflowX,
      bodyScrollBehavior: body.style.scrollBehavior,
      htmlMargin: html.style.margin,
      htmlBackground: html.style.background,
      htmlOverflowX: html.style.overflowX,
      htmlScrollBehavior: html.style.scrollBehavior,
    };

    body.style.margin = "0";
    body.style.background = "#0A0A0A";
    body.style.overflowX = "hidden";
    body.style.scrollBehavior = "smooth";
    html.style.margin = "0";
    html.style.background = "#0A0A0A";
    html.style.overflowX = "hidden";
    html.style.scrollBehavior = "smooth";

    return () => {
      body.style.margin = orig.bodyMargin;
      body.style.background = orig.bodyBackground;
      body.style.overflowX = orig.bodyOverflowX;
      body.style.scrollBehavior = orig.bodyScrollBehavior;
      html.style.margin = orig.htmlMargin;
      html.style.background = orig.htmlBackground;
      html.style.overflowX = orig.htmlOverflowX;
      html.style.scrollBehavior = orig.htmlScrollBehavior;
    };
  }, []);

  // Inject Beehiiv subscribe-form loader into the form container
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = beehiivRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.setAttribute(
      "data-beehiiv-form",
      "944ac19b-c53a-4ab7-af70-fb3f8fab7ffe",
    );
    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  // Terminal typewriter — loops through SEQUENCES every 6s
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const typeText = (id: StepId, text: string) => {
      let chars = 0;
      const iv = setInterval(() => {
        if (cancelled) {
          clearInterval(iv);
          return;
        }
        chars++;
        setTerm((prev) => ({ ...prev, [id]: text.slice(0, chars) }));
        if (chars >= text.length) clearInterval(iv);
      }, 28);
      intervals.push(iv);
    };

    const runSequence = (index: number) => {
      if (cancelled) return;
      const seq = SEQUENCES[index % SEQUENCES.length];
      setTerm(INITIAL_TERM);

      seq.forEach((step) => {
        const t = setTimeout(() => {
          if (cancelled) return;
          if (step.line) {
            const lineKey = step.line;
            setTerm((prev) => ({ ...prev, [lineKey]: true }));
          }
          typeText(step.id, step.text);
        }, step.delay);
        timeouts.push(t);
      });

      const next = setTimeout(() => runSequence(index + 1), 6000);
      timeouts.push(next);
    };

    runSequence(0);

    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
      intervals.forEach((i) => clearInterval(i));
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div
        className="gtm-root"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          minHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          margin: 0,
          padding: 0,
          background: "#0A0A0A",
        }}
      >
        <div className="page">
          {/* NAV */}
          <nav style={{ padding: isMobile ? "16px 20px" : "20px 48px" }}>
            <a href="#" className="nav-logo">
              <span className="nav-mark">
                &gt;<span className="gtm-cursor">_</span>
              </span>
              <div className="nav-pipe"></div>
              <div className="nav-wordmark">
                <span className="g">gtm</span>
                <span className="s">stack</span>
                <span className="t">.ai</span>
              </div>
            </a>
            {!isMobile && (
              <div className="nav-status">
                <div className="status-dot"></div>
                Building in public
              </div>
            )}
            <a
              href="https://github.com/Marketing-Matt/gtmstack"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github"
              style={
                isMobile
                  ? { padding: "6px 10px", fontSize: "10px" }
                  : undefined
              }
            >
              &gt;_ View on GitHub
            </a>
          </nav>

          {/* HERO */}
          <section
            className="hero"
            style={{ padding: isMobile ? "48px 24px" : "80px 48px" }}
          >
            <div className="hero-eyebrow">Coming soon</div>

            <h1 className="hero-headline">
              <span className="hash">#</span>Unfiltered AI<br />
              <span className="line2">marketing.</span>
            </h1>

            <p className="hero-sub">
              A learning-in-public skills platform for B2B marketing leaders.
              Every skill, every agent, every workflow built live — using
              Claude. No theory. No waiting for IT.
            </p>

            {/* TERMINAL */}
            <div className="terminal" style={{ width: "min(560px, 100%)" }}>
              <div className="term-bar">
                <div
                  className="term-dot"
                  style={{ background: "#FF5F57" }}
                ></div>
                <div
                  className="term-dot"
                  style={{ background: "#FEBC2E" }}
                ></div>
                <div
                  className="term-dot"
                  style={{ background: "#28C840" }}
                ></div>
                <div className="term-title">gtmstack.ai — build log</div>
              </div>
              <div className="term-body">
                <div className="term-line">
                  <span className="term-prompt">&gt;_</span>
                  <span className="term-cmd">{term.t1}</span>
                </div>
                <div
                  className="term-line"
                  style={{ display: term.l2 ? "flex" : "none" }}
                >
                  <span
                    className="term-prompt"
                    style={{ color: "var(--lime)", opacity: 0.5 }}
                  >
                    ··
                  </span>
                  <span className="term-out">{term.t2}</span>
                </div>
                <div
                  className="term-line"
                  style={{ display: term.l3 ? "flex" : "none" }}
                >
                  <span
                    className="term-prompt"
                    style={{ color: "var(--lime)", opacity: 0.5 }}
                  >
                    ··
                  </span>
                  <span className="term-out success">{term.t3}</span>
                </div>
                <div
                  className="term-line"
                  style={{ display: term.l4 ? "flex" : "none" }}
                >
                  <span
                    className="term-prompt"
                    style={{ color: "var(--lime)", opacity: 0.5 }}
                  >
                    ··
                  </span>
                  <span className="term-out success">{term.t4}</span>
                </div>
                <div
                  className="term-line"
                  style={{ display: term.l5 ? "flex" : "none" }}
                >
                  <span className="term-prompt">&gt;_</span>
                  <span className="term-out dim">{term.t5}</span>
                </div>
              </div>
            </div>

            {/* SIGNUP — Beehiiv embed */}
            <div
              className="signup-wrap"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: isMobile ? "100%" : "480px",
                margin: "0 auto",
              }}
            >
              <div className="signup-label" style={{ width: "100%" }}>
                <span className="hash">#</span> Get notified when we launch
              </div>
              <div
                ref={beehiivRef}
                data-beehiiv-form="944ac19b-c53a-4ab7-af70-fb3f8fab7ffe"
                style={{ width: "100%", minHeight: "60px" }}
              />
            </div>
          </section>

          {/* BUILD LOG #001 — PRE-LAUNCH PREVIEW */}
          <section style={{ borderTop: "1px solid var(--grey)" }}>
            <div
              className="build-log-preview"
              style={{
                padding: isMobile ? "48px 24px" : "80px 48px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                maxWidth: 860,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--lime)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                &gt;_ build log #001 — live preview
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  fontSize: isMobile ? 28 : 36,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                  color: "var(--white)",
                }}
              >
                <span style={{ color: "var(--lime)" }}>#</span> The system that
                built itself
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "var(--muted)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxWidth: 620,
                }}
              >
                Six hours of building gtmstack.ai&rsquo;s session system,
                captured live. Two skills, an interactive workflow diagram,
                eight layers, three personas, one trigger word. Listen to the
                build summary and explore the diagram.
              </p>
              <PreviewAudio
                src="/audio/session-001-build-summary.mp3"
                label=">_ build log #001 / audio summary"
                title="Listen — how the session system was built, in 2 minutes"
                note="narration: matt browning · synthesised via elevenlabs"
              />
              <a
                href="/preview/workflow-map"
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--white)",
                  border: "1px solid var(--grey)",
                  padding: "10px 16px 9px",
                  borderRadius: 4,
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "border-color 140ms ease-out, color 140ms ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--lime)";
                  e.currentTarget.style.color = "var(--lime)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--grey)";
                  e.currentTarget.style.color = "var(--white)";
                }}
              >
                [ view the interactive workflow diagram &rarr; ]
              </a>
            </div>
          </section>

          {/* WHAT'S COMING */}
          <section style={{ borderTop: "1px solid var(--grey)" }}>
            <div
              className="coming"
              style={{ padding: isMobile ? "48px 24px" : "80px 48px" }}
            >
              <div className="coming-label">What's being built</div>
              <div
                className="coming-grid"
                style={{
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : isTablet
                      ? "repeat(2, 1fr)"
                      : "repeat(3, 1fr)",
                }}
              >
                <div className="coming-item">
                  <div className="coming-num">01</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Skills marketplace
                  </div>
                  <div className="coming-desc">
                    Reusable AI marketing skills organised by function. Built
                    live, graded honestly, free to use. Demand gen, content,
                    RevOps, PMM, ABM, brand, digital, ops.
                  </div>
                  <div className="coming-tag live">✓ In build</div>
                </div>
                <div className="coming-item">
                  <div className="coming-num">02</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Marketing agents
                  </div>
                  <div className="coming-desc">
                    Skills combined into end-to-end agents. Marketing admin and
                    operations that run automatically — triggered, executed,
                    logged. Zero manual effort.
                  </div>
                  <div className="coming-tag">Coming v0.3</div>
                </div>
                <div className="coming-item">
                  <div className="coming-num">03</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Build log
                  </div>
                  <div className="coming-desc">
                    Every skill timed, graded, and debriefed. The honest record
                    of building an AI-native marketing capability from scratch.
                    Mistakes included.
                  </div>
                  <div className="coming-tag live">✓ Live on GitHub</div>
                </div>
                <div className="coming-item">
                  <div className="coming-num">04</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Role automation
                  </div>
                  <div className="coming-desc">
                    Find skills built for your specific function. CMO, Head of
                    Demand Gen, Content Lead, RevOps, Marketing Ops — each role
                    gets its own automation path.
                  </div>
                  <div className="coming-tag">Coming v0.2</div>
                </div>
                <div className="coming-item">
                  <div className="coming-num">05</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Data layer
                  </div>
                  <div className="coming-desc">
                    A credible data model underneath everything. Schema
                    contracts, quality controls, lineage tracking. Built to a
                    standard you could show a CMO or a CTO.
                  </div>
                  <div className="coming-tag">Coming v0.4</div>
                </div>
                <div className="coming-item">
                  <div className="coming-num">06</div>
                  <div className="coming-title">
                    <span className="mark">#</span> Audio + video
                  </div>
                  <div className="coming-desc">
                    Every skill documented in text, audio, and video. Built with
                    ElevenLabs and Claude. The full build — in public, in every
                    format.
                  </div>
                  <div className="coming-tag">Coming v0.3</div>
                </div>
              </div>
            </div>
          </section>

          {/* GITHUB STRIP */}
          <section style={{ borderTop: "1px solid var(--grey)" }}>
            <div
              className="github-strip"
              style={{
                padding: isMobile ? "48px 24px" : "80px 48px",
                flexDirection: isMobile ? "column" : "row",
                gap: "32px",
              }}
            >
              <div className="github-left">
                <div className="github-headline">
                  <span className="hash"># </span>The build is public.
                </div>
                <div className="github-desc">
                  Every skill, every decision, every architectural choice is
                  committed to GitHub. The repo is the product. Browse it now —
                  the brand system, skill template, and engine architecture are
                  already there.
                </div>
                <a
                  href="https://github.com/Marketing-Matt/gtmstack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-cta"
                  style={{
                    marginTop: "20px",
                    display: "inline-flex",
                  }}
                >
                  &gt;_ Explore the repo →
                </a>
              </div>
              <div className="github-tree">
                <a
                  href="https://github.com/Marketing-Matt/gtmstack/tree/main/brand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tree-row"
                >
                  <span className="tree-icon">📁</span>
                  <span className="tree-name">brand/</span>
                  <span className="tree-meta">tokens · style-guide · voice</span>
                </a>
                <a
                  href="https://github.com/Marketing-Matt/gtmstack/tree/main/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tree-row"
                >
                  <span className="tree-icon">📁</span>
                  <span className="tree-name">skills/</span>
                  <span className="tree-meta">_template · 8 functions</span>
                </a>
                <a
                  href="https://github.com/Marketing-Matt/gtmstack/tree/main/engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tree-row"
                >
                  <span className="tree-icon">📁</span>
                  <span className="tree-name">engine/</span>
                  <span className="tree-meta">
                    architecture · strategy · workflows
                  </span>
                </a>
                <a
                  href="https://github.com/Marketing-Matt/gtmstack/tree/main/content/build-log"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tree-row"
                >
                  <span className="tree-icon">📄</span>
                  <span className="tree-name">
                    content/build-log/tracker.md
                  </span>
                  <span className="tree-meta">live</span>
                </a>
                <a
                  href="https://github.com/Marketing-Matt/gtmstack/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tree-row"
                >
                  <span className="tree-icon">📄</span>
                  <span className="tree-name">README.md</span>
                  <span className="tree-meta">start here</span>
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer>
            <div
              className="footer-inner"
              style={{
                flexDirection: isMobile ? "column" : "row",
                textAlign: isMobile ? "center" : undefined,
                gap: isMobile ? "16px" : "24px",
              }}
            >
              <div className="footer-brand">
                <span className="mark">
                  &gt;<span className="gtm-cursor">_</span>
                </span>
                Matt Browning · gtmstack.ai · 2026
              </div>
              <div className="footer-links">
                <a
                  href="https://github.com/Marketing-Matt/gtmstack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &gt;_ GitHub
                </a>
                <a
                  href="https://linkedin.com/in/mattbrowning"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  _LinkedIn
                </a>
                <a href="mailto:matt@gtmstack.ai">_Contact</a>
              </div>
              <div className="footer-tagline">
                <span>#</span> Unfiltered AI marketing. Built live.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

const CSS = `
.gtm-root {
  --lime:    #A6FF00;
  --lime-dk: #2D4A00;
  --black:   #0A0A0A;
  --ink:     #141414;
  --zinc:    #1E1E1E;
  --grey:    #333333;
  --mid:     #555555;
  --muted:   #777777;
  --white:   #F5F5F5;
  --mono:    var(--font-plex-mono), 'IBM Plex Mono', monospace;
  --sans:    var(--font-inter), 'Inter', sans-serif;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--black);
  color: var(--white);
  font-family: var(--mono);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.gtm-root *,
.gtm-root *::before,
.gtm-root *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* GRID BACKGROUND */
.gtm-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(166,255,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(166,255,0,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* SCAN LINE */
.gtm-root::after {
  content: '';
  position: fixed;
  top: -100%;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(transparent, rgba(166,255,0,0.015), transparent);
  animation: gtm-scan 8s linear infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes gtm-scan {
  0%   { top: -200px; }
  100% { top: 100vh; }
}

/* LAYOUT */
.gtm-root .page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* NAV */
.gtm-root nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  border-bottom: 1px solid var(--grey);
  background: rgba(10,10,10,0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.gtm-root .nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.gtm-root .nav-mark {
  font-size: 20px;
  font-weight: 700;
  color: #A6FF00;
  letter-spacing: 1px;
  font-family: var(--mono);
}

/* Brand cursor — the underscore in the >_ prompt mark blinks continuously.
   1Hz steps animation, never fades. See brand/style-guide.md. */
@keyframes gtm-cursor-blink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.gtm-root .gtm-cursor {
  animation: gtm-cursor-blink 1s steps(1) infinite;
}
.gtm-root .nav-pipe { width:1px; height:20px; background:var(--grey); }
.gtm-root .nav-wordmark {
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 700;
  letter-spacing: -0.3px;
}
.gtm-root .nav-wordmark .g { color: var(--white); }
.gtm-root .nav-wordmark .s { color: var(--lime); }
.gtm-root .nav-wordmark .t { color: var(--mid); font-size: 13px; font-weight: 500; }

.gtm-root .nav-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.12em;
}
.gtm-root .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  animation: gtm-pulse 2s ease-in-out infinite;
}
@keyframes gtm-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(0.8); }
}
.gtm-root .nav-github {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted);
  text-decoration: none;
  padding: 6px 14px;
  border: 1px solid var(--grey);
  transition: all 0.2s;
  letter-spacing: 0.05em;
}
.gtm-root .nav-github:hover {
  border-color: var(--lime);
  color: var(--lime);
}

/* HERO */
.gtm-root .hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 48px;
  min-height: calc(100vh - 73px);
  position: relative;
}

.gtm-root .hero-eyebrow {
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--lime);
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: gtm-fadeUp 0.6s ease forwards 0.2s;
}
.gtm-root .hero-eyebrow::before,
.gtm-root .hero-eyebrow::after {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background: var(--lime);
  opacity: 0.4;
}

.gtm-root .hero-headline {
  font-size: clamp(36px, 8vw, 88px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -3px;
  margin-bottom: 8px;
  opacity: 0;
  animation: gtm-fadeUp 0.6s ease forwards 0.4s;
}
.gtm-root .hero-headline .hash {
  color: var(--lime);
  margin-right: 8px;
}
.gtm-root .hero-headline .line2 {
  color: var(--lime);
  display: block;
}

.gtm-root .hero-sub {
  font-size: clamp(14px, 2vw, 16px);
  color: var(--muted);
  font-family: var(--sans);
  font-weight: 400;
  max-width: 520px;
  line-height: 1.7;
  margin: 28px auto 48px;
  opacity: 0;
  animation: gtm-fadeUp 0.6s ease forwards 0.6s;
}

@keyframes gtm-fadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}

/* TERMINAL TEASER */
.gtm-root .terminal {
  width: 100%;
  max-width: 560px;
  background: var(--ink);
  border: 1px solid var(--grey);
  margin: 0 auto 48px;
  opacity: 0;
  animation: gtm-fadeUp 0.6s ease forwards 0.7s;
}
.gtm-root .term-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--zinc);
  border-bottom: 1px solid var(--grey);
}
.gtm-root .term-dot { width:10px; height:10px; border-radius:50%; }
.gtm-root .term-title {
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.12em;
  margin-left: 8px;
}
.gtm-root .term-body {
  height: 160px;
  padding: 14px 20px;
  text-align: left;
  font-size: 12px;
  line-height: 1.9;
  overflow: hidden;
  box-sizing: border-box;
}
.gtm-root .term-line { display: flex; align-items: flex-start; gap: 8px; min-height: 24px; }
.gtm-root .term-prompt { color: var(--lime); font-weight: 700; flex-shrink: 0; }
.gtm-root .term-cmd { color: var(--white); }
.gtm-root .term-out { color: var(--muted); }
.gtm-root .term-out.success { color: var(--lime); }
.gtm-root .term-out.dim { color: var(--mid); font-style: italic; }
.gtm-root .typed { border-right: 2px solid var(--lime); }

/* SIGNUP FORM */
.gtm-root .signup-wrap {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  opacity: 0;
  animation: gtm-fadeUp 0.6s ease forwards 0.9s;
}
.gtm-root .signup-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 12px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}
.gtm-root .signup-label .hash { color: var(--lime); }

/* WHAT'S COMING */
.gtm-root .coming {
  padding: 80px 48px;
  border-top: 1px solid var(--grey);
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}
.gtm-root .coming-label {
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.gtm-root .coming-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--grey);
}
.gtm-root .coming-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--grey);
  border: 1px solid var(--grey);
}
.gtm-root .coming-item {
  background: var(--black);
  padding: 28px 26px;
  transition: background 0.2s;
}
.gtm-root .coming-item:hover { background: var(--ink); }
.gtm-root .coming-num {
  font-size: 9px;
  color: var(--lime);
  opacity: 0.6;
  letter-spacing: 0.2em;
  margin-bottom: 14px;
}
.gtm-root .coming-title {
  font-size: clamp(13px, 2vw, 14px);
  font-weight: 700;
  color: var(--white);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.gtm-root .coming-title .mark { color: var(--lime); }
.gtm-root .coming-desc {
  font-size: clamp(13px, 1.8vw, 15px);
  color: var(--muted);
  font-family: var(--sans);
  line-height: 1.7;
}
.gtm-root .coming-tag {
  display: inline-block;
  font-size: 8px;
  padding: 2px 8px;
  border: 1px solid var(--grey);
  color: var(--mid);
  margin-top: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.gtm-root .coming-tag.live {
  border-color: rgba(166,255,0,0.4);
  color: var(--lime);
  background: var(--lime-dk);
}

/* GITHUB STRIP */
.gtm-root .github-strip {
  padding: 48px;
  border-top: 1px solid var(--grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  gap: 32px;
}
.gtm-root .github-left { flex: 1; }
.gtm-root .github-headline {
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 700;
  margin-bottom: 8px;
}
.gtm-root .github-headline .hash { color: var(--lime); }
.gtm-root .github-desc {
  font-size: clamp(13px, 1.8vw, 15px);
  color: var(--muted);
  font-family: var(--sans);
  line-height: 1.7;
  max-width: 420px;
}
.gtm-root .github-tree {
  flex: 1;
  background: var(--ink);
  border: 1px solid var(--grey);
  padding: 16px 18px;
  font-size: 11px;
  line-height: 2;
}
.gtm-root .tree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.15s;
  padding: 1px 0;
}
.gtm-root .tree-row:hover { color: var(--lime); }
.gtm-root .tree-icon { color: var(--lime); opacity: 0.7; font-size: 10px; }
.gtm-root .tree-name { flex: 1; }
.gtm-root .tree-meta { font-size: 9px; color: var(--mid); }
.gtm-root .github-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: 2px solid #A6FF00;
  background: #A6FF00;
  color: #0A0A0A;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s;
  flex-shrink: 0;
  letter-spacing: 0.05em;
  align-self: flex-start;
  box-shadow: 0 0 20px rgba(166,255,0,0.3);
}
.gtm-root .github-cta:hover {
  background: #bfff33;
  border-color: #bfff33;
  box-shadow: 0 0 28px rgba(166,255,0,0.5);
}

/* FOOTER */
.gtm-root footer {
  border-top: 1px solid var(--grey);
  padding: 32px 48px;
}
.gtm-root .footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.gtm-root .footer-brand {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 10px;
}
.gtm-root .footer-brand .mark { color: var(--lime); }
.gtm-root .footer-links {
  display: flex;
  gap: 24px;
}
.gtm-root .footer-links a {
  font-size: 10px;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: color 0.15s;
}
.gtm-root .footer-links a:hover { color: var(--lime); }
.gtm-root .footer-tagline {
  font-size: 10px;
  color: var(--mid);
  letter-spacing: 0.05em;
}
.gtm-root .footer-tagline span { color: var(--lime); }

/* MOBILE */
@media (max-width: 768px) {
  .gtm-root nav { padding: 16px 20px; }
  .gtm-root .nav-status { display: none; }
  .gtm-root .nav-github { padding: 6px 10px; font-size: 10px; }
  .gtm-root .hero { padding: 48px 24px; }
  .gtm-root .hero-headline { letter-spacing: -1.5px; }
  .gtm-root .coming { padding: 48px 24px; }
  .gtm-root .coming-grid { grid-template-columns: 1fr; }
  .gtm-root .github-strip {
    flex-direction: column;
    padding: 48px 24px;
    gap: 32px;
  }
  .gtm-root .github-cta { align-self: stretch; justify-content: center; }
  .gtm-root .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
  .gtm-root .footer-links { flex-wrap: wrap; justify-content: center; }
}

/* TABLET */
@media (min-width: 768px) and (max-width: 1023px) {
  .gtm-root .coming-grid { grid-template-columns: repeat(2, 1fr); }
}
`;
