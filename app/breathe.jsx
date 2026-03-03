"use client";
import { useState, useEffect, useRef } from "react";

const PHASES = [
  { label: "breathe in", duration: 4000 },
  { label: "hold", duration: 4000 },
  { label: "breathe out", duration: 6000 },
  { label: "rest", duration: 2000 },
];

const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0);

const AFFIRMATIONS = [
  "You've already done the hard part.",
  "The preparation doesn't disappear.",
  "This moment is yours. Take it.",
  "You've built harder things than this.",
  "Slow down. You've earned it.",
  "The weight isn't yours to carry all at once.",
  "One breath at a time.",
  "You're further ahead than it feels.",
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function getScale(elapsed) {
  let acc = 0;
  for (let i = 0; i < PHASES.length; i++) {
    const p = PHASES[i];
    if (elapsed < acc + p.duration) {
      const t = (elapsed - acc) / p.duration;
      const smooth = easeInOut(t);
      if (p.label === "breathe in") return 0.6 + 0.4 * smooth;
      if (p.label === "hold") return 1.0;
      if (p.label === "breathe out") return 1.0 - 0.4 * smooth;
      return 0.6;
    }
    acc += p.duration;
  }
  return 0.6;
}

function getPhaseIndex(elapsed) {
  let acc = 0;
  for (let i = 0; i < PHASES.length; i++) {
    if (elapsed < acc + PHASES[i].duration) return i;
    acc += PHASES[i].duration;
  }
  return 0;
}

export default function Breathe() {
  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [affirmation, setAffirmation] = useState("");
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const circleRef = useRef(null);
  const glowRef = useRef(null);
  const startTime = useRef(0);
  const rafRef = useRef(null);
  const cycleCount = useRef(0);
  const lastPhase = useRef(-1);

  useEffect(() => {
    if (!started) return;
    setFadeIn(true);
    startTime.current = performance.now();

    const tick = (now) => {
      const totalElapsed = now - startTime.current;
      const elapsed = totalElapsed % TOTAL;

      const newCycles = Math.floor(totalElapsed / TOTAL);
      if (newCycles > cycleCount.current) {
        cycleCount.current = newCycles;
        setCycles(newCycles);
      }

      const idx = getPhaseIndex(elapsed);
      if (idx !== lastPhase.current) {
        lastPhase.current = idx;
        setPhaseIndex(idx);
      }

      const scale = getScale(elapsed);
      const norm = Math.max(0, Math.min(1, (scale - 0.6) / 0.4));

      if (circleRef.current) {
        circleRef.current.style.transform = `scale(${scale})`;
        circleRef.current.style.boxShadow = `0 0 ${50 * scale}px rgba(100, 149, 237, ${0.08 + 0.12 * norm})`;
        circleRef.current.style.borderColor = `rgba(100, 149, 237, ${0.15 + 0.35 * norm})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `scale(${scale})`;
        glowRef.current.style.opacity = `${0.3 + 0.5 * norm}`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started]);

  useEffect(() => {
    if (cycles > 0 && cycles % 2 === 0) {
      const idx = Math.floor(Math.random() * AFFIRMATIONS.length);
      setAffirmation(AFFIRMATIONS[idx]);
      setShowAffirmation(true);
      const t = setTimeout(() => setShowAffirmation(false), 4000);
      return () => clearTimeout(t);
    }
  }, [cycles]);

  const phase = PHASES[phaseIndex];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#c8d6e5",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              borderRadius: "50%",
              background: "rgba(200, 214, 229, 0.15)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float${i % 3} ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -10}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.5; }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(20px) translateX(-15px); opacity: 0.4; }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(-20px) translateX(-10px); opacity: 0.35; }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(12px); }
          15% { opacity: 1; transform: translateY(0); }
          75% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <a
        href="http://briancreyes.com/?tab"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          bottom: 16,
          right: 20,
          fontSize: 11,
          color: "rgba(87, 101, 116, 1.0)",
          textDecoration: "none",
          letterSpacing: 1,
          zIndex: 10,
        }}
        onMouseEnter={(e) => { e.target.style.color = "rgba(131, 149, 167, 1.0)"; }}
        onMouseLeave={(e) => { e.target.style.color = "rgba(87, 101, 116, 1.0)"; }}
      >
        by bcr.co
      </a>

      {!started ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            animation: "gentlePulse 3s ease-in-out infinite",
          }}
        >
          <div style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: "#8395a7" }}>
            a moment for you
          </div>
          <button
            onClick={() => setStarted(true)}
            style={{
              background: "none",
              border: "1px solid rgba(200, 214, 229, 0.25)",
              color: "#c8d6e5",
              padding: "16px 48px",
              borderRadius: 999,
              fontSize: 16,
              fontFamily: "Georgia, serif",
              cursor: "pointer",
              letterSpacing: 2,
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(200, 214, 229, 0.6)";
              e.target.style.background = "rgba(200, 214, 229, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(200, 214, 229, 0.25)";
              e.target.style.background = "none";
            }}
          >
            begin
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 48,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 220,
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={glowRef}
              style={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(100, 149, 237, 0.12) 0%, transparent 70%)",
                transform: "scale(0.6)",
                willChange: "transform, opacity",
              }}
            />
            <div
              ref={circleRef}
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: "1px solid rgba(100, 149, 237, 0.2)",
                background: "radial-gradient(circle at 40% 40%, rgba(100, 149, 237, 0.08), rgba(15, 52, 96, 0.2))",
                transform: "scale(0.6)",
                willChange: "transform, box-shadow, border-color",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              fontStyle: "italic",
              color: "#c8d6e5",
              minHeight: 32,
              textAlign: "center",
              transition: "opacity 0.5s ease",
            }}
          >
            {phase.label}
          </div>

          <div style={{
            fontSize: 12,
            letterSpacing: 2,
            color: "#576574",
            textTransform: "uppercase",
            opacity: cycles > 0 ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}>
            {cycles || 1} {cycles <= 1 ? "cycle" : "cycles"} complete
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 60,
              height: 30,
              textAlign: "center",
              padding: "0 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              key={showAffirmation ? affirmation : "empty"}
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: "#8395a7",
                letterSpacing: 0.5,
                opacity: showAffirmation ? 1 : 0,
                animation: showAffirmation ? "fadeUp 4s ease forwards" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {affirmation || "\u00A0"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
