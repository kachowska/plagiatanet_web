
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import ServicePage from './components/ServicePage';
import Footer from './components/Footer';
import StickyElements from './components/StickyElements';
import Modal from './components/Modal';
import OrderForm from './components/OrderForm';
import { DiscountIcon } from './constants';
import PrivacyPolicyContent from './components/PrivacyPolicyContent';
import OfferAgreementContent from './components/OfferAgreementContent';

const App: React.FC = () => {
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Uncomment to enable the popup after 15 seconds
      // setIsDiscountModalOpen(true);
    }, 15000); 

    return () => clearTimeout(timer);
  }, []);

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  const handlePrivacyClick = () => {
    setIsPrivacyModalOpen(true);
  }

  const handleOfferClick = () => {
    setIsOfferModalOpen(true);
  }

  return (
    <Router>
      <div className="bg-gray-50 text-slate-700 font-sans antialiased">
        <Header onOrderClick={handleOrderClick} />
        <main>
          <Routes>
            <Route path="/" element={<Home onOrderClick={handleOrderClick} />} />
            <Route path="/services/:slug" element={<ServicePage onOrderClick={handleOrderClick} />} />
          </Routes>
        </main>
        <Footer onPrivacyClick={handlePrivacyClick} onOfferClick={handleOfferClick} />
        <StickyElements onOrderClick={handleOrderClick} />
        
        <Modal isOpen={isDiscountModalOpen} onClose={() => setIsDiscountModalOpen(false)}>
          <div className="text-center p-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-500">
              {DiscountIcon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-4">Получите скидку 10%!</h3>
            <p className="mt-2 text-slate-600">
              Закажите повышение уникальности прямо сейчас и получите бесплатную проверку вашей работы и скидку 10% на первый заказ.
            </p>
            <div className="mt-6">
              <button onClick={() => { setIsDiscountModalOpen(false); handleOrderClick(); }} className="inline-block w-full rounded-md bg-amber-500 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors">
                Получить скидку
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
          <div className="p-6 sm:p-8">
              <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Начните прямо сейчас</h2>
                  <p className="mt-2 text-slate-600">Заполните форму, и наш менеджер свяжется с вами в течение 15 минут для бесплатной консультации.</p>
              </div>
              <OrderForm onPrivacyClick={handlePrivacyClick} />
          </div>
        </Modal>

        <Modal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)}>
          <PrivacyPolicyContent />
        </Modal>

        <Modal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)}>
          <OfferAgreementContent />
        </Modal>
      </div>
    </Router>
  );
};

export default App;