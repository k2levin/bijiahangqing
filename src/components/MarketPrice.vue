<template>
  <div>
    <h2>币价行情</h2>
    <div class="container">
      <div v-for="coin in coins1" :key="coin.id">
        <table>
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
    <br /><br />
    <div class="container">
      <div v-for="coin in coins2" :key="coin.id">
        <table>
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
  </div>
</template>

<script>
export default {
  name: "MarketPrice",
  props: {
    formatPrice: Function,
    formatPercent: Function,
    isNegPercent: Function,
    coins1: Array,
    coins2: Array,
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
</style>
