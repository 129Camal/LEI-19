<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>
        <h4><i>File Information</i></h4>
      </v-card-title>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Nome:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ this.infoFile.name }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Exam Date:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ this.infoFile.dateTest.split("T")[0] }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Number of Scans:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ this.infoFile.nScans }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Date of Upload:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ this.infoFile.dateInput.split("T")[0] }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <CSVButton  v-bind:idFile="this.infoFile.name"/>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CSVButton from "../buttons/DownloadCSV"

export default {
  name: "InformationTable",
  props: ["idFile"],
  computed: mapGetters(["getToken"]),
  components: {
    CSVButton
  },
  data: () => ({
    infoFile: {}
  }),
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/file/info?file=" + this.idFile, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          this.infoFile = res.data[0];
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