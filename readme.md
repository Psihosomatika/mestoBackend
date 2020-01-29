# mestoBeckand
проект по созданию сервера для проекта mesto 
Рукавишникова Диана 

## Функционал:

| Запрос                            | Ответ                         |
| -------------                     |:-------------:                |
| GET localhost:3000/users          | вернёт JSON-объект из файла users.json; |
| GET localhost:3000/cards          | вернёт JSON-объект из файла cards.json; |
| GET localhost:3000/users/8340d0ec33270a25f2413b69|   вернёт JSON-объект пользователя с переданным после /users идентификатором|

## Установка:
Для установки необходимо наличие Node.js и npm

Сохраните проект у себя на компьютере:
```javascript
git clone https://github.com/Psihosomatika/mestoBackend.git
```

В корне проекта через консоль/терминал запустите команду:
```javascript
npm install
```
### После успешной установки станут доступны команды:
Запуск локального сервера:
```javascript
npm run dev
```
Запуск продакшн сервера:
```javascript
npm run start
```
