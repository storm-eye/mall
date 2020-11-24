<template>
  <div v-if="Object.keys(itemInfo).length !== 0" class="shop-item">
    <div class="item-selector">
      <check-button  @click.native="itemClick" :is-checked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.price }}</div>
        <div class="item-count right">X{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "../../../components/content/CheckButtom/CheckButton.vue";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default: {},
    },
  },
  methods:{
    itemClick(){
      console.log('a')
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
};
</script>

<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 120px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #335;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>