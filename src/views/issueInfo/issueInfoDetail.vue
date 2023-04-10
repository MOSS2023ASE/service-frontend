<template>
  <div id="app">
    <v-app id="inspire">
      <v-card max-width="1600px" flat>
        <v-container fluid>
          <v-card
            outlined
            class="mx-auto"
          >
            <v-card-title>
              <v-btn text color="green">
                <v-icon
                  large
                  left
                >
                  mdi-keyboard-return
                </v-icon>
                返回
              </v-btn>
            </v-card-title>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">一个问题</v-list-item-title>
                <v-list-item-subtitle>
                  问题描述
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-row style="margin-left: 1px">
              <v-card-actions>
                <v-btn outlined color="light-blue lighten-2">数学分析</v-btn>
                <v-btn outlined color="orange lighten-2">第一章</v-btn>
              </v-card-actions>
            </v-row>
            <v-row justify="end" style="margin-right: 10px">
              <v-card-actions>
                <v-btn text>
                  <v-icon left>
                    mdi-thumb-up-outline
                  </v-icon>
                  点赞
                </v-btn>
                <v-btn text>
                  <v-icon left>
                    mdi-heart-outline
                  </v-icon>
                  收藏
                </v-btn>
                <v-btn text>编辑</v-btn>
                <v-btn text>关闭</v-btn>
              </v-card-actions>
            </v-row>
            <br/>
            <v-stepper value="2" flat>
              <v-stepper-header>
                <v-stepper-step step="1" complete>未认领</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2">已认领</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">已关闭</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="4">已复审</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item
                  v-else
                  :key="item.title"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>

        </v-container>
        <v-divider></v-divider>
        <v-container fluid>
          <v-timeline>
            <v-timeline-item
              v-for="n in 10"
              :key="n"
              large
            >
              <template v-slot:icon>
                <v-avatar>
                  <img src="https://pic.imgdb.cn/item/6395462eb1fccdcd36ecbe97.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <span>2023.9.23 10pm</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">Lorem ipsum</v-card-title>
                <v-card-text>
                  <p><img src="https://pic.imgdb.cn/item/64170667a682492fcc17c248.png">我不懂我不懂我不懂</p>
                  <p></p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
        <v-divider></v-divider>
      </v-card>
<!--      <div style="margin-top: 10px">-->
<!--        <el-tiptap v-model="content" :extensions="extensions" lang="zh" :contain="true" style="height: 500px"/>-->
<!--      </div>-->

      <div>
        <markdown-editor v-model="content" height="500px"/>
      </div>
      <br/>
      <v-row justify="end" style="margin-right: 10px;">
        <v-btn raised color="green">保存</v-btn>
        <v-spacer style="max-width: 10px"></v-spacer>
        <v-btn raised color="light-blue darken-2">发布</v-btn>
      </v-row>
      <br/>
    </v-app>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: "issueInfoDetail",
  components: {MarkdownEditor},
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      content: '',
      editorText: "#asd",
      editorOptions: {},
      items: [
        {header: '回答者'},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        {header: '复审者'},
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
      ],
    }
  },
  methods: {

  },
  computed: {

  },
}
</script>

<style scoped>

</style>
