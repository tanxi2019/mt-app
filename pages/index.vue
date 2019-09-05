<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <Artistic />
    </el-row>
  </div>
</template>

<script>

import Emenu from '../components/index/menu'
import Life from '../components/index/life'
import Artistic from '../components/index/artistic'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Emenu,
    Life,
    // eslint-disable-next-line vue/no-unused-components
    Artistic
  }
}
</script>

<style lang="scss">
@import "../assets/css/index/index.scss";
</style>
