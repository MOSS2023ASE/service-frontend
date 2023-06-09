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
                  <img src="https://shieask.com/pic/1.png"
                       style="vertical-align:middle;max-height: 160px;max-width: 80px;">
                </el-col>
                <el-col :span="16">
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
                placeholder="用户名"
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
                  placeholder="密码"
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

            <el-row>
              <el-col :span="14">
                <el-form-item prop="captcha">
                  <span class="svg-container">
                    <svg-icon icon-class="lock"/>
                  </span>
                  <el-input
                    placeholder="验证码"
                    v-model="code"/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <div class="login-code" style="float: right;" @click="refreshCode">
                  <Captcha :identifyCode="identifyCode"></Captcha>
                </div>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-around">
              <el-col :span="20">
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:90%;margin-bottom:30px;justify-content: flex-start"
                  @click.native.prevent="handleLogin"
                >登录
                </el-button>
              </el-col>
              <el-col :span="4">
                <div class="forget-password" @click="showResetPasswordDialog">
                  忘记密码？
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-dialog :visible.sync="resetPasswordDialog" width="35%"
               title="重置密码" :modal-append-to-body="false"
               :show-close="false"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               ref="resetPasswordDialog">
      <el-form
        :model="resetPasswordForm"
        :rules="loginRules"
        class="reset-password-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-row>
            <el-col :span="2" style="min-height:1px"/>
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="user"/>
              </span>
            </el-col>
            <el-col :span="16">
              <el-input v-model="resetPasswordForm.username"
                        placeholder="学号" name="username" type="text" tabindex="1"/>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="mailbox">
          <el-row>
            <el-col :span="2" style="min-height:1px"/>
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="email"/>
              </span>
            </el-col>
            <el-col :span="16">
              <el-input v-model="resetPasswordForm.username" disabled
                        placeholder="邮箱" name="mailbox" type="text" tabindex="1">
                <template slot="append">@buaa.edu.cn</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="verification">
          <el-row>
            <el-col :span="2" style="min-height:1px"/>
            <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="lock"/>
              </span>
            </el-col>
            <el-col :span="10">
              <el-input v-model="resetPasswordForm.verification"
                        placeholder="验证码" name="verification" type="text" tabindex="1"/>
            </el-col>
            <el-col :span="2" style="min-height:1px"/>
            <el-col :span="4">
              <div class="send-verification" @click="sendVerification">
                发送验证码
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <el-row>
              <el-col :span="2" style="min-height:1px"/>
              <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="password"/>
              </span>
              </el-col>
              <el-col :span="13">
                <el-input
                  :key="passwordType"
                  v-model="resetPasswordForm.password"
                  :type="resetPasswordType"
                  placeholder="新密码"
                  name="password"
                  tabindex="2"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                />
              </el-col>
              <el-col :span="2" style="min-height:1px"/>
              <el-col :span="1">
              <span class="show-pwd" @click="showResetPwd">
                <svg-icon style="cursor: pointer;"
                          :icon-class="resetPasswordType === 'password' ? 'eye' : 'eye-open'"/>
              </span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tooltip>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="confirm-password">
            <el-row>
              <el-col :span="2" style="min-height:1px"/>
              <el-col :span="2">
              <span class="svg-container">
                <svg-icon icon-class="password"/>
              </span>
              </el-col>
              <el-col :span="13">
                <el-input
                  :key="passwordType"
                  v-model="resetPasswordForm.confirmPassword"
                  :type="confirmResetPasswordType"
                  placeholder="确认密码"
                  name="confirm-password"
                  tabindex="2"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                />
              </el-col>
              <el-col :span="2" style="min-height: 1px;"/>
              <el-col :span="1">
                <div class="show-pwd" @click="showResetConfirmPwd">
                  <svg-icon style="cursor: pointer;"
                            :icon-class="confirmResetPasswordType === 'password' ? 'eye' : 'eye-open'"/>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tooltip>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="confirm-button" @click="resetPassword">确认</el-button>
        <el-button class="cancel-button" @click="resetPasswordDialog = false">取消</el-button>
      </span>
    </el-dialog>
      <div class="footer">
        <a href=" " target="_blank">备案号</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023007993号-1</a>
      </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import {validUsername} from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import editModal from './components/registerPanel.vue'
