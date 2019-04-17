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
              <input type="text" name="description" class="form-control border-input" placeholder>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Test Date</label>
              <input type="date" name="dateTest" class="form-control border-input" placeholder>
            </div>
          </div>
        </div>
        <!--<div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>More Information</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be description about the test"
              ></textarea>
            </div>
          </div>
        </div>-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>File</label>
              <input
                type="file"
                id="file"
                ref="file"
                class="border-input"
                placeholder
                required
                v-on:change="handleFileUpload()"
              >
            </div>
          </div>
        </div>
        <div class="text-center">
          <input
            @click="submitFile()"
            v-on:click="$emit('appear-button')"
            type="submit"
            class="btn btn-info btn-fill btn-wd"
            value="Import File"
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "fileimport",
  data() {
    return {
      file: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      const axios = require("axios");

      axios
        .post("http://localhost:3001/file/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>
