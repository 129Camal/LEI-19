<template>
  <v-btn color="cyan lighten-5" v-on:click="doLogout()">Logout</v-btn>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Logout",
  methods: {
    ...mapMutations(["removeToken"]),
    doLogout() {
      this.removeToken();
      this.$router.push("/dashboards");
    }
  }
};
</script>