import Captcha from './components/captcha.vue'
import {sha256} from 'js-sha256'
import {send_mail, confirm_mail} from '@/api/send_email'
import { deepClone } from '@/utils'

export default {
  name: 'Login',
  components: {SocialSign, editModal, Captcha},
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
        username: '', // Built-in admin account
        password: '',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      identifyCode: '',
      code: '',
      passwordType: 'password',
      resetPasswordType: 'password',
      confirmResetPasswordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      resetPasswordDialog: false,
      resetPasswordForm: {
        username: '',
        mailAddress: '',
        verification: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
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
    const _this = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key == 13 && _this.resetPasswordDialog === false) {
        _this.handleLogin();
      }
    };
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
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
    showResetPwd() {
      if (this.resetPasswordType === 'password') {
        this.resetPasswordType = ''
      } else {
        this.resetPasswordType = 'password'
      }
    },
    showResetConfirmPwd() {
      if (this.confirmResetPasswordType === 'password') {
        this.confirmResetPasswordType = ''
      } else {
        this.confirmResetPasswordType = 'password'
      }
    },
    sendVerification() {
      this.resetPasswordForm.mailAddress = this.resetPasswordForm.username + '@buaa.edu.cn'
      send_mail(this.resetPasswordForm.mailAddress).then(response => {
      }).catch(error => {
      })
    },
    resetPassword() {
      this.resetPasswordForm.mailAddress = this.resetPasswordForm.username + '@buaa.edu.cn'
      if (this.resetPasswordForm.password !== this.resetPasswordForm.confirmPassword) {
        Message({
          message: '两次输入密码不同',
          type: 'error'
        });
        return;
      }
      confirm_mail(this.resetPasswordForm.mailAddress, this.resetPasswordForm.username,
        sha256(this.resetPasswordForm.password), this.resetPasswordForm.verification).then(response => {
      }).catch(error => {
        console.log(error)
      })
    },
    handleLogin() {
      if (this.identifyCode.toLowerCase() !== this.code.toLowerCase()) {
        Message({
          message: '验证码错误',
          type: 'error',
        })
        this.refreshCode();
        return;
      }
      // 这里是在验证表单元素（用户名与密码）的是否符合规则
      this.$refs.loginForm.validate(valid => {
        // 如果符合验证规则
        if (valid) {
          // 按钮会有一个loading效果
          this.loading = true

          // 测试 如果后段暂时不支持权限，使用下面这三行
          // this.$store.dispatch('user/forceLogin', this.loginForm)
          // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          // this.loading = false

          // TODO 在前后端对接阶段，将下面的注释取消，在 store/user 中的 login 中已经实现 api 的调用
          //如果后端支持权限，注释上面三行，取消下列代码的注释
          //派发一个action:user/login,带着用户名与密码的载荷
          let temp_form = deepClone(this.loginForm);
          temp_form.password = sha256(temp_form.password);
          this.$store.dispatch('user/login', temp_form)
            .then(() => {
              // 登录成功进行路由的跳转
              // console.log("we would login success")
              this.$router.push({name: 'search', query: this.otherQuery})
              // loading效果结束
              this.loading = false
              this.$notify({
                title: '登录成功',
                message: '登录成功',
                type: 'success',
                duration: 2000
              })
              //this.$store.dispatch('user/getInfo')
            })
            .catch((error) => {
              this.loading = false
              this.$notify({
                title: '登录失败',
                message: '用户名或密码错误',
                type: 'warning',
                duration: 2000
              })
            })
        } else {
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
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //通过循环获取字符串内随机几位
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    showResetPasswordDialog() {
      this.resetPasswordDialog = true;
    }
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

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
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
      font-family: 华文中宋, serif;
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

.forget-password {
  font-size: 14px;
  margin-top: 5px;
  color: #121212;
}

.forget-password:hover {
  cursor: pointer;
  color: #464646;
}

.send-verification:hover {
  cursor: pointer;
  color: #cacaca;
}

.confirm-button {
  background-color: #1687A7;
  border-color: #1687A7;
  color: white;
}

.cancel-button {
  background-color: #D3E0EA;
  border-color: #D3E0EA;
  color: black;
}
</style>
