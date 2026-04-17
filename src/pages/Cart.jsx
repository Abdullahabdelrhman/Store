import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowRight, CreditCard, 
  ShoppingBag, Truck, Shield, Tag, Heart, 
  CheckCircle, Sparkles, Zap 
} from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "شيكولاتة سويسرية فاخرة", price: 150, quantity: 2, img: "🍫", discount: 10 },
    { id: 2, name: "مشروب كرز ياباني", price: 60, quantity: 1, img: "🥤", discount: 0 },
    { id: 3, name: "شيبسي حار كوري", price: 45, quantity: 3, img: "🍿", discount: 5 },
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = cartItems.reduce((acc, item) => acc + ((item.price * item.discount / 100) * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount - couponDiscount + shipping;

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 blur-[80px]"></div>
            <h1 className="text-5xl font-black tracking-tighter mb-2 flex items-center gap-4">
              <ShoppingBag size={45} className="text-indigo-500" />
              حقيبة <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-purple-400">كنوزك</span>
            </h1>
            <p className="text-slate-400 flex items-center gap-2 mr-2">
              لديك <span className="text-white font-bold">{cartItems.length}</span> قطع جاهزة للانطلاق
            </p>
          </div>
          <Link to="/" className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl border border-white/5 transition-all">
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-bold">استمر في الاستكشاف</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* --- Cart Items List --- */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.id} className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-white/[0.05] hover:border-indigo-500/30">
                  {/* Image/Emoji Section */}
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {item.img}
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="text-xl font-black mb-1">{item.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <span className="text-indigo-400 font-bold">{item.price} ج.م</span>
                      {item.discount > 0 && (
                        <span className="bg-rose-500/10 text-rose-500 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/20 font-black">
                          خصم {item.discount}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center bg-black/40 rounded-2xl p-1 border border-white/5">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white/5 rounded-xl text-indigo-400 hover:text-white transition-colors">
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="flex sm:flex-col items-center gap-4">
                    <span className="text-xl font-black text-white">{item.price * item.quantity} <span className="text-[10px] text-slate-500">ج.م</span></span>
                    <button onClick={() => removeItem(item.id)} className="p-3 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                <div className="inline-flex p-8 bg-indigo-500/10 rounded-full text-indigo-500 mb-6">
                  <ShoppingBag size={60} />
                </div>
                <h2 className="text-3xl font-black mb-4">سلتك فارغة تماماً!</h2>
                <p className="text-slate-400 mb-8">الكوكب مليء بالمنتجات الرائعة، لا تجعل سلتك تحزن.</p>
                <Link to="/" className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all inline-block shadow-lg shadow-indigo-600/20">
                  اذهب للتسوق الآن
                </Link>
              </div>
            )}
          </div>

          {/* --- Checkout Summary --- */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Zap size={24} className="text-yellow-400 fill-yellow-400" />
                  ملخص العملية
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي</span>
                    <span className="text-white font-bold">{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                    <span className="flex items-center gap-2"><Tag size={16}/> توفير المنتجات</span>
                    <span className="font-bold">-{discountAmount} ج.م</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-indigo-400">
                      <span>كوبون "SAVE10"</span>
                      <span className="font-bold">-{couponDiscount.toFixed(1)} ج.م</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>مصاريف الشحن</span>
                    <span className="text-white font-bold">{shipping === 0 ? 'مجاني ✨' : `${shipping} ج.م`}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <div className="relative mb-8 group">
                  <input 
                    type="text" 
                    placeholder="لديك كود خصم؟" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-indigo-500/50 transition-all text-sm"
                  />
                  <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <button 
                    onClick={() => { if(couponCode==='SAVE10') setCouponApplied(true) }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-black px-4 py-2 rounded-xl hover:bg-indigo-500 hover:text-white transition-all"
                  >
                    تفعيل
                  </button>
                </div>

                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 font-bold">الإجمالي النهائي</span>
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">
                      {total.toFixed(0)} <span className="text-sm">ج.م</span>
                    </span>
                  </div>
                </div>

                <button className="w-full group relative overflow-hidden bg-indigo-600 p-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all hover:bg-indigo-500 active:scale-95 shadow-xl shadow-indigo-600/30">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <CreditCard size={24} />
                  تأكيد ودفع
                </button>

                {/* Trust Badges */}
                <div className="mt-8 flex justify-center gap-6 text-slate-500">
                  <div className="flex flex-col items-center gap-1">
                    <Shield size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">آمن</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">سريع</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;