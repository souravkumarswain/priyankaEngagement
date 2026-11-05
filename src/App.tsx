import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import locationAnnimation from './assets';
import dholiImage from './assets/pngtree-indian-dholi-playing-dhol-tasha-illustration-vector-png-image_17511491-removebg-preview.png';
import danceImage from './assets/pngtree-traditional-indian-wedding-couple-illustration-groom-playing-dhol-bride-dancing-in-png-image_18188226-removebg-preview.png';
const shubhQuotes = [
  "Where two souls unite, two families become one blossoming garden.",
  "Bound by love's sacred thread — an eternal companionship begins.",
  "May your love story be timeless, your laughter endless, and your joy boundless.",
  "An auspicious hour arrives, bringing the sweetest of bonds.",
  "A saffron prince meets his rose-hued princess — a royal saga unfolds.",
  "With dholak beats and shehnai melodies, hearts sing in harmony.",
  "Henna, royal seal, and pearls — the trinity of our love.",
  "Grace our sacred engagement with your blessings and warm presence.",
];

const couple = {
  bride: "Priyanka",
  groom: "Ansuman",
  brideFamily: "Lt.Tanmaya Jena & Swarnaprava Jena",
  groomFamily: "Shri Ajay Kumar Pati  & Smt. Anima Pati",
  bridePlace: "Jajpur",
  groomPlace: "Jajpur",
};

const eventDetails = {
  date: "29",
  month: "November",
  year: "2026",
  day: "Sunday",
  tithi: "Krishna Shashthi, Margashira",
  venue: "Alisha Palace",
  address: "Budha ghata, Oleipada",
  city: "Jajpur Town, Odisha 755007",
  timeRing: "11:00 PM — Ring Ceremony",
  timeDinner: "12:30 PM — Prasad Sevan",
  // dress: "Royal Bandhani • Jodhpuri • Leheriya",
};

type RevealKeys = 'date' | 'month' | 'year';

/* ───────── SVG ornaments ───────── */

function RoyalMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 60" className={className} fill="none" aria-hidden>
      <g stroke="#d6b06b" strokeWidth="1.1" fill="none" opacity="0.95">
        <path d="M110 6 C100 14 92 22 110 31 C128 22 120 14 110 6Z" />
        <path d="M110 31 C92 40 78 35 68 27 C80 45 95 52 110 54 C125 52 140 45 152 27 C142 35 128 40 110 31Z" />
        <circle cx="110" cy="31" r="3.7" fill="#d6b06b" stroke="none" />
        <path d="M45 32 C24 23 9 28 4 38 C16 34 31 39 45 32Z" />
        <path d="M175 32 C196 23 211 28 216 38 C204 34 189 39 175 32Z" />
        <circle cx="31" cy="32" r="2" fill="#d6b06b" stroke="none" />
        <circle cx="189" cy="32" r="2" fill="#d6b06b" stroke="none" />
      </g>
    </svg>
  );
}

function PaisleyCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={`absolute w-[94px] h-[94px] sm:w-[120px] sm:h-[120px] opacity-[0.95] ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
    >
      <defs>
        <linearGradient id={`goldGrad${flip ? 'f' : 'n'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d586" />
          <stop offset="45%" stopColor="#cc9544" />
          <stop offset="100%" stopColor="#9a6a25" />
        </linearGradient>
      </defs>
      <g opacity="0.88">
        <path d="M8 125 C14 62 47 34 97 16 C112 46 104 86 70 108 C46 124 18 130 8 125Z"
          stroke={`url(#goldGrad${flip ? 'f' : 'n'})`} strokeWidth="1.7" fill="none" />
        <path d="M24 118 C30 76 56 52 88 38"
          stroke={`url(#goldGrad${flip ? 'f' : 'n'})`} strokeWidth="1.1" opacity="0.8" />
        <circle cx="52" cy="83" r="2.8" fill="#f0cb77" />
        <circle cx="71" cy="58" r="2" fill="#d29a4f" />
        <path d="M22 92 C36 92 46 85 50 70"
          stroke="#d39c4d" strokeWidth="0.95" fill="none" />
        <path d="M37 110 C50 104 57 93 57 81"
          stroke="#d39c4d" strokeWidth="0.95" fill="none" />
        <circle cx="96" cy="28" r="3.4" fill="#f3d48a" />
        <circle cx="96" cy="28" r="1.4" fill="#fff6d7" />
      </g>
    </svg>
  );
}

function GaneshIcon() {
  return (
    <div className="flex flex-col items-center">
      {/* <svg width="64" height="56" viewBox="0 0 76 66" fill="none">
        <defs>
          <linearGradient id="ganeshGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe6a7" />
            <stop offset="50%" stopColor="#d9a853" />
            <stop offset="100%" stopColor="#b5792d" />
          </linearGradient>
        </defs>
        <ellipse cx="38" cy="56" rx="22" ry="3.5" fill="#d9a853" opacity="0.25" />
        <path
          d="M38 8 C27 8 21 17 21 26 C21 32 24.5 37 30 39 L30 43 C28 46 29.5 50 34 50 C36.3 50 37.5 48.8 38.6 47.7 C39.6 48.8 41 50 43.4 50 C48 50 49.5 46 47.3 43 L47.3 39 C53 37 56 32 56 26 C56 17 49 8 38 8Z"
          stroke="url(#ganeshGold)" strokeWidth="1.5" fill="none"
        />
        <circle cx="32.5" cy="27.5" r="1.4" fill="#b97a2c" />
        <circle cx="43.5" cy="27.5" r="1.4" fill="#b97a2c" />
        <path d="M38 30 C36.2 34.2 33.5 36.5 31 36.2 C29.4 39.7 31.8 42.5 35 42.5"
          stroke="#c78f3d" strokeWidth="1.35" fill="none" strokeLinecap="round" />
        <path d="M38 15 L38 10 M27 18 L23.3 14.5 M49 18 L52.7 14.5"
          stroke="#e5bc6b" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="38" cy="8.2" r="1.7" fill="#ffe2a2" />
      </svg> */}
      <img className="w-20" src="https://png.pngtree.com/png-vector/20240602/ourmid/pngtree-ganpati-sri-ganesh-gradient-golden-stroke-object-png-image_12596228.png" alt="" />
      <div className="text-[11px] tracking-[0.2em] text-[#b78339] mt-1 font-[500]"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        || Om Shri Ganeshaya Namah ||
      </div>
    </div>
  );
}

