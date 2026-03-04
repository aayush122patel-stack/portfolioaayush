import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, ChevronDown, Facebook, Instagram } from 'lucide-react';

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
  </svg>
);

const services = [
  'Web Design',
  'UI/UX Design',
  'Frontend Development',
  'Backend Development',
  'Branding & Visual Identity'
];

const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/profile.php?id=61588300119791', 
    icon: Facebook, 
    color: 'hover:text-[#1877F2]' 
  },
  { 
    name: 'X', 
    href: 'https://x.com/WebVante_', 
    icon: XIcon, 
    color: 'hover:text-[#FFFFFF]' 
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/webvante_/', 
    icon: Instagram, 
    color: 'hover:text-[#E4405F]' 
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.name)) newErrors.name = 'Only alphabets allowed';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.mobile) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = '10 digits required';

    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', mobile: '', service: '', message: '' });
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          throw new Error(result.error || 'Failed to send message');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, mobile: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, name: value });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-vice-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-neon tracking-[0.4em] text-vice-teal uppercase mb-4 neon-text-teal">Get In Touch</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold">Let's Create <span className="text-vice-pink">Magic</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl flex items-start gap-6">
              <div className="w-12 h-12 bg-vice-pink/10 rounded-2xl flex items-center justify-center text-vice-pink">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-1">Email Me</h4>
                <p className="text-xl font-display font-bold">aayush2212designer@gmail.com</p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex items-start gap-6">
              <div className="w-12 h-12 bg-vice-teal/10 rounded-2xl flex items-center justify-center text-vice-teal">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-1">Call Me</h4>
                <p className="text-xl font-display font-bold">9022475528</p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex items-start gap-6">
              <div className="w-12 h-12 bg-vice-purple/10 rounded-2xl flex items-center justify-center text-vice-purple">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-1">Location</h4>
                <p className="text-xl font-display font-bold">Mumbai, India</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h4 className="text-white/40 text-xs uppercase tracking-widest mb-6 ml-2">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/40 transition-all duration-300 ${social.color} hover:border-current/20`}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-vice-teal/20 rounded-full flex items-center justify-center text-vice-teal mx-auto neon-border-teal">
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Send size={40} />
                  </motion.div>
                </div>
                <h3 className="text-3xl font-display font-bold text-white">Message Sent!</h3>
                <p className="text-white/60 max-w-xs mx-auto">
                  Thank you for reaching out. I've received your inquiry and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-vice-teal text-xs uppercase tracking-widest font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleNameChange}
                      placeholder="John Doe"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-vice-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-vice-teal transition-colors`}
                    />
                    {errors.name && <p className="text-[10px] text-vice-pink uppercase tracking-widest ml-2">{errors.name}</p>}
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-vice-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-vice-teal transition-colors`}
                    />
                    {errors.email && <p className="text-[10px] text-vice-pink uppercase tracking-widest ml-2">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">Mobile Number</label>
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      placeholder="1234567890"
                      className={`w-full bg-white/5 border ${errors.mobile ? 'border-vice-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-vice-teal transition-colors`}
                    />
                    {errors.mobile && <p className="text-[10px] text-vice-pink uppercase tracking-widest ml-2">{errors.mobile}</p>}
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-2">Service</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full bg-white/5 border ${errors.service ? 'border-vice-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-vice-teal transition-colors appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-vice-bg">Select a Service</option>
                        {services.map(service => (
                          <option key={service} value={service} className="bg-vice-bg">{service}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" size={18} />
                    </div>
                    {errors.service && <p className="text-[10px] text-vice-pink uppercase tracking-widest ml-2">{errors.service}</p>}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs uppercase tracking-widest text-white/40 ml-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your vision..."
                    className={`w-full bg-white/5 border ${errors.message ? 'border-vice-pink' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-vice-teal transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-vice-pink uppercase tracking-widest ml-2">{errors.message}</p>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-vice-teal/50 cursor-not-allowed' : 'bg-vice-teal'} text-vice-bg font-bold py-4 rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(1,255,255,0.4)] transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <>Processing... <div className="w-4 h-4 border-2 border-vice-bg border-t-transparent rounded-full animate-spin" /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
