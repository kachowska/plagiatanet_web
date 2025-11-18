import React from 'react';
import { Orderable } from '../types';
import { FileTextIcon, TelegramIcon } from '../constants';

const StickyElements: React.FC<Orderable> = ({ onOrderClick }) => {
    return (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
             <a
                href="https://t.me/uniquetextbot"
                target="_blank"
                rel="noopener noreferrer"
                title="Наш Telegram бот"
                aria-label="Наш Telegram бот"
                className="bg-sky-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            >
                 <span className="h-7 w-7">{TelegramIcon}</span>
            </a>
            <button
                type="button"
                onClick={onOrderClick}
                className="bg-amber-500 text-white font-bold w-14 h-14 sm:w-auto sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse-slow"
            >
                 <span className="h-6 w-6 sm:mr-2">{FileTextIcon}</span>
                 <span className="hidden sm:inline">Заказать</span>
            </button>
        </div>
    );
};

export default StickyElements;