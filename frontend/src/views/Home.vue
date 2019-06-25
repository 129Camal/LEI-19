<template>
  <Login/>
</template>

<script>
import Login from "../components/auth/Login"
export default {
  name: "home",
  components: {
    Login
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

