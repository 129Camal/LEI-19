<template>
  <v-container v-if="chartData[0]" fluid grid-list-md>
    <v-card>
      <v-toolbar color="green darken-4" dark>
        <v-toolbar-title>Intensity per Mass</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <GChart type="LineChart" :data="chartData" :options="chartOptions"/>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { GChart } from "vue-google-charts";
import { randomBytes } from 'crypto';

export default {
  name: "mass",
  props: ["idFile"],
  components: {
    GChart
  },
  computed: mapGetters(["getToken"]),
  data: () => ({
    chartData: [],
    chartOptions: {
      chart: {
        title: "Graph Sum of Intensities per Scan"
      },
      legend: { position: "bottom" },
      colors: ["#1B5E20"],
      explorer: {
        actions: ["dragToZoom", "rightClickToReset"],
        axis: "horizontal",
        keepInBounds: true,
        maxZoomIn: 10.0
      },
      theme: 'material'
    }
  }),
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/file/graph/sumMass?file=" + this.idFile, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          this.chartData.push(["Mass", "Intensity"]);

          for (let i = 0; i < 950; i++) {
            this.chartData.push([i + 50, res.data[0].sumIntensitiesPerMass[i]]);
          }
        })
        // eslint-disable-next-line
        .catch(err => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }
};
</script>