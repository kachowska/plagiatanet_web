import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { Orderable } from '../types';
import { CheckIcon } from '../constants';

const Services: React.FC<Orderable> = ({ onOrderClick }) => {
  const features = [
    "Глубокая переработка текста",
    "Рерайт неуникальных фрагментов",
    "Сохранение научного стиля",
    "Работа с цитированием",
    "Отчет с проверки (Антиплагиат.ВУЗ, Антиплагиат.РУ)",
    "Срок: от 2 часов",
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Academic Writing Assistance",
    "name": "Пакет рерайт: Повышение уникальности научных работ",
    "description": "Профессиональный ручной рерайт для повышения уникальности дипломных работ, диссертаций, статей ВАК и других научных текстов. Включает глубокую переработку текста, сохранение научного стиля, работу с цитированием и предоставление отчета о проверке.",
    "provider": {
      "@type": "Organization",
      "name": "PLAGIATANET"
    },
    "areaServed": {
      "@type": "Country",
      "name": "RU"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2.5",
        "priceCurrency": "RUB",
        "unitText": "страница"
      }
    }
  };

  return (
    <section id="services" className="py-16 md:py-20 bg-gray-50">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Цены</h2>
          <div className="mt-12 flex justify-center">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 flex flex-col border border-gray-200/80 bg-gradient-to-br from-white to-amber-50 w-full max-w-lg">
              <h3 className="text-2xl font-bold text-slate-800 text-center tracking-wider uppercase">Пакет рерайт</h3>
              <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 pt-1">{CheckIcon}</span>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <p className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  от 2.5<span className="text-xl font-semibold text-slate-500"> рублей/страница</span>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  цена зависит от сроков и требований уникальности
                </p>
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="mt-6 inline-block w-full text-center font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/30"
                >
                  Заказать повышение уникальности
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;