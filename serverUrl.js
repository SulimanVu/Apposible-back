const { NODE_ENV } = process.env;

let serverUrl;

if (NODE_ENV === "development") {
  serverUrl = "http://localhost:3000"; // адрес сервера на локалке
} else {
  serverUrl = "https://apposible.onrender.com"; // адрес сервера после выгрузки
}

module.exports = serverUrl;