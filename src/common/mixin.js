import { debounce } from "common/utils";
import BackTop from "components/content/backtop/BackTop"

export const itemListenerMixin = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener );
  },
  
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isBackTopShow: false,
    }
  },
  methods: {
    goBack() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    ShowBackTop(position) {
      this.isBackTopShow = -position.y > 1000;
    }
  }
}