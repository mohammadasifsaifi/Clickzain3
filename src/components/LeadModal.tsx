import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  User,
  Mail,
  Building2,
  Wallet,
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  MessageSquare,
  Zap,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_su9i5j4";
const EMAILJS_TEMPLATE_ID = "template_m3v75dt";
const EMAILJS_PUBLIC_KEY = "zFecskDa-s4XPcaLr";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LeadModal = ({ isOpen, onClose, onSuccess }: LeadModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    monthlyBudget: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.monthlyBudget)
      newErrors.monthlyBudget = "Please select a budget";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          business_name: formData.businessName,
          monthly_budget: formData.monthlyBudget,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setTimeout(() => {
        onClose();
        onSuccess();
        setTimeout(() => {
          setStatus("idle");
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            businessName: "",
            monthlyBudget: "",
            message: "",
          });
        }, 500);
      }, 1500);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.text || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      businessName: "",
      monthlyBudget: "",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col overflow-y-auto scrollbar-hide"
        >
          {/* Background Decorative Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px] animate-pulse'}`} />
            <div
              className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px] animate-pulse'}`}
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Header / Close Button */}
          <div className="relative z-10 flex justify-between items-center px-6 py-8 md:px-12">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                <X size={20} />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">
                Back to Home
              </span>
            </button>
            <div className="hidden md:block">
              <div className="text-2xl font-display font-black tracking-tighter text-white">
                CLICKZAIN
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
            <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Left Side: Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8">
                  <Zap size={14} />
                  <span>AI-Powered Lead Generation</span>
                </div>
                <h2 className="text-6xl xl:text-7xl font-display font-black text-white mb-8 leading-[1.1] tracking-tighter">
                  Let’s Scale Your Business with{" "}
                  <span className="gradient-text">Smart Ads 🚀</span>
                </h2>
                <p className="text-white/60 text-xl mb-12 max-w-lg leading-relaxed">
                  Stop guessing and start growing. Our AI-driven systems find
                  your ideal customers and convert them into high-value leads
                  automatically.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle2,
                      text: "Data-Driven Audience Targeting",
                    },
                    { icon: CheckCircle2, text: "AI-Optimized Ad Creatives" },
                    {
                      icon: CheckCircle2,
                      text: "High-Conversion Landing Pages",
                    },
                    {
                      icon: CheckCircle2,
                      text: "End-to-End Campaign Management",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                        <item.icon className="text-brand-primary w-5 h-5" />
                      </div>
                      <span className="text-white/80 font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Side: Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="glass p-6 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  {/* Form Success State */}
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-primary/20">
                          <CheckCircle2 className="text-brand-primary w-12 h-12" />
                        </div>
                        <h3 className="text-4xl font-display font-bold text-white mb-6">
                          ✅ Thank you!
                        </h3>
                        <p className="text-white/50 text-lg mb-12">
                          {status === "success" && errorMessage
                            ? errorMessage
                            : "Our team will contact you shortly to schedule your free strategy call."}
                        </p>
                        <button
                          onClick={handleReset}
                          className="btn-primary w-full py-5"
                        >
                          Back to Home
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key="form">
                        <div className="lg:hidden mb-10">
                          <h2 className="text-4xl font-display font-black text-white mb-4 tracking-tighter">
                            LET'S SCALE 🚀
                          </h2>
                          <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
                            Get your free AI marketing audit
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="grid md:grid-cols-2 gap-5">
                            <div className="relative group">
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
                                <User size={18} />
                              </div>
                              <input
                                required
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    fullName: e.target.value,
                                  })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                              />
                              {errors.fullName && (
                                <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-2">
                                  {errors.fullName}
                                </p>
                              )}
                            </div>

                            <div className="relative group">
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
                                <Phone size={18} />
                              </div>
                              <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                              />
                              {errors.phone && (
                                <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-2">
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
                              <Mail size={18} />
                            </div>
                            <input
                              required
                              type="email"
                              placeholder="Email Address"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                            />
                            {errors.email && (
                              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-2">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
                              <Building2 size={18} />
                            </div>
                            <input
                              type="text"
                              placeholder="Business Name"
                              value={formData.businessName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  businessName: e.target.value,
                                })
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                            />
                            {errors.businessName && (
                              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-2">
                                {errors.businessName}
                              </p>
                            )}
                          </div>

                          <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
                              <Wallet size={18} />
                            </div>
                            <select
                              value={formData.monthlyBudget}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  monthlyBudget: e.target.value,
                                })
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all appearance-none"
                            >
                              <option
                                value=""
                                disabled
                                className="bg-[#0a0a0a]"
                              >
                                Monthly Ads Budget
                              </option>
                              <option
                                value="₹10K – ₹30K"
                                className="bg-[#0a0a0a]"
                              >
                                ₹10K – ₹30K
                              </option>
                              <option
                                value="₹30K – ₹70K"
                                className="bg-[#0a0a0a]"
                              >
                                ₹30K – ₹70K
                              </option>
                              <option
                                value="₹70K – ₹1 Lakh"
                                className="bg-[#0a0a0a]"
                              >
                                ₹70K – ₹1 Lakh
                              </option>
                              <option value="₹1 Lakh+" className="bg-[#0a0a0a]">
                                ₹1 Lakh+
                              </option>
                            </select>
                            {errors.monthlyBudget && (
                              <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-2">
                                {errors.monthlyBudget}
                              </p>
                            )}
                          </div>

                          <div className="relative group">
                            <div className="absolute left-5 top-6 text-white/20 group-focus-within:text-brand-primary transition-colors">
                              <MessageSquare size={18} />
                            </div>
                            <textarea
                              placeholder="Message (Optional)"
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20 resize-none"
                            />
                          </div>

                          {status === "error" && (
                            <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                              {errorMessage}
                            </p>
                          )}

                          <button
                            disabled={status === "submitting"}
                            type="submit"
                            className="w-full relative group py-5 bg-brand-primary text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,255,136,0.2)] disabled:opacity-50 disabled:hover:scale-100 mt-4"
                          >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center justify-center gap-3 text-lg">
                              {status === "submitting" ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Get Free Consultation
                                  <Send size={18} />
                                </>
                              )}
                            </span>
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
