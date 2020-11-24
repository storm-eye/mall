<template>
  <div class="check-bottom-bar">
    <div class="left">
      <check-button class="check-button" @click.native="allSelected" :is-checked="isSelected"/>
      <span class="total">合计￥{{ totalPrice }}元</span>
    </div>
    <div class="right">去计算({{ cartLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/CheckButtom/CheckButton.vue";
export default {
  name: "CheckBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0);
    },
    cartLength() {
      return this.$store.state.cartList.length;
    },
    isSelected(){
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item=>!item.checked)
    }
  },
  methods: {
    allSelected() {
      this.$store.state.cartList.map((item) => (item.checked = !item.checked));
    },
  },
};
</script>

<style scoped>
.check-bottom-bar {
  line-height: 44px;
  height: 44px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid #ccc;
}
.left {
  flex: 1;
}
.check-button {
  display: inline-block;
  position: relative;
  bottom: 2px;
  left: 10px;
  vertical-align: middle;
  margin-right: 30px;
}
.right {
  text-align: center;
  color: #fff;
  display: inline-block;
  width: 25%;
  background-color: rgb(233, 101, 61);
}
</style>