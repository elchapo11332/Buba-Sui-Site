import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";
import bubaLogo from "@assets/IMG_8916_1778859271618.PNG";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const colors = ["#ffcc00", "#00eeff", "#00ff00"]; // Gold, Blue, Green

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
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src={bubaLogo} alt="BUBA Logo" className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
          <span className="font-display font-bold text-2xl text-primary tracking-widest text-glow-gold">BUBA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-wide">Lore</a>
          <a href="#tokenomics" className="text-sm font-semibold hover:text-secondary transition-colors uppercase tracking-wide">Maths</a>
          <a href="#how-to-buy" className="text-sm font-semibold hover:text-accent transition-colors uppercase tracking-wide">Portal</a>
        </div>
        <a href="#buy" className="neon-border px-6 py-2 bg-background font-display font-bold text-sm tracking-wider uppercase">
          Buy BUBA
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,var(--color-background)_80%)] z-10 pointer-events-none" />
        
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            style={{ y: yHero }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-secondary/30 blur-[120px] rounded-full translate-x-10 translate-y-10 mix-blend-screen" />
            <img src={bubaLogo} alt="BUBA Mascot" className="w-80 md:w-96 lg:w-[500px] h-auto object-contain drop-shadow-[0_0_50px_rgba(255,204,0,0.5)] z-10 relative animate-pulse-slow" />
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.h1 variants={fadeInUp} className="text-7xl md:text-9xl font-black font-display tracking-tighter text-glow-gold mb-4 text-primary leading-none">
              BUBA
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
              The Chaotic Good Wizard of the SUI Blockchain. Cast spells. Stack bags. Embrace the weird.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6">
              <a href="#buy" className="neon-border px-10 py-4 bg-background font-display font-black text-lg tracking-widest uppercase hover:scale-105 transition-transform">
                Enter the Lair
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors box-glow-blue hover:border-secondary text-secondary">
                <FaTwitter size={24} />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors box-glow-blue hover:border-secondary text-secondary">
                <FaTelegramPlane size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contract Address Bar */}
      <section className="bg-primary text-primary-foreground py-4 border-y-4 border-primary">
        <div className="container mx-auto px-4 overflow-hidden relative">
          <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg font-mono font-bold mx-8 inline-flex items-center gap-4">
                SUI CONTRACT: <span className="bg-black/20 px-3 py-1 rounded">0xPlaceholderContractAddressHere123456789</span>
                <span className="text-2xl ml-4">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="relative p-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm box-glow-blue rotate-3">
                <img src={bubaLogo} alt="BUBA" className="rounded-2xl w-full object-cover filter brightness-110 contrast-125 saturate-150" />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-6">
              <h2 className="text-5xl md:text-6xl font-display font-bold text-glow-blue text-secondary leading-none">Chaotic Energy. Pure Magic.</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent" />
              <p className="text-xl text-muted-foreground leading-relaxed">
                BUBA isn't just another bug. BUBA is an enlightened entity traversing the cosmic web of the SUI blockchain, brewing potions of unhinged volatility and whispering forbidden alpha to those who dare listen.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Dressed in wizard robes and dripping in gold, BUBA flashes a peace sign before vaporizing the bears with a hyper-charged beam of chaotic good energy. 
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-32 relative bg-black/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-6xl font-display font-bold text-glow-gold text-primary mb-6">The Sacred Numbers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">No tricks, no hidden spells. Just raw, unfiltered tokenomics designed for the true initiates.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-md box-glow-gold text-center group hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-display text-muted-foreground mb-4">Total Supply</h3>
              <div className="text-5xl font-black font-mono text-primary text-glow-gold">1,000,000,000</div>
              <p className="mt-4 text-sm uppercase tracking-widest text-primary/60 font-bold">BUBA Tokens</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-2xl border border-secondary/30 bg-card/50 backdrop-blur-md box-glow-blue text-center group hover:-translate-y-2 transition-transform duration-300 delay-100">
              <h3 className="text-2xl font-display text-muted-foreground mb-4">Taxes</h3>
              <div className="text-5xl font-black font-mono text-secondary text-glow-blue">0/0</div>
              <p className="mt-4 text-sm uppercase tracking-widest text-secondary/60 font-bold">Buy & Sell Tax</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-2xl border border-accent/30 bg-card/50 backdrop-blur-md shadow-[0_0_20px_hsl(120,100%,50%,0.2)] text-center group hover:-translate-y-2 transition-transform duration-300 delay-200">
              <h3 className="text-2xl font-display text-muted-foreground mb-4">Liquidity</h3>
              <div className="text-5xl font-black font-mono text-accent" style={{ textShadow: '0 0 20px hsl(120 100% 50% / 0.5)'}}>BURNED</div>
              <p className="mt-4 text-sm uppercase tracking-widest text-accent/60 font-bold">Forever locked</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-[100px] rounded-[100%] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-display font-bold text-primary mb-8 text-glow-gold">BUBA</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://twitter.com" className="text-muted-foreground hover:text-secondary transition-colors"><FaTwitter size={32} /></a>
            <a href="https://telegram.org" className="text-muted-foreground hover:text-secondary transition-colors"><FaTelegramPlane size={32} /></a>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} BUBA. All rights reserved. This is a meme coin. It has no intrinsic value. Do your own research.</p>
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
