import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, UserPlus, Mail, Lock, User, ArrowLeft, 
  Eye, EyeOff, Shield, ShoppingBag, Star, Sparkles,
  CheckCircle2, Globe
} from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.username.trim()) newErrors.username = 'اسم المستخدم مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    else if (formData.password.length < 6) newErrors.password = 'يجب أن تكون 6 أحرف على الأقل';
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const isAdmin = formData.email === 'admin@globalmart.com' && formData.password === 'admin123';
      
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('isLoggedIn', 'true');
      
      if (isAdmin) {
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('userRole', 'user');
        navigate('/');
      }
    } catch (err) {
      alert("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-4 md:p-8 relative overflow-hidden" dir="rtl">
      
      {/* عناصر الخلفية الفنية (Background Blobs) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full bg-white/[0.03] backdrop-blur-3xl rounded-[3.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row-reverse border border-white/10"
      >
        
        {/* الجانب الأيمن: العرض البصري (Hero Section) */}
        <div className="lg:w-1/2 bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-900 p-12 md:p-20 text-white flex flex-col justify-between relative overflow-hidden">
          {/* نمط زخرفي في الخلفية */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Globe className="absolute -bottom-20 -left-20 w-96 h-96" />
          </div>

          <div className="relative z-10">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                <ShoppingBag size={30} className="text-indigo-200" />
              </div>
              <h2 className="text-2xl font-black tracking-widest">GLOBAL <span className="text-indigo-300">MART</span></h2>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.15]">
                  {isLogin ? 'نراك مجدداً في القمة' : 'بوابتك لعالم من الفخامة'}
                </h1>
                <p className="text-indigo-100/70 text-xl leading-relaxed mb-12 max-w-md">
                  {isLogin ? 'أكمل رحلتك واستكشف أحدث ما وصلنا من العلامات التجارية العالمية.' : 'انضم إلينا اليوم واكتشف تجربة تسوق تفوق الخيال بلمسة واحدة.'}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: CheckCircle2, text: 'وصول حصري للمنتجات النادرة' },
                { icon: Sparkles, text: 'نظام ولاء بخصومات تصاعدية' }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  key={i} 
                  className="flex items-center gap-4 group"
                >
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/20 transition-all">
                    <item.icon size={22} className="text-indigo-300" />
                  </div>
                  <span className="text-lg font-medium text-indigo-50 leading-none">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 flex items-center justify-around text-center">
            <div className="space-y-1">
              <h4 className="text-3xl font-black">99%</h4>
              <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest">رضا العملاء</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="space-y-1">
              <h4 className="text-3xl font-black">24h</h4>
              <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest">توصيل سريع</p>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: الفورم الاحترافي */}
        <div className="lg:w-1/2 p-8 md:p-20 flex items-center justify-center bg-white relative">
          <div className="w-full max-w-md">
            
            {/* التبديل بين الدخول والتسجيل (Glass Slider) */}
            <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem] mb-12 relative shadow-inner">
              <motion.div 
                layout
                className="absolute inset-y-1.5 bg-white rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                style={{ 
                  width: 'calc(50% - 6px)', 
                  right: isLogin ? '6px' : 'auto', 
                  left: isLogin ? 'auto' : '6px' 
                }}
              />
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 relative z-10 py-3.5 text-sm font-black transition-all ${isLogin ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 relative z-10 py-3.5 text-sm font-black transition-all ${!isLogin ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                إنشاء حساب
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-2">اسم المستخدم</label>
                    <div className="relative">
                       <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <input 
                        name="username" type="text"
                        className={`w-full pr-12 pl-6 py-4 bg-slate-50 border ${errors.username ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 shadow-sm`}
                        placeholder="الاسم الكامل"
                        value={formData.username} onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    name="email" type="email"
                    className={`w-full pr-12 pl-6 py-4 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 shadow-sm`}
                    placeholder="name@example.com"
                    value={formData.email} onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 pr-2">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    name="password" type={showPassword ? "text" : "password"}
                    className={`w-full pr-12 pl-6 py-4 bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 shadow-sm`}
                    placeholder="••••••••"
                    value={formData.password} onChange={handleChange}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all" /> 
                    <span className="group-hover:text-slate-600">تذكرني</span>
                  </label>
                  <button type="button" className="text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors">نسيت كلمة السر؟</button>
                </div>
              )}

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit" disabled={loading}
                className="w-full h-[64px] bg-[#0f172a] hover:bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200/50 flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-70 overflow-hidden relative"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>جاري التحقق...</span>
                  </div>
                ) : (
                  <>
                    <span>{isLogin ? 'دخول آمن' : 'إنشاء حساب فوري'}</span>
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-12">
               <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-300">
                    <span className="bg-white px-4">أو استخدم بيانات الاختبار</span>
                  </div>
               </div>
               
               <div className="p-5 bg-indigo-50/50 rounded-[1.5rem] border border-indigo-100 border-dashed text-center group hover:bg-indigo-50 transition-colors cursor-copy">
                  <p className="text-[11px] font-mono text-indigo-500 font-bold leading-none mb-1">ADMIN ACCESS</p>
                  <p className="text-sm font-bold text-slate-600">admin@globalmart.com • admin123</p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;