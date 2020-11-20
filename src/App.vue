<template>
  <div id="app">
    <main-tab-bar class="maintabbar"> </main-tab-bar>
    <router-view />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: "App",
  components: {
    MainTabBar
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
