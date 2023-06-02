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
        <div id="main" style="width: 1000px; height: 400px;" v-if="chartType === 0"></div>
        <div id="main2" style="width: 1000px; height: 400px;" v-if="chartType === 1"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
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
      indicator: ''
    }
  },
  methods: {
    draw() {
      get_statistics(getToken(),
                     this.chartType,
                     this.indicators.indexOf(this.indicator),
                     this.date1,
                     this.date2).then(response => {
                      if (this.chartType === 0) {
                        this.drawLine(response.data.list);
                      } else {
                        this.drawPie(response.data.list);
                      }
                     }).catch(error => {
                      Message({
                        message: '获取数据失败',
                        type: 'error'
                      });
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
      
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
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
            data: dateList
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
            data: valueList
          }
        ]
      };

      myChart.setOption(option);
    },
    drawPie(valueList) {
      let sections = ['0~10次', '11~20次', '21~30次' , '31~40次', '40次以上'];
      let counts = [0, 0, 0, 0, 0];

      for (let i = 0; i < valueList.length; i++) {
        counts[(valueList[i] - 1) / 10] += 1;
      }

      let data = [];
      for (let i = 0; i < sections.length; i++) {
        data.push({
          value: counts[i],
          name: sections[i]
        });
      }

      let myChart = this.$echarts.init(document.getElementById("main2"));

      let option = {
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
            data: data
          }
        ]
      };

      myChart.setOption(option);
    }
  }
}
</script>