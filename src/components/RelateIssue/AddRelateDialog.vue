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
                v-model="ids"
                :counter="20"
                :rules="idRules"
                label="添加关联问题id(请以分号;隔开你想添加的关联问题)"
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
import {add_association, delete_association, get_association} from '@/api/issue_connect';
export default {
  props: {show: Boolean,id:Number},


  data: () => ({
    ids: '',
    listLoading:false,
    idRules: [
      v => !!v || 'relate issue id is required',
      v => (v && v.length <= 20) || 'string must be less than 10 characters',
      v => {
        const pattern = /^(\d+;)*\d+$/;
        return pattern.test(v) || 'id must be a semicolon-separated list of numbers';
      },
    ],
  }),


  methods: {
    submit() {
      let jwt = this.$store.state.user.token
      let associate_id = Number(this.ids);
      console.log(associate_id)
      add_association(jwt,this.id,associate_id).then(response=>{
        this.closeDialog()
        this.$emit('update-dialog');
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        this.$emit('close-dialog');
      }).catch(err=>{

      })
    },
    clear() {
      this.ids = ''
    },
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
}
</script>

<style scoped>

</style>
