<script setup>
import { defineProps, ref } from "vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { Icon } from "@iconify/vue";

defineProps({ text: String, id: String, isDone: Boolean });
const queryClient = useQueryClient();
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

const isTodoHovered = ref(false);
</script>

<template>
  <li @mouseenter="isTodoHovered = true" @mouseleave="isTodoHovered = false">
    <div class="content-wrapper">
      <div class="checkbox-wrapper">
        <input type="checkbox" class="checkbox" :id="id" @change="handleMutate(id, isDone)" :checked="isDone" />
        <label :for="id" class="checkbox-label">
          {{ text }}
        </label>
      </div>
      <div class="delete-icon-wrapper">
        <Icon
          v-if="isTodoHovered"
          @click="handleDeleteTodo(id)"
          color="#9B111E"
          icon="material-symbols:delete-outline"
          width="20" />
      </div>
    </div>
    <hr class="divider" />
  </li>
</template>

<style scoped>
.checkbox {
  opacity: 0;
}

.delete-icon-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  display: flex;
  align-items: center;
}

.content-wrapper {
  display: flex;
  align-items: center;
  position: relative;
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
  padding-left: 0.5rem;
}

.iconify--material-symbols {
  cursor: pointer;
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

li {
  color: #384a5c;
  position: relative;
}
</style>
