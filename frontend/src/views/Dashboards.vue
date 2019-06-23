<template>
  <v-container bg grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center>
        <router-view></router-view>
        <router-view name="helper"></router-view>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: "dashboards",
  data() {
    return {
      seen: true
    };
  }
};
</script>