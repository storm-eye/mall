<template>
  <div>
   <p>详情页</p>
   <p>{{iid}}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data(){
    return{
      iid: null
    }
  },
  created(){
    this.iid = this.$route.params.iid
  }
}
</script>

<style  scoped>

</style>