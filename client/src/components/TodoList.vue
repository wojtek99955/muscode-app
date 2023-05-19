<script setup>
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";

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

const updateTodo = useMutation(
  (todo) =>
    fetch("https://muscode-app-server.onrender.com/todos", {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    }),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  }
);
const handleMutate = (id, isDone) => {
  if (isDone) {
    updateTodo.mutate({ id, isDone: false });
  } else {
    updateTodo.mutate({ id, isDone: true });
  }
};

const deleteTodo = useMutation(
  (id) =>
    fetch("https://muscode-app-server.onrender.com/todos", {
      method: "DELETE",
      body: JSON.stringify(id),
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

const handleDeleteTodo = (id) => {
  deleteTodo.mutate({ id });
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
        <li>
          <div class="checkbox-wrapper">
            <input type="checkbox" class="checkbox" :id="_id" @change="handleMutate(_id, isDone)" :checked="isDone" />
            <label :for="_id" class="checkbox-label">
              {{ text }}
            </label>
          </div>
          <button @click="handleDeleteTodo(_id)">delete</button>
          <hr class="divider" />
        </li>
      </template>
    </ul>
    <div class="input-container">
      <label for="todo">
        <Icon icon="material-symbols:add" width="20" color="#384a5c" />
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

.checkbox {
  opacity: 0;
}

.divider {
  margin: 0.5rem 0;
  height: 1px;
  border: none;
  background-color: #b2b2b2;
  width: 100%;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 0.5rem;
}

.check-mark {
  left: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  vertical-align: middle;
  display: none;
  top: -0.1rem;
  left: 0.5rem;
}

.checkbox-label {
  position: absolute;
}

.checkbox:checked + .checkbox-label {
  background-image: url("/assets/check.svg");
  background-repeat: no-repeat;
  background-size: contain;
}

.checkbox-label::before {
  content: "";
  background-color: transparent;
  border: 1px solid #b2b2b2;
  border-radius: 50%;
  position: absolute;
  left: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}

.checkbox:checked + .checkbox-label::before {
  background-image: url("/assets/check.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #862583;
}

.checkbox:checked + .checkbox-label::before {
  fill: red;
}

ul {
  list-style: none;
}

li {
  color: #384a5c;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  color: #384a5c;
  outline: none;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
}
.top-section {
  display: flex;
  justify-content: space-between;
}
</style>
