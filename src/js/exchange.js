export function exchange(response, usdValue, currency) {
  let exchangeRate = response.conversion_rates[`${currency}`];
  let conversion = usdValue * exchangeRate;
  return conversion.toFixed(2);
}
