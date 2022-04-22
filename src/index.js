import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";
import { exchange } from "./js/exchange";

async function apiCall(currency, usdValue) {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response, currency, usdValue);
}

function displayResults(response, currency, usdValue) {
  if (response.result === "success") {
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
  let usdValue = $("#usd-value").val();
  if (currency === "null" || usdValue === "") {
    $("#error").text("Please fill in the two fields");
    return;
  }
  apiCall(currency, usdValue);
});
