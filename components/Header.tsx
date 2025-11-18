import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PhoneIcon, TelegramIcon, UsersIcon } from '../constants';
import { Orderable } from '../types';

const Header: React.FC<Orderable> = ({ onOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = (
    <>
      <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block py-2 md:py-0 font-medium text-slate-600 hover:text-amber-600 transition-colors cursor-pointer">Услуги</a>
      <a href="#cases" onClick={(e) => handleNavClick(e, 'cases')} className="block py-2 md:py-0 font-medium text-slate-600 hover:text-amber-600 transition-colors cursor-pointer">Кейсы</a>
      <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="block py-2 md:py-0 font-medium text-slate-600 hover:text-amber-600 transition-colors cursor-pointer">FAQ</a>
      <a href="#contacts" onClick={(e) => handleNavClick(e, 'contacts')} className="block py-2 md:py-0 font-medium text-slate-600 hover:text-amber-600 transition-colors cursor-pointer">Контакты</a>
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/80 shadow-sm backdrop-blur-lg border-b border-gray-200/80' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-xl sm:text-2xl font-extrabold text-slate-900 flex-shrink-0 tracking-tighter">
            PLAGIATA<span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">NET</span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks}
          </nav>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a href="https://t.me/uniquetextbot" target="_blank" rel="noopener noreferrer" title="Наш Telegram бот" aria-label="Наш Telegram бот" className="text-slate-600 hover:text-sky-500 transition-colors">
              {TelegramIcon}
            </a>
            <a href="https://t.me/plagiatanet" target="_blank" rel="noopener noreferrer" title="Наше комьюнити в Telegram" aria-label="Наше комьюнити в Telegram" className="text-slate-600 hover:text-sky-500 transition-colors">
              {UsersIcon}
            </a>
            <a href="tel:+78005553535" className="hidden sm:flex items-center space-x-2 text-slate-800 font-semibold">
              {PhoneIcon}
              <span>+7 (800) 555-35-35</span>
            </a>
            <button
              type="button"
              onClick={onOrderClick}
              className="bg-amber-500 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
            >
              Заказать
            </button>
             <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Открыть меню" className="p-1">
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen pt-2 pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col items-center space-y-3">
            {navLinks}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;