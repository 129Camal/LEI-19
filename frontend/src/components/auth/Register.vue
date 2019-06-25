<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center>
      <v-flex>
        <h3>
          <b>Registration</b>
        </h3>

        <v-form>
          <v-text-field v-model="name" label="Name" required></v-text-field>

          <v-text-field v-model="email" label="Email" required></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            required
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-alert :value="alert" color="amber darken-1" icon="priority_high">
            <b>{{this.message}}</b>
          </v-alert>
          <v-btn @click="register">Registar</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "register",

  data: () => ({
    show1: false,
    alert: false,
    message: "",
    name: "",
    email: "",
    password: ""
  }),

  methods: {
    register() {
      axios
        .post("http://localhost:3001/users/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          switch (response.data.status) {
            case "OK":
              this.alert = false;
              this.$router.push("/");
              break;
            case "ERROR EMAIL ALREADY IN USE":
              this.message = "Email Already in Use!";
              this.alert = true;
              this.$router.push("/register");
              break;
            case "ERROR PASSWORD SIZE 2 MIN":
              this.message = "Minimum Password Length 2!";
              this.alert = true;
              this.$router.push("/register");
              break;
            default:
              this.message = "System Error! Try Later.";
              this.alert = true;
              this.$router.push("/register");
          }
        })
        .catch(() => {
          this.$router.push("/notfound");
        });
    }
  }
};
</script>
