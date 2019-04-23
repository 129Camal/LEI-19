<template>
  <div class="card card-user">
    <div class="image">
      <img src="assets/img/background.jpg" alt="...">
    </div>
    <div class="content">
      <div class="author">
        <img class="avatar border-white" src="assets/img/faces/camal.jpg" alt="...">
        <h4 class="title">
          Frederico Pinto
          <br>
          <a href="#">
            <small>@129Camal</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        "Tudo Cool?"
        <br>"YESSSS!"
      </p>
    </div>
    <div class="text-center">
      <button
        v-on:click="$emit('edit-profile', 'EditProfile')"
        type="submit"
        class="btn btn-info btn-fill btn-wd"
      >Edit Profile</button>
    </div>
    <div class="text-center">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <h5>
          </h5>
        </div>
        <div class="col-md-5">
          <h5>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
