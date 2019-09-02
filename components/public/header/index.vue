<template>
  <el-row
    :gutter="15"
    class="m-header">
    <el-col :span="6"><Geo/></el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  export default {
    components:{
        Geo
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/public/header/layout.scss";
</style>
