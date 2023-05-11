<template>
  <v-app>
    <v-row justify="center">
      <v-dialog
        v-model="visible"
        persistent
        width="auto"
      >
        <v-card>
          <v-card-title class="text-h5">
            确认操作
          </v-card-title>
          <v-card-text>{{ this.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#1687A7"
              variant="text"
              @click="confirm()"
            >
              确认
            </v-btn>
            <v-btn
              color="#D3E0EA"
              variant="text"
              @click="cancel()"
            >
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "Confirm",
  props: {text:String,onConfirm: Function},
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open({ text, onConfirm }) {
      this.text = text
      this.onConfirm = onConfirm
      this.visible = true
    },
    confirm() {
      this.onConfirm()
      this.visible = false
    },
    cancel() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
