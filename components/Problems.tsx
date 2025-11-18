
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { MinusCircleIcon } from '../constants';

const Problems: React.FC = () => {
  const problems = [
    "Антиплагиат показывает низкий процент, а защита через неделю",
    "Научный руководитель требует уникальность от 60%",
    "Переписывание текста убивает смысл исследования",
    "Самостоятельное повышение уникальности не работает",
    "Боитесь, что работу не примут из-за плагиата",
    "Нужно пройти проверку в нескольких системах одновременно"
  ];

  return (
    <section id="problems" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Знакомые ситуации?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <span className="h-6 w-6">{MinusCircleIcon}</span>
                </div>
                <p className="text-slate-700 font-medium">{problem}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-xl font-semibold text-slate-800">
            Мы решаем эти проблемы <span className="text-amber-600">профессионально</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Problems;