<template>
  <v-btn v-if="store.state.token" class="btn btn-info btn-fill btn-wd" v-on:click="doLogout()">LogOut</v-btn>
</template>

<script>
import { mapMutations } from "vuex";
import store from './store/modules/token';

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
