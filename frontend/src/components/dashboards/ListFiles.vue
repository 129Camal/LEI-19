<template>
  <v-flex md12>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search File"
      single-line
    ></v-text-field>
    <v-toolbar color="cyan lighten-5">
      <v-toolbar-title>Imported Files</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="files" class="elevation-1" :search="search">
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Not Available Files!</v-alert>
      </template>

      <template slot="items" slot-scope="props">
        <tr @click="rowClicked(props.item)">
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.dateTest.split('T')[0] }}</td>
          <td class="text-xs-center">{{ props.item.description }}</td>
          <td class="text-xs-center">{{ props.item.dateInput.split('T')[0] }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "listFiles",
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapMutations(["removeToken"]),
    rowClicked(item) {
      this.$router.push("/file/" + item._id);
    }
  },
  data() {
    return {
      files: [],
      search: "",
      headers: [
        { text: "Name", value: "name", align: "center"},
        { text: "Test Date", value: "dateTest", align: "center"},
        { text: "Description", value: "description", align: "center", sortable: false },
        { text: "Input Date", value: "dateInput", align: "center"}
      ]
    };
  },
  mounted: function() {
    try {
      axios
        .get("http://localhost:3001/file/all", {
          headers: { Authorization: "Bearer " + this.getToken }
        })
        .then(res => {
          if(res.data.status == "ERROR INVALID TOKEN"){
            localStorage.removeItem('access_token')
            this.removeToken()
            this.$router.push('/')

          } else {

            this.files = res.data;

          }
        })
        .catch(() => {
          this.$router.push("/notfound");
          });
    } catch (e) {
      return e;
    }
  }
};
</script>