<template>
  <v-container fluid grid-list-md>
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="white--text"
      @click="download()"
    >
      Download CSV
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "DownloadCSV",
  props: ["idFile"],
  computed: mapGetters(["getToken"]),
  data() {
    return {
      loader: null,
      loading: false
    };
  },
  methods: {
    download() {
      axios
        .get("http://localhost:3001/file/csv/" + this.idFile, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(response => {
          console.log(response);

          let blob = new Blob([response.data], { type: "text/csv" }),
            url = window.URL.createObjectURL(blob);

          window.open(url); // Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
        });
    }
  }
};
</script>