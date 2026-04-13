import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'The Mentor Academy',
    category: 'Coaching / Consulting',
    link: 'https://mentoracademyhub.netlify.app/',
    color: 'from-vice-pink to-vice-purple'
  },
  {
    title: 'Iron Pulse',
    category: 'Fitness / Gym',
    link: 'https://iron-pulsefitness.netlify.app/',
    color: 'from-vice-teal to-vice-blue'
  },
  {
    title: 'The Golden Spoon',
    category: 'Cafe / Restaurant',
    link: 'https://the-goldenspoon.netlify.app/',
    color: 'from-vice-purple to-vice-pink'
  },
  {
    title: 'Indus Law',
    category: 'Law Firm',
    link: 'https://induslaw.netlify.app/',
    color: 'from-vice-blue to-vice-teal'
  },
  {
    title: 'YouDent India',
    category: 'Hospitals / Clinics',
    link: 'https://youdentindia.netlify.app/',
    color: 'from-vice-pink to-vice-teal'
  },
  {
    title: 'SolidStone',
    category: 'Builders / Real Estate',
    link: 'https://solidstone.netlify.app/',
    color: 'from-vice-teal to-vice-purple'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-vice-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-neon tracking-[0.4em] text-vice-teal uppercase mb-4 neon-text-teal">Selected Works</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold">Portfolio <span className="text-white/20">Gallery</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative block"
            >
              <div className="relative overflow-hidden rounded-2xl glass p-8 h-full flex flex-col justify-between border-white/5 group-hover:border-white/20 transition-all duration-500 min-h-[240px]">
                <div>
                  <p className="text-vice-teal text-xs font-neon tracking-widest uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {project.category}
                  </p>
                  <h4 className="text-3xl font-display font-bold mb-4 leading-tight group-hover:text-vice-pink transition-colors duration-500">{project.title}</h4>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Explore Project</span>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-vice-bg shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500`}>
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
