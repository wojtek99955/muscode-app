<script setup>
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import Todo from "./Todo.vue";
const queryClient = useQueryClient();
const todoText = ref("");
const doneNumber = ref(0);

const getTodos = async () => {
  const res = await fetch("https://muscode-app-server.onrender.com/todos");
  const data = await res.json();
  return data;
};

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});

watchEffect(() => {
  if (data.value) {
    const doneTodos = data.value.filter((todo) => todo.isDone === true).length;
    doneNumber.value = doneTodos;
  }
});

const addTodo = useMutation(
  (todo) =>
    fetch("https://muscode-app-server.onrender.com/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    }),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  }
);

const handleAddTodo = async () => {
  if (todoText.value) {
    await addTodo.mutateAsync({ text: todoText.value, isDone: false });
  }
  todoText.value = "";
};
</script>

<template>
  <div class="container">
    <div class="top-section">
      <h2>Lista todo</h2>
      <h2>Wykonane: {{ doneNumber }}</h2>
    </div>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <ul v-else-if="data">
      <template v-for="{ text, _id, isDone } in data" :key:_id>
        <Todo :text="text" :id="_id" :isDone="isDone" />
      </template>
    </ul>
    <div class="input-container">
      <label for="todo">
        <Icon icon="material-symbols:add" width="20" color="#b2b2b2" />
      </label>
      <input
        v-model="todoText"
        v-on:keyup.enter="handleAddTodo"
        type="text"
        name=""
        id="todo"
        placeholder="Dodaj nowy element checklisty" />
    </div>
    <hr class="divider" />
  </div>
</template>

<style scoped>
.container {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.divider {
  margin: 0.5rem 0;
  height: 1px;
  border: none;
  background-color: #b2b2b2;
  width: 100%;
}

.iconify--material-symbols {
  cursor: pointer;
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

ul {
  list-style: none;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  color: #384a5c;
  outline: none;
  margin-left: 1rem;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  position: relative;
}

input::placeholder {
  color: #b2b2b2;
}
.top-section {
  display: flex;
  justify-content: space-between;
}
</style>
