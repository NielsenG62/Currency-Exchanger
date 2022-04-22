export function exchange(response, amount, toValue) {
  let exists = true;
  let exchangeRate = response.conversion_rates[`${toValue}`];
  if (exchangeRate === undefined) {
    exists = false;
    return exists;
  }
  let conversion = amount * exchangeRate;
  return conversion.toFixed(2);
}
