<template>
  <div class="main-panel">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <p class="navbar-brand">User Profile</p>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#">
                <i class="ti-settings"></i>
                <p>Settings</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-5" >
            <InfoUser v-on:edit-profile="swap"/>
          </div>
          <div class="col-lg-8 col-md-7">
              <div :is="current">
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

export default {
  name: "user",
  components: {
    InfoUser,
    EditProfile
  },
  data(){
      return {
          current: null
    }
  },
  methods: {
      swap(component){
          switch(component){
            case 'EditProfile':
                this.current = EditProfile;
                break;
            
            case 'InfoUser':
                this.current = InfoUser;
                break;
          }
      }
  }
};
</script>
