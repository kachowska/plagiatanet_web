import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PhoneIcon, MailIcon, TelegramIcon, UsersIcon } from '../constants';

interface FooterProps {
  onPrivacyClick: () => void;
  onOfferClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onOfferClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  return (
    <footer className="bg-slate-900 text-slate-400" itemScope itemType="https://schema.org/Organization">
      <link itemProp="url" href="https://plagiatanet.net/" />
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white tracking-tighter" itemProp="name">PLAGIATA<span className="text-amber-500">NET</span></h3>
            <p className="mt-4 text-sm" itemProp="description">Профессиональное повышение уникальности научных работ с гарантией результата.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Услуги рерайта</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services/diploma" className="hover:text-amber-500 transition-colors">Дипломные работы</Link></li>
              <li><Link to="/services/dissertation" className="hover:text-amber-500 transition-colors">Диссертации</Link></li>
              <li><Link to="/services/coursework" className="hover:text-amber-500 transition-colors">Курсовые работы</Link></li>
              <li><Link to="/services/article" className="hover:text-amber-500 transition-colors">Статьи</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Информация</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOfferClick(); }} className="hover:text-amber-500 transition-colors">Договор оферты</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPrivacyClick(); }} className="hover:text-amber-500 transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div id="contacts">
            <h4 className="font-semibold text-white tracking-wider uppercase">Контакты</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center space-x-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                {PhoneIcon}
                <a href="tel:+78005553535" className="hover:text-amber-500 transition-colors" itemProp="telephone">+7 (800) 555-35-35</a>
                <meta itemProp="contactType" content="customer service" />
              </li>
              <li className="flex items-center space-x-3" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                {MailIcon}
                <a href="mailto:contact@plagiatanet.net" className="hover:text-amber-500 transition-colors" itemProp="email">contact@plagiatanet.net</a>
                <meta itemProp="contactType" content="customer service" />
              </li>
              <li className="flex items-center space-x-3">
                {TelegramIcon}
                <a href="https://t.me/uniquetextbot" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Наш бот в Telegram</a>
              </li>
              <li className="flex items-center space-x-3">
                {UsersIcon}
                <a href="https://t.me/plagiatanet" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Комьюнити в Telegram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>ИП Иванов И.И., ИНН 123456789012</p>
          <p>© {new Date().getFullYear()} PLAGIATANET. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;