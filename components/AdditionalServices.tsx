
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { LightbulbIcon, CheckIcon } from '../constants';

const AdditionalServices: React.FC = () => {
    const services = [
        "Проверка в системе Антиплагиат.ВУЗ, Антиплагиат.РУ",
        "Корректура и редактура",
        "Оформление по ГОСТу",
        "Нормоконтроль",
        "Проверка на ошибки",
        "Подбор литературы",
        "Консультация эксперта",
    ];

    return (
        <section id="additional-services" className="pt-8 md:pt-12 pb-16 md:pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Дополнительные услуги</h2>
                    <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-center">
                                {CheckIcon}
                                <span className="text-lg text-slate-700">{service}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default AdditionalServices;