<template>
  <el-container>
    <el-header><myheader /></el-header>
    <el-main><nuxt /></el-main>
    <el-footer><myfooter /></el-footer>
  </el-container>
</template>

<script>
import myheader from '../components/header/index'
import myfooter from '../components/footer/index'
export default {
  components: {
    myheader,
    myfooter
  },
  data () {
    return {
      number: 1
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../assets/css/public/layout.scss";
</style>
