<template>
  <div class="bg_container">
    <div class="login-container">
      <el-row :gutter="20">
        <el-col :span="10" :offset="7">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >

            <div class="title-container">
              <el-row type="flex" style="display: flex;align-items: center">
                <el-col :span="4">
                  <img src="logo.jpg" style="vertical-align:middle;max-height: 160px;max-width: 80px;">
                </el-col>
                <el-col :span="16" >
                  <h2 class="title">士&nbsp;问</h2>
                  <h2 class="title" style="margin-left: 50px;">士&nbsp;答</h2>
                </el-col>
              </el-row>

            </div>

            <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user"/>
            </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password"/>
              </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
              </span>
              </el-form-item>
            </el-tooltip>
            <el-row type="flex" justify="space-around">
              <el-col>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:90%;margin-bottom:30px;justify-content: flex-start"
                  @click.native.prevent="handleLogin"
                >登录
                </el-button>
              </el-col>
              <el-col
                style="display: flex;justify-content: end">
                <el-button
                  :loading="loading"
                  type="success"
                  style="width:90%;margin-bottom:30px;justify-content:flex-end"
                  @click="register"
                >注册
                </el-button>
              </el-col>
            </el-row>


            <div style="position:relative">
            </div>
          </el-form>

          <el-dialog title="Or connect with" :visible.sync="showDialog">
            Can not be simulated on local, so please combine you own business simulation! ! !
            <br>
            <br>
            <br>
            <social-sign/>
          </el-dialog>
        </el-col>
      </el-row>

    </div>
    <edit-modal
      ref="editModal"
      :visible.sync="dialogFormVisible"
      @close="dialogFormVisible = false"
      @updateItem="onUpdateSubmit"
    />
  </div>
</template>

<script>
import {validUsername} from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import editModal from './components/registerPanel.vue'

export default {
  name: 'Login',
  components: {SocialSign, editModal},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      dialogFormVisible: false,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        console.log(query)
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {

    register() {
      this.dialogFormVisible = true;
    },

    onUpdateSubmit(data) { //注册
      console.log(data.user_name, data.password, data.password_confirmation)
      this.dialogFormVisible = false;
      this.$store.dispatch('user/register', data).then(() => {
        // 登录成功进行路由的跳转
        this.loginForm.username = data.user_name
        this.loginForm.password = data.password
        this.handleLogin()
      }).catch((error) => {
        console.log("注册失败")
        this.$notify({
          title: '注册失败',
          message: '用户名已存在',
          type: 'warning',
          duration: 2000
        })
      })
    },

    checkCapslock(e) {
      const {key} = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 这里是在验证表单元素（用户名与密码）的是否符合规则
      this.$refs.loginForm.validate(valid => {
        // 如果符合验证规则
        if (valid) {
          // 按钮会有一个loading效果
          this.loading = true

          // 测试 如果后段暂时不支持权限，使用下面这三行
          this.$store.dispatch('user/forceLogin', this.loginForm)
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false

          //如果后端支持权限，注释上面三行，取消下列代码的注释
          //派发一个action:user/login,带着用户名与密码的载荷
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     // 登录成功进行路由的跳转
          //     // console.log("we would login success")
          //     this.$router.push({path: this.redirect || '/', query: this.otherQuery})
          //     // loading效果结束
          //     this.loading = false
          //     this.$notify({
          //       title: '登陆成功',
          //       message: '登陆成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     //this.$store.dispatch('user/getInfo')
          //   })
          //   .catch((error) => {
          //     this.loading = false
          //     this.$notify({
          //       title: '登陆失败',
          //       message: '用户名或密码错误',
          //       type: 'warning',
          //       duration: 2000
          //     })
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: rgb(5, 5, 5);
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container .el-input input {
  color: white !important;
}

.el-button {
  color: white;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.bg_container {
  min-height: 100%;
  width: 100%;
  opacity: 0.8;
  background: url('../../assets/images/login_background.jpg') no-repeat;
  background-size: 100% 100%;
}

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    background-color: rgb(63, 86, 108, 0.8);
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 10px 40px 10px;
    border-radius: 30px;
    margin-top: 180px;
    overflow: hidden;

  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 60px;
      color: $light_gray;
      margin: 0 auto 0 auto;
      text-align: center;
      font-weight: bold;
      font-family: 华文中宋,serif;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
