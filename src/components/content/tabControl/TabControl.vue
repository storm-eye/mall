<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" 
    :class="{active: index==currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data(){
    return{
      currentIndex: 0
    }
  },
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex =index
      this.$emit ('tabClick', index)
    }
  }
}
</script>
<style>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 5px
}
.tab-control-item{
  flex: 1
}
.tab-control-item span{
  margin: 5px
}
.active{
  color: var(--color-high-text)
}
.active span{
  border-bottom: 3px solid var(--color-high-text)
}

</style>