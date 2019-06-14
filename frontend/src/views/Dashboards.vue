<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand">Dashboards</p>
        </div>
      </div>
    </nav>
    <div class="content">
      <div class="container-fluid">
        <router-view></router-view>
        <router-view name="helper"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ImportFileButton from "../components/buttons/ImportFileButton.vue";
import FileImport from "../components/dashboards/FileImport.vue";
import ListFiles from "../components/dashboards/ListFiles.vue";
import TestInformation from "../components/dashboards/TestInformation.vue";

export default {
  name: "dashboards",
  components: {
    ImportFileButton,
    FileImport,
    ListFiles,
    TestInformation
  },

  data() {
    return {
      seen: true
    };
  }
};
</script>