
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const CheckSystems: React.FC = () => {
    const systems = [
        "Антиплагиат.ВУЗ", "Антиплагиат.РУ", "Etxt", "Text.ru",
        "Advego", "Content-watch", "Plagiarism Detector", "Turnitin"
    ];

    return (
        <section id="check-systems" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Гарантируем прохождение всех систем антиплагиата</h2>
                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {systems.map((system, index) => (
                                <div key={index} className="text-center font-medium text-slate-700 py-2 px-4 bg-gray-100 rounded-lg">
                                    {system}
                                </div>
                            ))}
                            <div className="text-center font-medium text-slate-500 py-2 px-4">
                                и еще 7+ систем
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default CheckSystems;