<template>
  <div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
  </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"

import {mapGetters} from "vuex"

export default {
  name: 'Cart',
  components:{
    Scroll,
    CartListItem 
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    console.log('...')
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px - 44px);
  overflow: hidden;
}
.content{
  height: 100%;
}
.s{
  height: 2000px;
  background-color: yellow;

}
</style>