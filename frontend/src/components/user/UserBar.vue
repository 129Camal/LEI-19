<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="nav navbar-nav">
        <li v-on:click="isActive = 1" v-bind:class="{'active': isActive === 1}">
          <a href="#">Overview</a>
        </li>
        <li v-on:click="isActive = 2" v-bind:class="{'active': isActive === 2}">
          <a href="#">Datasets</a>
        </li>
        <li v-on:click="isActive = 3" v-bind:class="{'active': isActive === 3}">
          <a href="#">Análises</a>
        </li>
        <li v-on:click="isActive = 4" v-bind:class="{'active': isActive === 4}">
          <a href="#">Todos</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      isActive: 1
    }
  }
}
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
