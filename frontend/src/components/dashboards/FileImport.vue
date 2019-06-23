<template>
  <v-flex md12>
    <h3>
      <b>Import RAW File</b>
    </h3>
    <form>
      <v-text-field
        v-model="description"
        name="description"
        label="Description"
        placeholder
        outline
        required
      ></v-text-field>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            name="dateTest"
            label="Exam Date"
            prepend-icon="event"
            readonly
            v-on="on"
            outline
            required
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <div class="form-group">
        <input type="file" class="border-input" placeholder required v-on:change="handleFileUpload">
      </div>

      <div class="text-center">
        <input @click="submitFile" class="btn btn-info btn-fill btn-wd" value="Import File">
      </div>
    </form>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "fileimport",
  computed: mapGetters(["getToken"]),
  data() {
    return {
      selectedFile: null,
      description: "",
      date: "",
      menu: false
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    submitFile() {
      console.log(this.date);
      console.log(this.description);
      console.log(this.selectedFile.name);
      let formData = new FormData();

      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("dateTest", this.date);
      formData.append("description", this.description);

      axios
        .post("http://localhost:3001/file/import", formData, {
          headers: {
            authorization: "Bearer " + this.getToken,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == "OK") {
            this.$router.push("/dashboards");
          }
        })
        .catch(erro => {
          console.log(erro);
        });
    }
  }
};
</script>
