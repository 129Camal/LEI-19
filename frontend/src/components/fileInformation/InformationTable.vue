<template>
  <v-container fluid grid-list-md>
    <v-card flat>
      <v-toolbar color="dark" dark>
        <v-toolbar-title>File Information</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>Name:</v-list-tile-content>
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
      <v-layout justify-center>
        <v-flex md6>
          <CSVButton v-bind:idFile="this.infoFile.name"/>
          <RAWButton v-bind:idFile="this.infoFile.name"/>
          <v-btn color="red lighten-1" @click="remove()">Delete File</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import CSVButton from "../buttons/DownloadCSV";
import RAWButton from "../buttons/DownloadRAW";

export default {
  name: "InformationTable",
  props: ["idFile"],
  computed: mapGetters(["getToken"]),
  components: {
    CSVButton,
    RAWButton
  },
  data: () => ({
    infoFile: {}
  }),
  methods: {
    ...mapMutations(["removeToken"]),
    remove() {
      axios
        .delete(
          "http://localhost:3001/file/delete/" +
            this.idFile +
            "/" +
            this.infoFile.name,
          {
            headers: { authorization: "Bearer " + this.getToken }
          }
        )
        .then(res => {
          
          if (res.data.status == "OK") {
            
            this.$router.push("/dashboards");
          }
        })

        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    }
  },
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/file/info?file=" + this.idFile, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          if (res.data.status) {
            localStorage.removeItem("access_token");
            this.removeToken();
            this.$router.push("/");
          } else {
            this.infoFile = res.data[0];
          }
        })

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