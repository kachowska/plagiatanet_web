
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ShieldCheckIcon } from '../constants';

const Guarantees: React.FC = () => {
    const guarantees = [
        { title: "Гарантия уникальности", text: "Достигнем заявленного процента или вернем деньги." },
        { title: "Сохранение смысла", text: "Ваше исследование останется научным и логичным." },
        { title: "Соблюдение сроков", text: "Компенсация за каждый час просрочки." },
        { title: "Конфиденциальность", text: "Подписываем договор о неразглашении." },
    ];

    return (
        <section id="guarantees" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Наши гарантии</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {guarantees.map((guarantee, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200/80 flex flex-col items-center">
                                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    {ShieldCheckIcon}
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-slate-800 text-center">{guarantee.title}</h3>
                                <p className="mt-2 text-slate-600 text-center flex-grow">{guarantee.text}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Guarantees;