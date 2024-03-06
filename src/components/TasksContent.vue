<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import BaseSearchBar from './BaseSearchBar.vue';
import Task from './Task.vue'
import CreateNewTask from './CreateNewTask.vue'
import CreateNewSubtask from './CreateNewSubtask.vue'

const search = ref('')
const openCreateNewTask = ref(false)
const openCreateNewSubtask = ref(false)

const tasks = ref([
  {
    id: 1,
    title: 'Design UI',
    subtitle: 'subtitle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec aliquet leo.',
    priority: 'Low',
    done: false,
    subtasks: [
      {
        id: 1,
        title: 'title subtask',
        subtitle: 'subtitle subtask',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec aliquet leo. Sed rutrum orci sem, vitae pulvinar odio maximus quis. Ut ut tellus non urna vehicula tristique. ',
        done: false
      }
    ]
  },
  {
    id: 1,
    title: 'Initialize project',
    subtitle: 'do it now',
    description: ' In nec aliquet leo. Sed rutrum orci sem, vitae pulvinar odio maximus quis. Ut ut tellus non urna vehicula tristique. ',
    priority: 'Medium',
    done: true,
    subtasks: []
  }
])

</script>
<template>
  <div class="px-10 py-6">
    <div class="lg:flex lg:flex-row lg:justify-between items-center pb-4 border-b border-[#B5D9E2]">
      <div class="lg:flex-col">
        <BaseButton rounded :text="'Add new task'" class="bg-primary text-white"  @click="openCreateNewTask = true"/>
      </div>
      <div class="lg:flex-col my-5">
        <BaseSearchBar :search="search" :placeholder="'Search task'"/>
      </div>
      <div class="lg:flex-col text-right">
        <button>  
          <img src="@/assets/img/filter.png"/>
        </button>
      </div>
    </div>
    <div >
      <div v-for="task in tasks">
        <Task :task="task"/>
        <div class="text-right w-10/12">
          <BaseButton :text="'Add new subtask'" outline rounded class="outline-2 outline-primary text-primary py-1 mt-5 font-semibold text-xs" @click="openCreateNewSubtask = true"/>
        </div>
      </div>
    </div>
    <CreateNewTask v-if="openCreateNewTask" @close="openCreateNewTask = false"/>
    <CreateNewSubtask v-if="openCreateNewSubtask" @close="openCreateNewSubtask = false"/>
  </div>
</template>
