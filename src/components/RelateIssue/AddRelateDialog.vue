<template>
  <div id="app">
    <v-app id="inspire">
      <v-dialog v-model="show" width="500px" persistent>
        <v-card max-width="500">
          <v-toolbar
            color="#276678"
            dark
          >
            <v-btn icon @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>添加关联关系</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container>
            <form>
              <v-text-field
                v-model="本问题"
                :counter="20"
                :rules="idRules"
                label="添加关联问题(请以分号;隔开你想添加的关联问题)"
                required
              ></v-text-field>
              <v-row justify="end">
                <v-col cols="auto">
                  <v-btn class="mr-4" @click="submit" text >
                    submit
                  </v-btn>
                  <v-btn @click="clear" text >
                    clear
                  </v-btn>
                </v-col>
              </v-row>

            </form>
          </v-container>

        </v-card>

      </v-dialog>

    </v-app>
  </div>
</template>

<script>

export default {
  props: {show: Boolean},


  data: () => ({
    name: '',
    email: '',
    select: null,
    idRules: [
      v => !!v || 'relate issue id is required',
      v => (v && v.length <= 20) || 'string must be less than 10 characters',
      v => {
        const pattern = /^(\d+;)*\d+$/;
        return pattern.test(v) || 'id must be a semicolon-separated list of numbers';
      },
    ],
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
  }),


  methods: {
    submit() {
    //TODO 等待接口
      this.closeDialog()
    },
    clear() {
      this.name = ''
    },
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
}
</script>

<style scoped>

</style>
