<script setup>
import { useQuery } from "@tanstack/vue-query";
import Product from "./Product.vue";

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
  <template v-for="({ name, specialPrice, price, currency, imgSrc, _id }, i = 1) in data" :key="i">
    <Product
      :name="name"
      :specialPrice="specialPrice"
      :price="price"
      :id="_id"
      :currency="currency"
      :imgSrc="imgSrc"
      :i="i" />
  </template>
</template>

<style scoped></style>
