<template>
  <div >
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <p>购物车({{cartLength}})</p>
      </template>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./ChildComps/CartList"
import CartBottomBar from './ChildComps/CartBottomBar.vue';
import {mapGetters} from "vuex"

export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style>
.cart-nav {
  color: #fff;
  background-color: var(--color-tint);
}
</style>