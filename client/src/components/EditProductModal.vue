<script setup>
import { defineProps, reactive, ref, watch, watchEffect, onMounted } from "vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
const props = defineProps({
  name: String,
  specialPrice: Number,
  price: Number,
  currency: String,
  isModalOpen: Boolean,
  imgSrc: String,
  id: String,
});
const emit = defineEmits("close");
const queryClient = useQueryClient();
const { name, price, specialPrice, currency, id } = props;
const values = reactive({
  name,
  price,
  specialPrice,
  currency,
  id,
});
const selectedCurrency = ref(currency ? currency : "");
const updateProduct = async (body) => {
  const res = await fetch("https://muscode-app-server.onrender.com/products", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
const mutation = useMutation({
  mutationFn: updateProduct,
  onSuccess: async () => {
    await queryClient.invalidateQueries(["products"]);
  },
});
const handleSubmit = async () => {
  if (values.name && values.price && values.specialPrice) {
    await mutation.mutateAsync({
      name: values.name,
      id: values.id,
      specialPrice: +values.specialPrice,
      price: +values.price,
      currency: selectedCurrency.value,
    });
    if (mutation.isSuccess) emit("close");
  }
};

const backgroundRef = ref(null);
watch((backgroundRef) => {
  if (backgroundRef) console.log(backgroundRef.value);
});

const clickoutside = (e) => {
  emit("close");
};
</script>

<template>
  <div class="modal-background" ref="backgroundRef" @click="clickoutside">
    <div
      class="container"
      @click="
        (e) => {
          e.stopPropagation();
        }
      ">
      <div class="top-section">
        <h1>Edycja produktu: {{ name }}</h1>
        <hr />
      </div>
      <div class="img-wrapper">
        <img :src="`./assets/${imgSrc}`" alt="product" />
      </div>
      <form v-on:submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="name">Nazwa produktu</label>
          <input v-model="values.name" type="input" :placeholder="name" required />
        </div>
        <div class="input-container">
          <label for="price">Cena</label>
          <input type="number" v-model="values.price" id="price" :placeholder="price" required />
        </div>
        <div class="input-container">
          <label for="specialPrice">Promocyjna cena</label>
          <input type="number" name="" id="specialPrice" v-model="values.specialPrice" :placeholder="specialPrice" />
        </div>
        <div class="input-container">
          <label for="currency">Waluta</label>
          <select v-model="selectedCurrency">
            <option value="$">$</option>
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div class="bottom-section">
          <button class="save">{{ mutation.isLoading.value ? "Updating..." : "Zapisz" }}</button>
          <button class="cancel" @click="$emit('close')">Anuluj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  z-index: 20;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.container {
  background-color: white;
  width: 40%;
}
hr {
  background-color: #3c4695;
  height: 3px;
  border: none;
}
h1 {
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}
select {
  width: 100%;
  border: none;
  border-bottom: 1px solid #b2b2b2;
  outline: none;
  color: #384a5c;
  padding: 0.2rem 0;
}
.img-wrapper {
  border-radius: 50%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  position: relative;
  overflow: hidden;
  margin: 2rem auto;
}
img {
  margin: auto;
  display: block;
  position: absolute;
  width: 100%;
  object-fit: contain;
}
.top-section {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
  padding: 0;
}
label {
  display: block;
  margin: 0.5rem 0;
  color: #a9a3a3;
  font-weight: 400;
  font-size: 1rem;
}
.input-container {
  padding: 0 1rem;
}
input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #b2b2b2;
  outline: none;
  color: #384a5c;
  font-size: 1rem;
  padding: 0.2rem;
  margin-bottom: 0.3rem;
}
.bottom-section {
  border-top: 1px solid grey;
  display: flex;
  gap: 0.5rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 1rem;
}
.save {
  background-color: #862583;
  color: white;
  border: none;
}
.cancel {
  background-color: white;
  border: 1px solid #b2b2b2;
  color: #384a5c;
}
button {
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
}
</style>
