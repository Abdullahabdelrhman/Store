import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. استيراد المكونات
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import Cart from './pages/Cart'; 
import Checkout from './pages/Checkout'; 
import Favorites from './pages/Favorites'; // تم إضافة استيراد صفحة المفضلة

// 2. استيراد التنسيقات
import './index.css'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* تم إضافة مسار المفضلة هنا */}
            <Route path="/favorites" element={<Favorites />} />
            
            {/* صفحة الخطأ 404 */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <h1 className="text-9xl font-black text-indigo-100 animate-pulse">404</h1>
                <h2 className="text-3xl font-bold mt-4 text-slate-800">أوبس! الصفحة غير موجودة</h2>
                <p className="mt-2 text-slate-500 max-w-md">يبدو أنك وصلت إلى رابط غير صحيح أو صفحة تمت إزالتها.</p>
                <a href="/" className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                  العودة للرئيسية
                </a>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-white border-t py-10 text-center mt-auto">
          <div className="flex flex-col items-center gap-2">
            <p className="font-black text-slate-900 uppercase tracking-[0.3em] text-lg">GLOBAL MART</p>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mb-2"></div>
            <p className="text-sm text-slate-400 font-medium">جميع الحقوق محفوظة © م/ عبد الله أ. زكي</p>
            <p className="text-[10px] text-slate-300 mt-1 uppercase">Proudly Powered by Tailwind CSS 4</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;