/* ───────── Scratch Reveal ───────── */

function ScratchReveal({
  label,
  value,
  sub,
  revealed,
  onReveal,
  accent = "#7b111f",
}: {
  label: string;
  value: string;
  sub?: string;
  revealed: boolean;
  onReveal: () => void;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const hasRevealed = useRef(false);
  const lastCheckRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Foil gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    // grad.addColorStop(0, '#ba7d2e');
    // grad.addColorStop(0.25, '#f8d98b');
    // grad.addColorStop(0.5, '#db9e44');
    // grad.addColorStop(0.76, '#f2cb71');
    // grad.addColorStop(1, '#a96b22');
    grad.addColorStop(0, '#6b2d00');    // Deep dark brown base
    grad.addColorStop(0.25, '#ab5210');  // Rich reddish-bronze
    grad.addColorStop(0.5, '#d47a2a');   // Warm copper-gold highlight
    grad.addColorStop(0.76, '#b85d18');  // Deepening metallic shade
    grad.addColorStop(1, '#522100');     // Dark edge shadow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Diagonal pattern
    ctx.strokeStyle = 'rgba(117, 63, 11, 0.18)';
    ctx.lineWidth = 0.9;
    for (let x = 0; x < rect.width; x += 15) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 18, rect.height); ctx.stroke();
    }

    // Central circles
    ctx.strokeStyle = 'rgba(255,242,199,0.37)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(rect.width * 0.5, rect.height * 0.50, Math.min(rect.width, rect.height) * 0.32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rect.width * 0.5, rect.height * 0.50, Math.min(rect.width, rect.height) * 0.18, 0, Math.PI * 2);
    ctx.stroke();

    // Text on foil
    ctx.fillStyle = '#ffdf73';
    ctx.font = `700 ${Math.max(11, Math.min(13, rect.width / 12))}px "Cormorant Garamond", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.88;
    ctx.fillText('SCRATCH HERE', rect.width / 2, rect.height / 2 - 7);
    ctx.globalAlpha = 0.6;
    ctx.font = `500 ${Math.max(9.5, Math.min(11, rect.width / 15))}px "Cormorant Garamond", serif`;
    ctx.fillText('Reveal the date ✦', rect.width / 2, rect.height / 2 + 12);
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    if (revealed) return;
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, revealed]);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const step = 14;
    let total = 0;
    let cleared = 0;
    try {
      const data = ctx.getImageData(0, 0, w, h).data;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          total++;
          if (data[(y * w + x) * 4 + 3] < 120) cleared++;
        }
      }
    } catch { return; }

    if (cleared / total > 0.48 && !hasRevealed.current) {
      hasRevealed.current = true;
      onReveal();
      if (navigator.vibrate) navigator.vibrate(45);
    }
  }, [onReveal]);

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 1, y - 1);
    ctx.lineTo(x + 1, y + 1);
    ctx.lineWidth = 32;
    ctx.lineCap = 'round';
    ctx.stroke();

    const now = Date.now();
    if (now - lastCheckRef.current > 190) {
      lastCheckRef.current = now;
      checkReveal();
    }
  }, [checkReveal]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    isDrawing.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current || revealed) return;
    scratchAt(e.clientX, e.clientY);
  };
  const handlePointerUp = () => { isDrawing.current = false; checkReveal(); };

  return (
    <div className="flex flex-col items-center">
      <div className="text-[11px] sm:text-[12px] tracking-widest text-[#ab6e29] mb-[10px] font-[600]"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        {label}
      </div>
      <div
        ref={containerRef}
        className="relative w-[104px] h-[96px] sm:w-[128px] sm:h-[110px] rounded-[18px] overflow-hidden select-none touch-none"
        style={{
          background: 'linear-gradient(160deg,#fff7e4 0%, #fbf0d3 100%)',
          boxShadow: 'inset 0 0 0 1.4px #e2b86b, 0 7px 20px rgba(97,30,18,0.10), 0 1px 0 #fff inset'
        }}
      >
        {/* Revealed content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-[30px] sm:text-[34px] leading-none tracking-tight"
            style={{ fontFamily: '"Playfair Display", serif', color: accent, fontWeight: 700 }}
          >
            {value}
          </div>
          {sub && (
            <div className="mt-[3px] text-[11px] sm:text-[12.2px] text-[#9a5e1f]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              {sub}
            </div>
          )}
        </div>
        {/* Scratch overlay */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-600 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-crosshair'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        {!revealed && (
          <div className="pointer-events-none absolute top-[7px] right-[7px] w-[18px] h-[18px] rounded-full border border-[#fff0c4]/80 flex items-center justify-center">
            <span className="text-[9px] text-[#fff4d3]">✦</span>
          </div>
        )}
        {revealed && (
          <div className="absolute inset-0 pointer-events-none rounded-[18px]"
            style={{ boxShadow: 'inset 0 0 0 2px rgba(205,149,61,0.55)' }} />
        )}
      </div>
    </div>
  );
}

/* ───────── Fireworks ───────── */

function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; a: number; };
    const particles: Particle[] = [];
    const colors = ['#ffd06d', '#ff8d68', '#ffecd2', '#c6ffec', '#ffb44e', '#ffe28f', '#ff7370'];

    const burst = (cx: number, cy: number, color?: string) => {
      const count = 42 + Math.random() * 16;
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 + Math.random() * 0.3;
        const sp = 1.7 + Math.random() * 4.3;
        particles.push({ x: cx, y: cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 46 + Math.random() * 30, color: color || colors[Math.floor(Math.random() * colors.length)], size: 1.4 + Math.random() * 2.35, a: 1 });
      }
    };

    setTimeout(() => burst(w * 0.27, h * 0.38), 60);
    setTimeout(() => burst(w * 0.72, h * 0.30), 260);
    setTimeout(() => burst(w * 0.5, h * 0.31), 520);
    setTimeout(() => burst(w * 0.18, h * 0.51), 860);
    setTimeout(() => burst(w * 0.82, h * 0.47), 1060);

    let frame = 0;
    const run = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.041; p.vx *= 0.992; p.life--;
        p.a = Math.max(0, p.life / 70);
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (frame % 82 === 0 && frame < 360) burst(w * (0.22 + Math.random() * 0.56), h * (0.2 + Math.random() * 0.27));
      if (frame < 540) animRef.current = requestAnimationFrame(run);
      else ctx.clearRect(0, 0, w, h);
    };
    animRef.current = requestAnimationFrame(run);
    return () => { window.removeEventListener('resize', resize); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
}

/* ───────── Confetti ───────── */

function ConfettiRain({ active }: { active: boolean }) {
  if (!active) return null;
  const items = useMemo(() => Array.from({ length: 74 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 1.8,
    dur: 2.7 + Math.random() * 1.9, rotate: Math.random() * 360,
    size: 6 + Math.random() * 8, shape: i % 5,
    color: ['#f7d074', '#f8a35e', '#ff8080', '#ffdfb2', '#ffc04a', '#ffdca8', '#d8a74a'][i % 7]
  })), []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[95]">
      {items.map(it => (
        <span key={it.id} className="absolute top-[-20px]" style={{
          left: it.left + '%',
          animation: `fallConf ${it.dur}s cubic-bezier(.22,.6,.33,1) ${it.delay}s both`,
          transform: `rotate(${it.rotate}deg)`
        }}>
          <span style={{
            display: 'block', width: it.size + 'px', height: (it.shape === 2 ? it.size * 1.7 : it.size) + 'px',
            background: it.color,
            borderRadius: it.shape === 1 ? '50%' : it.shape === 3 ? '2px' : it.shape === 4 ? '0' : '2px 6px 2px 6px',
            opacity: .98, boxShadow: '0 1px 5px rgba(120,48,10,.16)'
          }} />
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function App() {
  const [stage, setStage] = useState<'sealed' | 'opening' | 'invitation'>('sealed');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [revealedMap, setRevealedMap] = useState<Record<RevealKeys, boolean>>({ date: false, month: false, year: false });
  const [celebrated, setCelebrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const allRevealed = revealedMap.date && revealedMap.month && revealedMap.year;

  useEffect(() => {
    if (stage === 'invitation') {
      setQuoteIdx(Math.floor(Math.random() * shubhQuotes.length));
      setRevealedMap({ date: false, month: false, year: false });
      setCelebrated(false);
    }
  }, [stage]);

  useEffect(() => {
    if (allRevealed && !celebrated) {
      setCelebrated(true);
      const message = 'The auspicious date is revealed! Congratulations!';
      setToast(message);
      if (navigator.vibrate) navigator.vibrate([35, 50, 60]);
      setTimeout(() => setToast(currentToast => currentToast === message ? null : currentToast), 3200);
    }
  }, [allRevealed, celebrated]);

  const openInvitation = () => {
    if (stage !== 'sealed') return;
    setStage('opening');
    setTimeout(() => setStage('invitation'), 1180);
  };

  const handleReveal = (key: RevealKeys) => {
    setRevealedMap(m => ({ ...m, [key]: true }));
  };

  const resetExperience = () => setStage('sealed');
  const quote = shubhQuotes[quoteIdx];

  return (
    <div className="min-h-screen text-[#392011] relative overflow-x-hidden"
      style={{
        fontFamily: '"Cormorant Garamond", "Crimson Pro", serif',
        background: stage === 'sealed'
          ? 'radial-gradient(1200px 820px at 50% -10%, #9a1630 0%, #701122 38%, #50111c 70%, #3a0c16 100%)'
          : '#fbf4e5',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');
        .display-serif { font-family: "Playfair Display", serif; }
        @keyframes sealPulse {
          0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(255,213,108,0.42),0 10px 34px rgba(82,8,18,.56),inset 0 2px 0 rgba(255,248,222,.55); }
          50% { transform:scale(1.032); box-shadow:0 0 0 11px rgba(255,213,108,0),0 12px 42px rgba(82,8,18,.62),inset 0 2px 0 rgba(255,248,222,.65); }
        }
        @keyframes flapOpen {
          0% { transform:rotateX(0deg); }
          100% { transform:rotateX(-172deg); }
        }
        @keyframes cardSlide {
          0% { transform:translateY(0); opacity:1; }
          100% { transform:translateY(-62px); opacity:1; }
        }
        @keyframes sparkleFloat {
          0%,100% { transform:translateY(0) rotate(0deg); opacity:.9; }
          50% { transform:translateY(-9px) rotate(14deg); opacity:1; }
        }
        @keyframes fallConf {
          0% { transform:translateY(-20px) rotate(0deg); opacity:0; }
          10% { opacity:1; }
          100% { transform:translateY(110vh) rotate(540deg); opacity:1; }
        }
        @keyframes popIn {
          0% { transform:scale(.7); opacity:0; }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes shimmerMove {
          0% { background-position:-230px 0; }
          100% { background-position:230px 0; }
        }
        .envelope-flap-anim { animation:flapOpen 900ms cubic-bezier(.62,.04,.36,1.02) forwards; transform-origin:top center; }
        .inner-card-lift { animation:cardSlide 700ms 260ms ease-out forwards; }
        .seal-btn { animation:sealPulse 2.15s ease-in-out infinite; }
        .gold-shimmer {
          background:linear-gradient(105deg,#c98e3b 8%,#f7df9a 26%,#d7a14a 44%,#f8e7b6 60%,#c98930 79%);
          background-size:460px 100%;
          animation:shimmerMove 2.9s linear infinite;
        }
        .rajasthani-paper {
          background-image:
            radial-gradient(circle at 18% 20%,rgba(212,162,66,.09) 0 3px,transparent 4px),
            radial-gradient(circle at 84% 75%,rgba(183,118,42,.07) 0 2.5px,transparent 3.5px),
            linear-gradient(180deg,#fffcf2 0%,#fff7e0 100%);
        }
        .jaali-pattern {
          background-image:
            radial-gradient(circle at center,rgba(194,134,49,0.12) 0 1.3px,transparent 1.8px),
            linear-gradient(rgba(194,134,49,0.06) 1px,transparent 1px),
            linear-gradient(90deg,rgba(194,134,49,0.06) 1px,transparent 1px);
          background-size:17px 17px,17px 17px,17px 17px;
        }
      `}</style>

      <FireworksCanvas active={celebrated} />
      <ConfettiRain active={celebrated} />

      {/* ──────── PAGE 1: ENVELOPE ──────── */}
      {stage !== 'invitation' && (
        <div className="min-h-screen flex items-center justify-center px-[18px] py-8 relative">
          {/* bg pattern */}
          <div className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='260' height='260' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23f7d27a' stroke-width='0.95' opacity='0.9'%3E%3Cpath d='M130 42 C110 78 82 90 56 90 C82 112 110 109 130 136 C150 109 178 112 204 90 C178 90 150 78 130 42Z'/%3E%3Ccircle cx='130' cy='89' r='11'/%3E%3Ccircle cx='130' cy='89' r='4' fill='%23f7d27a' stroke='none'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '240px 240px'
            }} />

          <div className="absolute top-6 left-5 text-[28px] opacity-90" style={{ filter: 'drop-shadow(0 3px 10px rgba(255,184,84,.28))' }}><img className="w-15" src="https://png.pngtree.com/png-vector/20240626/ourmid/pngtree-happy-diwali-diya-png-image_12859528.png" /></div>
          <div className="absolute top-6 right-5 text-[28px] opacity-90"><img className="w-15" src="https://png.pngtree.com/png-vector/20240626/ourmid/pngtree-happy-diwali-diya-png-image_12859528.png" /></div>
          <div className="absolute bottom-6 left-5 text-[26px] opacity-85"><img className='w-20' src="https://png.pngtree.com/png-vector/20250506/ourmid/pngtree-elegant-golden-flower-illustration-with-line-art-design-and-black-background-png-image_16162472.png" alt="" /></div>
          <div className="absolute bottom-6 right-5 text-[26px] opacity-85"><img className='w-20' src="https://png.pngtree.com/png-vector/20250506/ourmid/pngtree-elegant-golden-flower-illustration-with-line-art-design-and-black-background-png-image_16162472.png" alt="" /></div>

          <div className="w-full max-w-[500px] flex flex-col items-center">
            {/* Header */}
            <div className=" flex items-center flex-col text-center mb-[26px]">
              <img className='w-25' src="https://png.pngtree.com/png-vector/20240602/ourmid/pngtree-ganpati-sri-ganesh-gradient-golden-stroke-object-png-image_12596228.png" />
              <div className="display-serif text-[#ffdca6] text-[15px] sm:text-[17px] tracking-wider"
                style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                || Om Shri Ganeshaya Namah ||
              </div>
              <div className="display-serif text-[#ffe6b3] text-[13.5px] tracking-[0.22em] mt-[7px] uppercase">
                Royal Engagement Invitation
              </div>
              <div className="mt-3 flex justify-center">
                <RoyalMotif className="w-[210px] sm:w-[270px] h-auto opacity-90" />
              </div>
            </div>

            {/* Envelope body */}
            <div style={{ perspective: '1400px' }} className="relative">
              <div className="absolute -inset-7 rounded-[34px] blur-[38px] opacity-[0.46]"
                style={{ background: 'radial-gradient(circle,rgba(255,196,92,.32) 0%,rgba(176,66,38,.07) 62%,transparent 74%)' }} />

              <div className="relative w-[330px] sm:w-[440px] md:w-[490px] rounded-[22px] overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg,#fff8e0 0%,#f7ead0 100%)',
                  boxShadow: '0 22px 64px rgba(30,4,8,.52),0 2px 0 #fff inset,0 0 0 1.5px #e1b767,0 0 0 7px #fff4db,0 0 0 8.8px #d99d4a'
                }}>

                {/* top zari */}
                <div className="h-[9px] w-full gold-shimmer" />

                {/* paisley corners */}
                <div className="absolute left-[5px] top-[12px] opacity-[0.92]"><PaisleyCorner /></div>
                <div className="absolute right-[5px] top-[12px] opacity-[0.92]"><PaisleyCorner flip /></div>

                {/* inner card peeking */}
                <div className={`mx-[17px] sm:mx-[24px] mt-[72px] sm:mt-[84px] mb-[18px] rounded-[17px] relative ${stage === 'opening' ? 'inner-card-lift' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg,#fffdf6 0%,#fff5db 100%)',
                    boxShadow: 'inset 0 0 0 1px #ead08c,0 2px 14px rgba(120,64,18,.07)'
                  }}>
                  <div className="jaali-pattern absolute inset-0 rounded-[17px] opacity-[0.88]" />
                  <div className="relative px-5 py-[28px] sm:py-[34px] text-center">
                    <div className="text-[11.8px] tracking-[0.23em] text-[#ba7c2f] uppercase"
                      style={{ fontFamily: '"Cormorant Garamond",serif' }}>Engagement Invitation</div>
                    <div className="display-serif text-[30px] sm:text-[38px] leading-tight text-[#781125] mt-[16px]"
                      style={{ fontWeight: 600 }}>
                      {couple.bride}<br />
                      <span className="text-[18px] sm:text-[20px] text-[#b97a2c] italic">&amp;</span><br />
                      {couple.groom}
                    </div>
                    <div className="mt-[16px] flex items-center justify-center gap-3">
                      <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#deae60]" />
                      <span className="text-[#c48834] text-[13px]">✦</span>
                      <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#deae60]" />
                    </div>
                    {/* <div className="mt-[10px] text-[11.8px] tracking-wider text-[#b66f2c] uppercase"
                      style={{ fontFamily:'"Cormorant Garamond",serif' }}>Jaipur &bull; Udaipur</div> */}
                  </div>
                </div>

                {/* bottom bar */}
                <div className="flex flex-col px-5 sm:px-7 py-[16px] flex items-center justify-between text-[10.8px] sm:text-[12px] tracking-[0.11em] text-[#9b6930] uppercase"
                  style={{ borderTop: '1px dashed #dcb26e', background: 'rgba(254,245,218,0.82)', fontFamily: '"Cormorant Garamond",serif' }}>
                  {/* <span>Royal Rajputana</span> */}
                  <span className="text-[#b56b2d]">✦ Welcome ✦</span>
                  <span>Engagement Ceremony</span>
                </div>

                {/* FLAP */}
                <div className={`absolute left-0 right-0 top-[9px] h-[122px] sm:h-[143px] ${stage === 'opening' ? 'envelope-flap-anim' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg,#f9e6bb 0%,#f1d39a 40%,#e4be7b 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transformOrigin: 'top center',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 8px 20px rgba(86,36,12,.14),inset 0 -1px 0 #d8a85e',
                    borderBottom: '1.6px solid #d2a25a'
                  }}>
                  <div className="absolute inset-0 opacity-[0.9]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Cpath d='M0 70 Q100 20 200 70' fill='none' stroke='%23c58834' stroke-width='1'/%3E%3Ccircle cx='50' cy='54' r='2' fill='%23b97a2e'/%3E%3Ccircle cx='100' cy='38' r='2' fill='%23b97a2e'/%3E%3Ccircle cx='150' cy='54' r='2' fill='%23b97a2e'/%3E%3C/svg%3E")`,
                    backgroundSize: '210px 62px', backgroundRepeat: 'repeat-x', backgroundPosition: 'center 18px'
                  }} />
                </div>

                {/* WAX SEAL */}
                <button onClick={openInvitation} disabled={stage === 'opening'}
                  className={`absolute left-1/2 top-[82px] sm:top-[98px] -translate-x-1/2 -translate-y-1/2 z-30 seal-btn rounded-full w-[108px] h-[108px] sm:w-[118px] sm:h-[118px] flex items-center justify-center transition-transform active:scale-[0.965] ${stage === 'opening' ? 'opacity-0 scale-90 pointer-events-none' : ''}`}
                  style={{
                    background: 'radial-gradient(circle at 35% 30%,#fff1c4 0%,#f2c66a 32%,#cc8a2b 62%,#a45b19 100%)',
                    boxShadow: '0 0 0 6px #fff6d9,0 0 0 9px #dfa64d,0 14px 34px rgba(82,8,18,.56),inset 0 3px 0 rgba(255,248,220,.7),inset 0 -3px 12px rgba(121,50,12,.33)'
                  }} aria-label="Open Invitation">
                  <div className="text-center">
                    <div className="text-[16px] leading-[1] text-[#6f1a12]"
                      style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, textShadow: '0 1px 0 #ffe9b2' }}>
                      Open
                    </div>
                    <div className="text-[9.9px] tracking-[0.21em] text-[#7a2a16] mt-[4px]"
                      style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 700 }}>TAP HERE</div>
                    <div className="text-[9.5px] text-[#82311a] mt-[1px]">✦</div>
                  </div>
                </button>

                {/* sparkles */}
                <div className="absolute left-[calc(50%-98px)] top-[39px] text-[#ffe198] text-[13px]"
                  style={{ animation: 'sparkleFloat 2.7s ease-in-out infinite' }}>✦</div>
                <div className="absolute left-[calc(50%+84px)] top-[49px] text-[#ffd073] text-[12px]"
                  style={{ animation: 'sparkleFloat 2.4s 0.4s ease-in-out infinite' }}>✧</div>
                <div className="absolute left-[calc(50%-68px)] top-[128px] text-[#ffd98a] text-[11px]"
                  style={{ animation: 'sparkleFloat 2.9s 0.7s ease-in-out infinite' }}>✦</div>
                <div className="absolute left-[calc(50%+62px)] top-[133px] text-[#ffcf78] text-[11px]"
                  style={{ animation: 'sparkleFloat 2.3s 0.2s ease-in-out infinite' }}>✧</div>
              </div>

              {/* caption */}
              <div className="text-center mt-[30px]">
                <div className="text-[#ffdca6] text-[14.8px] sm:text-[16px] tracking-wide"
                  style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                  Break the royal seal to reveal the invitation
                </div>
                <div className="text-[#f1c88b] text-[12.4px] mt-1 italic"
                  style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                  Tap the golden wax seal to unveil the Engagement date
                </div>
              </div>
            </div>

            <div className="mt-[28px] text-[11px] tracking-[0.18em] text-[#f1c480]/90 uppercase"
              style={{ fontFamily: '"Cormorant Garamond",serif' }}>
              Priyanka &hearts; Ansuman
            </div>
          </div>
        </div>
      )}

      {/* ──────── PAGE 2: INVITATION ──────── */}
      {stage === 'invitation' && (
        <div className="relative min-h-screen">
          <div className="absolute top-0 left-0 right-0 h-[320px] pointer-events-none"
            style={{ background: 'linear-gradient(180deg,#fdf6e4 0%,#fdf1d1 46%,rgba(253,242,207,0.74) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.09] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23b97b2c' fill='none' stroke-width='0.75' opacity='0.95'%3E%3Ccircle cx='42' cy='42' r='15'/%3E%3Cpath d='M42 14 L55 28 L70 28 L60 40 L64 56 L42 47 L20 56 L24 40 L14 28 L29 28Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '86px 86px'
            }} />

          <div className="relative max-w-[520px] mx-auto px-[14px] sm:px-6 py-[18px] sm:py-[28px]">
            <div className="rounded-[28px] relative overflow-hidden rajasthani-paper"
              style={{ boxShadow: '0 22px 60px rgba(95,44,13,.13),0 1px 0 #fff inset,0 0 0 1.6px #e1b663,0 0 0 7px #fff9e7,0 0 0 9px #d4a251' }}>

              <div className="h-[8px] gold-shimmer w-full" />
              <div className="absolute top-0.5 -left-1.5"><img className='w-40 scale-x-[-1] scale-y-[-1]' src="https://png.pngtree.com/png-clipart/20250119/original/pngtree-golden-floral-corner-elegant-botanical-clipart-illustration-png-image_20307827.png" alt="sahanai" /></div>
              <div className="absolute top-0.5 -right-1.5"><img className='w-40 scale-y-[-1]' alt="subh-vivah" src="https://png.pngtree.com/png-clipart/20250119/original/pngtree-golden-floral-corner-elegant-botanical-clipart-illustration-png-image_20307827.png" /></div>

              <div className="relative px-[18px] sm:px-[34px] pt-[30px] sm:pt-[38px] pb-[30px]">

                {/* Ganesh */}
                <div className="flex justify-center"><GaneshIcon /></div>

                {/* Rotating quote */}
                <div className="mt-[20px] mb-[12px] text-center px-2">
                  <div className="text-[17px] sm:text-[19.6px] leading-[1.55] text-[#8f1627]"
                    style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 500, fontStyle: 'italic' }}
                    key={quoteIdx}>
                    &ldquo;{quote}&rdquo;
                  </div>
                </div>

                <div className="flex items-center justify-between my-[11px] text-center">
                  {/* <RoyalMotif className="w-[208px] sm:w-[250px] h-auto" /> */}

                  <img className='w-[90px]' src={danceImage} alt="" />
                  <img className="w-[90px] sm:w-[180px] h-auto" src="https://png.pngtree.com/png-clipart/20221219/original/pngtree-luxury-shubh-vivah-or-vivaah-hindi-luxure-red-calligraphy-mandala-illustration-png-image_8775335.png" alt="" />
                  <img className="w-[90px]" src={dholiImage} alt="Traditional dhol player" />
                </div>
                <div className="mt-[16px] flex items-center justify-center gap-3">
                  <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#deae60]" />
                  <span className="text-[#c48834] text-[13px]">✦</span>
                  <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#deae60]" />
                </div>

                {/* Header */}
                <div className="text-center">
                  <div className="text-[11.5px] tracking-[0.28em] text-[#c28435] uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                    With the blessings of our elders
                  </div>
                  <div className="display-serif mt-[8px] text-[26px] sm:text-[30px] text-[#83152a] leading-tight"
                    style={{ fontWeight: 600 }}>
                    Engagement Ceremony
                  </div>
                  <div className="text-[12.8px] sm:text-[14px] tracking-[0.24em] text-[#b36b2a] mt-1 uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                    You are cordially invited
                  </div>
                </div>

                {/* Names */}
                <div className="mt-[26px] text-center">
                  <div className="text-[12.5px] text-[#be7730] tracking-widest uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>Bride</div>
                  <div className="display-serif text-[36px] sm:text-[44px] text-[#7b1120] leading-[1.08]"
                    style={{ fontWeight: 600 }}>{couple.bride}</div>
                  <div className="text-[12.2px] sm:text-[13px] text-[#926031] mt-2 px-4 leading-relaxed"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    Daughter of {couple.brideFamily}
                    <br /><span className="text-[#ba7933]">{couple.bridePlace}</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 my-[16px]">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e2b56a]" />
                    <div className="text-[#d2923f] text-[20px]"><img className='w-15' src="https://png.pngtree.com/png-clipart/20240925/original/pngtree-decorative-kalash-with-shehnai-golden-color-png-image_16088906.png" alt="" /></div>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e2b56a]" />
                  </div>

                  <div className="text-[12.5px] text-[#be7730] tracking-widest uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>Groom</div>
                  <div className="display-serif text-[36px] sm:text-[44px] text-[#7b1120] leading-[1.08]"
                    style={{ fontWeight: 600 }}>{couple.groom}</div>
                  <div className="text-[12.2px] sm:text-[13px] text-[#926031] mt-2 px-4 leading-relaxed"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    Son of {couple.groomFamily}
                    <br /><span className="text-[#ba7933]">{couple.groomPlace}</span>
                  </div>
                </div>

                {/* Scratch section */}
                <div className="mt-[30px] rounded-[24px] p-[15px] sm:p-[20px]"
                  style={{ background: 'linear-gradient(180deg,#fffaf0 0%,#fff3d6 100%)', boxShadow: 'inset 0 0 0 1px #eac57f,0 9px 26px rgba(132,68,18,.07)' }}>
                  <div className="text-center">
                    <div className="text-[11.4px] tracking-[0.22em] text-[#bd7d31] uppercase"
                      style={{ fontFamily: '"Cormorant Garamond",serif' }}>Reveal the Auspicious Date</div>
                    <div className="text-[12.8px] text-[#b46f2d] mt-[4px] italic"
                      style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                      Scratch the golden foil cards to unveil the sacred date
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-[13px] sm:gap-[18px] mt-[18px]">
                    <ScratchReveal label="DATE" value={eventDetails.date} sub="Fifteenth"
                      revealed={revealedMap.date} onReveal={() => handleReveal('date')} accent="#8a1328" />
                    <ScratchReveal label="MONTH" value="Nov" sub="November"
                      revealed={revealedMap.month} onReveal={() => handleReveal('month')} accent="#8a1328" />
                    <ScratchReveal label="YEAR" value={eventDetails.year}
                      revealed={revealedMap.year} onReveal={() => handleReveal('year')} accent="#8a1328" />
                  </div>

                  <div className="mt-[16px] text-center">
                    {!allRevealed ? (
                      <div className="text-[12.5px] text-[#aa6a2b] font-[500]"
                        style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                        {Object.values(revealedMap).filter(Boolean).length} / 3 revealed &mdash; keep scratching with your finger ✨
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-[9px] rounded-full text-[13.4px]"
                        style={{
                          background: 'linear-gradient(90deg,#fff4d7,#ffe29a)', color: '#7a1c17',
                          boxShadow: 'inset 0 0 0 1px #e3b45b', animation: 'popIn 420ms ease-out'
                        }}>
                        <span>🎊</span>
                        <span style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 600 }}>
                          The auspicious date is revealed!
                        </span>
                        <span>🎊</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Full date display */}
                <div className="mt-[22px] text-center">
                  <div className="text-[11.4px] tracking-[0.21em] text-[#c18335] uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>Save the Royal Date</div>
                  <div className={`mt-[6px] display-serif text-[28px] sm:text-[31px] text-[#7f1123] transition-all duration-500 ${allRevealed ? 'opacity-100' : 'opacity-70 blur-[0.6px]'}`}
                    style={{ fontWeight: 600 }}>
                    {allRevealed ? eventDetails.date : '\u2022\u2022\u2022'} {eventDetails.month} {allRevealed ? eventDetails.year : '\u2022\u2022\u2022'}
                  </div>
                  <div className="text-[15.4px] text-[#a55423] mt-1"
                    style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic' }}>
                    {eventDetails.day} &bull; {eventDetails.tithi}
                  </div>
                  <div className="text-[12.7px] text-[#9c6a31] mt-1"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    {eventDetails.day} &bull; 12:00 PM onwards
                  </div>
                </div>

                {/* Venue */}
                <div className="flex flex-col items-center mt-[22px] rounded-[20px] py-[17px] px-4 text-center"
                  style={{ background: 'rgba(255,247,224,0.9)', border: '1px solid #e8c47f' }}>
                  <div className="text-[11.8px] tracking-widest text-[#c07b2d] uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>Venue</div>
                  <div className="display-serif text-[20px] sm:text-[22px] text-[#7b1427] mt-1"
                    style={{ fontWeight: 600 }}><a className='hover:text-yellow-700' href='https://www.google.com/maps/place/Alisha+Palace/@20.8244577,86.2931959,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1be30037b85ff5:0x8e19c9e83511c2d4!8m2!3d20.8244527!4d86.2957708!16s%2Fg%2F11wtlbzmz8?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D' target='_blank'>{eventDetails.venue}</a></div>
                  <div className='flex flex-col'><a className="text-center text-[10px] text-[#8d5a2c]" style={{ fontFamily: '"Crimson Pro",serif' }} href='https://www.google.com/maps/place/Alisha+Palace/@20.8244577,86.2931959,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1be30037b85ff5:0x8e19c9e83511c2d4!8m2!3d20.8244527!4d86.2957708!16s%2Fg%2F11wtlbzmz8?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D' target='_blank'><img className="w-8 ml-1" src={locationAnnimation} />click here</a></div>
                  <div className="text-[13px] text-[#8d5a2c] mt-1"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    {eventDetails.address}<br />{eventDetails.city}
                  </div>
                  <div className="mt-3 text-[13.3px] text-[#8a4f22] leading-relaxed"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    <div>{eventDetails.timeRing}</div>
                    <div>{eventDetails.timeDinner}</div>
                  </div>
                  {/* <div className="mt-[11px] text-[11.6px] tracking-[0.12em] text-[#b7742d] uppercase"
                    style={{ fontFamily:'"Cormorant Garamond",serif' }}>
                    Dress Code: {eventDetails.dress}
                  </div> */}
                </div>

                {/* Blessing band */}
                <div className="mt-[24px] text-center border-y border-dashed border-[#e0b76d] py-[16px]">
                  <div className="text-[16.8px] sm:text-[18.4px] text-[#8d1528] leading-relaxed"
                    style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 500 }}>
                    &ldquo;Come, grace our humble home with your presence&rdquo;
                  </div>
                  <div className="mt-2 text-[13.6px] text-[#9c6230] italic"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                    ॐ गृह्णामि ते सुप्रजास्त्वाय हस्तं मया पत्या जरदष्टिर्यथासः।
                  </div>
                </div>

                {/* Thank You */}
                <div className="mt-[24px] text-center flex flex-col items-center">
                  <div className="text-[26px]"><img className="w-20 bg-transparent" src="https://png.pngtree.com/png-vector/20260606/ourmid/pngtree-namaste-hands-in-prayer-with-indian-mandala-png-image_19464432.webp" alt="" /></div>
                  <div className="display-serif text-[20.5px] sm:text-[22.5px] text-[#87162a] mt-2 leading-snug"
                    style={{ fontWeight: 600 }}>
                    With Folded Hands &amp; Grateful Hearts
                  </div>
                  <div className="mt-[8px] text-[14.8px] sm:text-[15.7px] text-[#83522a] leading-relaxed px-2"
                    style={{ fontFamily: '"Crimson Pro",serif' }}>
                    We humbly request you to bless Priyanka &amp; Ansuman as they begin their journey of love and togetherness.
                    Your presence is the most cherished gift we could ever receive.
                  </div>
                  <div className="mt-[11px] text-[15.5px] text-[#b16228] tracking-wide"
                    style={{ fontFamily: '"Cormorant Garamond",serif', fontWeight: 600 }}>
                    &mdash; With love from the Pati &amp; Jena families &mdash;
                  </div>
                  <div className="mt-[5px] text-[12.7px] text-[#a56631] tracking-wide uppercase"
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                  "Jajpur &bull; Jajpur
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-[22px] flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={resetExperience}
                    className="px-5 py-[12px] rounded-full text-[13.8px] tracking-wide text-[#8a4420]"
                    style={{ background: '#fff6df', border: '1.5px solid #e2b66c', boxShadow: '0 4px 14px rgba(157,94,32,.10)', fontFamily: '"Cormorant Garamond",serif' }}>
                    &#9993; View Again
                  </button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`You're invited to a Royal Engagement!💍 of \nPriyanka & Ansuman \n on ${eventDetails.month} ${eventDetails.year}\n at ${eventDetails.venue}, Jajpur\nPlease grace us with your presence! https://priyanka-engagement.vercel.app/ 💐✨`)}`}
                    target="_blank" rel="noreferrer"
                    className="px-5 py-[12px] rounded-full text-[13.8px] tracking-wide text-white text-center"
                    style={{
                      background: 'linear-gradient(135deg,#7c1230 0%,#b42b3a 54%,#d77f33 100%)',
                      boxShadow: '0 7px 22px rgba(125,21,37,.26)', fontFamily: '"Cormorant Garamond",serif'
                    }}>
                    Share Invitation
                  </a>
                </div>

                <div className="text-center mt-[16px] text-[11px] text-[#b9823f] tracking-widest uppercase"
                  style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                  Om Mangalam &hearts; Two hearts, one beautiful future &hearts; 2026
                </div>
              </div>

              <div className="h-[8px] gold-shimmer w-full" />
            </div>

            <div className="text-center mt-5 pb-6">
              <div className="text-[#a86f34] text-[12.6px]"
                style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                Handcrafted Royal Invitation by Sourav &hearts; &bull; {new Date().getFullYear()}
              </div>
              <div className="text-[11.5px] text-[#bd8650] mt-1"
                style={{ fontFamily: '"Cormorant Garamond",serif' }}>
                Pati &hearts; Jena &bull; Welcome to Our Celebration
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-[120] px-[18px] py-[11px] rounded-full text-[14px] text-white shadow-xl"
          style={{ background: 'linear-gradient(135deg,#8a1325,#d36d2a)', animation: 'popIn .33s ease-out', fontFamily: '"Cormorant Garamond",serif' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
