import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const freeCurrencyAPI_URL = process.env.FREECURRENCYAPI_URL || "https://api.freecurrencyapi.com/v1/latest";
const freeCurrencyAPI_KEY = process.env.FREECURRENCYAPI_KEY || "";

export default async function convertCurrency(from, to, amount) {
  if (!freeCurrencyAPI_KEY) {
    throw new Error("API key is missing");
  }
  
  const url = `${freeCurrencyAPI_URL}?apikey=${freeCurrencyAPI_KEY}&currencies=${from}%2C${to}`;
  const response = (await axios.get(url))["data"];
  const currencyRates = response.data;

  return amount * (currencyRates[to] / currencyRates[from]);
}
