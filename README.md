### Документация API

Этот сервер реализован с использованием `Express.js` и предоставляет API для работы с данными напряжений, сгруппированными по локациям.

#### Базовый URL

```
https://std.bit-camp.ru
```

---

### Эндпоинты

#### 1. **Добавление данных локации**

- **URL**: `/add`
- **Метод**: `POST`
- **Описание**: Добавляет данные напряжений для указанной локации.
- **Тело запроса** (JSON):

  ```json
  {
    "location": "server-street",
    "voltage1": 12,
    "voltage2": 21
  }
  ```

  - `location` _(string, обязательное)_: Название локации.
  - `voltage1` _(number, обязательное)_: Значение первого напряжения.
  - `voltage2` _(number, обязательное)_: Значение второго напряжения.

- **Ответы**:
  - **200 OK**:
    ```json
    {
      "message": "Data added successfully"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "error": "Invalid request payload"
    }
    ```

---

#### 2. **Получение данных локации**

- **URL**: `/voltagedata/:location`
- **Метод**: `GET`
- **Описание**: Возвращает массив данных напряжений для указанной локации.

- **Параметры пути**:

  - `location` _(string, обязательное)_: Название локации.

- **Ответы**:
  - **200 OK**:
    ```json
    [
      {
        "voltage1": 12,
        "voltage2": 21
      },
      {
        "voltage1": 15,
        "voltage2": 25
      }
    ]
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "No data for this location"
    }
    ```

---

### Запуск сервера

1. Убедитесь, что установлены зависимости:
   ```bash
   npm install express body-parser
   ```
2. Запустите сервер:

   ```bash
   node server.js
   ```

3. Сервер будет доступен по адресу:
   ```
   http://localhost:8080
   ```

---

### Примеры запросов

#### Добавление данных:

**POST** `https://std.bit-camp.ru/add`

```json
{
  "location": "server-street",
  "voltage1": 12,
  "voltage2": 21
}
```

**Ответ**:

```json
{
  "message": "Data added successfully"
}
```

---

#### Получение данных:

**GET** `https://std.bit-camp.ru/voltagedata/server-street`

**Ответ**:

```json
[
  {
    "voltage1": 12,
    "voltage2": 21
  },
  {
    "voltage1": 15,
    "voltage2": 25
  }
]
```
