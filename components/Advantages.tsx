import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ShieldCheckIcon, GraduationCapIcon } from '../constants';

const Advantages: React.FC = () => {
    const advantages = [
        { icon: GraduationCapIcon, title: "Команда экспертов", text: "Специалисты с профильным образованием и научными степенями" },
        { icon: ShieldCheckIcon, title: "Срочное выполнение", text: "От 2 часов при необходимости" },
        { icon: ShieldCheckIcon, title: "Гарантия результата", text: "Гарантируем соответствие уникальности заявленным требованиям" },
        { icon: ShieldCheckIcon, title: "Конфиденциальность", text: "Полная анонимность" },
        { icon: ShieldCheckIcon, title: "Выполнение в срок", text: "Мы ценим доверие и гарантируем передать работу в оговоренный срок" },
        { icon: ShieldCheckIcon, title: "Бесплатные правки", text: "До достижения нужного результата" },
        { icon: ShieldCheckIcon, title: "Доступные цены", text: "Мы предлагаем качественные услуги по доступной цене" },
        { icon: ShieldCheckIcon, title: "Поддержка 24/7", text: "На связи в любое время" }
    ];

    return (
        <section id="advantages" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Почему выбирают нас</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((advantage, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm border border-gray-200/80">
                                <div className="mx-auto h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                    {advantage.icon}
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-slate-800">{advantage.title}</h3>
                                <p className="mt-1 text-slate-600">{advantage.text}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Advantages;