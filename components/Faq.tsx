import React, { useState } from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { FaqItem } from '../types';
import { ChevronDownIcon } from '../constants';

const faqItems: FaqItem[] = [
    { question: "Как вы повышаете уникальность?", answer: "Мы используем комплекс ручных методов: глубокий рерайт, перефразирование, уникализацию с сохранением научного стиля и терминологии, а также реструктуризацию предложений. Мы не используем автоматические программы и кодировки, которые искажают смысл." },
    { question: "Изменится ли смысл моей работы?", answer: "Нет, сохранение научного смысла и логики вашей работы – наш главный приоритет. Над текстом работают эксперты в вашей научной области." },
    { question: "Сколько времени занимает работа?", answer: "Стандартный срок – 1–2 дня. Однако мы предлагаем и срочные тарифы с выполнением от 2 часов, в зависимости от объема и сложности текста." },
    { question: "Какие гарантии вы даете?", answer: "Мы гарантируем достижение процента уникальности, согласованного при заказе. Правки в рамках заявленных требований бесплатны. Доведение до результата - наша репутация." },
    { question: "Что делать, если вуз использует свою систему?", answer: "Многие вузы используют собственные, закрытые модули на базе Антиплагиат.ВУЗ. Мы знакомы с алгоритмами большинства из них. При заказе укажите название вашего вуза, и мы проведем проверку с учетом его специфических требований." },
    { question: "Можете ли работать с технической литературой?", answer: "Да, в нашей команде есть эксперты с техническим образованием, которые специализируются на работах в области инженерии, IT, физики и других точных наук. Мы сохраняем всю сложную терминологию, формулы и специфику текста." },
    { question: "Безопасно ли отправлять вам работу?", answer: "Абсолютно. Мы гарантируем полную конфиденциальность." },
    { question: "Как долго вы храните мою работу после выполнения заказа?", answer: "Через 30 дней после передачи готовой работы мы полностью удаляем ее из нашей системы для обеспечения вашей конфиденциальности." },
    { question: "Как происходит оплата?", answer: "Только безналичный расчет: онлайн оплата, перевод через интернет-банкинг на расчетный счет." },
    { question: "Есть ли скидки для постоянных заказчиков?", answer: "Да, у нас действует система лояльности для постоянных клиентов. Чтобы узнать подробности о скидках, пожалуйста, свяжитесь с нашим менеджером при оформлении заказа." },
];

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    return (
        <section id="faq" className="py-16 md:py-20 bg-gray-50">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">Ответы на частые вопросы</h2>
                    <div className="mt-12 max-w-4xl mx-auto space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200/80">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="flex justify-between items-center w-full p-6 text-left font-semibold text-slate-800"
                                >
                                    <span className="pr-4">{item.question}</span>
                                    <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-amber-600' : 'text-slate-400'}`}>
                                        {ChevronDownIcon}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Faq;