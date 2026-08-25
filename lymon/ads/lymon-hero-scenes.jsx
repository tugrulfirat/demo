const { SceneStage, useScene } = window;
const { useTweaks, TweaksPanel, TweakToggle } = window;

const COLORS = { cream: '#F3EBDE', dark: '#123B1E', lime: '#CFE86B', green: '#4ECB6D' };

function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function win(p, start, end){
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}
function easeOutBack(t){
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
const MOTION = {
  enter: (p, opts) => {
    const dist = (opts && opts.dist) || 30;
    const axis = (opts && opts.axis) || 'y';
    const scaleFrom = (opts && opts.scaleFrom != null) ? opts.scaleFrom : 0.94;
    const cp = clamp01(p);
    const e = easeOutBack(cp);
    const offset = dist * (1 - e);
    const scale = scaleFrom + (1 - scaleFrom) * e;
    const t = axis === 'x' ? `translateX(${offset}px) scale(${scale})` : `translateY(${offset}px) scale(${scale})`;
    return { opacity: Math.min(1, cp / 0.4), transform: t };
  },
  draw: (p) => clamp01(p),
};

function Base({ children }) {
  return <div style={{ position: 'relative', width: 1080, height: 1350, overflow: 'hidden' }}>{children}</div>;
}

function Logo({ reveal }) {
  const m = MOTION.enter(reveal, { dist: 18 });
  return (
    <div style={{ position: 'absolute', top: 64, left: 72, display: 'flex', alignItems: 'center', gap: 12, opacity: m.opacity, transform: m.transform }}>
      <img src="uploads/icon.svg" style={{ width: 40, height: 40 }} />
      <div style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 500, fontSize: 26, color: COLORS.dark }}>lymon</div>
    </div>
  );
}

function Tagline({ reveal }) {
  const m = MOTION.enter(reveal, { dist: 14 });
  return (
    <div style={{ position: 'absolute', top: 148, left: 72, fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 500, fontSize: 28, color: COLORS.dark, opacity: m.opacity, transform: m.transform }}>
      Hospitality. Made simple.
    </div>
  );
}

const headlineLineStyle = { fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 52, lineHeight: 1.16, color: COLORS.dark };

function Headline({ line1, line2, line3, highlightDraw }) {
  const m1 = MOTION.enter(line1, { dist: 22 });
  const m2 = MOTION.enter(line2, { dist: 22 });
  const m3 = MOTION.enter(line3, { dist: 22 });
  return (
    <div style={{ position: 'absolute', top: 216, left: 72, width: 900 }}>
      <div style={{ ...headlineLineStyle, opacity: m1.opacity, transform: m1.transform }}>You shouldn't need</div>
      <div style={{ ...headlineLineStyle, opacity: m2.opacity, transform: m2.transform }}>
        <span style={{ background: `rgba(207,232,107,${clamp01(highlightDraw)})`, padding: '2px 10px', borderRadius: 8, whiteSpace: 'nowrap' }}>5 tools</span> to run
      </div>
      <div style={{ ...headlineLineStyle, opacity: m3.opacity, transform: m3.transform }}>today's operations.</div>
    </div>
  );
}

function Subtext({ reveal }) {
  const m = MOTION.enter(reveal, { dist: 12 });
  return (
    <div style={{ position: 'absolute', top: 1264, left: 72, fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: 24, color: COLORS.dark, opacity: 0.7 * m.opacity, transform: m.transform }}>
      One platform. Real-time insights. Better decisions.
    </div>
  );
}

function CTA({ reveal }) {
  const m = MOTION.enter(reveal, { dist: 36 });
  return (
    <div style={{ position: 'absolute', top: 1164, left: 72, opacity: m.opacity, transform: m.transform }}>
      <div style={{ background: COLORS.dark, color: COLORS.cream, fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 24, padding: '18px 38px', borderRadius: 999, animation: 'ctaPulse 2.2s ease-in-out infinite' }}>
        Request Early Access
      </div>
    </div>
  );
}

function DashboardCard({ reveal }) {
  const m = MOTION.enter(reveal, { dist: 30, scaleFrom: 0.96 });
  return (
    <div style={{ position: 'absolute', top: 400, left: 72, width: 936, height: 736, background: '#FFFDF9', borderRadius: 24, boxShadow: '0 28px 60px rgba(18,59,30,0.2)', opacity: m.opacity, transform: m.transform, overflow: 'hidden', padding: 14, boxSizing: 'border-box' }}>
      <img src="uploads/dashboard.png" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }} />
    </div>
  );
}

function Badge({ reveal }) {
  const cp = clamp01(reveal);
  const e = easeOutBack(cp);
  return (
    <div style={{ position: 'absolute', top: 378, left: 910, width: 120, height: 120, borderRadius: '50%', background: COLORS.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 28px rgba(18,59,30,0.35)', border: `4px solid ${COLORS.cream}`, opacity: Math.min(1, cp / 0.3), transform: `scale(${e})` }}>
      <img src="uploads/icon.svg" style={{ width: 48, height: 48 }} />
    </div>
  );
}

function Opening() {
  const { progress } = useScene();
  return (
    <Base>
      <Logo reveal={win(progress, 0, 0.5)} />
      <Tagline reveal={win(progress, 0.35, 0.85)} />
    </Base>
  );
}

function HeadlineScene() {
  const { progress } = useScene();
  return (
    <Base>
      <Logo reveal={1} />
      <Tagline reveal={1} />
      <Headline
        line1={win(progress, 0, 0.25)}
        line2={win(progress, 0.2, 0.45)}
        line3={win(progress, 0.4, 0.65)}
        highlightDraw={win(progress, 0.5, 0.7)}
      />
    </Base>
  );
}

function ProofScene() {
  const { progress } = useScene();
  return (
    <Base>
      <Logo reveal={1} />
      <Tagline reveal={1} />
      <Headline line1={1} line2={1} line3={1} highlightDraw={1} />
      <DashboardCard reveal={win(progress, 0, 0.55)} />
      <Badge reveal={win(progress, 0.4, 0.75)} />
    </Base>
  );
}

function CTAScene() {
  const { progress } = useScene();
  return (
    <Base>
      <Logo reveal={1} />
      <Tagline reveal={1} />
      <Headline line1={1} line2={1} line3={1} highlightDraw={1} />
      <DashboardCard reveal={1} />
      <Badge reveal={1} />
      <CTA reveal={win(progress, 0, 0.5)} />
      <Subtext reveal={win(progress, 0.4, 0.8)} />
    </Base>
  );
}

function HoldScene() {
  return (
    <Base>
      <Logo reveal={1} />
      <Tagline reveal={1} />
      <Headline line1={1} line2={1} line3={1} highlightDraw={1} />
      <DashboardCard reveal={1} />
      <Badge reveal={1} />
      <CTA reveal={1} />
      <Subtext reveal={1} />
    </Base>
  );
}

function LymonHeroAd() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'relative', width: 1080, height: 1350, minWidth: 1080, minHeight: 1350 }}>
      <SceneStage width={1080} height={1350} bg={COLORS.cream} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {{ Opening: Opening, Headline: HeadlineScene, Proof: ProofScene, CTA: CTAScene, Hold: HoldScene }}
      </SceneStage>
      <TweaksPanel>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.LymonHeroAd = LymonHeroAd;
