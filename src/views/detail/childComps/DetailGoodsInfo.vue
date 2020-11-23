<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-img">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt=""  @load="imgLoad"/>
    </div>

    <div class="s"></div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default: {},
    },
  },
  data(){
    return{
      count: 0,
      imgLength: 0
    }
  },
  methods: {
    imgLoad(){
      //判断所有图片都加载完了
     if(++this.count === this.imgLength){
       this.$emit('imageLoad')
     }
       
    }
  },
   watch: {
	    detailInfo() {
	      // 获取图片的个数
	    	this.imgLength = this.detailInfo.detailImage[0].list.length
	    }
    }
};
</script>

<style  scoped>
.goods-info {
  background-color: #fff;
  margin: 20px 0;
}
.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.desc {
  text-align: left;
  padding: 15px 0px;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  background-color: #a3a3a5;
}
.info-desc .end::after {
  right: 0;
}
.info-key{
  margin: 10px 15px;
}
.info-img img{
  width: 98%;
  position: relative;
  left: 1%;
  margin-bottom: 10px;
}

</style>