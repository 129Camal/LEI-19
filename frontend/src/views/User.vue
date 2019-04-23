<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand">User Profile</p>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li v-on:mouseover="isActive = !isActive" v-bind:class="{'active': isActive}">
              <a href="#">
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            <InfoUser v-on:edit-profile="swap"/>
          </div>
          <div class="col-lg-8 col-md-7">
            <div v-if="current === null">
              <UserBar/>
            </div>
            <div v-else>
              <EditProfile/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoUser from "../components/user/InfoUser";
import EditProfile from "../components/user/EditProfile";
import UserBar from "../components/user/UserBar.vue";

export default {
  name: "user",
  components: {
    InfoUser,
    EditProfile,
    UserBar
  },
  data() {
    return {
      current: null,
      isActive: false
    };
  },
  methods: {
    swap(component) {
      switch (component) {
        case "EditProfile":
          this.current = EditProfile;
          break;
      }
    }
  }
};
</script>

<style scoped>
.active a::after {
  border-bottom: 2px solid #68b3c8;
  bottom: 4px;
  content: " ";
  left: 7px;
  position: absolute;
  right: 7px;
}
</style>