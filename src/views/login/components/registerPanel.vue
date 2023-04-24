<template>
  <el-dialog
    title="用户注册"
    width="500px"
    :visible.sync="visible"
    :before-close="onClose"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" label-suffix=":" label-position="left">
      <el-form-item label="用户名" prop="user_name" >
        <el-input v-model="form.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="输入密码" prop="password">
        <el-input show-password type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation">
        <el-input show-password type="password" v-model="form.password_confirmation" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" @click="onClose">取消</el-button>
      <el-button type="primary" @click="submit">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'editModal',
  props: {
    visible: false
  },
  data() {
    const validateconfirmPassword = (rule, value, callback) => {
      if (this.form.password_confirmation != this.form.password) {
        callback(new Error('输入密码不同'))
      } else {
        callback()
      }
    }
    return {
      form: {user_name: '', password: '', password_confirmation: ''},
      rules: {
        user_name: [
          {required: true, message: '请输入用户名'},
        ],
        password: [
          {required: true, message: '请输入密码'},
        ],
        password_confirmation: [
          {required: true, validator: validateconfirmPassword}
        ]
      },
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('updateItem', this.form)
        } else {
          return false;
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
#el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0);
}

</style>

