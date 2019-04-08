<template>
  <div class="card">
    <div class="header">
      <nav class="navbar navbar-default navbar-inner">
        <div class="container-fluid">
          <div class="navbar-header">
            <h4 class="title navbar-brand ml-auto">Edit Profile</h4>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="nav-item ml-auto">
                <a href="#">
                  <button class="navbar-cancela">Cancel</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Username</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control border-input" placeholder>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Address</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>City</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>Country</label>
              <input type="text" class="form-control border-input" placeholder>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>Postal Code</label>
              <input type="number" class="form-control border-input" placeholder>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>About Me</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd">Update Profile</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>


<style scoped>
.navbar-inner {
  background: transparent;
}

.navbar-cancela {
  background-color: transparent;
  border: 0;
}
</style>
