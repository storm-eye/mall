<template>
   <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
   setTimeout(()=>{
      this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    
    this.scroll.on('scroll', (position)=>{
      this.$emit('scroll', position)
    })
    this.scroll.on("pullingUp", () => {
      this.$emit('pullingUp',)
    });
   },500)
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()

    }
  }
};
</script>

<style>

</style>