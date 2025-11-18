import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ZapIcon, CheckCircleIcon, GraduationCapIcon, CoinsIcon, ArrowRightIcon, TelegramIcon, UsersIcon } from '../constants';
import { Orderable } from '../types';

interface HeroProps extends Orderable {
  customTitle?: string;
  customSubtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ onOrderClick, customTitle, customSubtitle }) => {
  const benefits = [
    { icon: ZapIcon, text: "Срок от 2 часов" },
    { icon: CheckCircleIcon, text: "Высокая уникальность" },
    { icon: GraduationCapIcon, text: "15+ систем проверки" },
    { icon: CoinsIcon, text: "От 2,5 рублей за страницу" },
  ];

  const defaultTitle = 'Повысим <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">уникальность</span> вашей научной работы <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">без потери смысла</span>';
  const defaultSubtitle = 'Профессиональный рерайтинг научных текстов – повышение уникальности с соблюдением академических стандартов. Гарантия прохождение проверки в Антиплагиат.ВУЗ, Антиплагиат.РУ и других системах';

  return (
    <section className="bg-gray-50 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tighter"
            dangerouslySetInnerHTML={{ __html: customTitle || defaultTitle }}
          />
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-8">
            {customSubtitle || defaultSubtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="button"
              onClick={onOrderClick}
              className="w-full sm:w-auto group flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Заказать повышение уникальности
            </button>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="mt-20">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-sm text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200/80">
                <div className="text-amber-500 w-10 h-10 mx-auto flex items-center justify-center">{benefit.icon}</div>
                <p className="mt-2 text-sm md:text-base font-semibold text-slate-800">{benefit.text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="https://t.me/uniquetextbot" target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 flex items-start space-x-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 text-left">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center">
                        <span className="h-7 w-7">{TelegramIcon}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Удобный Telegram-бот</h3>
                        <p className="mt-1 text-slate-600">Оплата, отслеживание этапов, архив работ и многое другое.</p>
                        <p className="mt-3 inline-flex items-center text-sky-600 font-semibold">
                            Перейти в бота
                            <span className="ml-2 transition-transform group-hover:translate-x-1">{ArrowRightIcon}</span>
                        </p>
                    </div>
                </a>
                
                <a href="https://t.me/plagiatanet" target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 flex items-start space-x-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 text-left">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center">
                        <span className="h-7 w-7">{UsersIcon}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Наше комьюнити</h3>
                        <p className="mt-1 text-slate-600">Общайтесь, делитесь опытом и получайте эксклюзивные предложения.</p>
                        <p className="mt-3 inline-flex items-center text-indigo-600 font-semibold">
                            Вступить в канал
                            <span className="ml-2 transition-transform group-hover:translate-x-1">{ArrowRightIcon}</span>
                        </p>
                    </div>
                </a>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;