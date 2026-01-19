# CRM - Система управления заявками

SPA приложение для управления заявками на транспортировку грузов, разработанное с использованием React 18, TypeScript 5 и Vite.

## Технологический стек

- **React 18** - UI библиотека
- **TypeScript 5** - типизация
- **Vite** - сборщик и dev-сервер
- **React Router 6.4** - маршрутизация
- **Zustand** - управление состоянием
- **Ant Design** - UI компоненты
- **Axios** - HTTP клиент
- **CSS Modules** - стилизация

## Функциональность

- ✅ Аутентификация через JWT токен
- ✅ Защита роутов от неавторизованного доступа
- ✅ Список заявок с табличным представлением
- ✅ Пагинация заявок
- ✅ Детальная информация о заявке в модальном окне
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Боковое меню с hover эффектом

## Установка и запуск

### Локальная разработка

1. Установите зависимости:

```bash
npm install
```

2. Создайте файл `.env` (опционально):

```env
VITE_API_BASE_URL=https://gocrm.gruzoperevozki-rf.com
```

3. Запустите dev-сервер:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:8080`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в директории `dist`

### Предпросмотр продакшен сборки

```bash
npm run preview
```

## Развертывание в Docker

### Сборка образа

```bash
docker build -t gruzoperevozki-crm .
```

### Запуск контейнера

```bash
docker run -d -p 8080:8080 --name crm-app gruzoperevozki-crm
```

Приложение будет доступно по адресу `http://localhost:8080`

### Использование docker-compose (опционально)

Создайте файл `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '8080:8080'
    environment:
      - VITE_API_BASE_URL=https://gocrm.gruzoperevozki-rf.com
```

Запуск:

```bash
docker-compose up -d
```

## Тестовые данные для входа

- **Логин:** `test`
- **Пароль:** `12345678`

## Структура проекта

```
src/
├── @types/             # TypeScript типы
├── api/               # API сервисы
├── assets/            # Статические ресурсы
├── components/        # Переиспользуемые компоненты
│   ├── Layout/        # Компоненты макета
│   └── ...
├── constants/         # Константы
├── hooks/             # React хуки
├── lib/               # Утилиты и API клиент
├── pages/             # Страницы приложения
│   ├── Login/         # Страница входа
│   └── Orders/        # Страница заявок
├── store/             # Zustand store
├── styles/            # Глобальные стили
├── utils/             # Вспомогательные функции
└── App.tsx            # Корневой компонент
```

## Скрипты

- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка для продакшена
- `npm run preview` - предпросмотр продакшен сборки
- `npm run lint` - проверка кода линтером
- `npm run format` - форматирование кода

## Переменные окружения

- `VITE_API_BASE_URL` - базовый URL API (по умолчанию: `https://gocrm.gruzoperevozki-rf.com`)

## Требования

- Node.js 20+
- npm или yarn

## Браузерная поддержка

Приложение протестировано и работает в Chrome 119+

