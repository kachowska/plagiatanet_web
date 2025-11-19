# Оптимизация неиспользуемого JavaScript

## 📊 Текущая ситуация

**Ожидаемая экономия: 296 KiB** (54% от общего JavaScript)

| Источник | Загружено | Неиспользуемый | % |
|----------|-----------|----------------|---|
| **Google reCAPTCHA** | 346.6 KiB | 229.2 KiB | 66% 🔴 |
| **Tailwind CDN** | 123.3 KiB | 37.8 KiB | 31% ⚠️ |
| **Собственный бандл** | 76.1 KiB | 29.5 KiB | 39% ⚠️ |

**Дополнительная проблема:** Обнаружено 4 длительные задачи в основном потоке

## 🎯 Стратегия оптимизации

### 1️⃣ Lazy Load reCAPTCHA (Приоритет: 🔴 ВЫСОКИЙ)

**Проблема:** reCAPTCHA загружается на **всех** страницах, но используется только в OrderForm

**Экономия:** ~229 KiB + улучшение FCP/TBT

#### Текущая реализация (ПЛОХО):

```html
<!-- index.html - загружается глобально -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

```tsx
<!-- OrderForm.tsx - используется только здесь -->
<div className="g-recaptcha" data-sitekey="..."></div>
```

#### Оптимизация:

**Шаг 1:** Удалить глобальную загрузку из `index.html`

**Шаг 2:** Создать хук для ленивой загрузки:

```typescript
// hooks/useRecaptcha.ts
import { useEffect, useState } from 'react';

export const useRecaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Проверяем, не загружен ли уже
    if (window.grecaptcha) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(new Error('Failed to load reCAPTCHA'));

    document.head.appendChild(script);

    return () => {
      // Cleanup если компонент размонтируется
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { loaded, error };
};
```

**Шаг 3:** Использовать в OrderForm:

```typescript
// components/OrderForm.tsx
import { useRecaptcha } from '../hooks/useRecaptcha';

const OrderForm: React.FC<OrderFormProps> = ({ onPrivacyClick }) => {
  const { loaded: recaptchaLoaded, error: recaptchaError } = useRecaptcha();
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ... форма ... */}
      
      <div className="flex justify-center pt-2">
        {recaptchaLoaded ? (
          <div className="g-recaptcha" data-sitekey="6Lf_5QssAAAAALHPXxsfnq0uyvtG_AooTUd6HK_U"></div>
        ) : (
          <div className="text-slate-500">Загрузка проверки...</div>
        )}
      </div>
    </form>
  );
};
```

**Результат:**
- ✅ reCAPTCHA загружается только на страницах с формой
- ✅ Экономия ~229 KiB на других страницах (главная, блог, услуги)
- ✅ Улучшение FCP и TBT

---

### 2️⃣ Миграция с Tailwind CDN на build (Приоритет: ⚠️ СРЕДНИЙ)

**Проблема:** Tailwind CDN (123 KiB) содержит **ВСЕ** utility классы, используются ~70%

**Экономия:** ~37 KiB + улучшение кэширования

#### Миграция:

**Шаг 1:** Установить Tailwind локально

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Шаг 2:** Создать `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Критические стили из <style> */
@layer components {
  .fade-in-up {
    animation: fadeInUp 0.7s ease-out forwards;
    will-change: opacity, transform;
  }
  
  .opacity-0-disabled {
    opacity: 0;
    pointer-events: none;
    user-select: none;
  }
}
```

**Шаг 3:** Настроить `tailwind.config.js`

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

**Шаг 4:** Импортировать в `index.tsx`

```typescript
import './index.css';
```

**Шаг 5:** Удалить из `index.html`

```html
<!-- Удалить: -->
<script>tailwind = { config: {...} }</script>
<script src="https://cdn.tailwindcss.com" fetchpriority="high"></script>
```

**Результат:**
- ✅ Размер: 123 KiB → ~12-15 KiB (-89%)
- ✅ Только используемые классы
- ✅ Лучшее кэширование
- ✅ Нет зависимости от CDN

---

### 3️⃣ Code Splitting собственного JS (Приоритет: 🟡 СРЕДНИЙ)

**Проблема:** 29.5 KiB неиспользуемого кода в собственном бандле

**Экономия:** ~10-15 KiB + улучшение TTI

#### Стратегия:

**A. Route-based splitting**

```typescript
// App.tsx
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./components/Home'));
const ServicePage = lazy(() => import('./components/ServicePage'));
const Blog = lazy(() => import('./components/Blog'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Suspense>
  );
}
```

**B. Component-based splitting**

```typescript
// Lazy load тяжёлых компонентов
const Calculator = lazy(() => import('./components/Calculator'));
const ArticleModal = lazy(() => import('./components/ArticleModal'));
const OrderForm = lazy(() => import('./components/OrderForm'));

