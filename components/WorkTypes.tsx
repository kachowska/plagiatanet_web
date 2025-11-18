
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './ui/AnimatedSection';
import { GraduationCapIcon, FileTextIcon, BookOpenIcon } from '../constants';

const WorkTypes: React.FC = () => {
    const workTypes = [
        { icon: GraduationCapIcon, name: "Диссертации (кандидатские, докторские)", link: "/services/dissertation" },
        { icon: FileTextIcon, name: "Статьи ВАК и РИНЦ", link: "/services/article" },
        { icon: BookOpenIcon, name: "Дипломные работы", link: "/services/diploma" },
        { icon: FileTextIcon, name: "Курсовые работы", link: "/services/coursework" },
        { icon: GraduationCapIcon, name: "Магистерские диссертации", link: "/services/master" },
        { icon: FileTextIcon, name: "Рефераты и эссе", link: "/services/essay" },
        { icon: BookOpenIcon, name: "Научные публикации", link: "/services/article" },
        { icon: FileTextIcon, name: "Отчеты по практике", link: "/services/practice-report" },
    ];

    return (
        <section id="work-types" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Работаем со всеми видами научных текстов</h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {workTypes.map((work, index) => (
                            <Link to={work.link} key={index} className="bg-white p-6 rounded-xl shadow-sm text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200/80 flex flex-col items-center group h-full">
                                <div className="mx-auto h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    {work.icon}
                                </div>
                                <h3 className="mt-4 font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">{work.name}</h3>
                            </Link>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default WorkTypes;