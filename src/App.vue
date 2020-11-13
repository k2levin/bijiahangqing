<template>
  <div id="app">
    <MarketPrice v-bind="{ formatPrice, formatPercent, isNegPercent, coins1, coins2 }" />
  </div>
</template>

<script>
import MarketPrice from "./components/MarketPrice.vue";

export default {
  name: "App",
  components: {
    MarketPrice,
  },
  data() {
    return {
      coins: {
        bitcoin: {
          name: "BTC",
          usd: 0.0,
          cny: 0.0,
          usd_24h_change: 0.0,
        },
        ethereum: {
          name: "ETH",
          usd: 0.0,
          cny: 0.0,
          usd_24h_change: 0.0,
        },
        "molecular-future": {
          name: "MOF",
          usd: 0.0,
          cny: 0.0,
          usd_24h_change: 0.0,
        },
        hyperdao: {
          name: "HDAO",
          usd: 0.0,
          cny: 0.0,
          usd_24h_change: 0.0,
        },
        hshare: {
          name: "HC",
          usd: 0.0,
          cny: 0.0,
          usd_24h_change: 0.0,
        },
      },
    };
  },
  computed: {
    coins1: function () {
      let values = [];
      values.push(this.coins.bitcoin);
      values.push(this.coins.ethereum);
      return values;
    },
    coins2: function () {
      let values = [];
      values.push(this.coins["molecular-future"]);
      values.push(this.coins.hyperdao);
      values.push(this.coins.hshare);
      return values;
    },
  },
  methods: {
    log(message) {
      console.table(message);
    },
    formatPrice(num) {
      if (
        num.toString().split(".").length > 1 &&
        num.toString().split(".")[1].length > 1
      ) {
        num = num.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        num = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      }

      return num;
    },
    formatPercent(num) {
      num = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      num = num + "%";
      if (num.toString().includes("-") === false) {
        num = "+" + num;
      }

      return num;
    },
    isNegPercent(num) {
      return num.toString().includes("-");
    }
  },
  async created() {
    let coinNames = [
      "bitcoin",
      "ethereum",
      "molecular-future",
      "hyperdao",
      "hshare",
    ];
    let url =
      "https://api.coingecko.com/api/v3/simple/price?ids="+coinNames.join()+"&vs_currencies=usd,cny&include_24hr_change=true";
    let response = await fetch(url).catch((error) => {
      console.log(error);
    });
    if (response === undefined) {
      return;
    }
    let data = await response.json();
    coinNames.forEach((coinName) => {
      if (Object.prototype.hasOwnProperty.call(data, coinName) === true) {
        this.coins[coinName].usd = data[coinName].usd;
        this.coins[coinName].cny = data[coinName].cny;
        this.coins[coinName].usd_24h_change = data[coinName].usd_24h_change;
      }
    });
  },
};
</script>
