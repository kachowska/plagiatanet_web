import React, { useEffect, useRef } from 'react';
import { Article, Orderable } from '../types';

interface ArticleModalProps extends Orderable {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article, onOrderClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a.cta-button')) {
        event.preventDefault();
        onClose();
        onOrderClick();
      }
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener('click', handleClick);

    return () => {
      contentElement.removeEventListener('click', handleClick);
    };
  }, [isOpen, onClose, onOrderClick]);

  if (!isOpen || !article) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.image,
    "datePublished": article.datePublished,
    "author": {
      "@type": article.author['@type'],
      "name": article.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "PLAGIATANET",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plagiatanet.net/vite.svg"
      }
    },
    "description": article.content.replace(/<[^>]*>?/gm, '').substring(0, 250) + '...'
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto relative transform transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}
      >
         <style>{`
            .article-content h1 { font-size: 1.75rem; line-height: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; }
            @media (min-width: 768px) {
                .article-content h1 { font-size: 2.25rem; line-height: 2.5rem; }
            }
            .article-content h2 { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
            .article-content h3 { font-size: 1.25rem; font-weight: 600; color: #334155; margin-top: 2rem; margin-bottom: 0.75rem; }
            .article-content p, .article-content li { color: #475569; line-height: 1.75; font-size: 1.05rem; }
            .article-content p { margin-bottom: 1.25rem; }
            .article-content ul, .article-content ol { margin-left: 1.5rem; margin-bottom: 1.25rem; list-style-position: outside; }
            .article-content ul { list-style-type: disc; }
            .article-content ol { list-style-type: decimal; }
            .article-content li { margin-bottom: 0.5rem; padding-left: 0.5rem; }
            .article-content a:not(.cta-button) { color: #f59e0b; text-decoration: underline; font-weight: 500; }
            .article-content a:not(.cta-button):hover { color: #d97706; }
            .article-content strong { color: #0f172a; font-weight: 600; }
            .article-content blockquote { border-left: 4px solid #fcd34d; padding: 0.75rem 1.25rem; margin: 1.5rem 0; font-style: italic; color: #52525b; background-color: #fefce8; border-radius: 0 0.5rem 0.5rem 0;}
            .article-content .cta-button { display: inline-block; background-color: #f59e0b; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; transition: all 0.3s; cursor: pointer; }
            .article-content .cta-button:hover { background-color: #d97706; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .article-content hr { border-color: #e2e8f0; }
         `}</style>
        <header className="p-4 sm:p-6 border-b border-slate-200 flex justify-between items-start gap-4 flex-shrink-0">
            <h2 id="article-title" className="text-xl md:text-2xl font-bold text-slate-800">{article.title}</h2>
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                aria-label="Закрыть статью"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </header>
        <div ref={contentRef} className="p-6 md:p-8 overflow-y-auto article-content">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
