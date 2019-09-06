<template>
  <div class="page-register">
    <div class="header">
      <header>
        <!--suppress CheckEmptyScriptTag -->
        <a href="" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <nuxt-link to="/login">
            <el-button
              type="primary"
              size="small"
            >
              登录
            </el-button>
          </nuxt-link>
        </span>
      </header>
    </div>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <!--suppress CheckEmptyScriptTag -->
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <!--suppress CheckEmptyScriptTag -->
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" round @click="sendMsg">
            发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <!--suppress CheckEmptyScriptTag -->
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <!--suppress CheckEmptyScriptTag -->
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>

        <el-form-item label="确认密码" prop="cpwd">
          <!--suppress CheckEmptyScriptTag -->
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">
            同意以下协议并注册
          </el-button>
          <div class="error">
            {{ error }}
          </div>
        </el-form-item>
        <el-from-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-from-item>
      </el-form>
    </section>
  </div>
</template>

<!--suppress JSAssignmentUsedAsCondition -->
<script>
export default {
  layout: 'blank',
  data () {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
        pwd: [{ required: true, message: '创建密码', trigger: 'blur' }],
        cpwd: [
          { required: true, message: '确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg () {},
    register () {}
  }
}
</script>

<style lang="scss">
@import "../assets/css/register/index.scss";
</style>
