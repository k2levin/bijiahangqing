<template>
  <div id="app">
    <MarketPrice
      v-bind="{
        log,
        updateCoinName,
        formatPrice,
        formatPercent,
        isNegPercent,
        coins1,
        coins2,
        coinList,
      }"
    />
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
      coinList: [],
      coinNames: [
        "bitcoin",
        "ethereum",
        "molecular-future",
        "hyperdao",
        "hshare",
      ],
      newCoinName: "",
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
        select: {
          name: "-",
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
      values.push(this.coins.select);
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
      console.log(message);
    },
    updateCoinName(name) {
      this.newCoinName = name;
      this.coinNames = [
        "bitcoin",
        "ethereum",
        "molecular-future",
        "hyperdao",
        "hshare",
        name,
      ];
      this.updatePrice();
    },
    async getCoinList() {
      let url = "https://api.coingecko.com/api/v3/coins/list";
      let response = await fetch(url).catch((error) => {
        console.log(error);
      });
      if (response === undefined) {
        return;
      }
      this.coinList = await response.json();
    },
    async updatePrice() {
      let url =
        "https://api.coingecko.com/api/v3/simple/price?ids=" +
        this.coinNames.join() +
        "&vs_currencies=usd,cny&include_24hr_change=true";
      let response = await fetch(url).catch((error) => {
        console.log(error);
      });
      if (response === undefined) {
        return;
      }
      let data = await response.json();
      this.coinNames.forEach((coinName) => {
        if (Object.prototype.hasOwnProperty.call(data, coinName) === true) {
          if (coinName === this.newCoinName) {
            if (data[coinName].usd !== null) {
              this.coins["select"].usd = data[coinName].usd;
            }
            if (data[coinName].cny !== null) {
              this.coins["select"].cny = data[coinName].cny;
            }
            if (data[coinName].usd_24h_change !== null) {
              this.coins["select"].usd_24h_change = data[coinName].usd_24h_change;
            }
          } else {
            if (data[coinName].usd !== null) {
              this.coins[coinName].usd = data[coinName].usd;
            }
            if (data[coinName].cny !== null) {
              this.coins[coinName].cny = data[coinName].cny;
            }
            if (data[coinName].usd_24h_change !== null) {
              this.coins[coinName].usd_24h_change = data[coinName].usd_24h_change;
            }
          }
        }
      });
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
    },
  },
  created() {
    this.getCoinList();
    this.updatePrice();
  },
};
</script>
