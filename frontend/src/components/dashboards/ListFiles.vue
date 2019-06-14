<template>
  
    <v-data-table 
      :headers="headers" 
      :items="files" 
      class="elevation-1"
    >
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Not Available Files!
        </v-alert>
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
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "listFiles",
  computed: mapGetters(["getToken"]),
  methods: {
    rowClicked(item) {
      this.$router.push("/file/" + item._id);
    }
  },
  data() {
    return {
      files: [],
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Test Date", value: "dateTest", align: "center" },
        { text: "Description", value: "description", align: "center" },
        { text: "Input Date", value: "dateInput", align: "center" }
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
          this.files = res.data;
        })
        // eslint-disable-next-line
        .catch(err => console.log(err));
    
    } catch (e) {
      return e;
    }
  }
};
</script>