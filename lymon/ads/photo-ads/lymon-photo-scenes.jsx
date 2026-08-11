const { SceneStage, useScene } = window;
const { useTweaks, TweaksPanel, TweakToggle } = window;
const COLORS = { cream: '#F3EBDE', dark: '#123B1E', lime: '#CFE86B' };

function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function win(p, s, e){ if (p<=s) return 0; if (p>=e) return 1; return (p-s)/(e-s); }
function easeOutBack(t){ const c1=1.70158,c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2); }
const MOTION = {
  enter: (p, opts) => {
    const dist=(opts&&opts.dist)||30, scaleFrom=(opts&&opts.scaleFrom!=null)?opts.scaleFrom:0.8;
    const cp=clamp01(p), e=easeOutBack(cp);
    return { opacity: Math.min(1, cp/0.3), transform: `translateY(${dist*(1-e)}px) scale(${scaleFrom+(1-scaleFrom)*e})` };
  },
  draw: (p) => clamp01(p),
};

function Base({ children }) {
  return <div style={{ position:'relative', width:1080, height:1350, overflow:'hidden' }}>{children}</div>;
}

function Photo({ src }) {
  return <img src={src} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />;
}

function LogoChip({ reveal }) {
  const m = MOTION.enter(reveal, { dist:16 });
  return (
    <div style={{ position:'absolute', top:40, left:40, display:'flex', alignItems:'center', gap:10, background:'#0A3B13', padding:'10px 16px', borderRadius:999, opacity:m.opacity, transform:m.transform }}>
      <img src="uploads/icon.svg" style={{ width:36, height:36 }} />
      <div style={{ fontFamily:'Fredoka,sans-serif', fontWeight:500, fontSize:24, color:COLORS.cream }}>lymon</div>
    </div>
  );
}

function Pill({ x, y, text, align, reveal }) {
  const m = MOTION.enter(reveal, { dist:20 });
  const style = { position:'absolute', top:y, background:COLORS.dark, color:COLORS.cream, fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:19, padding:'12px 20px', borderRadius:999, opacity:m.opacity, transform:m.transform };
  if (align === 'right') style.right = x; else style.left = x;
  return <div style={style}>{text}</div>;
}

function Connector({ x1, y1, x2, y2, reveal, color }) {
  const d = MOTION.draw(reveal);
  const c = color || 'rgba(243,235,222,0.85)';
  const cf = color ? color.replace('0.85', '0.9') : 'rgba(243,235,222,0.9)';
  return (
    <g opacity={d}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2" />
      <circle cx={x2} cy={y2} r="5" fill={cf} />
    </g>
  );
}

function Caption({ eyebrow, headline, reveal }) {
  const m = MOTION.enter(reveal, { dist:14 });
  return (
    <div style={{ position:'absolute', left:56, right:56, bottom:64, opacity:m.opacity, transform:m.transform }}>
      <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:20, letterSpacing:'0.1em', color:COLORS.lime }}>{eyebrow}</div>
      <div style={{ fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:44, color:COLORS.cream, marginTop:14 }}>{headline}</div>
    </div>
  );
}

function Scrim() {
  return <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(10,20,12,0.05) 0%,rgba(10,20,12,0.0) 40%,rgba(10,20,12,0.75) 100%)', pointerEvents:'none' }} />;
}

function Post8Scene() {
  const { progress } = useScene();
  const logo = win(progress, 0, 0.15);
  const p1 = win(progress, 0.12, 0.32);
  const p2 = win(progress, 0.28, 0.48);
  const p3 = win(progress, 0.44, 0.64);
  const cap = win(progress, 0.6, 0.85);
  return (
    <Base>
      <Photo src="uploads/Gemini_Generated_Image_eocaqqeocaqqeoca.png" />
      <Scrim />
      <svg viewBox="0 0 1080 1350" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        <Connector x1={130} y1={552} x2={236} y2={600} reveal={p1} />
        <Connector x1={850} y1={294} x2={733} y2={339} reveal={p2} />
        <Connector x1={925} y1={696} x2={877} y2={749} reveal={p3} />
      </svg>
      <LogoChip reveal={logo} />
      <Pill x={40} y={508} text="Today's Insights" reveal={p1} />
      <Pill x={60} y={250} align="right" text="Morning Brief" reveal={p2} />
      <Pill x={60} y={652} align="right" text="Staff Self-Solve" reveal={p3} />
      <Caption eyebrow="A DAY WITH LYMON" headline="Your café is already running." reveal={cap} />
    </Base>
  );
}

function Post9Scene() {
  const { progress } = useScene();
  const logo = win(progress, 0, 0.15);
  const p1 = win(progress, 0.12, 0.32);
  const p2 = win(progress, 0.28, 0.48);
  const p3 = win(progress, 0.44, 0.64);
  const cap = win(progress, 0.6, 0.85);
  return (
    <Base>
      <Photo src="uploads/Gemini_Generated_Image_nqcmcqnqcmcqnqcm.png" />
      <Scrim />
      <svg viewBox="0 0 1080 1350" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        <Connector x1={135} y1={634} x2={192} y2={673} reveal={p1} color="rgba(18,59,30,0.85)" />
        <Connector x1={425} y1={404} x2={500} y2={460} reveal={p2} color="rgba(18,59,30,0.85)" />
        <Connector x1={850} y1={324} x2={785} y2={462} reveal={p3} color="rgba(18,59,30,0.85)" />
      </svg>
      <LogoChip reveal={logo} />
      <Pill x={40} y={590} text="Morning Check-In" reveal={p1} />
      <Pill x={350} y={360} text="Notes, Synced" reveal={p2} />
      <Pill x={60} y={280} align="right" text="Compliance, Always On" reveal={p3} />
      <Caption eyebrow="A DAY WITH LYMON" headline="Tomorrow's rota is already organized." reveal={cap} />
    </Base>
  );
}

function LymonPhotoAds() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position:'relative', width:1080, height:1350, minWidth:1080, minHeight:1350 }}>
      <SceneStage width={1080} height={1350} bg={COLORS.dark} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {{ Post8: Post8Scene, Post9: Post9Scene }}
      </SceneStage>
      <TweaksPanel>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}
window.LymonPhotoAds = LymonPhotoAds;
