import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Zap, 
  Target, 
  Cpu, 
  Users, 
  Rocket 
} from 'lucide-react';
import { FadeIn } from './Layout';

const AboutUs = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className={`absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full -z-10 ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Founder Image */}
          <FadeIn direction="right" className="relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-primary/10 aspect-[3/4] md:aspect-auto max-w-sm md:max-w-md mx-auto lg:mx-0">
                <motion.img 
                  src="https://lh3.googleusercontent.com/d/1-AO7friQamF6S3E7-TYHAq7rWGHW-Iz3" 
                  alt="Mohammad Asif Saifi - Founder of Clickzain" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
                
                {/* Founder Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 glass p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/10">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">Mohammad Asif Saifi</h3>
                  <p className="text-brand-primary text-[10px] md:text-sm font-bold uppercase tracking-widest">Founder & CEO</p>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <motion.div 
                className="absolute -top-4 -right-2 md:-top-6 md:right-0 glass p-3 md:p-4 rounded-xl md:rounded-2xl z-20 border border-brand-primary/30"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                    <Award className="text-black w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">8+</div>
                    <div className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">Years Experience</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Results Badge */}
              <motion.div 
                className="absolute top-1/3 -left-6 md:-left-12 glass p-3 md:p-4 rounded-xl md:rounded-2xl z-20 border border-white/10 hidden sm:block"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-brand-primary w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-white">Data-Driven</div>
                    <div className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">Strategies</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </FadeIn>

          {/* Right Side: Content */}
          <FadeIn direction="left" className="order-1 lg:order-2">
            <div className="space-y-6 md:space-y-8">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6"
                >
                  <Zap className="text-brand-primary w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">About Clickzain</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                  Expertise in Growth, <br />
                  <span className="gradient-text">Driven by Results</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  At <span className="text-white font-semibold">Clickzain Digital Solutions</span>, we specialize in helping businesses grow digitally through performance-driven marketing strategies. Our approach combines deep industry expertise with advanced digital tools to deliver measurable growth and high-intent leads.
                </p>
              </div>

              {/* Founder Intro */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="text-brand-primary w-5 h-5" />
                  Our Core Philosophy
                </h4>
                <p className="text-white/60 leading-relaxed italic">
                  "With over 8 years of expertise in Lead Generation and Digital Marketing, our focus is on delivering real value. We specialize in Meta Ads, Google Ads, and tailored performance strategies that don't just generate clicks—they drive business growth and revenue."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-brand-primary/40" />
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest">— Mohammad Asif Saifi</span>
                </div>
              </div>

              {/* Specialties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Target, text: "Performance Marketing" },
                  { icon: Users, text: "Lead Generation Specialists" },
                  { icon: Rocket, text: "Modern Web Development" },
                  { icon: Zap, text: "Social Media Strategy" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-brand-primary/30 transition-colors">
                    <item.icon className="text-brand-primary w-5 h-5" />
                    <span className="text-sm font-medium text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* USP & Mission */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-brand-primary w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-1">Next-Level Growth USP</h5>
                    <p className="text-white/50 text-sm">
                      We leverage data-driven strategies and cutting-edge AI tools to ensure your business stays ahead of the curve.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xl font-display font-medium text-white/90">
                    "Empowering brands to scale <span className="text-brand-primary">smarter, faster, and better.</span>"
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
