
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { FileTextIcon } from '../constants';

const Methods: React.FC = () => {
    const methods = [
        { title: "Ручной рерайтинг", description: "Перефразирование от наших экспертов с сохранением терминологии" },
        { title: "Уникализация текста", description: "Сохранение смысла и научной ценности" },
        { title: "Реструктуризация", description: "Изменение структуры предложений" },
        { title: "Работа с цитатами", description: "Корректное оформление ссылок на источники" },
        { title: "Выявление заимствований", description: "Глубокое исследование неуникальных фрагментов" },
        { title: "Авторский текст", description: "Добавление уникальных фрагментов с использованием дополнительных источников информации" }
    ];

    return (
        <section id="methods" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Профессиональные методы повышения уникальности</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {methods.map((method, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4 border border-gray-200/80">
                                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                    {FileTextIcon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{method.title}</h3>
                                    <p className="mt-1 text-slate-600">{method.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center bg-amber-100 text-amber-800 font-semibold p-4 rounded-lg max-w-3xl mx-auto ring-1 ring-amber-200">
                        Важно: Мы НЕ используем технические накрутки! Только ручной рерайт экспертов.
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Methods;