import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";

async function apiCall(currency) {
  const response = await CurrencyExchange.getExchangeRates();
  displayResults(response, currency);
}

function displayResults(response, currency) {
  if (response.result === "success") {
    let usdValue = $("#usd-value").val();
    let conversionRate = response.conversion_rates.currency;
    $("#usd").text = usdValue;
    $("#exchange").text = `${usdValue * conversionRate}`;
  }
}

$("#submit").on("click", function () {
  let currency = $("#exchange-select").val();
  apiCall();
});
