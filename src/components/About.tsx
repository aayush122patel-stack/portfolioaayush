import React from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Layout, Globe, Zap, Shield } from 'lucide-react';

const skills = [
  { name: 'UI/UX Design', icon: Palette, color: 'text-vice-pink' },
  { name: 'Web Development', icon: Code2, color: 'text-vice-teal' },
  { name: 'Responsive Layouts', icon: Layout, color: 'text-vice-purple' },
  { name: 'SEO Optimization', icon: Globe, color: 'text-vice-blue' },
  { name: 'Performance', icon: Zap, color: 'text-vice-pink' },
  { name: 'Security', icon: Shield, color: 'text-vice-teal' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-vice-purple/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-neon tracking-[0.4em] text-vice-pink uppercase mb-4 neon-text-pink">About Me</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Designing the <span className="text-vice-teal">Future</span> of the Web
          </h3>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            I'm Aayush Patel, a professional web designer dedicated to creating high-performance, 
            aesthetically striking digital solutions. With a focus on modern design principles 
            and cutting-edge technology, I help brands stand out in the digital landscape.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass p-8 rounded-2xl hover:border-white/20 transition-all duration-300 group"
            >
              <skill.icon className={`${skill.color} mb-4 group-hover:scale-110 transition-transform duration-300`} size={32} />
              <h4 className="font-display font-bold text-lg">{skill.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
