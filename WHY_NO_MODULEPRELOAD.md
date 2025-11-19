# Почему не используется modulepreload для index.tsx

## Проблема, которая была исправлена

### ❌ **Было (НЕКОРРЕКТНО):**

```html
<link rel="modulepreload" href="/index.tsx">
<script type="module" src="/index.tsx" fetchpriority="high"></script>
```

### ⚠️ **Почему это не работает в production:**

1. **Development режим:**
   - Vite dev server обслуживает `/index.tsx` напрямую ✅
   - `modulepreload` находит файл ✅

2. **Production build:**
   - Vite компилирует TypeScript в JavaScript
   - Создаёт файл с хешем: `/assets/index-abc123.js`
   - `modulepreload href="/index.tsx"` → **404 ошибка** ❌

### ✅ **Стало (ПРАВИЛЬНО):**

```html
<link rel="preload" href="/index.css" as="style">
<script type="module" src="/index.tsx" fetchpriority="high"></script>
```

## Почему fetchpriority="high" достаточно

### 1. Высокий приоритет загрузки

`fetchpriority="high"` говорит браузеру загрузить модуль **раньше** других ресурсов:

```
Приоритеты браузера (от высокого к низкому):
1. Critical CSS (preload + as="style")
2. <script fetchpriority="high"> ← Наш случай
3. <script> (обычный приоритет)
4. Изображения, шрифты
5. Prefetch ресурсы
```

### 2. Vite автоматически оптимизирует

Vite в production build:
- ✅ Code splitting для vendor кода
- ✅ Tree shaking неиспользуемого кода
- ✅ Minification
- ✅ Правильные import/export statements
- ✅ Module graph оптимизация

### 3. Избыточность modulepreload

Для **главного модуля** `modulepreload` избыточен потому что:
- Модуль загружается **синхронно** (тег script в head)
- `fetchpriority="high"` уже повышает приоритет
- Нет динамического импорта, который нужно предзагрузить

## Когда modulepreload ПОЛЕЗЕН

`modulepreload` имеет смысл для:

### 1. Динамически импортируемых модулей

```typescript
// В коде есть динамический импорт
button.addEventListener('click', async () => {
  const module = await import('./heavy-feature.js');
  module.init();
});
```

```html
<!-- Предзагрузка для быстрого отклика -->
<link rel="modulepreload" href="/assets/heavy-feature-xyz.js">
```

### 2. Route-based code splitting

```typescript
const routes = [
  { path: '/', component: () => import('./Home.js') },
  { path: '/about', component: () => import('./About.js') }
];
```

```html
<!-- Предзагрузка вероятных маршрутов -->
<link rel="modulepreload" href="/assets/Home-abc.js">
<link rel="modulepreload" href="/assets/About-def.js">
```

### 3. Worker modules

```typescript
const worker = new Worker('/worker.js', { type: 'module' });
```

```html
<link rel="modulepreload" href="/assets/worker-xyz.js">
```

## Сравнение стратегий

| Стратегия | Для главного модуля | Для динамических импортов |
|-----------|---------------------|---------------------------|
| **modulepreload** | ❌ Избыточно | ✅ Полезно |
| **fetchpriority="high"** | ✅ Достаточно | ❌ Не применимо |
| **preload as="script"** | ⚠️ Работает, но хуже | ❌ Только для non-module скриптов |
| **Без оптимизации** | ⚠️ Низкий приоритет | ❌ Медленная загрузка |

## Как Vite решает проблему хеширования

Vite автоматически:

1. **В HTML шаблоне:**
   ```html
   <script type="module" src="/index.tsx"></script>
   ```

2. **После build:**
   ```html
   <script type="module" src="/assets/index-abc123.js"></script>
   ```

3. **Manifest для SSR:**
   ```json
   {
     "index.tsx": {
       "file": "assets/index-abc123.js",
       "isEntry": true
     }
   }
   ```

**Вывод:** Vite автоматически обновляет пути в production, но `modulepreload` в `index.html` не обновляется (статический HTML).

## Проверка в production

### 1. Build проекта

```bash
npm run build
```

### 2. Проверьте dist/index.html

```html
<!-- Vite автоматически обновит путь: -->
<script type="module" crossorigin src="/assets/index-abc123.js"></script>
```

### 3. Проверьте Network панель

В DevTools → Network:
- ✅ Должен загружаться `/assets/index-abc123.js`
- ✅ Приоритет: **High**
- ❌ НЕ должно быть 404 для `/index.tsx`

### 4. Проверьте производительность

В DevTools → Performance:
- Модуль загружается **рано** в критическом пути
- Нет дополнительных запросов
- Время до First Contentful Paint минимизировано

## Итоговая рекомендация

Для **главного модуля** в Vite проектах:

✅ **ИСПОЛЬЗУЙТЕ:**
```html
<script type="module" src="/index.tsx" fetchpriority="high"></script>
```

❌ **НЕ ИСПОЛЬЗУЙТЕ:**
```html
<link rel="modulepreload" href="/index.tsx">
```

**Причина:** 
- fetchpriority достаточно для высокого приоритета
- Vite автоматически оптимизирует загрузку
- modulepreload не работает с .tsx в production
- Избегаем 404 ошибок

---

**См. также:**
- [MDN: modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload)
- [Web.dev: Preload critical assets](https://web.dev/preload-critical-assets/)
- [Vite: Asset Handling](https://vitejs.dev/guide/assets.html)

