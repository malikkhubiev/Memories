# Memories - Платформа для Обмена Визуальными Воспоминаниями

<div align="center">

![Memories Platform](https://img.shields.io/badge/Memories-Platform-blue)
![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![React](https://img.shields.io/badge/React-Latest-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-orange)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Material UI](https://img.shields.io/badge/Material-UI-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue)
![i18n](https://img.shields.io/badge/i18n-Enabled-green)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

[Демо](https://memories-hwwy.onrender.com) • [Установка](#-установка-и-запуск) • [Документация](#-техническая-реализация) • [Лицензия](#-лицензия)

</div>

## 📑 Содержание

- [🎯 О Проекте](#-о-проекте)
- [🚀 Реализованные Возможности](#-реализованные-возможности)
  - [📸 Управление Контентом](#-управление-контентом)
  - [💬 Социальные Функции](#-социальные-функции)
  - [👤 Персонализация](#-персонализация)
- [💻 Техническая Реализация](#-техническая-реализация)
  - [Архитектура и Паттерны](#архитектура-и-паттерны)
  - [Оптимизация Производительности](#оптимизация-производительности)
  - [Алгоритмические Решения](#алгоритмические-решения)
  - [Безопасность и Валидация](#безопасность-и-валидация)
  - [Масштабируемость](#масштабируемость)
  - [UI/UX Оптимизации](#uiux-оптимизации)
- [🛠 Технический Стек](#-технический-стек)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [📊 Модели Данных](#-модели-данных)
- [🔐 Безопасность](#-безопасность)
- [🚀 Установка и Запуск](#-установка-и-запуск)
- [📝 Лицензия](#-лицензия)

---

## 🎯 О Проекте

Memories - это современная социальная платформа для обмена визуальными воспоминаниями с продвинутыми функциями взаимодействия и персонализации. Платформа предлагает:

- **Умная система рекомендаций**: Анализ времени просмотра, лайков и комментариев для персонализированной ленты
- **Продвинутое управление контентом**: Загрузка с предобработкой, приватность и организация фотографий
- **Богатое социальное взаимодействие**: Система подписок, комментариев, лайков и сообщений
- **Персонализация**: Настройка профиля, предпочтений и тематических интересов
- **Мультиязычность**: Полная поддержка русского и английского языков
- **Адаптивный дизайн**: Оптимизация под все устройства с поддержкой тёмной темы

---

## 🚀 Реализованные Возможности

### 📸 Управление Контентом
- **Загрузка изображений**:
  - Предварительная обработка с возможностью кадрирования
  - Автоматическая оптимизация размера (до 5MB)
  - Поддержка формата JPG
  - Добавление описаний и тегов
- **Приватность**:
  - Настройка видимости для каждого изображения
  - Система блокировки нежелательных пользователей
  - Контроль доступа к профилю
- **Организация**:
  - Система тегов для категоризации
  - Сохранение избранных изображений
  - Сортировка по дате и популярности

### 💬 Социальные Функции
- **Взаимодействие**:
  - Система подписок с подтверждением
  - Комментарии с лайками
  - Реакции на изображения
  - Встроенная система сообщений
  - Публикация постов в Telegram и WhatsApp через React-Share
- **Рекомендации**:
  - Умный алгоритм на основе:
    - Времени просмотра изображений
    - Количества лайков и комментариев
    - Пользовательских предпочтений по тегам
    - Популярности контента
- **Модерация**:
  - Фильтрация нецензурной лексики
  - Система блокировки пользователей
  - Контроль приватности контента
- **Распространение контента**:
  - Поддержка Telegram и WhatsApp
  - Возможность делиться как публичными, так и приватными постами

### 👤 Персонализация
- **Профиль**:
  - Настройка имени и аватара
  - Управление приватностью аккаунта
  - Статистика подписчиков и подписок
- **Интерфейс**:
  - Переключение между светлой и тёмной темой
  - Адаптивный дизайн для всех устройств
  - Поддержка русского и английского языков
- **Предпочтения**:
  - Настройка интересов по тегам
  - Персонализированная лента
  - Система "Не интересно" для контента

---

## 💻 Техническая Реализация

### Архитектура и Паттерны
- **Архитектура приложения**:
  - Модульная структура с разделением на логические компоненты
  - Redux Toolkit для управления состоянием
  - RTK Query для оптимизированной работы с API
  - React Router для маршрутизации
  - Material UI для компонентной базы

- **Паттерны проектирования**:
  - **Container/Presenter**: Разделение логики и представления
  - **Custom Hooks**: Переиспользуемая бизнес-логика
    - `useCustomDispatch`: Управление состоянием загрузки
    - `useUser`: Работа с профилями пользователей
    - `useSocket`: Реал-тайм коммуникация
  - **Observer**: Отслеживание изменений состояния
  - **Factory**: Создание компонентов интерфейса
  - **Strategy**: Различные стратегии обработки данных

### Оптимизация Производительности
- **Код-сплиттинг**:
  - Ленивая загрузка компонентов через `React.lazy()`
  - Разделение на чанки по маршрутам
  - Динамический импорт ресурсов

- **Оптимизация рендеринга**:
  - Мемоизация компонентов через `React.memo()`
  - Оптимизация ре-рендеров с `useCallback` и `useMemo`
  - Виртуализация списков для больших наборов данных

- **Управление состоянием**:
  - Нормализованное хранение данных в Redux
  - Селекторы для эффективного доступа к данным
  - Кэширование запросов через RTK Query

### Алгоритмические Решения
- **Поиск и фильтрация**:
  - Дебаунсинг поисковых запросов
  - Оптимизированный поиск по подстроке
  - Кэширование результатов поиска

- **Рекомендательная система**:
  - Анализ времени просмотра контента
  - Учёт пользовательских предпочтений
  - Взвешивание лайков и комментариев

- **Обработка изображений**:
  - Предварительная обработка на клиенте
  - Оптимизация размера
  - Ленивая загрузка изображений

### Безопасность и Валидация
- **Аутентификация**:
  - JWT токены с автоматическим обновлением
  - Защищенные маршруты
  - Валидация всех входящих данных

- **Защита контента**:
  - Фильтрация нецензурной лексики
  - Система блокировки пользователей
  - Контроль доступа к приватному контенту

### Масштабируемость
- **Модульность**:
  - Независимые модули для каждой функциональности
  - Переиспользуемые компоненты
  - Четкое разделение ответственности

- **API Интеграция**:
  - RESTful endpoints
  - Оптимизированные запросы
  - Кэширование на клиенте

### UI/UX Оптимизации
- **Адаптивный дизайн**:
  - Золотое сечение для компонентов
  - Медиа-запросы для разных устройств
  - Оптимизированные отступы и размеры

- **Темы и локализация**:
  - Динамическая смена тем
  - Поддержка RTL
  - i18n с динамической загрузкой переводов

---

## 🛠 Технический Стек

### Backend
- **Node.js** (v14.x) - Серверная платформа
- **Express.js** - Веб-фреймворк
- **Sequelize** - ORM для работы с данными
- **SQLite** - База данных
- **JWT** - Аутентификация
- **Express Validator** - Валидация данных
- **Bad-words** - Фильтрация контента

### Frontend
- **React** - Клиентский фреймворк
- **Material UI** - Компоненты интерфейса
- **Redux Toolkit** - Управление состоянием
- **RTK Query** - Работа с API
- **i18next** - Мультиязычность
- **React Easy Crop** - Обработка изображений
- **Emotion** - Стилизация компонентов

---

## 📊 Модели Данных
- **User** - Профили пользователей
- **Image** - Фотографии и медиа-контент
- **Tag** - Категории и теги
- **Comment** - Комментарии к контенту
- **Chat/Message** - Система сообщений
- **Preference** - Пользовательские предпочтения
- **Subscription** - Система подписок
- **ImageLike/CommentLike** - Система реакций
- **ImageView** - Отслеживание просмотров
- **SavedImage** - Сохранённые изображения
- **UserBlocked** - Система блокировки

---

## 🔐 Безопасность
- JWT аутентификация
- Валидация всех входящих данных
- Фильтрация нецензурного контента
- Система блокировки пользователей
- Настройки приватности контента
- Защита от неавторизованного доступа

---

## 🚀 Установка и Запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/malikkhubiev/Memories/
```

2. Установите зависимости:
```bash
npm install
cd client && npm install
```

3. Настройка окружения:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Запуск:
```bash
# Разработка
npm run all

# Продакшн
npm start
```

---

## 📝 Лицензия
ISC License

---

<div align="center">

Создано с ❤️ | [Демо](https://memories-hwwy.onrender.com)

*"Building products that users love"*

</div>
