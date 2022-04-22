import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";

async function apiCall() {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response);
}

function exchange(response, usdValue) {
  let exchangeRate = response.conversion_rates.currency;
  let conversion = usdValue * exchangeRate;
  return conversion;
}

function displayResults(response) {
  if (response.result === "success") {
    let usdValue = $("#usd-value").val();
    let currency = $("#exchange-select").val();
    $("#usd").text(usdValue);
    let conversion = exchange(response, usdValue);
    $("#exchange").text(conversion + " " + currency);
  }
}

$("#submit").on("click", function () {
  apiCall();
});
