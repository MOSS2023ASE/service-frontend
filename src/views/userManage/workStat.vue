<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-n6">
        <v-row>
          <v-col :cols="2">
            <v-btn text>
              <v-icon>mdi-chart-areaspline</v-icon>
            </v-btn>
            <v-btn text>
              <v-icon>mdi-chart-arc</v-icon>
            </v-btn>
          </v-col>

          <v-col :cols="3">
            <v-select dense outlined></v-select>
          </v-col>

          <v-col cols="3">
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

          <v-col cols="3">
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
        </v-row>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showDate1: false,
      showDate2: false,
      date1: '',
      date2: ''
    }
  }
}
</script>