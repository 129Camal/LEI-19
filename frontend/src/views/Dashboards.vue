<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand">Dashboards</p>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <div v-show="seen">
                <!--<button type="button" class="btn btn-outline-info">Import RAW</button>-->
                <router-link to="/dashboards/import" tag="button" class="btn btn-outline-info">
                  <span v-on:click="seen = !seen">Import File</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content">
      <div class="container-fluid">
        <router-view></router-view>
        <router-view name="helper"></router-view>
        <!--    <div class="row">
                    <div class="col-md-12">
                        <ListFiles/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <TestInformation/>
                    </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import FileImport from '../components/dashboards/FileImport.vue'
import ListFiles from "../components/dashboards/ListFiles.vue";
import TestInformation from "../components/dashboards/TestInformation.vue";

export default {
  name: "dashboards",
  components: {
    ListFiles,
    FileImport,
    TestInformation
  },
  data() {
    return {
      seen: true
    }
  },
};
</script>
