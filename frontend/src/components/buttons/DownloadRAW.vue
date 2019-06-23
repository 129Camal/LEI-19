<template>
  <v-btn
    color="grey lighten-1"
    @click="download()"
  >
    RAW File
    <v-icon right dark>save_alt</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "DownloadRaw",
  props: ["idFile"],
  computed: mapGetters(["getToken"]),
  methods: {
    download() {
      axios
        .get("http://localhost:3001/file/RAW/" + this.idFile, {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(response => {
          let blob = new Blob([response.data], { type: "application/binary" }),
            url = window.URL.createObjectURL(blob);

          window.open(url);
        });
    }
  }
};
</script>