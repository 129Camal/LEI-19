<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="text-xs-center">
        <v-alert :value="alertError" color="amber darken-1" icon="priority_high">
          <b>{{this.msgerror}}</b>
          <br>
        </v-alert>
        <v-alert :value="alertSucc" color="green darken-1" icon="done">
          <b>{{this.msgsucc}}</b>
          <br>
        </v-alert>
        <v-toolbar color="cyan lighten-5">
          <v-toolbar-title>Import RAW File</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <br>
        <br>
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
            <input
              type="file"
              class="border-input"
              placeholder
              required
              v-on:change="handleFileUpload"
            >
          </div>

          <v-btn
            large
            :disabled="dialog"
            :loading="dialog"
            color="cyan lighten-5"
            @click="submitFile"
          >
            <v-icon left>add_circle</v-icon>Import File
          </v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "fileimport",
  computed: mapGetters(["getToken"]),
  data() {
    return {
      alertError: false,
      alertSucc: false,
      msgerror: "",
      msgsucc: "",
      selectedFile: null,
      description: "",
      date: "",
      menu: false,
      dialog: false
    };
  },
  methods: {
    ...mapMutations(["removeToken"]),
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    submitFile() {
      if (this.date && this.description && this.selectedFile) {
        this.dialog = true;
        this.alertError = false;
        this.alertSucc = true;
        this.msgsucc = "Analysis being done! Please wait! :)";

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
            switch (res.data.status) {
              case "OK":
                this.$router.push("/dashboards");
                break;
              case "ERROR CREATING CSV":
                this.alertError = true;
                this.msgerror = "Error with the file processing!";
                this.$router.push("/dashboards/import");
                break;
              default:
                localStorage.removeItem("access_token");
                this.removeToken();
                this.$router.push("/dashboards");
            }
          })
          .catch(() => {
            this.alertSucc = false;
            this.dialog = false;
            this.alertError = true;
            this.msgerror = "System Error";
            this.$router.push("/dashboards/import");
          });
      } else {
        this.alertError = true;
        this.msgerror = "You have to fill all the fields!";
        this.$router.push("/dashboards/import");
      }
    }
  }
};
</script>
