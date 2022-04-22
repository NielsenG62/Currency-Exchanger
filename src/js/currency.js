export default class CurrencyExchange {
  static async getExchangeRates(fromValue) {
    const preLoadedData = sessionStorage.getItem("exchangeRates");
    console.log(JSON.parse(preLoadedData));
    if (!preLoadedData || JSON.parse(preLoadedData).base_code !== fromValue) {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${fromValue}`
        );
        if (!response.ok) {
          throw Error(response.status);
        }
        const data = await response.json();
        sessionStorage.setItem("exchangeRates", JSON.stringify(data));
        console.log("api hit");
        return data;
      } catch (error) {
        return error.message;
      }
    } else {
      console.log("no apit hit");
      return JSON.parse(preLoadedData);
    }
  }
  static async getSavedExchangeRates(fromValue) {
    const exchange = await this.getExchangeRates(fromValue);
    return exchange;
  }
}
