<template>
  <el-container class="layout-default">
    <el-header  height="197px">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '../components/header/index'
import myFooter from '../components/footer/index'
export default {
  components: {
    MyHeader,
    myFooter
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

</style>
