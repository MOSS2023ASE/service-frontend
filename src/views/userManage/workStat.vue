<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-n6" align="center">
        <v-row>
          <v-col :cols="2">
            <v-btn-toggle v-model="chartType" mandatory>
              <v-btn active-class="blue white--text">
                <v-icon>mdi-chart-areaspline</v-icon>
              </v-btn>
              <v-btn active-class="blue white--text">
                <v-icon>mdi-chart-arc</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col :cols="3">
            <v-select dense outlined :items="indicators" v-model="indicator" label="选择统计量"></v-select>
          </v-col>

          <v-col :cols="2">
            <v-menu
              v-model="showDate1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date1"
                  label="起始时间"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date1"
                @input="showDate1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col :cols="2">
            <v-menu
              v-model="showDate2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="终止时间"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
                @input="showDate2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col :cols="2">
            <v-btn color="success" @click="draw">显示</v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <div ref="line" style="width: 1000px; height: 400px;" v-show="chartType === 0"></div>
        <div ref="pie" style="width: 1000px; height: 400px;" v-show="chartType === 1"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import * as echarts from 'echarts';
import { get_statistics } from '@/api/statistics';
import { getToken } from '@/utils/auth';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      showDate1: false,
      showDate2: false,
      date1: '',
      date2: '',
      chartType: 0,
      indicators: ['辅导师回答问题数', '辅导师复审问题数', 'issue访问次数'],
      indicator: '',
      line: null,
      pie: null,
      line_option: {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],
        title: [
          {
            left: 'center',
            text: this.indicator
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: [] 
          }
        ],
        yAxis: [
          {}
        ],
        grid: [
          {}
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: []
          }
        ]
      },
      pie_option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    }
  },
  methods: {
    draw() {
      get_statistics(getToken(),
                     0,
                     this.indicators.indexOf(this.indicator),
                     this.date1,
                     this.date2).then(response => {
                      this.drawLine(response.data.list);
                     }).catch(error => {
                      Message({
                        message: '折线图绘制失败',
                        type: 'error'
                      });
                      console.log(error);
                     });

      get_statistics(getToken(),
                     1,
                     this.indicators.indexOf(this.indicator),
                     this.date1,
                     this.date2).then(response => {
                      console.log(response.data.list);
                      this.drawPie(response.data.list);
                     }).catch(error => {
                      Message({
                        message: '饼图绘制失败',
                        type: 'error'
                      });
                      console.log(error);
                     });
    },
    timestampToTime(date) {
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate();
      return Y + M + D;
    },
    getTime(value) {
      let arr = []
      let str_b = value[0].split('-')
      let str_e = value[1].split('-')
      let date_b = new Date()
      date_b.setUTCFullYear(str_b[0], str_b[1] - 1, str_b[2])
      let date_e = new Date()
      date_e.setUTCFullYear(str_e[0], str_e[1] - 1, str_e[2])
      let unixDb = date_b.getTime() - 24 * 60 * 60 * 1000
      let unixDe = date_e.getTime() - 24 * 60 * 60 * 1000
      for (let j = unixDb; j <= unixDe;) {
        j = j + 24 * 60 * 60 * 1000
        arr.push(this.timestampToTime(new Date(parseInt(j))))
      }
      return arr;
    },
    drawLine(valueList) {
      let dateList = this.getTime([this.date1, this.date2]);
      this.line_option.xAxis[0].data = dateList;
      this.line_option.series[0].data = valueList;

      echarts.registerTheme("waldon", theme);
      this.line = echarts.init(this.$refs.line, "waldon");
      this.line.setOption(this.line_option);
    },
    drawPie(valueList) {
      let sections = ['0~10次', '11~20次', '21~30次' , '31~40次', '40次以上'];
      let counts = [0, 0, 0, 0, 0];

      for (let i = 0; i < valueList.length; i++) {
        if (valueList[i] <= 40) {
          counts[Math.floor((valueList[i] - 1) / 10)] += 1;
        } else {
          counts[4] += 1;
        }
      }

      console.log(counts);

      let data = [];
      for (let i = 0; i < sections.length; i++) {
        data.push({
          value: counts[i],
          name: sections[i]
        });
      }
      console.log(data);

      this.pie_option.series[0].data = data;
      echarts.registerTheme("waldon", theme);
      this.pie = echarts.init(this.$refs.pie, "waldon");
      this.pie.setOption(this.pie_option);
    }
  }
}

import theme from './waldon.json';

</script>