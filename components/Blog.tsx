import React, { useState } from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ArrowRightIcon } from '../constants';
import { articlesData } from '../data/articles';
import { Article, Orderable } from '../types';
import ArticleModal from './ArticleModal';

const Blog: React.FC<Orderable> = ({ onOrderClick }) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const openArticle = (article: Article) => {
        setSelectedArticle(article);
    };

    const closeArticle = () => {
        setSelectedArticle(null);
    };

    return (
        <>
            <section id="blog" className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Полезные материалы</h2>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articlesData.map((article) => (
                                <div 
                                    key={article.id} 
                                    onClick={() => openArticle(article)}
                                    className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border border-gray-200/80"
                                >
                                    <div className="overflow-hidden">
                                      <img src={article.image} alt={article.title} className="w-full h-48 object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors flex-grow">{article.title}</h3>
                                        <span className="mt-4 inline-flex items-center text-amber-500 font-semibold">
                                            Читать далее {ArrowRightIcon}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            <ArticleModal 
                isOpen={!!selectedArticle}
                onClose={closeArticle}
                article={selectedArticle}
                onOrderClick={onOrderClick}
            />
        </>
    );
};

export default Blog;
