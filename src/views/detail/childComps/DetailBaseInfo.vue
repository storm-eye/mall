<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-services">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style  scoped>
.base-info {
  margin: 15px 10px;
}
.info-title {
  font-size: 16px;
  color: black;
  margin-bottom: 12px;
}
.info-price {
  margin-bottom: 15px;
}
.info-price .n-price {
  color: var(--color-high-text);
  font-size: 20px;
  margin-right: 5px;
}
.info-price .o-price {
  color: rgb(131, 127, 127);
  font-size: 12px;
  text-decoration: line-through;
  margin-right: 5px;
}
.info-price .discount {
  /* 上浮 */
  position: relative;
  top: -8px;
  border-radius: 6px;
  display: inline-block;
  font-size: 12px;
  padding: 1px 4px;
  color: #fff;
  background-color: var(--color-high-text);
}
.info-other{
  font-size: 12px;
  color: rgb(131, 127, 127);
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid rgba(0,0,0,.1);
  padding-bottom: 8px;
}
.info-services{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-bottom: 3px;
  font-size: 12px;
}
.info-services img{
  width: 12px;
  height: 12px;
}
</style>