const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Путь к файлу для хранения данных
const DATA_FILE = path.join(__dirname, "data.json");

// Объект для хранения данных
let locationData = {};

// Загрузка данных из файла при старте сервера
if (fs.existsSync(DATA_FILE)) {
  const rawData = fs.readFileSync(DATA_FILE);
  locationData = JSON.parse(rawData);
}

// Сохранение данных в файл
function saveDataToFile() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(locationData, null, 2));
}

// Добавление данных для локации
app.post("/voltagedata/add", (req, res) => {
  const { location, voltage1, voltage2 } = req.body;

  if (!location || voltage1 === undefined || voltage2 === undefined) {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  if (!locationData[location]) {
    locationData[location] = [];
  }

  locationData[location].push({ voltage1, voltage2 });
  saveDataToFile(); // Сохранение данных в файл
  res.status(200).json({ message: "Data added successfully" });
});

// Получение данных для определённой локации
app.get("/voltagedata/:location", (req, res) => {
  const { location } = req.params;

  if (!locationData[location]) {
    return res.status(404).json({ error: "No data for this location" });
  }

  res.status(200).json(locationData[location]);
});

// Запуск сервера
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
