<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <p>{{item.title}}</p>
    </a>
  </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendsView',
  props:{
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.recommend{
  display: flex;
  border-bottom: 10px solid rgb(235, 231, 231);
  text-align: center;
  padding: 10px
}
.recommend-item{
  flex:1
}
.recommend img{
  width:80%;
  margin-bottom: 10px;
}
</style>