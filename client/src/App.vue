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
  font-size: 2rem;
  font-weight: 500;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 900px) {
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }
}

section {
  width: 1180px;
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>
