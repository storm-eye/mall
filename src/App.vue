<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view /></keep-alive>
      <main-tab-bar class="maintabbar" /> 
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
/* .maintabbar{
  position: fixed;
  bottom: 0;
  z-index: 999;
} */
</style>
