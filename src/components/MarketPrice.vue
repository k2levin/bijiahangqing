<template>
  <div>
    <h2>币价行情</h2>
    <div class="container">
      <table v-for="(coin, key) in coins1" :key="coin.name">
        <tr>
          <td v-if="key !== 2" v-html="coin.name"></td>
          <td v-if="key === 2">
            <select v-model="selectedCoinName">
              <option disabled value="">-</option>
              <option v-for="coin in coinList" :key="coin.id" :value="coin.id">
                {{ coin.symbol.toUpperCase() }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td v-html="'$ ' + formatPrice(coin.usd)"></td>
        </tr>
        <tr>
          <td v-html="'¥ ' + formatPrice(coin.cny)"></td>
        </tr>
        <tr>
          <td class="td-gray">24 涨幅</td>
        </tr>
        <tr>
          <td
            v-html="formatPercent(coin.usd_24h_change)"
            :class="isNegPercent(coin.usd_24h_change) ? 'td-red' : 'td-green'"
          ></td>
        </tr>
      </table>
    </div>
    <br /><br />
    <div class="container">
      <table v-for="coin in coins2" :key="coin.name">
        <tr>
          <td v-html="coin.name"></td>
        </tr>
        <tr>
          <td v-html="'$ ' + formatPrice(coin.usd)"></td>
        </tr>
        <tr>
          <td v-html="'¥ ' + formatPrice(coin.cny)"></td>
        </tr>
        <tr>
          <td class="td-gray">24 涨幅</td>
        </tr>
        <tr>
          <td
            v-html="formatPercent(coin.usd_24h_change)"
            :class="isNegPercent(coin.usd_24h_change) ? 'td-red' : 'td-green'"
          ></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketPrice",
  props: {
    log: Function,
    updateCoinName: Function,
    formatPrice: Function,
    formatPercent: Function,
    isNegPercent: Function,
    coins1: Array,
    coins2: Array,
    coinList: Array,
  },
  data() {
    return {
      selectedCoinName: "",
    };
  },
  watch: {
    selectedCoinName: function (newValue) {
      this.updateCoinName(newValue);
    },
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid #000000;
  border-collapse: collapse;
  text-align: center;
}
td {
  width: 200px;
}
.container {
  display: flex;
}
.td-gray {
  color: #BEBEBE;
}
.td-green {
  color: #00FF00;
}
.td-red {
  color: #FF0000;
}
select {
  text-indent: 50%;
  width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
