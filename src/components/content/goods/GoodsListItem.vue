<template>
  <div class="goods-item">
   <img :src="goodsItem.show.img" alt="">
   <div class="goods-item-info">
     <p>{{goodsItem.title}}</p>
   <span class="price">{{goodsItem.price}}</span>
   <span class="collect">{{goodsItem.cfav}}</span>
   </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props:{
    goodsItem:{
      type: Object,
      default(){
        return null
      }
    }
  }
}
</script>
<style>
.goods-item{
  width:48%;
  padding-bottom: 40px;
  text-align: center;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-item-info{
  margin: 10px 5px;
  font-size: 14px;
}
.goods-item-info p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.price{
  color: var(--color-high-text)
}
.collect{
  position: relative;
  margin-left: 20px;
}
.collect::before{
  content: '';
  position: absolute;
  top: 1px;
  left: -15px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>