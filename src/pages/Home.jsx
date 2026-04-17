import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, Star, Truck, ShieldCheck, Globe, 
  ArrowRight, Sparkles, Zap, Flame, Crown 
} from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- ⬇️ كود جلب البيانات من الـ API (جاهز للعمل) ⬇️ ---
    /*
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          fetch('https://api.yourdomain.com/categories'),
          fetch('https://api.yourdomain.com/products/featured')
        ]);
        setCategories(await catRes.json());
        setProducts(await prodRes.json());
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    */
    // --- ⬆️ كود الـ API ⬆️ ---

    // محاكاة البيانات الخيالية
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'شيكولاتة', slug: 'chocolate', emoji: '🍫', color: 'from-[#432818] to-[#99582a]', shadow: 'shadow-orange-900/20' },
        { id: 2, name: 'شيبسي', slug: 'chips', emoji: '🍿', color: 'from-[#e85d04] to-[#ffba08]', shadow: 'shadow-red-900/20' },
        { id: 3, name: 'مشروبات', slug: 'drinks', emoji: '🥤', color: 'from-[#0077b6] to-[#00b4d8]', shadow: 'shadow-blue-900/20' },
        { id: 4, name: 'مكسرات', slug: 'nuts', emoji: '🥜', color: 'from-[#6c584c] to-[#adc178]', shadow: 'shadow-green-900/20' }
      ]);
      setProducts([
        { id: 101, name: 'سوبريم شوكليت فانتسي', price: 450, rating: 5, emoji: '🍫', tag: 'Premium', desc: 'كاكاو أمازوني خالص' },
        { id: 102, name: 'نار الهالبينو إكستريم', price: 85, rating: 4, emoji: '🔥', tag: 'Trending', desc: 'قرمشة لا تنتهي' },
        { id: 103, name: 'بلو لاجون إلكسير', price: 120, rating: 5, emoji: '💎', tag: 'Limited', desc: 'انتعاش من عالم آخر' },
        { id: 104, name: 'جولدن كاجو رويال', price: 850, rating: 5, emoji: '🏆', tag: 'Luxury', desc: 'محمص بماء الذهب' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-b-4 border-purple-500 border-solid rounded-full animate-spin-slow opacity-50"></div>
        <p className="mt-8 font-black text-indigo-400 tracking-[0.5em] animate-pulse">LOADING_UNIVERSE</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#020617] min-h-screen text-white overflow-hidden">
      
      {/* --- HERO SECTION: THE PORTAL --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 mb-8 animate-bounce">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-xs font-black tracking-[0.3em] uppercase italic">Welcome to the future of taste</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter mb-8 italic">
            GLOBAL<br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">MART</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            نحن لا نبيع الطعام، نحن نبيع <span className="text-white font-bold italic">لحظات السعادة المستوردة</span> من كل بقعة في العالم مباشرة إلى باب منزلك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative bg-white text-black px-12 py-6 rounded-[2rem] font-black text-xl overflow-hidden transition-all hover:pr-16 active:scale-95">
              <span className="relative z-10">ابدأ الرحلة الآن</span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <button className="px-12 py-6 rounded-[2rem] border border-white/10 font-black text-xl hover:bg-white/5 transition-all">
              اكتشف العروض
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURES: FLOATING GLASS --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Globe size={28}/>, title: "شحن كوني", sub: "لكل مكان" },
          { icon: <ShieldCheck size={28}/>, title: "جودة ماسية", sub: "أصلي 100%" },
          { icon: <Zap size={28}/>, title: "سرعة البرق", sub: "توصيل فائق" },
          { icon: <Crown size={28}/>, title: "VIP دعم", sub: "24/7 متاح" }
        ].map((item, i) => (
          <div key={i} className="group bg-white/5 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              {item.icon}
            </div>
            <h4 className="font-black text-white text-lg mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.sub}</p>
          </div>
        ))}
      </section>

      {/* --- CATEGORIES: VIBRANT CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4 text-right" dir="rtl">
            <span className="text-indigo-500 font-black tracking-widest uppercase text-sm">التصنيفات العالمية</span>
            <h2 className="text-5xl md:text-7xl font-black">اختر عالمك الخاص</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className={`group relative h-[450px] rounded-[4rem] overflow-hidden bg-linear-to-b ${cat.color} ${cat.shadow} p-10 transition-all hover:scale-[0.98]`}>
              <span className="absolute top-10 left-10 text-[10rem] opacity-20 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000 select-none">
                {cat.emoji}
              </span>
              <div className="relative z-10 h-full flex flex-col justify-end items-end text-white text-right">
                <h3 className="text-4xl font-black mb-4 tracking-tighter leading-none">{cat.name}</h3>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:w-full transition-all duration-500 overflow-hidden">
                  <ArrowRight size={20} className="group-hover:translate-x-20 transition-all" />
                  <span className="hidden group-hover:block font-black text-xs uppercase tracking-widest">عرض المجموعة</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- BEST SELLERS: NEON GRID --- */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4 text-right" dir="rtl">
              <span className="flex items-center gap-2 text-amber-500 font-black tracking-widest uppercase text-sm">
                <Flame size={16} /> التريند الحالي
              </span>
              <h2 className="text-6xl font-black">الأكثر طلباً 🏆</h2>
            </div>
            <Link className="px-8 py-4 bg-white/5 rounded-2xl font-black hover:bg-white/10 transition-all">مشاهدة الكتالوج كامل</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map(product => (
              <div key={product.id} className="group relative flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-linear-to-b from-white/10 to-transparent rounded-[3.5rem] p-8 flex items-center justify-center text-[9rem] border border-white/5 mb-8 transition-all group-hover:border-indigo-500/30 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 group-hover:scale-110 group-hover:-translate-y-4 transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    {product.emoji}
                  </span>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{product.tag}</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="px-4 text-right space-y-3" dir="rtl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{product.desc}</p>
                  <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                       <span className="text-3xl font-black tracking-tighter">{product.price} <small className="text-xs text-slate-500 font-light italic">EGP</small></span>
                    </div>
                    <button 
                      className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-90"
                    >
                      <ShoppingCart size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-40 text-center">
        <h2 className="text-[15vw] font-black leading-none tracking-[0.05em] opacity-5 select-none mb-[-5vw]">GLOBAL MART</h2>
        <div className="relative z-10">
          <p className="text-2xl font-light text-slate-400 mb-8 italic">هل أنت مستعد لتغيير مفهومك عن الطعام؟</p>
          <button className="bg-indigo-600 px-20 py-8 rounded-[2.5rem] font-black text-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all">
            انضم للنادي الملكي مجاناً
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;