<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <span class="header-title">用户评价</span>
      <span class="header-more">更多
        <i class="arrow-right"></i>  
      </span>
      
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span>{{commentInfo.created|showDate}}</span>
         <span>{{commentInfo.style}}</span>
      </div>
    </div>
    <div class="info-imgs">
      <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name: 'DetailCommentInfo',
  props:{
   commentInfo:{
     type: Object,
     default: {}
   }
  },
  filters: {
    showDate(value){
      const date = new Date(value*1000)
      return formatDate(date,'yyyy/MM/dd hh:mm:ss')
    }
  }
}
</script>

<style  scoped>
.comment-info{
  padding:0 10px;
  border-top: 5px solid rgb(235, 231, 231);
  border-bottom: 5px solid rgb(235, 231, 231);
}
.info-header{
  height: 50px;
  line-height: 50px;
}
.header-title{
  float: left;
  font-size: 15px;
}
.header-more{
  float: right;
  right: 10px;
  font-size: 13px;
  position: relative;
}
.arrow-right{
  position: absolute;
      right: -7px;
    top: 21px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  transform: rotate(45deg);
  vertical-align: middle;
}
.info-user{
   padding:15px 10px;
   border-top: 3px solid rgb(235, 231, 231);
}
.info-user img{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
  margin-right: 10px;
}
.info-detail {
  line-height: 20px;
}
.info-detail p{
  font-size: 14px;
  
}
.info-other{
  font-size: 13px;
  color: #ccc;
  margin-top: 10px;
}
.info-other span{
  padding-right: 10px;
}
.info-imgs img{
  margin-top: 10px;
  width: 70px;
  height: 70px;
  margin-right: 5px;
  margin-bottom: 20px;
}
</style>