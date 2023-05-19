<script setup>
import { useQuery } from "@tanstack/vue-query";

const getProducts = async () => {
  const res = await fetch("https://muscode-app-server.onrender.com/products");
  const data = await res.json();
  return data;
};

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});
</script>

<template>
  <div class="container">
    <h2>Lista Produktów</h2>
    <table>
      <tr>
        <th>#</th>
        <th>NAZWA</th>
        <th>PROMOCYJNA CENA</th>
        <th>CENA</th>
        <th>WALUTA</th>
      </tr>
      <tr v-for="({ name, specialPrice, price, currency, _id }, i) in data" :key="_id">
        <td>{{ i }}</td>
        <td>{{ name }}</td>
        <td>{{ specialPrice }}</td>
        <td>{{ price }}</td>
        <td>{{ currency }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.container {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  grid-column: 2/4;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
}

table {
  border-collapse: collapse;
  border-spacing: 50px;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 0.5rem;
  font-size: 1rem;
  color: #384a5c;
}

tr {
  border-bottom: 1px solid #b2b2b2;
}
tr:hover {
  background-color: #f5f8fa;
}
section {
  background-color: #f5f8fa;
  width: 100%;
  min-height: 100vh;
}
</style>
