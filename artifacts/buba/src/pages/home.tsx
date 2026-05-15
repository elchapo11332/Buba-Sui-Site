import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";
import bubaLogo from "@assets/IMG_8916_1778859271618.PNG";
import roadmapImg from "@assets/photo_2026-05-15_17-34-19_1778859579465.jpg";

function JumpingText({ text, className, baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  return (
    <span className={`inline-flex flex-wrap items-end ${className ?? ""}`}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.3em" }} />
        ) : (
          <motion.span
            key={i}
            className="inline-block"
            animate={{ y: [0, -20, 3, -10, 1, 0] }}
            transition={{
              duration: 0.6,
              delay: baseDelay + i * 0.07,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: "easeInOut" as const,
            }}
          >
            {ch}
          </motion.span>
        )
      )}
    </span>
  );
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const colors = ["#ffcc00", "#00eeff", "#00ff00"];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src={bubaLogo} alt="BUBA Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary object-cover" />
          <span className="font-display font-bold text-xl md:text-2xl text-primary tracking-widest text-glow-gold">BUBA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-wide">Lore</a>
          <a href="#tokenomics" className="text-sm font-semibold hover:text-secondary transition-colors uppercase tracking-wide">Maths</a>
          <a href="#roadmap" className="text-sm font-semibold hover:text-accent transition-colors uppercase tracking-wide">Roadmap</a>
          <a href="#how-to-buy" className="text-sm font-semibold hover:text-accent transition-colors uppercase tracking-wide">Portal</a>
        </div>
        <a href="#buy" className="neon-border px-4 py-1.5 md:px-6 md:py-2 bg-background font-display font-bold text-xs md:text-sm tracking-wider uppercase">
          Buy BUBA
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,var(--color-background)_80%)] z-10 pointer-events-none" />
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            style={{ y: yHero }}
            className="mb-6 md:mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-secondary/30 blur-[120px] rounded-full translate-x-10 translate-y-10 mix-blend-screen" />
            <img src={bubaLogo} alt="BUBA Mascot" className="w-44 sm:w-60 md:w-80 lg:w-[500px] h-auto object-contain drop-shadow-[0_0_50px_rgba(255,204,0,0.5)] z-10 relative animate-pulse-slow" />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-wide text-glow-gold mb-3 md:mb-4 text-primary leading-none">
              <JumpingText text="BUBA" baseDelay={0} />
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto font-medium mb-2 leading-relaxed px-2">
              <JumpingText text="The Chaotic Good Wizard of the SUI Blockchain." baseDelay={0.3} />
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto font-medium mb-8 md:mb-10 leading-relaxed px-2">
              <JumpingText text="Cast spells. Stack bags. Embrace the weird." baseDelay={0.5} />
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <a href="#buy" className="neon-border px-7 py-3 md:px-10 md:py-4 bg-background font-display font-black text-base md:text-lg tracking-widest uppercase hover:scale-105 transition-transform">
                BUY $BUBA
              </a>
              <a href="https://x.com/bubaonsui" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors box-glow-blue hover:border-secondary text-secondary">
                <FaTwitter size={20} />
              </a>
              <a href="https://t.me/buba_on_sui" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors box-glow-blue hover:border-secondary text-secondary">
                <FaTelegramPlane size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contract Address Bar */}
      <section className="bg-primary text-primary-foreground py-3 md:py-4 border-y-4 border-primary">
        <div className="overflow-hidden relative">
          <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xs md:text-base font-mono font-bold mx-6 md:mx-8 inline-flex items-center gap-3">
                SUI CONTRACT: <span className="bg-black/20 px-2 py-0.5 rounded">0xPlaceholderContractAddressHere123456789</span>
                <span className="text-lg ml-2">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="max-w-xs mx-auto md:max-w-none w-full">
              <div className="relative p-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm box-glow-blue md:rotate-3">
                <img src={bubaLogo} alt="BUBA" className="rounded-2xl w-full object-cover filter brightness-110 contrast-125 saturate-150" />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-glow-blue text-secondary leading-tight">
                <JumpingText text="Chaotic Energy. Pure Magic." baseDelay={0} />
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent" />
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                BUBA isn't just another bug. BUBA is an enlightened entity traversing the cosmic web of the SUI blockchain, brewing potions of unhinged volatility and whispering forbidden alpha to those who dare listen.
              </p>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                Dressed in wizard robes and dripping in gold, BUBA flashes a peace sign before vaporizing the bears with a hyper-charged beam of chaotic good energy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-16 md:py-32 relative bg-black/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-glow-gold text-primary mb-4">
              <JumpingText text="The Sacred Numbers" baseDelay={0} />
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">No tricks, no hidden spells. Just raw, unfiltered tokenomics designed for the true initiates.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-6 md:mb-16 p-6 md:p-10 rounded-3xl border border-primary/40 bg-card/40 backdrop-blur-md box-glow-gold text-center">
            <h3 className="text-sm md:text-xl font-display text-muted-foreground mb-3 uppercase tracking-widest">Total Supply</h3>
            <div className="font-black font-display text-primary text-glow-gold leading-none text-5xl md:text-7xl">
              <JumpingText text="1B" baseDelay={0} />
            </div>
            <p className="mt-3 text-sm md:text-lg uppercase tracking-[0.3em] text-primary/60 font-bold">BUBA Tokens</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-6 md:p-10 rounded-2xl border border-secondary/30 bg-card/50 backdrop-blur-md box-glow-blue text-center group hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm md:text-xl font-display text-muted-foreground mb-3 uppercase tracking-widest">Taxes</h3>
              <div className="font-black font-display text-secondary text-glow-blue leading-none text-4xl md:text-6xl">
                <JumpingText text="0/0" baseDelay={0} />
              </div>
              <p className="mt-3 text-xs md:text-sm uppercase tracking-widest text-secondary/60 font-bold">Buy &amp; Sell Tax</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-6 md:p-10 rounded-2xl border border-accent/30 bg-card/50 backdrop-blur-md shadow-[0_0_20px_hsl(120,100%,50%,0.2)] text-center group hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm md:text-xl font-display text-muted-foreground mb-3 uppercase tracking-widest">Liquidity</h3>
              <div className="font-black font-display text-accent leading-none text-4xl md:text-6xl" style={{ textShadow: '0 0 30px hsl(120 100% 50% / 0.6)' }}>
                <JumpingText text="BURNED" baseDelay={0} />
              </div>
              <p className="mt-3 text-xs md:text-sm uppercase tracking-widest text-accent/60 font-bold">Forever Locked</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-glow-gold text-primary mb-4">
              <JumpingText text="The Quest Ahead" baseDelay={0} />
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">The wizard has consulted the ancient scrolls. The path to glory is written in gold.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full mix-blend-screen" />
                <img
                  src={roadmapImg}
                  alt="BUBA Roadmap"
                  data-testid="img-roadmap"
                  className="w-full object-contain drop-shadow-[0_0_60px_rgba(255,204,0,0.4)] relative z-10 rounded-2xl"
                />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col gap-4 md:gap-6">
              {[
                { phase: "Phase 1", title: "Summon the Wizard", items: ["Token launch on SUI", "Website goes live", "Community channels open", "Initial liquidity locked"], color: "primary", glow: "box-glow-gold", border: "border-primary/40", done: true },
                { phase: "Phase 2", title: "Cast the Spell", items: ["CoinGecko & CMC listings", "Influencer partnerships", "Meme campaign unleashed", "1,000 holders milestone"], color: "secondary", glow: "box-glow-blue", border: "border-secondary/40", done: false },
                { phase: "Phase 3", title: "Rule the Realm", items: ["CEX listings targeted", "BUBA merch drop", "10,000 holders milestone", "Community DAO formation"], color: "accent", glow: "", border: "border-accent/40", done: false },
              ].map((phase) => (
                <motion.div
                  key={phase.phase}
                  variants={fadeInUp}
                  data-testid={`card-roadmap-${phase.phase.toLowerCase().replace(" ", "")}`}
                  className={`p-4 md:p-6 rounded-2xl border ${phase.border} bg-card/40 backdrop-blur-md ${phase.glow} group hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-center gap-2 md:gap-4 mb-3 flex-wrap">
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${phase.border} text-${phase.color}`}>{phase.phase}</span>
                    {phase.done && <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">LIVE</span>}
                    <h3 className={`text-base md:text-xl font-display font-bold text-${phase.color}`}>
                      <JumpingText text={phase.title} baseDelay={0} />
                    </h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-1.5 md:gap-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${phase.color} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-[100px] rounded-[100%] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl md:text-2xl font-display font-bold text-primary mb-6 text-glow-gold">
            <JumpingText text="BUBA" baseDelay={0} />
          </h2>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://x.com/bubaonsui" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-secondary transition-colors"><FaTwitter size={28} /></a>
            <a href="https://t.me/buba_on_sui" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-secondary transition-colors"><FaTelegramPlane size={28} /></a>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto">© {new Date().getFullYear()} BUBA. All rights reserved. This is a meme coin. It has no intrinsic value. Do your own research.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .9; transform: scale(1.02); }
        }
      `}} />
    </div>
  );
}
