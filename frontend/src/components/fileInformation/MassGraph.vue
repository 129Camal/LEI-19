<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>
        <h4>
          <i>Intensity per Mass</i>
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
      }
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
            this.chartData.push([i+50, res.data[0].sumIntensitiesPerMass[i]]);
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