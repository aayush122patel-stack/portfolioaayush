import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-vice-bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-neon font-bold tracking-tighter">
          <span className="text-vice-pink neon-text-pink">A</span>
          <span className="text-vice-teal neon-text-teal">P</span>
        </div>
        
        <div className="text-white/40 text-sm font-light tracking-widest uppercase">
          © {new Date().getFullYear()} Aayush Patel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
