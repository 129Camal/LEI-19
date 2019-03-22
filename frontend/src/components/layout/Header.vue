<template>
    <div class="sidebar" data-background-color="white" data-active-color="info">

    <!--
		Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black"
		Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
	-->
        <div class="sidebar-wrapper">
            <div class="logo">
                <router-link to="/" class="simple-text">Chemical Analyzer</router-link>
            </div>
            <ul class="nav">
                <li class="active">
                    <router-link to="/dashboards">
                        <i class="ti-panel"></i>
                        <p>Dashboards</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/groups">
                        <i class="ti-layout-grid3"></i>
                        <p>Work Groups</p>
                    </router-link>            
                </li>
                <li>    
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
    name: "Header"
}
</script>