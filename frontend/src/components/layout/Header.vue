<template>
    <div class="sidebar" data-background-color="white" data-active-color="info">

    <!--
		Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black"
		Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
	-->
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
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            isActive: 1
        }
    }

}
</script>