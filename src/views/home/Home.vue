<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精品']"
      class="tab-control"
      @tabClick="tabClick"
      v-show="isTabShow"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperLoad" />
      <recommends-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精品']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="butClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendsView from "./childcomps/RecommendsView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin.js"
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
    FeatureView,
  },
  mixins: [itemListenerMixin],
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
      isBackTopShow: false,
      tabControlTop: 0,
      isTabShow: false,
      saveY: 0
    };
  },
  created() {
    //请求轮播，推荐数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off ('itemImageLoad',this.itemImgListener)
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
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    /* 
      事件监听
    */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    butClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(positon) {
      this.isBackTopShow = -positon.y > 1000;
      this.isTabShow = -positon.y > this.tabControlTop;
    },
    swiperLoad() {
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
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
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* 有冲突，滚不动 */
  /* height: calc(100% - 98px); */
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>