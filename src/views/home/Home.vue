<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <scroll class='content' ref="scroll" 
    :probeType="3" 
    @scroll="contentScroll"
    :pullUpLoad="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommends-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精品']"
        class="tab-control"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native='butClick' v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendsView from "./childcomps/RecommendsView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendsView,
    FeatureView
  
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
      currentType: "pop",
      isBackTopShow: false
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
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    /* 
      事件监听
    */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
    butClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(positon){
      this.isBackTopShow = (-positon.y)>1000
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.home-nav {
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /* position: fixed;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%;
  z-index: 999; */

  color: #fff;
  background-color: var(--color-tint);
}
.tab-control {
  /* position: relative; */
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}
.content{
  /* 有冲突，滚不动 */
  height: calc(100% - 98px);
  /* height: 300px; */
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  
}
</style>