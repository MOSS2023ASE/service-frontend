<template>
  <div class="top-issue">
    <el-row>
      <el-col :span="1" style="min-height: 1px"></el-col>
      <el-col :span="7">
        <div v-if="this.rank === 1" sytle="display: flex;">
          <v-icon left style="color: #225464;">mdi-trophy</v-icon>
          <span class="rank1">{{ this.rank }}</span>
        </div>
        <div v-if="this.rank === 2" sytle="display: flex;">
          <v-icon left style="color: #146c94;">mdi-trophy-variant</v-icon>
          <span v-if="this.rank === 2" class="rank2">{{ this.rank }}</span>
        </div>
        <div v-if="this.rank === 3" sytle="display: flex;">
          <v-icon left style="color: #1687A7;">mdi-trophy-award</v-icon>
          <span v-if="this.rank === 3" class="rank3">{{ this.rank }}</span>
        </div>
        <div v-if="this.rank > 3" class="rank">{{ this.rank }}</div>
      </el-col>
      <el-col :span="16">
        <div class="title">{{this.title}}</div>
        <div class="subject-chapter">
            <el-tag type="warning" class="square-tag">{{ this.subject }}</el-tag>
            <el-tag type="warning" class="square-tag">{{ this.chapter }}</el-tag>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>
  
<script>  
export default {
  name: 'TopIssue',
  props: {
      id: {
        type: Number,
        default: 998244353
      },
      title: {
        type: String,
        default: "(无标题)"
      },
      subject: {
        type: String,
        default: '未定科目'
      },
      chapter: {
        type: String,
        default: '未定章节'
      },
      rank: {
        type: Number,
        default: 0
      }
  },
  data() {
      return {
      }
  },
    setup() {
    },
    methods: {
    }
}
</script>
  
<style scoped>
.top-issue {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 60px;
    margin-left: 5%;
    margin-top: 21px;
    margin-bottom: 20px;

    border-style: solid;
    border-color: #AAAAAA;
    border-width: 0px 0px 1px 0px;
}
 
.title {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1px;
    display: inline-block;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.subject-chapter {
    display: flex;
    height: 24px;
    margin: 0px;
    padding: 0px;
}

.square-tag {
    height: 24px;
    margin-right: 15%;
    font-size: 10px;
    display: inline-block;
    max-width: 90px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.rank1 {
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    color: #225464;
}

.rank2 {
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    color: #146c94;
}

.rank3 { 
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    color: #1687A7;
}

.rank {
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    color: #9fc3d2;
}
</style>
  