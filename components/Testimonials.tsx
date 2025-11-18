import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { Testimonial } from '../types';
import { StarIcon, QuoteIcon } from '../constants';

const testimonials: Testimonial[] = [
    { avatarInitials: "АС", name: "Анна Соколова", role: "Аспирант МИТСО", rating: 5, text: "Было 52%, стало 94%! Диссертацию приняли с первого раза. Спасибо огромное за оперативность и качество работы!" },
    { avatarInitials: "ДП", name: "Дмитрий Петров", role: "Студент БГЭУ", rating: 5, text: "Повысили уникальность дипломной с 48% до 89% за 8 часов. Смысл текста сохранен полностью. Рекомендую!" },
    { avatarInitials: "ЕК", name: "Елена Кузнецова", role: "Магистрант БГУ", rating: 5, text: "Профессиональный подход! Работали со статьей для ВАК. Результат превзошел ожидания - 97% уникальности." },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Что говорят наши клиенты</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="relative bg-gray-50 p-8 rounded-xl border border-gray-200/80 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="absolute top-6 right-6 text-slate-200/80">
                                   {QuoteIcon}
                                </div>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                        {testimonial.avatarInitials}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-slate-800">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>{StarIcon}</span>
                                    ))}
                                </div>
                                <p className="mt-4 text-slate-700 flex-grow italic">"{testimonial.text}"</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Testimonials;