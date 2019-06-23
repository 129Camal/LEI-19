<template>
  <v-container bg grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center>
      <InformationTable v-bind:idFile="this.$route.params.id"/>
      <IntensitiesGraph v-bind:idFile="this.$route.params.id"/>
      <MassGraph v-bind:idFile="this.$route.params.id"/>

      <!-- <Plotly :data="graph" :layout="layout" :display-mode-bar="true"></Plotly> -->
    </v-layout>
  </v-container>
</template>

<script>
import InformationTable from "../components/fileInformation/InformationTable";
import IntensitiesGraph from "../components/fileInformation/IntensitiesGraph";
import MassGraph from "../components/fileInformation/MassGraph";
// import { Plotly } from "vue-plotly";
import { mapGetters } from "vuex";
// import axios from "axios";

export default {
  name: "file",
  computed: mapGetters(["getToken"]),
  components: {
    InformationTable,
    IntensitiesGraph,
    MassGraph,
    //Plotly
  }
  // mounted: function() {
  //   try {
  //     axios
  //       .get("http://localhost:3001/file/info?file=" + this.$route.params.id, {
  //         headers: { authorization: "Bearer " + this.getToken }
  //       })
  //       .then(res => {
  //         axios
  //           .get("http://localhost:3001/file/plot/" + res.data[0].name, {
  //             headers: { authorization: "Bearer " + this.getToken }
  //           })
  //           .then(response => {
  //             this.graph[0].z = response.data.plot;
  //             console.log(this.graph[0].z[0]);
  //           })
  //           // eslint-disable-next-line
  //           .catch(error => console.log(error));
  //       })
  //       // eslint-disable-next-line
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
};
</script>