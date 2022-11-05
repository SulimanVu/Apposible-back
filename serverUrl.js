const { NODE_ENV } = process.env;

export let serverUrl;

if (NODE_ENV === "development") {
  serverUrl = "http://localhost:3000"; // адрес сервера на локалке
} else {
  serverUrl = ""; // адрес сервера после выгрузки
}