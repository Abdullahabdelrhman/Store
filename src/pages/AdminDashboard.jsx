import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد التنقل
import { 
  LayoutDashboard, PlusCircle, ShoppingBag, LogOut, 
  Users, DollarSign, Zap, Sparkles, Globe,
  Image as ImageIcon, Bell, Menu, X, ArrowLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); // محرك التنقل

  // ==========================================
  // وظيفة تسجيل الخروج
  // ==========================================
  const handleLogout = () => {
    // مسح بيانات الجلسة
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // توجيه المستخدم لصفحة تسجيل الدخول
    navigate('/auth'); 
  };

  // ==========================================
  // وظيفة العودة للمتجر (تصفح الموقع)
  // ==========================================
  const goToStore = () => {
    navigate('/'); // توجيه لصفحة المتجر الرئيسية
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 lg:p-6" dir="rtl">
      
      {/* 1. Sidebar - عائم واحترافي */}
      <aside className={`fixed top-6 bottom-6 right-6 z-50 w-72 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] transition-all duration-500 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : 'translate-x-[120%]'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] text-white">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">ADMIN <span className="text-indigo-500">G</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'overview', label: 'الرؤية العامة', icon: LayoutDashboard },
              { id: 'addProduct', label: 'إضافة منتج', icon: PlusCircle },
              { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}

            {/* زر تصفح الموقع المضاف */}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button 
                onClick={goToStore}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-indigo-400 hover:bg-indigo-500/10 transition-all font-bold group"
              >
                <Globe size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="text-sm">تصفح المتجر</span>
                <ArrowLeft size={14} className="mr-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            </div>
          </nav>

          {/* تفعيل زر الخروج */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold mt-auto group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span>خروج آمن</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Wrapper */}
      <main className={`transition-all duration-500 ${sidebarOpen ? 'lg:mr-80' : 'mr-0'}`}>
        
        {/* Header */}
        <header className="mb-8 flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 hover:bg-white/5 rounded-2xl lg:hidden text-white">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-black text-white mr-4 italic uppercase tracking-wider">
              {activeTab === 'overview' ? 'Dashboard Core' : 'Content Generator'}
            </h1>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors relative group">
              <Bell size={20} />
              <span className="absolute top-3 left-3 w-2 h-2 bg-indigo-500 rounded-full group-hover:animate-ping"></span>
            </div>
            <div className="h-10 w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
              <div className="text-left hidden md:block">
                <p className="text-xs font-black text-white leading-none mb-1">أحمد المدير</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">Super Admin</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg border border-white/20">أ</div>
            </div>
          </div>
        </header>

        {/* 3. Content Area */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'إجمالي الأرباح', val: '24,500', icon: DollarSign, color: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
                { label: 'الطلبات الجديدة', val: '12', icon: ShoppingBag, color: 'text-indigo-400', glow: 'shadow-indigo-500/10' },
                { label: 'العملاء نشطون', val: '89', icon: Users, color: 'text-purple-400', glow: 'shadow-purple-500/10' },
              ].map((s, i) => (
                <div key={i} className={`group bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 shadow-2xl ${s.glow}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${s.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <s.icon size={24} />
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</p>
                  <h3 className="text-4xl font-black text-white mt-2 tracking-tighter flex items-baseline gap-2">
                    {s.val} 
                    <span className="text-xs font-bold text-slate-600 tracking-normal uppercase">EGP</span>
                  </h3>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addProduct' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-linear-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block mr-2 group-focus-within:text-indigo-400 transition-colors">اسم المنتج الرئيسي</label>
                      <input type="text" className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 focus:bg-black/40 text-white font-bold transition-all shadow-inner" placeholder="شوكولاتة كولومبية فاخرة..." />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block mr-2 group-focus-within:text-indigo-400 transition-colors">السعر المقترح</label>
                      <div className="relative">
                        <input type="number" className="w-full bg-black/20 border border-white/5 rounded-2xl pr-6 pl-16 py-4 outline-none focus:border-indigo-500/50 text-white font-bold transition-all shadow-inner" placeholder="0.00" />
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600">EGP</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 flex flex-col">
                    <div className="flex-1 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-8 hover:bg-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <ImageIcon className="text-slate-600 group-hover:text-indigo-400 mb-4 transition-transform group-hover:-translate-y-2 duration-500" size={40} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300">اسحب صورة المنتج هنا</span>
                      <p className="text-[9px] text-slate-600 mt-2 italic">PNG, JPG up to 10MB</p>
                    </div>
                    
                    <button type="button" className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group overflow-hidden relative">
                      <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity"></div>
                      <Sparkles size={20} className="group-hover:animate-spin" />
                      نشر في المتجر
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;