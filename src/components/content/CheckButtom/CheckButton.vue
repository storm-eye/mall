<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.check-button {
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #aaa;
  height: 20px;
  width: 20px;
  background-color: #fff;
  line-height: 0;
}
.check-button img {
  width: 18px;
}
.check {
  border-color: red;
  background-color: var(--color-high-text);
}
</style>