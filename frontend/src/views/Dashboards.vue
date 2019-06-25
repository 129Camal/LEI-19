<template>
  <v-container bg grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center>
        <ListFiles/>
        <ImportFileButton/>
    </v-layout>
  </v-container>
</template>

<script>
import ListFiles from "../components/dashboards/ListFiles";
import ImportFileButton from "../components/buttons/ImportFileButton";

export default {
  name: "dashboards",
  components: {
    ListFiles,
    ImportFileButton
  }
};
</script>