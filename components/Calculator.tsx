import React, { useState, useEffect } from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { Orderable } from '../types';

const Calculator: React.FC<Orderable> = ({ onOrderClick }) => {
  const [workType, setWorkType] = useState(80);
  const [pages, setPages] = useState(30);
  const [urgency, setUrgency] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculatedPrice = Math.round(workType * pages * urgency);
    setTotalPrice(calculatedPrice);
  }, [workType, pages, urgency]);

  return (
    <section id="calculator" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Рассчитайте стоимость за 30 секунд</h2>
            <div className="mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="workType" className="block text-sm font-medium text-slate-700 mb-2">Тип работы</label>
                  <select id="workType" value={workType} onChange={(e) => setWorkType(Number(e.target.value))} className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm rounded-lg shadow-sm">
                    <option value={50}>Курсовая работа (50₽/стр)</option>
                    <option value={80}>Дипломная работа (80₽/стр)</option>
                    <option value={100}>Магистерская диссертация (100₽/стр)</option>
                    <option value={150}>Кандидатская диссертация (150₽/стр)</option>
                    <option value={120}>Статья ВАК (120₽/стр)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="pages" className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                    <span>Количество страниц</span>
                    <span className="font-bold text-amber-600 text-base">{pages}</span>
                  </label>
                  <input type="range" id="pages" min="1" max="300" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="slider-thumb w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                
                <div>
                  <label htmlFor="currentUniqueness" className="block text-sm font-medium text-slate-700 mb-2">Текущая уникальность (%)</label>
                  <input type="number" id="currentUniqueness" defaultValue="45" className="block w-full pl-4 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm rounded-lg shadow-sm" />
                </div>
                
                <div>
                  <label htmlFor="targetUniqueness" className="block text-sm font-medium text-slate-700 mb-2">Требуемая уникальность (%)</label>
                  <input type="number" id="targetUniqueness" defaultValue="85" className="block w-full pl-4 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm rounded-lg shadow-sm" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="urgency" className="block text-sm font-medium text-slate-700 mb-2">Срочность</label>
                  <select id="urgency" value={urgency} onChange={(e) => setUrgency(Number(e.target.value))} className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm rounded-lg shadow-sm">
                    <option value={1}>Стандарт (24 часа)</option>
                    <option value={1.5}>Срочно (12 часов, +50%)</option>
                    <option value={2}>Экспресс (6 часов, +100%)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-lg text-center shadow-lg">
                <p className="font-medium opacity-80">Примерная стоимость:</p>
                <p className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 transition-all duration-300">{totalPrice.toLocaleString('ru-RU')} ₽</p>
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="mt-4 inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-amber-50 transition-colors transform hover:scale-105"
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

export default Calculator;