<template>

  <div class="card">
    <div class="header">
      <h4 class="title">
        Import
        <i>RAW</i> File
      </h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Description</label>
              <input
                v-model="description"
                type="text"
                name="description"
                class="form-control border-input"
                placeholder
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Test Date</label>
              <input
                v-model="date"
                type="date"
                name="dateTest"
                class="form-control border-input"
                placeholder
                required
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>File</label>
              <input
                type="file"
                class="border-input"
                placeholder
                required
                v-on:change="handleFileUpload"
              >
            </div>
          </div>
        </div>
        <div class="text-center">
          <input
            @click="submitFile"
            class="btn btn-info btn-fill btn-wd"
            value="Import File"
          >
        </div>
      </form>
    </div>
  </div>
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
      date: ""
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    submitFile() {
      let formData = new FormData();
      
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("dateTest", this.date)
      formData.append("description", this.description)

      axios.post("http://localhost:3001/file/import", formData, {
          headers: {
            authorization: "Bearer " + this.getToken,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data)
          if(res.data.status == "OK"){
            this.$router.push("/dashboards")
          }
        })
        .catch(erro => {
          console.log("ERRO AXIOS")
          console.log(erro);
        });
    }
  }
};
</script>
