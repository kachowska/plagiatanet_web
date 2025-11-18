import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { CaseStudy } from '../types';

const cases: CaseStudy[] = [
    {
        type: "Кандидатская диссертация по юриспруденции",
        before: 10,
        after: 72,
        duration: "3 дня",
        review: "Результат превзошел все ожидания! Смысл сохранен, все правки по делу. Огромное спасибо!",
    },
    {
        type: "Статья ВАК по экономике",
        before: 41,
        after: 85,
        duration: "24 часа",
        review: "Очень быстро и качественно подняли уникальность для публикации. Проверка в Антиплагиат.ВУЗ пройдена успешно.",
    },
    {
        type: "Дипломная работа по психологии",
        before: 8,
        after: 77,
        duration: "2 дня",
        review: "Спасибо команде! Сэкономили мне кучу времени и нервов перед защитой. Все сделано на высшем уровне.",
    },
];

const Cases: React.FC = () => {
    return (
        <section id="cases" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Реальные результаты наших клиентов</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cases.map((study, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 flex flex-col">
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="font-bold text-lg text-slate-800 h-16 sm:h-14">{study.type}</h3>
                                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-4 text-center items-center">
                                        <div>
                                            <p className="text-sm text-slate-500 uppercase tracking-wider">Было</p>
                                            <p className="text-4xl sm:text-5xl font-bold text-rose-500 tabular-nums">{study.before}%</p>
                                        </div>
                                        <div className="text-2xl text-slate-400 font-light">→</div>
                                        <div>
                                            <p className="text-sm text-slate-500 uppercase tracking-wider">Стало</p>
                                            <p className="text-4xl sm:text-5xl font-bold text-emerald-500 tabular-nums">{study.after}%</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500 text-center"><strong>Срок выполнения:</strong> {study.duration}</p>
                                    <blockquote className="mt-6 flex-grow p-4 bg-gray-50 border-l-4 border-amber-400 text-slate-600 italic rounded-r-md">
                                        "{study.review}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Cases;