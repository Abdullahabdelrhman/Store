import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Star, Filter, SlidersHorizontal, 
  ChevronDown, Heart, Search, ArrowRight, Sparkles
} from 'lucide-react';

const CategoryPage = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // الفلاتر
  const [selectedFilters, setSelectedFilters] = useState({
    priceMin: 0,
    priceMax: 2000,
    rating: 0,
    inStock: false
  });

  const themes = {
    'شيكولاتة': { 
      gradient: 'from-[#2d1b15] via-[#63392b] to-[#a36a4f]',
      title: 'عالم الشيكولاتة السحري',
      subtitle: 'استسلم لإغراء المذاق الفاخر مع تشكيلتنا المختارة من الكاكاو الخام.',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1600',
      emoji: '🍫'
    },
    'مشروبات': { 
      gradient: 'from-[#082f49] via-[#0c4a6e] to-[#0ea5e9]',
      title: 'واحة الانتعاش القصوى',
      subtitle: 'مشروبات مختصة صُنعت لتمنحك الطاقة والانتعاش في كل رشفة.',
      image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1600',
      emoji: '🥤'
    },
    'شيبسي': { 
      gradient: 'from-[#431407] via-[#9a3412] to-[#ea580c]',
      title: 'قرمشة تتخطى الخيال',
      subtitle: 'نكهات عالمية وقرمشة مثالية تأخذك في رحلة من السعادة.',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1600',
      emoji: '🥨'
    },
    'مكسرات': { 
      gradient: 'from-[#1c1917] via-[#3f2b1e] to-[#78350f]',
      title: 'كنوز الطبيعة الذهبية',
      subtitle: 'طاقة نقية ومذاق أصيل من أجود محاصيل المكسرات العالمية.',
      image: 'https://images.unsplash.com/photo-1596501048741-8609a396b45d?q=80&w=1600',
      emoji: '🥜'
    },
    'default': { 
      gradient: 'from-[#0f172a] via-[#1e1b4b] to-[#4338ca]',
      title: 'GLOBAL MART PREMIER',
      subtitle: 'ننتقي لك الأفضل من كل ركن في العالم.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600',
      emoji: '✨'
    }
  };

  const theme = themes[type] || themes.default;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      const data = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `${type} ${i % 2 === 0 ? 'بلاتينيوم' : 'إيديشين'} ${i + 1}`,
        brand: "Global Premium",
        price: Math.floor(Math.random() * 900) + 50,
        originalPrice: 1000,
        rating: (4.0 + Math.random() * 1.0).toFixed(1),
        inStock: i !== 5,
        discount: i % 4 === 0 ? 25 : 0,
        img: theme.emoji
      }));
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, [type, theme.emoji]);

  // منطق الفلترة والترتيب المشترك
  const filteredItems = useMemo(() => {
    let result = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.price >= selectedFilters.priceMin && 
      p.price <= selectedFilters.priceMax &&
      p.rating >= selectedFilters.rating &&
      (!selectedFilters.inStock || p.inStock)
    );

    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [products, selectedFilters, searchTerm, sortBy]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-20 h-20 border-t-4 border-indigo-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]"
      />
      <h2 className="mt-8 text-white font-black tracking-[0.3em] animate-pulse uppercase">Entering Destination...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white" dir="rtl">
      
      {/* --- HERO: THE DREAM BANNER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={theme.image} className="w-full h-full object-cover opacity-30 scale-105" alt="" />
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} mix-blend-color-dodge opacity-40`} />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-[10px] font-black tracking-widest uppercase">Premium Edition</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight drop-shadow-2xl">
            {theme.title}
          </motion.h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            {theme.subtitle}
          </p>
        </div>
      </section>

      {/* --- CONTENT: Product Galaxy --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 relative z-20 pb-20">
        
        {/* Sticky Control Bar */}
        <div className="sticky top-24 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 md:p-4 mb-12 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs transition-all ${showFilters ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
            >
              <Filter size={16} /> الفلاتر
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <p className="hidden sm:block text-[10px] font-bold text-slate-500 mr-4">عرض {filteredItems.length} عنصر</p>
          </div>

          <div className="flex-1 max-w-sm relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في هذه الفئة..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-xs outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs font-bold outline-none cursor-pointer">
              <option value="default" className="bg-slate-900">الافتراضي</option>
              <option value="low" className="bg-slate-900">أقل سعر</option>
              <option value="high" className="bg-slate-900">أعلى سعر</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white/[0.02] border border-white/5 rounded-[2rem] mb-12 px-8"
            >
              <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">نطاق السعر</h4>
                  <div className="flex items-center gap-4">
                    <input type="number" value={selectedFilters.priceMin} onChange={(e) => setSelectedFilters({...selectedFilters, priceMin: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs" placeholder="Min" />
                    <span className="text-slate-600">-</span>
                    <input type="number" value={selectedFilters.priceMax} onChange={(e) => setSelectedFilters({...selectedFilters, priceMax: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs" placeholder="Max" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">الحد الأدنى للتقييم</h4>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        onClick={() => setSelectedFilters({...selectedFilters, rating: star})}
                        className={`p-2 rounded-lg border transition-all ${selectedFilters.rating === star ? 'bg-amber-400 border-amber-400 text-black' : 'bg-white/5 border-white/10 text-slate-400'}`}
                      >
                        <Star size={14} fill={selectedFilters.rating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={selectedFilters.inStock} onChange={(e) => setSelectedFilters({...selectedFilters, inStock: e.target.checked})} className="w-5 h-5 accent-indigo-500" />
                    <span className="text-xs font-bold text-slate-300">متوفر فقط في المخزن</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filteredItems.map((product) => (
            <motion.div 
              layout
              key={product.id} 
              className="group relative bg-white/[0.03] border border-white/5 rounded-[2rem] p-4 hover:border-white/20 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative aspect-square rounded-[1.5rem] bg-slate-900/50 flex items-center justify-center text-7xl mb-6 overflow-hidden">
                <span className="group-hover:scale-125 group-hover:rotate-6 transition-transform duration-700 block drop-shadow-2xl">
                  {product.img}
                </span>
                
                <button 
                  onClick={() => setWishlist(p => p.includes(product.id) ? p.filter(id => id !== product.id) : [...p, product.id])}
                  className={`absolute top-4 left-4 p-3 rounded-xl border transition-all ${wishlist.includes(product.id) ? 'bg-red-500 border-red-500' : 'bg-black/20 border-white/10 text-white/40 hover:text-white'}`}
                >
                  <Heart size={16} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase">{product.brand}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-4 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 line-through">{product.originalPrice} EGP</p>
                    <p className="text-xl font-black text-white">{product.price} <span className="text-[10px] font-light">EGP</span></p>
                  </div>
                  <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-90">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>

              {product.discount > 0 && (
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-[9px] font-black italic shadow-2xl">
                  -{product.discount}% OFF
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;