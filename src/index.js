import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";
import { exchange } from "./js/exchange";

async function apiCall(currency, usdValue) {
  const response = await CurrencyExchange.getSavedExchangeRates();
  displayResults(response, currency, usdValue);
}

function displayResults(response, currency, usdValue) {
  if (response.result === "success") {
    $("#usd").text(usdValue);
    let conversion = exchange(response, usdValue, currency);
    if (conversion === false) {
      $("h2").addClass("hidden");
      $("#error").html(
        `It appears this currency code doesn't exist. Please look at the <a href="https://www.exchangerate-api.com/docs/supported-currencies">supported currency codes</a>`
      );
      $("#error").removeClass("hidden");
      return;
    }
    $("#exchange").text(conversion + " " + currency);
    $("h2").removeClass("hidden");
  } else {
    $("#error").text("Oops! Something went wrong. Error: " + response);
  }
}

$("form").on("submit", function (event) {
  event.preventDefault();
  $("#error").addClass("hidden");
  $("#error").html("placeholder");
  let currency = $("#exchange-select").val();
  let usdValue = $("#usd-value").val();
  if (currency === "null" || usdValue === "") {
    $("#error").text("Please fill in the two fields");
    $("#error").removeClass("hidden");
    return;
  }
  apiCall(currency, usdValue);
});
