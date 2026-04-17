import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Trash2, ArrowRight, 
  ShoppingBag, Star, ChevronLeft 
} from 'lucide-react';

const Favorites = () => {
  // بيانات تجريبية للمفضلة
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "شيكولاتة داكنة 70%",
      price: 120,
      image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&q=80",
      category: "حلويات",
      rating: 4.8
    },
    {
      id: 2,
      name: "قهوة عربية مختصة",
      price: 250,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80",
      category: "مشروبات",
      rating: 4.9
    }
  ]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft size={24} className="rotate-180" />
            </Link>
            <h1 className="text-2xl font-black text-slate-800">المفضلة</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-2xl font-bold">
            <Heart size={20} fill="currentColor" />
            <span>{favorites.length} منتجات</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button 
                      onClick={() => removeFromFavorites(product.id)}
                      className="p-3 bg-white/90 backdrop-blur-sm text-red-500 rounded-2xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
                      title="إزالة من المفضلة"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 text-amber-500 font-bold text-sm shadow-sm">
                    <Star size={14} fill="currentColor" />
                    {product.rating}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">{product.category}</span>
                  <h3 className="text-lg font-bold text-slate-800 mt-1 mb-4 truncate">{product.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs mb-1 font-medium">السعر</p>
                      <p className="text-xl font-black text-slate-900">{product.price} <span className="text-sm font-bold text-slate-500">ج.م</span></p>
                    </div>
                    
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-95">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={60} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">يبدو أنك لم تعجب بأي منتج حتى الآن، ابدأ باستكشاف المتجر وأضف ما يحلو لك!</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              <ShoppingBag size={20} />
              ابدأ التسوق الآن
            </Link>
          </div>
        )}
      </div>

      {/* Suggested Section */}
      {favorites.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-10 border-t border-slate-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-800">منتجات قد تعجبك</h2>
            <button className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
              عرض الكل <ArrowRight size={18} className="rotate-180" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* مكان لمنتجات مقترحة سريعة */}
            <div className="h-40 bg-slate-200 rounded-3xl animate-pulse"></div>
            <div className="h-40 bg-slate-200 rounded-3xl animate-pulse delay-75"></div>
            <div className="h-40 bg-slate-200 rounded-3xl animate-pulse delay-150"></div>
            <div className="h-40 bg-slate-200 rounded-3xl animate-pulse delay-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;