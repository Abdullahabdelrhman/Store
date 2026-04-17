import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, Star, Filter, SlidersHorizontal, 
  ChevronDown, Heart, CheckCircle, X, Loader, 
  Search, ArrowRight, ShoppingBag, Sparkles, MousePointer2
} from 'lucide-react';

const CategoryPage = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [wishlist, setWishlist] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    price: { min: 0, max: 1000 },
    rating: 0,
    inStock: false
  });

  // تكوين الهوية البصرية "الخيالية" لكل قسم
  const themes = {
    'شيكولاتة': { 
      primary: '#63392b', 
      secondary: '#fcd34d',
      gradient: 'from-[#2d1b15] via-[#63392b] to-[#a36a4f]',
      title: 'عالم الشيكولاتة السحري',
      subtitle: 'استسلم لإغراء المذاق الفاخر مع تشكيلتنا المختارة من الكاكاو الخام.',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1600',
      emoji: '🍫'
    },
    'مشروبات': { 
      primary: '#0c4a6e', 
      secondary: '#38bdf8',
      gradient: 'from-[#082f49] via-[#0c4a6e] to-[#0ea5e9]',
      title: 'واحة الانتعاش القصوى',
      subtitle: 'مشروبات مختصة صُنعت لتمنحك الطاقة والانتعاش في كل رشفة.',
      image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1600',
      emoji: '🥤'
    },
    'شيبسي': { 
      primary: '#9a3412', 
      secondary: '#fbbf24',
      gradient: 'from-[#431407] via-[#9a3412] to-[#ea580c]',
      title: 'قرمشة تتخطى الخيال',
      subtitle: 'نكهات عالمية وقرمشة مثالية تأخذك في رحلة من السعادة.',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1600',
      emoji: '🥨'
    },
    'مكسرات': { 
      primary: '#3f2b1e', 
      secondary: '#d97706',
      gradient: 'from-[#1c1917] via-[#3f2b1e] to-[#78350f]',
      title: 'كنوز الطبيعة الذهبية',
      subtitle: 'طاقة نقية ومذاق أصيل من أجود محاصيل المكسرات العالمية.',
      image: 'https://images.unsplash.com/photo-1596501048741-8609a396b45d?q=80&w=1600',
      emoji: '🥜'
    },
    'default': { 
      primary: '#1e1b4b', 
      secondary: '#818cf8',
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
      await new Promise(r => setTimeout(r, 1200));
      const data = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `${type} ${i % 2 === 0 ? 'بلاتينيوم' : 'إيديشين'} ${i + 1}`,
        brand: "Global Premium",
        price: Math.floor(Math.random() * 500) + 100,
        originalPrice: 800,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        inStock: i !== 3,
        discount: i % 4 === 0 ? 30 : 0,
        img: theme.emoji
      }));
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, [type, theme.emoji]);

  const filteredItems = useMemo(() => {
    return products
      .filter(p => p.price >= selectedFilters.price.min && p.price <= selectedFilters.price.max)
      .filter(p => p.rating >= selectedFilters.rating)
      .filter(p => !selectedFilters.inStock || p.inStock);
  }, [products, selectedFilters]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      <div className="relative">
        <div className="w-24 h-24 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-indigo-400 animate-pulse" size={32} />
        </div>
      </div>
      <h2 className="mt-8 text-white font-black tracking-widest text-xl animate-pulse">LOADING DESTINATION...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden" dir="rtl">
      
      {/* --- HERO SECTION: THE DREAM BANNER --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src={theme.image} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40 scale-110 motion-safe:animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} mix-blend-multiply opacity-60`}></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        {/* Floating Particles/Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-xs font-black tracking-[0.4em] uppercase">Premium Collection</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none animate-in fade-in zoom-in duration-1000 delay-200">
            {theme.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light opacity-80">
            {theme.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button 
               onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
               className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase italic">
                اكتشف المجموعة <ArrowRight size={20} className="rotate-180 transition-transform group-hover:-translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        
        {/* Sticky Glass Control Bar */}
        <div className="sticky top-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 mb-16 flex flex-wrap items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${showFilters ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
               <Filter size={18} />
               الفلاتر
               <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
             </button>
             <div className="h-10 w-px bg-white/10 hidden md:block"></div>
             <p className="text-sm font-bold text-slate-400 hidden md:block">يتم عرض <span className="text-white">{filteredItems.length}</span> تحفة فنية</p>
          </div>

          <div className="flex flex-grow max-w-md relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن اسم المنتج..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-6 outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-4 py-4 rounded-2xl border border-white/10">
             <SlidersHorizontal size={18} className="text-slate-500" />
             <select className="bg-transparent outline-none font-bold text-sm cursor-pointer" onChange={(e) => setSortBy(e.target.value)}>
                <option value="default" className="bg-slate-900">الترتيب الافتراضي</option>
                <option value="low" className="bg-slate-900">الأقل سعراً</option>
                <option value="high" className="bg-slate-900">الأعلى سعراً</option>
             </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] mb-16 animate-in fade-in slide-in-from-top-10 duration-500">
             <div className="space-y-6">
                <h4 className="font-black text-lg flex items-center gap-2 tracking-widest uppercase">نطاق الميزانية</h4>
                <div className="flex gap-4">
                   <div className="flex-1 space-y-2">
                      <span className="text-[10px] text-slate-500 font-black uppercase">الحد الأدنى</span>
                      <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-white/40 transition" placeholder="0" />
                   </div>
                   <div className="flex-1 space-y-2">
                      <span className="text-[10px] text-slate-500 font-black uppercase">الحد الأقصى</span>
                      <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-white/40 transition" placeholder="1000" />
                   </div>
                </div>
             </div>
             
             <div className="space-y-6">
                <h4 className="font-black text-lg tracking-widest uppercase">الجودة والتقييم</h4>
                <div className="flex flex-wrap gap-3">
                   {[5, 4, 3].map(s => (
                     <button key={s} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all font-bold text-sm flex items-center gap-2 group">
                        {s} <Star size={14} className="group-hover:fill-amber-400 transition-colors" />
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-6 flex flex-col justify-center">
                <label className="flex items-center gap-4 cursor-pointer group">
                   <div className="relative w-14 h-7 bg-white/10 rounded-full border border-white/10 transition-colors group-hover:bg-white/20">
                      <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform"></div>
                   </div>
                   <span className="font-black text-sm uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">المتوفر في المخازن فقط</span>
                </label>
             </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredItems.map((product, idx) => (
            <div 
              key={product.id} 
              className="group relative bg-linear-to-b from-white/[0.08] to-transparent border border-white/[0.05] rounded-[2.5rem] p-4 transition-all duration-500 hover:border-white/20 hover:-translate-y-3"
            >
              {/* Product Visual */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-900/50 flex items-center justify-center text-8xl mb-6">
                <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <span className="relative z-10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  {product.img}
                </span>
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => setWishlist(prev => wishlist.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id])}
                  className={`absolute top-4 left-4 p-4 rounded-2xl backdrop-blur-md border border-white/10 transition-all hover:scale-110 ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
                >
                  <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Product Meta */}
              <div className="px-2 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase">{product.brand}</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{product.name}</h3>
                
                <div className="flex items-end justify-between pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 line-through font-bold">{product.originalPrice} EGP</p>
                    <p className="text-2xl font-black text-white flex items-baseline gap-1">
                      {product.price} <span className="text-[10px] font-light text-slate-400 tracking-widest uppercase">EGP</span>
                    </p>
                  </div>
                  
                  <button className="relative w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                     <ShoppingCart size={24} />
                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </button>
                </div>
              </div>

              {/* Badges */}
              {product.discount > 0 && (
                <div className="absolute -top-3 -right-3 bg-linear-to-r from-red-600 to-rose-400 text-white px-4 py-1.5 rounded-xl text-[10px] font-black italic shadow-xl">
                  SPECIAL -{product.discount}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- FLOATING DECOR --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Footer Styling Patch */}
      <div className="py-20"></div>
    </div>
  );
};

export default CategoryPage;