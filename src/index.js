import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";

async function apiCall(currency) {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response, currency);
}

function exchange(response, usdValue, currency) {
  let exchangeRate = response.conversion_rates[`${currency}`];
  let conversion = usdValue * exchangeRate;
  return conversion;
}

function displayResults(response, currency) {
  if (response.result === "success") {
    let usdValue = $("#usd-value").val();
    $("#usd").text(usdValue);
    let conversion = exchange(response, usdValue, currency);
    $("#exchange").text(conversion + " " + currency);
  }
}

$("form").on("submit", function (event) {
  event.preventDefault();
  let currency = $("#exchange-select").val();
  apiCall(currency);
});
