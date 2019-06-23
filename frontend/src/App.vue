<template>
  <v-app>
    <v-layout row wrap justify-space-around>
      <v-flex md2>
        <div class="sidebar" data-background-color="black" data-active-color="info">
          <div class="sidebar-wrapper">
            <div class="logo">
              <router-link to="/dashboards" class="simple-text">Chemical Analyzer</router-link>
            </div>
            <ul class="nav">
              <li v-on:click="isActive=1" v-bind:class="{'active': isActive===1}">
                <router-link to="/dashboards">
                  <i class="ti-panel"></i>
                  <p>Dashboards</p>
                </router-link>
              </li>
              <li v-on:click="isActive=3" v-bind:class="{'active': isActive===3}">
                <router-link to="/user">
                  <i class="ti-user"></i>
                  <p>User Profile</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </v-flex>
      <v-flex md8>
        <main>
          <router-view/>
        </main>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isActive: 1
    };
  }
};
</script>

