import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyExchange from "./js/currency";
import { exchange } from "./js/exchange";

async function apiCall(amount, fromValue, toValue) {
  const response = await CurrencyExchange.getSavedExchangeRates(fromValue);
  displayResults(response, amount, fromValue, toValue);
}

function displayResults(response, amount, fromValue, toValue) {
  if (response.result === "success") {
    $("#from").text(amount + " " + fromValue);
    let conversion = exchange(response, amount, toValue);
    if (conversion === false) {
      $("h2").addClass("hidden");
      $("#error").html(
        `It appears this currency code doesn't exist. Please look at the <a href="https://www.exchangerate-api.com/docs/supported-currencies">supported currency codes</a>`
      );
      $("#error").removeClass("hidden");
      return;
    }
    $("#exchange").text(conversion + " " + toValue);
    $("h2").removeClass("hidden");
  } else {
    $("#error").text("Oops! Something went wrong. Error: " + response);
  }
}

$("form").on("submit", function (event) {
  event.preventDefault();
  $("#error").addClass("hidden");
  $("#error").html("placeholder");
  let amount = $("#amount").val().toUpperCase();
  let fromValue = $("#from-value").val().toUpperCase();
  let toValue = $("#to-value").val().toUpperCase();
  if (amount === "" || fromValue === "" || toValue === "") {
    $("#error").text("Please fill in the two fields");
    $("#error").removeClass("hidden");
    return;
  }
  apiCall(amount, fromValue, toValue);
});
