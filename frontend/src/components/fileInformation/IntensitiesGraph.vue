<template>
  <v-container fluid grid-list-md v-if="chartData[0]">
    <v-card>
      <v-toolbar color="blue darken-4" dark>
        <v-toolbar-title>Intensity per Scan</v-toolbar-title>
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

export default {
  name: "Intensities",
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
        .get(
          "http://localhost:3001/file/graph/sumIntensity?file=" + this.idFile,
          {
            headers: { authorization: "Bearer " + this.getToken }
          }
        )
        .then(res => {
          this.chartData.push(["Scan", "Intensity"]);

          for (let i = 0; i < res.data[0].nScans; i++) {
            this.chartData.push([i + 1, res.data[0].sumIntensities[i]]);
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
