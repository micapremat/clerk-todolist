<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseButton from './BaseButton.vue';
import BaseSearchBar from './BaseSearchBar.vue';
import Task from './Task.vue'
import CreateNewTask from './CreateNewTask.vue'


const search = ref('')
const openCreateNewTask = ref(false)

const tasks = ref([])

const tasks_asc = computed(() => tasks.value.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0)))

const updateAllTasks = (value) => {
    tasks.value = value
    localStorage.setItem('tasks', JSON.stringify(value))
}

const getTasks = computed(() => {
  if (search.value) {
    return tasks.value.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()));
  }
  return tasks_asc.value
})

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks')) || []
})

</script>
<template>
  <div class="px-10 py-6">
    <div class="lg:flex lg:flex-row lg:justify-between items-center pb-4 border-b border-[#B5D9E2]">
      <div class="lg:flex-col">
        <BaseButton rounded :text="'Add new task'" class="bg-primary text-white"  @click="openCreateNewTask = true"/>
      </div>
      <div class="lg:flex-col my-5">
        <BaseSearchBar :search="search" :placeholder="'Search task'" v-model="search"/>
      </div>
      <div class="lg:flex-col text-right">
        <button>  
          <img src="@/assets/img/filter.png"/>
        </button>
      </div>
    </div>
    <div >
      <div v-for="task in getTasks" :key="task.id">
        <Task :task="task" :allTasks="tasks"  @updateAllTasks="updateAllTasks" />
      </div>
      <div v-if="!tasks.length" class="text-center mt-10">
        <h3>Start creating a new task to see it here </h3>
      </div>
    </div>
    <CreateNewTask v-if="openCreateNewTask" @close="openCreateNewTask = false" @updateAllTasks="updateAllTasks"/>
    
  </div>
</template>
