# mestoBeckand
проект по созданию сервера для проекта mesto 
Рукавишникова Диана 

Ссылки:
Домен - https://mestobackend.ml/
публичный IP - 84.201.174.234

## Функционал:

| Запрос                            | Ответ                         |
| -------------                     |-------------                |
| GET localhost:3000/users          | вернёт всех пользователей из базы; |
| POST localhost:3000/users          | создает пользователя;|
| GET localhost:3000/users/{id}|   вернёт JSON-объект пользователя с переданным после /users идентификатором;|
| GET localhost:3000/cards          | вернёт все карточки всех пользователей; |
| POST localhost:3000/cards          | создаст карточку; |

### git  Установка:
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
