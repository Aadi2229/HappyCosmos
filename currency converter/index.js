let url=`https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;
const to=document.getElementById("to");
const from=document.getElementById("from");
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    to.add(option);
});
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    from.add(option);
});
from.value="USD";
to.value="INR";
let convertCurrency = () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = from.value;
    const toCurrency = to.value;
    if (amount.length != 0) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          let fromExchangeRate = data.conversion_rates[fromCurrency];
          let toExchangeRate = data.conversion_rates[toCurrency];
          const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
          result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
            2
          )} ${toCurrency}`;
        });
    } else {
      alert("Please fill in the amount");
    }
  };
  const btn=document.getElementById("btn");

btn.addEventListener("click",convertCurrency);