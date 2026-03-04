import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-vice-pink/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-vice-teal/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-vice-teal font-neon tracking-[0.3em] uppercase text-sm md:text-base mb-4 neon-text-teal">
            Creative Web Designer
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-6 leading-none">
            Aayush <span className="text-transparent bg-clip-text bg-gradient-to-r from-vice-pink via-vice-purple to-vice-teal">Patel</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10">
            Crafting immersive digital experiences with a touch of neon and high-tech aesthetics. 
            Turning visions into vibrant realities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-vice-pink text-vice-bg font-bold rounded-full tracking-widest uppercase text-sm hover:shadow-[0_0_20px_rgba(255,113,206,0.6)] transition-all duration-300"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-vice-teal text-vice-teal font-bold rounded-full tracking-widest uppercase text-sm hover:bg-vice-teal/10 transition-all duration-300 neon-border-teal"
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
