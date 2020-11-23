<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!-- 把数据一个个拆分 -->
    <div class="param-title"><span>参数信息</span></div>
    <table v-for="(table, index) in paramInfo.sizes" :key="index" class="info-sizes">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="info-param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style scoped>
.param-info{
  margin: 15px 10px;
}
.param-title{
  margin: 12px 0;
  text-align: center;
}
.info-sizes{
  width: 100%;
}
.info-sizes{
  border-collapse: collapse;
}
.info-sizes tr{
  height: 42px;
  border-bottom: 1px solid #ccc;
}
/* .info-sizes td:first-child{
 margin-right: 10px; 
} */

.info-param{
  width: 100%;
  border-collapse: collapse;
}
.info-param-key{
  width: 95px;
}
.info-param tr{
   height: 42px;
  border-bottom: 1px solid #ccc;
}
.info-param-value{
  color: var(--color-high-text)
}

</style>