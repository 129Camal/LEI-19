<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-alert :value="alertError" color="amber darken-1" icon="priority_high">
          <b>{{this.msgerror}}</b>
        </v-alert>
        <v-alert :value="alertSucess" color="green darken-1">
          <b>{{this.msgSucess}}</b>
        </v-alert>
        <v-card>
          <v-toolbar color="dark" dark>
            <v-toolbar-title>Your Information</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="form.name" label="Name"></v-text-field>
            <v-text-field v-model="form.email" label="Email Address"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="cyan lighten-5" @click.native="update">
              <v-icon left dark>check</v-icon>Save Changes
            </v-btn>
            <Logout/>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Logout from "../components/buttons/Logout";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "userProfile",
  computed: mapGetters(["getToken"]),
  components: {
    Logout
  },
  data() {
    return {
      alertError: false,
      msgerror: "",
      alertSucess: false,
      msgSucess: "",
      form: {
        name: "",
        email: "",
        real_name: "",
        real_email: ""
      }
    };
  },
  methods: {
    update() {
      if (
        this.form.name == this.form.real_name &&
        this.form.email == this.form.real_email
      ) {
        this.msgerror = "Any changes made!";
        this.alertError = true;
      } else {
        axios
          .post(
            "http://localhost:3001/users/update",
            {
              name: this.form.name,
              email: this.form.email
            },
            { headers: { authorization: "Bearer " + this.getToken } }
          )
          .then(response => {
            switch (response.data.status) {
              case "OK":
                this.msgSucess = "Changes applied with sucess!"
                this.alertSucess = true;
                this.$router.push("/user");
                break;
              case "ERROR EMAIL ALREADY IN USE":
                this.alertError = true;
                this.msgerror = "Email already in use!";
                this.$router.push("/user");
                break;
              default:
                this.msgerror = "System Error! Try Later.";
                this.alertError = true;
                this.$router.push("/user");
            }
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
          });
      }
    }
  },
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/users", {
          headers: { authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          this.form.name = res.data.name;
          this.form.email = res.data.email;
          this.form.real_name = res.data.name;
          this.form.real_email = res.data.email;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
};
</script>