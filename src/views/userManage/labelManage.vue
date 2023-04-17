<template>
  <v-container>
    <v-card>
      <v-card-title class="ml-4">
        标签管理：
        <v-btn text class="text-h6" @click="goStep(0, year)">学年</v-btn> 
        <span v-if="step > 0">/</span>  
        <v-btn text class="text-h6" v-if="step > 0" @click="goStep(1, year)">科目</v-btn> 
        <span v-if="step > 1">/</span>
        <v-btn text class="text-h6" v-if="step > 1">章节</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row v-if="step === 0">
          <v-col :cols="2" v-for="(year, i) in years" :key="i">
            <v-btn @click="goStep(1, year)">{{ year }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="step === 1">
          <v-col :cols="2" v-for="(subject, i) in subjects" :key="i">
            <v-btn @click="goStep(2, subject)">{{ subject }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="step === 2">
          <v-col :cols="2" v-for="(chapter, i) in chapters" :key="i">
            <v-btn>{{ chapter }}</v-btn>
            <v-icon class="ml-2" v-if="canRemove" color="red">mdi-close-circle-outline</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-spacer></v-spacer>
          <v-col :cols="2">
            <v-btn color="blue" class="white--text">添加标签</v-btn>
          </v-col>
          <v-col :cols="2">
            <v-btn color="red" class="white--text" @click="canRemove = !canRemove">删除标签</v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      years: [],
      subjects: [],
      chapters: [],
      step: 0,
      canRemove: false
    }
  },
  mounted() {
    this.years = this.getYear();
  },
  methods: {
    getYear() {
      let years = ['大一上学期', '大一下学期', '大二上学期', '大二下学期'];
      return years;
    },
    getSubject() {
      let subjects = ['数学分析', '高等代数', '程序设计'];
      return subjects;
    },
    getChapter() {
      let chapters = ['一元微积分', '多元微积分', '导数'];
      return chapters;
    },
    goStep(step) {
      this.canRemove = false;
      this.step = step;
      if (step === 0) {
        this.years = this.getYear();
      } else if (step === 1) {
        this.subjects = this.getSubject();
      } else if (step === 2) {
        this.chapters = this.getChapter();
      }
    }
  }
}
</script>