<template>
  <div class="page-login">
    <div class="login-header">
      <!--suppress CheckEmptyScriptTag -->
      <a
        href="/"
        class="logo"
      />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        >
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"
        >
          <!--suppress CheckEmptyScriptTag -->
          <i />
          {{ error }}
        </h4>
        <p><span>账号登录</span></p>
        <!--suppress CheckEmptyScriptTag -->
        <el-input
          v-model="username"
          prefix-icon="profile"
        />
        <!--suppress CheckEmptyScriptTag -->
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password"
        />
        <div class="foot">
          <el-checkbox v-model="checked">
            7天内自动登录
          </el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button
          class="btn-login"
          type="success"
          size="mini"
          @click="login"
        >
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data () {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login () {
      const self = this
      self.$axios.post('/users/signin', {
        username: window.encodeURIComponent(self.username),
        // eslint-disable-next-line no-undef
        password: CryptoJS.MD5(self.password).toString()
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            location.href = '/'
          } else {
            self.error = data.msg
          }
        } else {
          self.error = `服务器出错`
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/login/index.scss";
</style>
