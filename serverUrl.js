const { NODE_ENV } = process.env;

module.exports.serverUrl;

if (NODE_ENV === "development") {
  serverUrl = "http://localhost:3000"; // адрес сервера на локалке
} else {
  serverUrl = "https://apposible.onrender.com"; // адрес сервера после выгрузки
}