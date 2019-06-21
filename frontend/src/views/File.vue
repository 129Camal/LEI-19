<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand"></p>
        </div>
      </div>
    </nav>
    <InformationTable v-bind:idFile="this.$route.params.id"/>
    <IntensitiesGraph v-bind:idFile="this.$route.params.id"/>
    <MassGraph v-bind:idFile="this.$route.params.id"/>

    <Plotly :data="graph" :layout="layout" :display-mode-bar="true"></Plotly>
  </div>
</template>

<script>
import InformationTable from "../components/fileInformation/InformationTable";
import IntensitiesGraph from "../components/fileInformation/IntensitiesGraph";
import MassGraph from "../components/fileInformation/MassGraph";
import { Plotly } from "vue-plotly";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "file",
  computed: mapGetters(["getToken"]),
  components: {
    InformationTable,
    IntensitiesGraph,
    MassGraph,
    Plotly
  },
  data() {
    return {
      graph: [
        {
          type: "surface",
          z: [],
          contours: {
            z: {
              show: true,
              usecolormap: true,
              highlightcolor: "#42f462",
              project: { z: true }
            }
          }
        }
      ],
      layout: {
        title: "Plot 3D",
        scene: { camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } } },
        autosize: false,
        width: 1000,
        height: 750,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90
        }
      }
    };
  },
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/file/info?file=" + this.$route.params.id, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          axios
            .get("http://localhost:3001/file/plot/" + res.data[0].name, {
              headers: { authorization: "Bearer " + this.getToken }
            })
            .then(response => {
              this.z = response.data;
              console.log(this.z[0])
            })
            // eslint-disable-next-line
            .catch(error => console.log(error));
        })
        // eslint-disable-next-line
        .catch(err => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  }
};
</script>