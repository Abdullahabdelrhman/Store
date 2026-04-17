import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, User, LayoutDashboard, Store, 
  Search, Heart, Menu, X, Sparkles, Zap
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [cartCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPath) return null;

  const navLinks = [
    { name: 'شيكولاتة', path: '/category/chocolate', icon: '🍫' },
    { name: 'شيبسي', path: '/category/chips', icon: '🥨' },
    { name: 'مشروبات', path: '/category/drinks', icon: '🥤' },
    { name: 'مكسرات', path: '/category/nuts', icon: '🥜' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
          isScrolled 
            ? 'py-4 bg-[#020617]/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
            : 'py-8 bg-transparent'
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-14">
            
            {/* --- LOGO: Futuristic & Glowing --- */}
            <Link to="/" className="flex items-center gap-4 group relative">
              <div className="relative">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-[1.2rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500">
                  <Zap size={28} fill="currentColor" />
                </div>
                <div className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-white uppercase leading-none group-hover:tracking-widest transition-all duration-500 italic">
                  GLOBAL<span className="text-indigo-500">.</span>
                </span>
                <span className="text-[10px] font-black text-slate-500 tracking-[0.5em] uppercase flex items-center gap-1">
                  Mart <Sparkles size={8} className="text-indigo-400 animate-pulse" />
                </span>
              </div>
            </Link>

            {/* --- DESKTOP NAV: Glass Floating Pills --- */}
            <div className="hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md p-1.5 rounded-[2rem] border border-white/5 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-3 rounded-[1.5rem] text-sm font-black flex items-center gap-3 transition-all duration-500 relative group overflow-hidden ${
                    location.pathname === link.path 
                    ? 'bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-500">{link.icon}</span>
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-indigo-500/10 to-transparent animate-shimmer"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* --- ACTIONS: Tech-Heavy Buttons --- */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Search Bar: Expanding Glass */}
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث في الكوكب..." 
                  className="bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-5 text-xs w-40 focus:w-64 focus:bg-white/10 focus:border-indigo-500/50 text-white placeholder:text-slate-600 transition-all duration-700 outline-none backdrop-blur-xl"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Link to="/admin" className="p-3.5 bg-white/5 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-1">
                  <LayoutDashboard size={20} />
                </Link>
                <Link to="/auth" className="p-3.5 bg-white/5 text-slate-400 hover:text-white hover:bg-purple-600 rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-1">
                  <User size={20} />
                </Link>
              </div>
              
              {/* Cart Button: The "Power" Button */}
              <Link 
                to="/cart" 
                className="relative group p-4 bg-indigo-600 text-white rounded-2xl shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.5)] hover:bg-white hover:text-black transition-all duration-500 active:scale-90"
              >
                <ShoppingCart size={22} className="relative z-10" />
                <span className="absolute -top-2 -left-2 bg-white text-indigo-600 text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-2 border-indigo-600 group-hover:bg-black group-hover:text-white transition-colors shadow-lg">
                  {cartCount}
                </span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-indigo-600 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU: Full Screen Dark Blur --- */}
        <div className={`lg:hidden fixed inset-0 top-0 z-[-1] bg-[#020617]/95 backdrop-blur-[50px] transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full p-10 space-y-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`flex items-center gap-6 text-4xl font-black text-white hover:text-indigo-500 transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <span className="text-5xl">{link.icon}</span> {link.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-10 border-t border-white/10 w-full justify-center">
               <Link to="/auth" className="p-6 bg-white/5 rounded-3xl text-white"><User size={30} /></Link>
               <Link to="/cart" className="p-6 bg-indigo-600 rounded-3xl text-white"><ShoppingCart size={30} /></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* المحتوى بيبدأ هنا - إخفاء المساحة لو في الهوم عشان الهيرو يبدأ من فوق خالص */}
      {!isScrolled && location.pathname === '/' ? null : <div className="h-24 lg:h-32"></div>}
    </>
  );
};

export default Navbar;