<template>
  <div id="the-detail">
    <detail-nav-bar
      class="detailnav"
      @titleClick="navClick"
      ref="detailNavBar"
    ></detail-nav-bar>

    

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <p>{{$store.state.cartList}}</p>
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="goodsImageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <!-- <div class="rec-title"><span>推荐模块</span></div> -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="goBack" v-show="isBackTopShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailSwiper from "views/detail/childComps/DetailSwiper";

import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";


import GoodsList from "components/content/goods/GoodsList.vue";

import {itemListenerMixin,backTopMixin} from "common/mixin.js"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailNavBar,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

    Scroll,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      
    };
  },
  
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;

    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.data.list;
    });

    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.data.result;
      //获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取商家信息
      this.shop = new Shop(data.shopInfo);
      //获取商品展示信息
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      //给getThemeTopY赋值
      this.getThemeTopY = () => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      };
    });
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    goodsImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index] - 44), 100);
    },
    contentScroll(position){
      //控制返回顶部的出现
      this.ShowBackTop(position)
      //滚动到相应位置时，导航栏跟着变化
      let positionY = -position.y     
      const length = this.themeTopYs.length
      for(let i=0; i<length-1;i++){
        if(this.currentIndex !==i && ((i<length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]))){
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      //获取需要添加到购物车的信息
      const produce = {}
      produce.image = this.topImages[0]
      produce.title = this.goods.title
      produce.desc = this.goods.desc
      produce.price = this.goods.realPrice
      produce.iid = this.iid
      produce.count = 0
      //添加到购物车里
      // this.$store.commit('addCart',produce)
      this.$store.dispatch(ADD_TO_CART,produce)
    }
  },
};
</script>

<style  scoped>
#the-detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  z-index: 99;
  overflow: hidden;
}
.detailnav {
  position: relative;
  background-color: #fff;
  z-index: 999;
}
.rec-title {
  padding: 12px 0;
  text-align: center;
}
.s {
  width: 100%;
  height: 500px;
}
</style>