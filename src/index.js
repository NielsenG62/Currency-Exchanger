import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";
import { exchange } from "./js/exchange";

async function apiCall(currency) {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response, currency);
}

function displayResults(response, currency) {
  if (response.result === "success") {
    let usdValue = $("#usd-value").val();
    $("#usd").text(usdValue);
    let conversion = exchange(response, usdValue, currency);
    $("#exchange").text(conversion + " " + currency);
  } else {
    $("#error").text("Oops! Something went wrong. Error: " + response);
  }
}

$("form").on("submit", function (event) {
  event.preventDefault();
  let currency = $("#exchange-select").val();
  apiCall(currency);
});
