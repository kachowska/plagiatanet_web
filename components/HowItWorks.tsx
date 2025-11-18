
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const HowItWorks: React.FC = () => {
  const steps = [
    { number: 1, title: "Заявка", description: "Отправляете работу и требования по уникальности" },
    { number: 2, title: "Анализ", description: "Проверяем текст, определяем проблемные зоны (бесплатно)" },
    { number: 3, title: "Оплата", description: "После согласования заказа производите оплату" },
    { number: 4, title: "Получение работы", description: "После завершения рерайтинга вы получаете работу с заявленным процентом уникальности, сохранением смысла и академического стиля" },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">4 простых шага к уникальной работе</h2>
          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-200"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 mx-auto w-20 h-20 flex items-center justify-center bg-amber-100 border-2 border-white ring-4 ring-amber-100 rounded-full text-amber-600 text-3xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-800">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorks;