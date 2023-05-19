<script setup>
import { defineProps, ref } from "vue";
import EditProductModal from "./EditProductModal.vue";
import { getDiscount } from "../helpers/getDiscount";

defineProps({
  name: String,
  specialPrice: Number,
  price: Number,
  currency: String,
  imgSrc: String,
  id: String,
});

const isModalOpen = ref(false);

const handleOpenModal = () => {
  isModalOpen.value = true;
};
</script>

<template>
  <div class="card" @click="handleOpenModal">
    <h3>{{ name }}</h3>
    <img :src="`./assets/${imgSrc}`" />
    <div v-if="specialPrice" class="special-price">{{ specialPrice }} {{ currency }}</div>
    <div :class="{ hasDiscount: !specialPrice, noDiscount: specialPrice }">{{ price }} {{ currency }}</div>
    <div v-if="specialPrice" class="ribbon">-{{ getDiscount(specialPrice, price) }}%</div>
  </div>
  <template v-if="isModalOpen">
    <EditProductModal
      :name="name"
      :id="id"
      :imgSrc="imgSrc"
      :isModalOpen="isModalOpen"
      :specialPrice="specialPrice"
      :price="price"
      :currency="currency"
      @close="isModalOpen = false"></EditProductModal>
  </template>
</template>

<style>
.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
}
.card:hover {
  transform: scale(1.02);
}
.ribbon {
  width: 200px;
  padding: 3px;
  position: absolute;
  text-align: center;
  color: #f0f0f0;
  top: 23px;
  right: -65px;
  background-color: black;
  transform: rotate(45deg);
  font-size: 0.8rem;
  text-align: center;
  font-weight: 600;
}
img {
  height: 13rem;
  margin-bottom: 1rem;
}
h3 {
  align-self: flex-start;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.noDiscount {
  margin-bottom: 0.3rem;
  text-align: center;
  text-decoration: line-through;
  color: #384a5c;
  font-weight: 400;
  font-size: 0.9rem;
}
.hasDiscount {
  color: #862583;
  font-weight: 600;
}
.special-price {
  margin-bottom: 0.3rem;
  text-align: center;
  color: #862583;
  font-weight: 600;
  font-size: 1.1rem;
}
section {
  background-color: #f5f8fa;
  width: 100%;
  min-height: 100vh;
}
</style>
