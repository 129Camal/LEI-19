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
import { mapGetters, mapMutations } from "vuex";
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
      theme: "material"
    }
  }),
  methods: {
    ...mapMutations(["removeToken"])
  },
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
          if (res.data.status) {
            localStorage.removeItem("access_token");
            this.removeToken();
            this.$router.push("/");
          } else {
            this.chartData.push(["Scan", "Intensity"]);

            for (let i = 0; i < res.data[0].nScans; i++) {
              this.chartData.push([i + 1, res.data[0].sumIntensities[i]]);
            }
          }
        })
        // eslint-disable-next-line
        .catch(() => {
          this.$router.push("/notfound");
        });
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
};
</script>
