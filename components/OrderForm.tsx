
import React, { useRef, useState, useEffect } from 'react';
import { useRecaptcha } from '../hooks/useRecaptcha';

interface OrderFormProps {
    onPrivacyClick: () => void;
}

const API_BASE_URL = import.meta.env.VITE_ORDER_API_BASE_URL || 'https://paraphrase-uniquetext-pro-bot.onrender.com'; // Fallback to your Render URL

const OrderForm: React.FC<OrderFormProps> = ({ onPrivacyClick }) => {
    const [workFileName, setWorkFileName] = useState('');
    const [reportFileName, setReportFileName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' });
    const formRef = useRef<HTMLFormElement | null>(null);
    
    // Динамическая загрузка reCAPTCHA только когда пользователь открывает форму
    const { loaded: recaptchaLoaded } = useRecaptcha();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        if (e.target.files && e.target.files.length > 0) {
            setter(e.target.files[0].name);
        } else {
            setter('');
        }
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current || e.currentTarget;
        setIsSubmitting(true);
        setStatus({ type: null, text: '' });
        
        // Проверяем загрузку и прохождение reCAPTCHA
        if (!recaptchaLoaded) {
            setStatus({ 
                type: 'error', 
                text: '⏳ Пожалуйста, подождите загрузки проверки безопасности' 
            });
            setIsSubmitting(false);
            return;
        }
        
        // Проверяем прохождение reCAPTCHA согласно документации Google Cloud Console
        const enterprise = window.grecaptcha?.enterprise;

        if (!enterprise) {
            setStatus({
                type: 'error',
                text: '⚠️ Не удалось инициализировать reCAPTCHA. Попробуйте обновить страницу.'
            });
            setIsSubmitting(false);
            return;
        }

        let token = '';
        try {
            // Используем ready() как в документации Google Cloud Console
            await new Promise<void>((resolve, reject) => {
                enterprise.ready(async () => {
                    try {
                        token = await enterprise.execute('6LfiAhMsAAAAAJZ60cGtcDDTFMVchXhPtbYQ25x8', { action: 'submit_form' });
                        console.log('reCAPTCHA Enterprise token:', token);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        } catch (error) {
            console.error('reCAPTCHA Enterprise execution error:', error);
            setStatus({ 
                type: 'error', 
                text: '🔒 Ошибка при прохождении проверки безопасности. Пожалуйста, попробуйте еще раз.'
            });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(form);
        
        const fullName = formData.get('name')?.toString().trim() || '';
        const nameParts = fullName.split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '-';

        const dataToSend = new FormData();
        dataToSend.append('workType', formData.get('work-type') as string || '');
        dataToSend.append('name', firstName);
        dataToSend.append('surname', lastName);
        dataToSend.append('email', formData.get('email') as string || '');
        dataToSend.append('phone', formData.get('phone') as string || '');
        dataToSend.append('currentUniqueness', formData.get('current-uniqueness') as string || '');
        dataToSend.append('requiredUniqueness', formData.get('required-uniqueness') as string || '');
        dataToSend.append('message', formData.get('message') as string || '');
        dataToSend.append('deadline', formData.get('deadline-date') as string || '');
        dataToSend.append('source', 'Сайт (форма заказа)');
        
        // Append files
        const workFile = formData.get('work-file-upload');
        if (workFile instanceof File && workFile.size > 0) {
            dataToSend.append('workFile', workFile);
        } else if (workFileName) {
            dataToSend.append('workFileName', workFileName);
        }

        const reportFile = formData.get('report-file-upload');
        if (reportFile instanceof File && reportFile.size > 0) {
            dataToSend.append('reportFile', reportFile);
        } else if (reportFileName) {
             dataToSend.append('reportFileName', reportFileName);
        }

        try {
            dataToSend.append('recaptchaToken', token);
            const response = await fetch(`${API_BASE_URL}/api/web-order`, {
                method: 'POST',
                body: dataToSend,
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                setStatus({ type: 'success', text: '✅ Ваша заявка успешно отправлена! Менеджер свяжется с вами в ближайшее время.' });
                // Reset form
                formRef.current?.reset();
                setWorkFileName('');
                setReportFileName('');
                setMessage('');
                // Для Score-based (невидимой) reCAPTCHA сброс не требуется
            } else {
                throw new Error(result.error || 'Ошибка отправки');
            }
        } catch (error) {
            console.error('Order submission error:', error);
            setStatus({ type: 'error', text: '❌ Произошла ошибка при отправке. Пожалуйста, проверьте данные или попробуйте позже.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const workTypes = [
        'Курсовая работа',
        'Дипломная работа',
        'Статья',
        'Диссертация',
        'Реферат',
        'Эссе',
        'Практикум',
        'Другое'
    ];

    const inputClasses = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 py-3 px-4";
    const labelClasses = "block text-sm font-medium text-slate-700 mb-2";

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} ref={formRef}>
            {status.text && (
                <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {status.text}
                </div>
            )}
            <div>
                <label htmlFor="work-type" className={labelClasses}>Вид работы</label>
                <select
                    id="work-type"
                    name="work-type"
                    className={inputClasses}
                >
                    {workTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="name" className={labelClasses}>Имя и фамилия</label>
                <input type="text" name="name" id="name" required className={inputClasses} placeholder="Иван Иванов" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className={labelClasses}>Email-адрес *</label>
                    <input type="email" name="email" id="email" required className={inputClasses} placeholder="you@example.com" />
                </div>
                <div>
                    <label htmlFor="phone" className={labelClasses}>Номер телефона *</label>
                    <input type="tel" name="phone" id="phone" required className={inputClasses} placeholder="+7 (999) 123-45-67" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="current-uniqueness" className={labelClasses}>Какой сейчас процент уникальности, %</label>
                    <input type="number" name="current-uniqueness" id="current-uniqueness" className={inputClasses} placeholder="Например, 45" />
                </div>
                <div>
                    <label htmlFor="required-uniqueness" className={labelClasses}>Требуемый процент уникальности, %</label>
                    <input type="number" name="required-uniqueness" id="required-uniqueness" className={inputClasses} placeholder="Например, 85" />
                </div>
            </div>

            <div>
                <label className={labelClasses}>Прикрепить файл с работой в формате docx, doc *</label>
                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label htmlFor="work-file-upload" className="cursor-pointer bg-emerald-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-emerald-600 transition-colors whitespace-nowrap">
                        Выбрать файл
                    </label>
                    <input id="work-file-upload" name="work-file-upload" type="file" required className="sr-only" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => handleFileChange(e, setWorkFileName)} />
                    <span className="text-sm text-slate-500 truncate">{workFileName || 'Файл не выбран'}</span>
                </div>
                 <p className="mt-2 text-xs text-slate-500">Обязательное поле. Форматы: DOC, DOCX до 50MB</p>
            </div>
            
            <div>
                <label className={labelClasses}>Прикрепить отчет (необязательно)</label>
                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label htmlFor="report-file-upload" className="cursor-pointer bg-slate-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-slate-600 transition-colors whitespace-nowrap">
                        Выбрать файл
                    </label>
                    <input id="report-file-upload" name="report-file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, setReportFileName)} />
                    <span className="text-sm text-slate-500 truncate">{reportFileName || 'Файл не выбран'}</span>
                </div>
                 <p className="mt-2 text-xs text-slate-500">DOC, DOCX, PDF, RTF до 50MB</p>
            </div>
            
            <div>
                <label htmlFor="message" className={labelClasses}>Сообщение</label>
                <div className="relative mt-1">
                    <textarea id="message" name="message" rows={4} maxLength={200} onChange={handleMessageChange} className={inputClasses} placeholder="Ваши пожелания..."></textarea>
                    <div className="absolute bottom-2 right-3 text-xs text-slate-400">
                        {message.length} / 200
                    </div>
                </div>
            </div>

            <div>
                 <label htmlFor="deadline-date" className={labelClasses}>Дата сдачи</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                     <input type="date" name="deadline-date" id="deadline-date" className={`${inputClasses} pl-11`} />
                </div>
            </div>
            
            {/* reCAPTCHA Enterprise работает невидимо через execute() при отправке формы */}

            <div className="pt-2">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white ${isSubmitting ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:scale-105`}
                >
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ СООБЩЕНИЕ'}
                </button>
            </div>
             <p className="text-xs text-slate-500 text-center">Нажимая кнопку, вы соглашаетесь с <a href="#" onClick={(e) => { e.preventDefault(); onPrivacyClick(); }} className="underline hover:text-amber-600">политикой конфиденциальности</a>.</p>
        </form>
    );
};

export default OrderForm;