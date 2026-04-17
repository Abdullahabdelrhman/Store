import React, { useState } from 'react';
import { 
  ArrowRight, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Shield, 
  Clock,
  CheckCircle,
  ChevronRight,
  User,
  Phone,
  Home,
  Building,
  AlertCircle,
  DollarSign
} from 'lucide-react';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    buildingNo: '',
    floorNo: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock cart data - replace with actual cart state
  const cartItems = [
    { id: 1, name: "شيكولاتة سويسرية فاخرة", price: 150, quantity: 2, img: "🍫" },
    { id: 2, name: "مشروب كرز ياباني", price: 60, quantity: 1, img: "🥤" },
    { id: 3, name: "شيبسي حار كوري", price: 45, quantity: 1, img: "🍿" }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.14; // 14% VAT
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم كاملاً مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    else if (!/^01[0-9]{9}$/.test(formData.phone)) newErrors.phone = 'رقم الهاتف غير صحيح';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب';
    if (!formData.city) newErrors.city = 'المدينة مطلوبة';
    if (!formData.district) newErrors.district = 'الحي مطلوب';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message and redirect
    alert('تم تأكيد الطلب بنجاح! شكراً لتسوقك معنا');
    // navigate('/order-confirmation');
    setIsSubmitting(false);
  };

  const steps = [
    { number: 1, title: 'معلومات الشحن', icon: User },
    { number: 2, title: 'العنوان', icon: MapPin },
    { number: 3, title: 'الدفع', icon: CreditCard }
  ];

  const cities = ['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 'المنوفية'];
  const districts = {
    'القاهرة': ['مصر الجديدة', 'مدينة نصر', 'الزمالك', 'المعادي', 'وسط البلد'],
    'الجيزة': ['المهندسين', 'الشيخ زايد', '6 أكتوبر', 'الهرم', 'الدقي'],
    'الإسكندرية': ['سموحة', 'ستانلي', 'الرمل', 'بحري', 'ميامي'],
    'الدقهلية': ['المنصورة', 'طلخا', 'المطرية', 'دكرنس'],
    'الشرقية': ['الزقازيق', 'بلبيس', 'أبو كبير', 'فاقوس'],
    'المنوفية': ['شبين الكوم', 'قويسنا', 'الباجور', 'سرس الليان']
  };

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <h1>إتمام الطلب</h1>
          <p>أكمل بياناتك لتأكيد طلبك</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-circle">
                  {isCompleted ? <CheckCircle size={20} /> : step.number}
                </div>
                <div className="step-title">{step.title}</div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
            );
          })}
        </div>

        <div className="checkout-content">
          {/* Main Form */}
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-section">
                  <h2>معلومات الاتصال</h2>
                  
                  <div className="form-group">
                    <label>
                      <User size={16} />
                      الاسم كاملاً *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="أدخل اسمك كاملاً"
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@domain.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Phone size={16} />
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div className="form-section">
                  <h2>عنوان التوصيل</h2>

                  <div className="form-group">
                    <label>
                      <Building size={16} />
                      المدينة *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    >
                      <option value="">اختر المدينة</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <MapPin size={16} />
                      الحي *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      disabled={!formData.city}
                      className={errors.district ? 'error' : ''}
                    >
                      <option value="">اختر الحي</option>
                      {formData.city && districts[formData.city]?.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    {errors.district && <span className="error-message">{errors.district}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Home size={16} />
                      العنوان التفصيلي *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="اسم الشارع، رقم المبنى"
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>رقم المبنى</label>
                      <input
                        type="text"
                        name="buildingNo"
                        value={formData.buildingNo}
                        onChange={handleChange}
                        placeholder="رقم المبنى"
                      />
                    </div>
                    <div className="form-group">
                      <label>رقم الشقة (اختياري)</label>
                      <input
                        type="text"
                        name="floorNo"
                        value={formData.floorNo}
                        onChange={handleChange}
                        placeholder="رقم الشقة"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>ملاحظات إضافية (اختياري)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="أي تعليمات إضافية للتوصيل..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {currentStep === 3 && (
                <div className="form-section">
                  <h2>طريقة الدفع</h2>

                  <div className="payment-methods">
                    <label className={`payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon">
                          <DollarSign size={24} />
                        </div>
                        <div className="payment-details">
                          <h3>الدفع عند الاستلام</h3>
                          <p>ادفع نقداً عند استلام الطلب</p>
                        </div>
                        {paymentMethod === 'cod' && <CheckCircle size={20} className="selected-icon" />}
                      </div>
                    </label>

                    <label className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''} disabled`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        disabled
                      />
                      <div className="payment-card-content">
                        <div className="payment-icon">
                          <CreditCard size={24} />
                        </div>
                        <div className="payment-details">
                          <h3>بطاقة ائتمان</h3>
                          <p>قريباً سيكون متاحاً</p>
                        </div>
                      </div>
                      <span className="coming-soon">قريباً</span>
                    </label>
                  </div>

                  <div className="delivery-info">
                    <h4>معلومات التوصيل</h4>
                    <div className="info-item">
                      <Truck size={16} />
                      <span>وقت التوصيل المتوقع: 2-4 أيام عمل</span>
                    </div>
                    <div className="info-item">
                      <Clock size={16} />
                      <span>أوقات التوصيل: من 9 صباحاً حتى 9 مساءً</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn-back" onClick={handleBack}>
                    <ChevronRight size={18} />
                    السابق
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button type="button" className="btn-next" onClick={handleNext}>
                    التالي
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        جاري المعالجة...
                      </>
                    ) : (
                      <>
                        تأكيد الطلب
                        <CheckCircle size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>
                <ShoppingBag size={20} />
                ملخص الطلب
              </h3>

              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <span>{item.img}</span>
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-quantity">الكمية: {item.quantity}</div>
                    </div>
                    <div className="item-price">
                      {item.price * item.quantity} ج.م
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ج.م</span>
                </div>
                <div className="summary-row">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? 'مجاني' : `${shipping} ج.م`}</span>
                </div>
                <div className="summary-row">
                  <span>الضريبة (14%)</span>
                  <span>{tax.toFixed(2)} ج.م</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>الإجمالي</span>
                  <span>{total.toFixed(2)} ج.م</span>
                </div>
              </div>

              <div className="shipping-estimate">
                <Truck size={16} />
                <div>
                  <strong>توصيل سريع</strong>
                  <p>توصيل خلال 2-4 أيام عمل</p>
                </div>
              </div>

              <div className="secure-checkout">
                <Shield size={16} />
                <span>تسوق آمن 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 40px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .checkout-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .checkout-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .checkout-header p {
          color: #6c757d;
        }

        /* Progress Steps */
        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          position: relative;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }

        .step-circle {
          width: 48px;
          height: 48px;
          background: white;
          border: 2px solid #dee2e6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6c757d;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          z-index: 1;
          background: white;
        }

        .step.active .step-circle {
          border-color: #667eea;
          color: #667eea;
          background: linear-gradient(135deg, #667eea10, #764ba210);
        }

        .step.completed .step-circle {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: transparent;
          color: white;
        }

        .step-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #6c757d;
        }

        .step.active .step-title {
          color: #667eea;
        }

        .step.completed .step-title {
          color: #28a745;
        }

        .step-line {
          position: absolute;
          top: 24px;
          right: calc(50% + 24px);
          width: calc(100% - 48px);
          height: 2px;
          background: #dee2e6;
          z-index: 0;
        }

        .step.completed + .step-line {
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        @media (max-width: 768px) {
          .step-title {
            font-size: 0.7rem;
          }
          .step-circle {
            width: 40px;
            height: 40px;
            font-size: 0.9rem;
          }
          .step-line {
            top: 20px;
          }
        }

        /* Checkout Content */
        .checkout-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
        }

        @media (max-width: 992px) {
          .checkout-content {
            grid-template-columns: 1fr;
          }
        }

        /* Form Section */
        .form-section {
          background: white;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
        }

        .form-section h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1a1a2e;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #495057;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input.error,
        .form-group select.error {
          border-color: #dc3545;
        }

        .error-message {
          display: block;
          font-size: 0.75rem;
          color: #dc3545;
          margin-top: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Payment Methods */
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .payment-card {
          position: relative;
          cursor: pointer;
        }

        .payment-card input {
          display: none;
        }

        .payment-card-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 2px solid #e9ecef;
          border-radius: 16px;
          transition: all 0.3s ease;
          background: white;
        }

        .payment-card.selected .payment-card-content {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea08, #764ba208);
        }

        .payment-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .payment-icon {
          width: 48px;
          height: 48px;
          background: #f8f9fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
        }

        .payment-details {
          flex: 1;
        }

        .payment-details h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .payment-details p {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .selected-icon {
          color: #28a745;
        }

        .coming-soon {
          position: absolute;
          top: -10px;
          right: 10px;
          background: #ffc107;
          color: #856404;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .delivery-info {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
        }

        .delivery-info h4 {
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #6c757d;
          margin-bottom: 8px;
        }

        /* Navigation Buttons */
        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 24px;
        }

        .btn-back,
        .btn-next,
        .btn-submit {
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
        }

        .btn-back {
          background: white;
          border: 2px solid #e9ecef;
          color: #6c757d;
        }

        .btn-back:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .btn-next,
        .btn-submit {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin-right: auto;
        }

        .btn-next:hover,
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Order Summary */
        .order-summary {
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .summary-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
        }

        .summary-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .order-items {
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 20px;
          max-height: 300px;
          overflow-y: auto;
        }

        .order-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f5;
        }

        .item-image {
          width: 50px;
          height: 50px;
          background: #f8f9fa;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .item-quantity {
          font-size: 0.7rem;
          color: #6c757d;
        }

        .item-price {
          font-weight: 700;
          color: #1a1a2e;
        }

        .summary-details {
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .summary-row.total {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1a1a2e;
        }

        .summary-divider {
          height: 1px;
          background: #e9ecef;
          margin: 16px 0;
        }

        .shipping-estimate {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .shipping-estimate p {
          font-size: 0.75rem;
          color: #6c757d;
        }

        .secure-checkout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid #e9ecef;
          font-size: 0.8rem;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default Checkout;