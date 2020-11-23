<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" class="back">
        </div>
      </template>
     <template v-slot:center >
      <div class="titles"> 
        <span v-for= "(item,index) in titles" :key= "index" 
        class="center-item"
        @click= "itemClick(index)"
        :class= "{'active': currentIndex==index}">{{item}}</span></div>
     </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.titles{
  display: flex;
  justify-content: space-between;
}
.back img{
  vertical-align: middle;
  position: relative;
  left: -10px;
  top: -2px
}
.active{
  color: var(--color-high-text)
}
/* .center-item{
  flex: 1
} */
</style>