<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommends-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精品']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
   
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendsView from "./childcomps/RecommendsView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    RecommendsView,
    FeatureView,
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop'
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /* 
      网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then((res) => {
        console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    },
    /* 
      事件监听
    */
    tabClick(index){
      console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
};
</script>

<style>
.home-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%;
  z-index: 999;

  color: #fff;
  background-color: var(--color-tint);
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
</style>