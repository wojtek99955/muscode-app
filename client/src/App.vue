<script setup>
import TodoList from "./components/TodoList.vue";
import ProductsTable from "./components/ProductsTable.vue";
import Product from "./components/ProductList.vue";
</script>

<template>
  <section>
    <h1>Muscode App</h1>
    <main>
      <TodoList />
      <ProductsTable />
      <Product />
    </main>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 2rem;
}

main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 1180px;
}

section {
  background-color: #f5f8fa;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>
