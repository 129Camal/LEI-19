<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>
        <h4>
          <i>Intensity per Scan</i>
        </h4>
      </v-card-title>
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
      }
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
