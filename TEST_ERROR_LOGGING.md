# Тестирование логирования ошибок в Production

## Проблема, которая была исправлена

**До:** `drop_console: true` удалял **ВСЕ** console методы, включая критичные:
- ❌ `console.error()` - для ошибок
- ❌ `console.warn()` - для предупреждений

**После:** `pure_funcs: ['console.log', 'console.debug', 'console.info']` удаляет только:
- ✅ `console.log()` - отладочные сообщения
- ✅ `console.debug()` - детальная отладка
- ✅ `console.info()` - информационные сообщения

**Сохраняется в production:**
- ✅ `console.error()` - критические ошибки
- ✅ `console.warn()` - предупреждения

## Где используется console.error()

### OrderForm.tsx (строка 89)
```typescript
catch (error) {
    console.error('Order submission error:', error);
    setStatus({ 
        type: 'error', 
        text: '❌ Произошла ошибка при отправке...' 
    });
}
```

**Важность:** Логирование ошибок отправки заказов критично для:
- Отладки проблем интеграции с backend
- Мониторинга ошибок в production
- Анализа проблем пользователей

## Как протестировать

### 1. Development режим
```bash
npm run dev
# Все console.* работают нормально
```

### 2. Production build
```bash
npm run build
npm run preview
```

### 3. Проверка в браузере

**Откройте DevTools Console и проверьте:**

✅ **console.error() должен работать:**
- Откройте форму заказа
- Введите невалидные данные или отключите интернет
- Отправьте форму
- В Console должно появиться: `Order submission error: ...`

❌ **console.log() должен быть удалён:**
- Если где-то есть `console.log()`, его не будет в production build

### 4. Инструменты мониторинга

Для production рекомендуется добавить:
- **Sentry** - для автоматического сбора ошибок
- **LogRocket** - для записи сессий с ошибками
- **Google Analytics** - для отслеживания событий

## Добавление нового логирования

### ❌ НЕ ДЕЛАЙТЕ ТАК:
```typescript
console.log('Debug info:', data); // Будет удалено ✅
console.info('User action:', action); // Будет удалено ✅
```

### ✅ ДЕЛАЙТЕ ТАК:
```typescript
// Для production ошибок
console.error('Critical error:', error); // Сохранится ✅

// Для важных предупреждений
console.warn('Deprecated API used'); // Сохранится ✅

// Для разработки (будет удалено в production)
if (import.meta.env.DEV) {
  console.log('Debug:', data);
}
```

## Размер бандла

Удаление `console.log/debug/info` экономит:
- ~500-1000 байт на каждый вызов
- Минимальное влияние на размер, но улучшает чистоту кода

