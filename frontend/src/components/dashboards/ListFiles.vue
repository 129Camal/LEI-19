<template>
  <div class="card col-md-5">
    <div class="header">
      <h4 class="title">Imported Data</h4>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table table-striped">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Test Date</th>
          <th>File Name</th>
          <th>Import Date</th>
        </thead>
        <tbody>
          <tr v-bind:key="file.id" v-for="file in files">
            <td>{{file.id}}</td>
            <td>{{file.name}}</td>
            <td>{{file.testDate}}</td>
            <td>{{file.fileName}}</td>
            <td>{{file.importDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "listFiles",
  data() {
    return {
      files: [
        {
          id: 1,
          name: "Scan Placa 1",
          testDate: "21-01-1996",
          fileName: "teste1.RAW",
          importDate: "8-3-2019"
        },
        {
          id: 2,
          name: "Scan Placa 2",
          testDate: "12-12-1998",
          fileName: "teste2.RAW",
          importDate: "10-3-2019"
        },
        {
          id: 3,
          name: "Scan Placa 3",
          testDate: "09-08-2017",
          fileName: "teste3.RAW",
          importDate: "9-3-2020"
        }
      ]
    };
  }
};
</script>
