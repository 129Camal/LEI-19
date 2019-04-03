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
              <button type="button" class="btn btn-outline-info" >Import RAW</button>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                   
                    <div class="col-md-12">
                        <ListFiles/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <TestInformation/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import FileImport from '../components/dashboards/FileImport.vue'
import ListFiles from '../components/dashboards/ListFiles.vue'
import TestInformation from '../components/dashboards/TestInformation.vue'

export default {
  name: 'dashboards',
  components:{
    ListFiles,
    TestInformation
  }
}
</script>
