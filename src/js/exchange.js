export function exchange(response, usdValue, currency) {
  let exists = true;
  let exchangeRate = response.conversion_rates[`${currency}`];
  if (exchangeRate === undefined) {
    exists = false;
    return exists;
  }
  let conversion = usdValue * exchangeRate;
  return conversion.toFixed(2);
}