// Использование:
{showCalculator && (
  <Suspense fallback={<div>...</div>}>
    <Calculator />
  </Suspense>
)}
```

**C. Intersection Observer для отложенного монтирования**

```typescript
// components/LazyMount.tsx
import { useEffect, useRef, useState } from 'react';

export const LazyMount: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [shouldMount, setShouldMount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Загружаем за 200px до видимости
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldMount ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
};

// Использование:
<LazyMount>
  <Suspense fallback={<div>...</div>}>
    <Blog />
  </Suspense>
</LazyMount>
```

**Результат:**
- ✅ Каждый маршрут загружает только свой код
- ✅ Компоненты ниже fold загружаются при скролле
- ✅ Улучшение TTI и TBT

---

## 📈 Ожидаемые результаты

### Этап 1: Только reCAPTCHA lazy load

| Метрика | До | После | Улучшение |
|---------|-----|--------|-----------|
| **Неиспользуемый JS** | 296 KiB | ~67 KiB | **-77%** ⚡ |
| **Initial load (главная)** | 546 KiB | 317 KiB | **-42%** 📦 |
| **FCP** | ~1.5s | ~1.0s | **-33%** 🚀 |
| **TBT** | ~300ms | ~150ms | **-50%** ⚡ |

### Этап 2: + Tailwind migration

| Метрика | Этап 1 | Этап 2 | Улучшение |
|---------|--------|--------|-----------|
| **Неиспользуемый JS** | 67 KiB | ~30 KiB | **-55%** ⚡ |
| **Total CSS+JS** | 317 KiB | ~205 KiB | **-35%** 📦 |
| **LCP** | ~2.0s | ~1.5s | **-25%** 🎯 |

### Этап 3: + Code splitting

| Метрика | Этап 2 | Этап 3 | Улучшение |
|---------|--------|--------|-----------|
| **Initial JS** | 76 KiB | ~40 KiB | **-47%** ⚡ |
| **TTI** | ~3.0s | ~2.0s | **-33%** 🚀 |
| **Длительные задачи** | 4 | 0-1 | **-75-100%** ✅ |

---

## ✅ Чеклист внедрения

### Этап 1: reCAPTCHA (1-2 часа)

- [ ] Создать `hooks/useRecaptcha.ts`
- [ ] Обновить `OrderForm.tsx` для использования хука
- [ ] Удалить глобальную загрузку из `index.html`
- [ ] Тестирование: форма работает, reCAPTCHA загружается
- [ ] Проверка PageSpeed: экономия ~229 KiB

### Этап 2: Tailwind migration (2-4 часа)

- [ ] `npm install -D tailwindcss postcss autoprefixer`
- [ ] Создать `tailwind.config.js` и `postcss.config.js`
- [ ] Создать `src/index.css` с критическими стилями
- [ ] Импортировать CSS в `index.tsx`
- [ ] Удалить Tailwind CDN из `index.html`
- [ ] Тестирование: все стили работают
- [ ] Проверка размера: build size ~12-15 KiB вместо 123 KiB

### Этап 3: Code splitting (4-8 часов)

- [ ] Создать `LazyMount` компонент
- [ ] Lazy load модальных окон (ArticleModal, OrderForm)
- [ ] Lazy load "ниже fold" компонентов (Blog, Testimonials, Cases)
- [ ] Route-based splitting если используется React Router
- [ ] Тестирование: все работает, загрузка плавная
- [ ] Проверка Chrome DevTools: chunk sizes корректные

---

## 🔍 Тестирование

### Перед каждым этапом:

```bash
npm run build
npm run preview
```

### В Chrome DevTools:

1. **Coverage tab** - проверить % неиспользуемого кода
2. **Network tab** - проверить размеры и количество запросов
3. **Performance tab** - проверить Long Tasks
4. **Lighthouse** - проверить метрики

### PageSpeed Insights:

- https://pagespeed.web.dev/
- Проверить "Unused JavaScript" audit
- Целевой показатель: < 50 KiB неиспользуемого кода

---

## 📚 Ссылки

- [Chrome DevTools: Find unused code](https://developer.chrome.com/docs/devtools/coverage/)
- [Web.dev: Remove unused code](https://web.dev/remove-unused-code/)
- [React: Code-Splitting](https://react.dev/reference/react/lazy)
- [Tailwind: Optimizing for Production](https://tailwindcss.com/docs/optimizing-for-production)
- [reCAPTCHA: Loading dynamically](https://developers.google.com/recaptcha/docs/loading)

