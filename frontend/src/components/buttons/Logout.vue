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
      localStorage.removeItem('access_token')
      this.removeToken();
      this.$router.push("/dashboards");
    }
  }
};
</script>
