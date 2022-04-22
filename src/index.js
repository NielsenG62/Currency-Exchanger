import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";

async function apiCall() {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response);
}

function displayResults() {}

$("#exchange").on("click", function () {});
