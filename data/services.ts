
import { ServiceData } from '../types';

export const servicesData: ServiceData[] = [
    {
        slug: 'diploma',
        title: 'Повышение уникальности дипломной работы',
        subtitle: 'Гарантия прохождения Антиплагиат.ВУЗ',
        descriptionMeta: 'Профессиональный рерайт дипломных работ. Поднимем уникальность диплома до 85-95% за 1 день. Без потери смысла. Гарантия результата.',
        heroTitle: 'Повысим уникальность <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">дипломной работы</span> для успешной защиты',
        heroSubtitle: 'Профессиональная переработка текста диплома с соблюдением научных стандартов и требований вашего вуза. Пройдем любой антиплагиат.'
    },
    {
        slug: 'dissertation',
        title: 'Уникализация диссертации (кандидатской, докторской)',
        subtitle: 'Конфиденциально. Эксперты с ученой степенью',
        descriptionMeta: 'Рерайт диссертаций от кандидатов наук. Повышение оригинальности текста диссертации с сохранением научной новизны и терминологии.',
        heroTitle: 'Доведем уникальность <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">диссертации</span> до требуемого уровня',
        heroSubtitle: 'Ручной рерайт от экспертов в вашей научной области. Сохраняем терминологию, научную новизну и стиль изложения.'
    },
    {
        slug: 'coursework',
        title: 'Поднять оригинальность курсовой работы',
        subtitle: 'Быстро и недорого. Срок от 2 часов',
        descriptionMeta: 'Нужно срочно повысить уникальность курсовой? Сделаем качественный рерайт за пару часов. Проверка в Антиплагиат.ВУЗ.',
        heroTitle: 'Срочное повышение уникальности <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">курсовой работы</span>',
        heroSubtitle: 'Исправим низкий процент заимствований быстро и качественно. Ваша курсовая пройдет проверку с первого раза.'
    },
    {
        slug: 'article',
        title: 'Рерайт научных статей ВАК и РИНЦ',
        subtitle: 'Для публикации в рецензируемых журналах',
        descriptionMeta: 'Уникализация научных статей для публикации в журналах ВАК, Scopus, Web of Science. Глубокая переработка текста.',
        heroTitle: 'Подготовим вашу <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">научную статью</span> к публикации',
        heroSubtitle: 'Повышение уникальности статей ВАК, РИНЦ, Scopus. Глубокий рерайт с сохранением смысла и структуры исследования.'
    },
    {
        slug: 'master',
        title: 'Уникализация магистерской диссертации',
        subtitle: 'Профессиональный подход к магистерским работам',
        descriptionMeta: 'Помощь с уникальностью магистерской диссертации. Ручная переработка текста, прохождение Антиплагиат.ВУЗ.',
        heroTitle: 'Высокая уникальность <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">магистерской диссертации</span>',
        heroSubtitle: 'Гарантируем прохождение проверки в системе Антиплагиат.ВУЗ. Работаем со всеми научными направлениями.'
    },
    {
        slug: 'essay',
        title: 'Повышение уникальности реферата и эссе',
        subtitle: 'Быстрое выполнение в день обращения',
        descriptionMeta: 'Качественный рерайт рефератов и эссе. Поднимем оригинальность текста до 90-100%.',
        heroTitle: 'Уникальный <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">реферат или эссе</span> за пару часов',
        heroSubtitle: 'Избавим от плагиата в студенческих работах. Быстро, недорого и с гарантией качества.'
    },
     {
        slug: 'practice-report',
        title: 'Уникальность отчета по практике',
        subtitle: 'С учетом специфики предприятия',
        descriptionMeta: 'Повышение уникальности отчета по учебной или производственной практике. Индивидуальный подход.',
        heroTitle: 'Сделаем уникальным ваш <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">отчет по практике</span>',
        heroSubtitle: 'Перефразируем текст отчета, сохраняя структуру и данные о предприятии. Пройдете нормоконтроль без проблем.'
    }
];

export const getServiceData = (slug: string): ServiceData | undefined => {
    return servicesData.find(service => service.slug === slug);
};
