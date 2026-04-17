import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // أضفنا فريمر موشن للنعومة
import { 
  ShoppingCart, User, LayoutDashboard, Search, 
  Menu, X, Sparkles, Zap
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
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'py-3 md:py-4 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
            : 'py-5 md:py-8 bg-transparent'
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-12 md:h-14">
            
            {/* --- LOGO: Adaptive Size --- */}
            <Link to="/" className="flex items-center gap-2 md:gap-4 group relative">
              <div className="relative">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl md:rounded-[1.2rem] flex items-center justify-center text-white shadow-lg group-hover:rotate-[15deg] transition-all duration-500">
                  <Zap size={20} className="md:w-7 md:h-7" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none italic">
                  GLOBAL<span className="text-indigo-500">.</span>
                </span>
                <span className="text-[8px] md:text-[10px] font-black text-slate-500 tracking-[0.3em] md:tracking-[0.5em] uppercase flex items-center gap-1">
                  Mart <Sparkles size={8} className="text-indigo-400" />
                </span>
              </div>
            </Link>

            {/* --- DESKTOP NAV: Hidden on Tablet/Mobile --- */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md p-1 rounded-full border border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-full text-sm font-black flex items-center gap-2 transition-all duration-300 ${
                    location.pathname === link.path 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* --- ACTIONS: Responsive Spacing --- */}
            <div className="flex items-center gap-2 md:gap-5">
              {/* Search: Icon only on small mobile */}
              <div className="relative group hidden sm:block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="ابحث..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-xs w-32 md:w-48 focus:w-60 focus:bg-white/10 text-white outline-none transition-all duration-500"
                />
              </div>
              
              <div className="hidden xs:flex items-center gap-2">
                <Link to="/admin" className="p-2.5 md:p-3.5 bg-white/5 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-all">
                  <LayoutDashboard size={18} className="md:w-5 md:h-5" />
                </Link>
              </div>
              
              {/* Cart Button: Compact on Mini screens */}
              <Link 
                to="/cart" 
                className="relative p-3 md:p-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-xl hover:bg-white hover:text-black transition-all active:scale-90"
              >
                <ShoppingCart size={20} className="md:w-6 md:h-6" />
                <span className="absolute -top-1.5 -left-1.5 bg-white text-indigo-600 text-[9px] md:text-[10px] font-black w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full border border-indigo-600 shadow-md">
                  {cartCount}
                </span>
              </Link>

              {/* Mobile Toggle: Smaller on Mini screens */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white active:bg-indigo-600 transition-all"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU: Optimized for Mini & Short Screens --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-0 z-[-1] bg-[#020617]/98 backdrop-blur-3xl overflow-y-auto"
            >
              <div className="flex flex-col items-center justify-center min-h-screen p-6 pt-24 space-y-4">
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 w-full max-w-sm">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-indigo-600/20 transition-all group"
                    >
                      <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">{link.icon}</span>
                      <span className="text-lg font-black text-white">{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="flex gap-4 w-full max-w-sm pt-8 border-t border-white/10">
                   <Link onClick={() => setIsMenuOpen(false)} to="/auth" className="flex-1 flex items-center justify-center gap-3 p-5 bg-white/5 rounded-2xl text-white font-bold italic"><User size={20}/> حسابي</Link>
                   <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="flex-1 flex items-center justify-center gap-3 p-5 bg-indigo-600 rounded-2xl text-white font-bold italic"><LayoutDashboard size={20}/> لوحتي</Link>
                </div>

                {/* Search for very small mobile (hidden in navbar, shown here) */}
                <div className="w-full max-w-sm sm:hidden pt-4">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input type="text" placeholder="ابحث عن منتج..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 text-white outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacing adjustments */}
      {!isScrolled && location.pathname === '/' ? null : <div className="h-20 md:h-28 lg:h-32"></div>}
    </>
  );
};

export default Navbar;