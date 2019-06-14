<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand"></p>
        </div>
      </div>
    </nav>
    <InformationTable v-bind:idFile="this.$route.params.id"/>
    <IntensitiesGraph v-bind:idFile="this.$route.params.id"/>
    <MassGraph v-bind:idFile="this.$route.params.id"/>
    
  </div>
</template>

<script>
import InformationTable from "../components/fileInformation/InformationTable";
import IntensitiesGraph from "../components/fileInformation/IntensitiesGraph";
import MassGraph from "../components/fileInformation/MassGraph";


export default {
  name: 'file', 
  components: {
    InformationTable,
    IntensitiesGraph,
    MassGraph
  }
}
</script>

