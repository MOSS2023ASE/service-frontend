<template>
<div class="top-user">
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
    <el-col :span="5">
      <div class="author">
        <el-avatar v-if="this.avatar !== null" class="avatar" :src="this.avatar" :key="this.avatar" />
        <el-avatar v-else class="avatar" :src="require('../../../assets/images/anonymous.jpg')" />
      </div>
    </el-col>
    <el-col :span="9">
      <div class="name">{{this.name}}</div>
    </el-col>
    <el-col :span="2" style="min-height: 1px"></el-col>
  </el-row>
</div>
</template>

<script>
export default {
name: 'TopUser',
props: {
    id: {
        type: Number,
        default: 998244353
    },
    name: {
        type: String,
        default: "匿名用户"
    },
    avatar: {
        type: String,
        default: null
    },
    rank: {
        type: Number,
        default: 0
    },
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
.top-user {
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

.avatar {
    height: 40px;
    width: 40px;
}

.name {
    text-align: center;
    font-size: 20px;
    max-width: 90px;
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
