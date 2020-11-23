<template>
  <div id="the-detail">
    <detail-nav-bar class="detailnav" @titleClick="navClick"></detail-nav-bar>

    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="goodsImageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <!-- <div class="rec-title"><span>推荐模块</span></div> -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
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

import GoodsList from "components/content/goods/GoodsList.vue";

import { itemListenerMixin } from "common/mixin.js";

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

    Scroll,
  },
  mixins: [itemListenerMixin],
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
        console.log("----");
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
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
      this.$refs.scroll.scrollTo(0,-(this.themeTopYs[index]-44),100)
    },
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
  height: calc(100% - 44px);
  z-index: 99;
}
.detailnav {
  position: relative;
  background-color: #fff;
  z-index: 999;
}
.rec-title{
  padding: 12px 0;
  text-align: center;
}
.s {
  width: 100%;
  height: 500px;
}
</style>