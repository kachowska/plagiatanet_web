
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ArrowRightIcon } from '../constants';
import { Orderable } from '../types';

const FinalCta: React.FC<Orderable> = ({ onOrderClick }) => {
    return (
        <section id="final-cta" className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <div className="container mx-auto px-4 py-16 md:py-20 text-center">
                <AnimatedSection>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Защита через неделю? Мы успеем!</h2>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                          type="button"
                          onClick={onOrderClick}
                          className="w-full sm:w-auto flex items-center justify-center bg-amber-500 text-white font-bold py-4 px-8 sm:px-10 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Заказать повышение уникальности
                        </button>
                        <a href="https://t.me/uniquetextbot" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex justify-center bg-slate-700/80 text-white font-bold py-4 px-8 sm:px-10 rounded-lg hover:bg-slate-700 transition-colors">
                            Задать вопрос эксперту
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default FinalCta;