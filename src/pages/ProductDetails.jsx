import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Heart, Star, ShieldCheck, Truck, 
  RotateCcw, Plus, Minus, Sparkles, ArrowRight, Share2 
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // جزئية الـ API (جاهزة للربط)
  // ==========================================================
  /*
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // نستخدم الـ id القادم من الرابط لجلب بيانات المنتج المحددة
        const response = await fetch(`https://api.yourdomain.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // يمكنك توجيه المستخدم لصفحة 404 في حال الخطأ
        // navigate('/404'); 
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);
  */

  // محاكاة تحميل البيانات (Simulation) - احذف هذا الجزء عند تفعيل الـ API الفعلي
  useEffect(() => {
    setTimeout(() => {
      setProduct({
        id: id,
        name: "إصدار بلاتينيوم المحدود",
        brand: "GLOBAL EXCLUSIVE",
        price: 599,
        originalPrice: 850,
        rating: 4.9,
        reviews: 245,
        description: "هذا المنتج يمثل قمة الجودة والاتقان. تم اختياره بعناية فائقة من أجود المصادر العالمية ليقدم لك تجربة استثنائية لا تضاهى في المذاق والجودة.",
        image: "🍫", // في الحقيقة سيكون رابط صورة URL
        stock: 15,
        category: "شيكولاتة"
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 overflow-hidden" dir="rtl">
      
      {/* --- الخلفية الديكورية --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-[10%] -left-20 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-12 uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>الرئيسية</span>
          <ArrowRight size={14} className="rotate-180" />
          <span className="hover:text-white cursor-pointer" onClick={() => navigate(`/category/${product.category}`)}>{product.category}</span>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-indigo-400">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* --- الجانب الأيمن: صورة المنتج بتأثير زجاجي --- */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-[4rem] bg-linear-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-[15rem] shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-radial-gradient from-indigo-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               
               {/* الصورة العائمة */}
               <span className="relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.3)] motion-safe:animate-bounce [animation-duration:3s]">
                 {product.image}
               </span>

               {/* شارات مميزة */}
               <div className="absolute top-10 right-10 flex flex-col gap-3">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Limited Edition</span>
                  </div>
               </div>

               {/* Share Button */}
               <button className="absolute bottom-10 left-10 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                  <Share2 size={20} />
               </button>
            </div>
          </div>

          {/* --- الجانب الأيسر: تفاصيل المنتج --- */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-indigo-400 font-black text-sm tracking-[0.4em] uppercase mb-4 block">{product.brand}</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">{product.name}</h1>
              
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-700"} />
                  ))}
                  <span className="mr-2 font-black text-lg">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <span className="text-slate-500 font-bold text-sm italic">{product.reviews} مراجعة موثقة</span>
              </div>
            </div>

            <div className="py-8 border-y border-white/10 mb-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-slate-500 line-through text-lg font-bold">{product.originalPrice} EGP</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black tracking-tighter">{product.price}</span>
                  <span className="text-sm font-light text-slate-400 tracking-[0.2em] uppercase">EGP</span>
                </div>
              </div>
              
              <div className="text-left">
                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">حالة التوفر</p>
                <p className="text-sm font-bold">{product.stock > 0 ? `متوفر في المخزن (${product.stock})` : 'نفذت الكمية'}</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 leading-relaxed font-light mb-12 italic">
              "{product.description}"
            </p>

            {/* التحكم في الكمية والإضافة للسلة */}
            <div className="flex flex-col sm:flex-row items-stretch gap-6 mb-12">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-3xl p-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="w-16 text-center font-black text-2xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button className="flex-1 bg-white text-black rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 group">
                <ShoppingCart size={24} className="group-hover:-translate-y-1 transition-transform" />
                إضافة لرحلة التسوق
              </button>

              <button className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all group">
                <Heart size={28} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* ثقة العميل */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Truck, text: "شحن مبرد فاخر" },
                { icon: ShieldCheck, text: "أصلي 100%" },
                { icon: RotateCcw, text: "ارجاع مجاني" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <item.icon size={20} className="text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;