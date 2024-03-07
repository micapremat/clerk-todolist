<script setup>
import { ref, watch } from 'vue'
import BaseButton from './BaseButton.vue';
import Subtask from './Subtask.vue';
import EditTask from './EditTask.vue';
import CreateNewSubtask from './CreateNewSubtask.vue'
import axios from 'axios'

const props = defineProps(['task', 'allTasks'])
const emit = defineEmits(['updateAllTasks']);
const openCreateNewSubtask = ref(false)

const task = ref(props.task)
const allTasks = ref(props.allTasks)
const openEditModal = ref(false)
const displayAlert = ref(false)
const updateKey = ref(0)

const updateAllTasks = () => {
    emit('updateAllTasks')
}

const updateSubtask = () => {
    updateKey.value++
    console.log(updateKey.value)
}

const updateTask = async () => {
    let taskToUpdate = task.value
    taskToUpdate.done = !taskToUpdate.done
    await axios.patch('https://localhost:7096/api/task/'+ task.value.id, taskToUpdate)
    .then(() => {
        emit('updateAllTasks')
    })
    .catch(e => {
        console.log(e)
        displayAlert.value = true
    })
}

watch(task.value.subtasks, newVal => {
    console.log(newVal)
}, {deep:true})

</script>
<template>
    <div>
        <CreateNewSubtask v-if="openCreateNewSubtask" @close="openCreateNewSubtask = false" @updateSubtask="updateSubtask" :task="task" :allTasks="allTasks"/>
        <!--Alert-->
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="displayAlert">
            <span class="block sm:inline">There was an error. Please try again later.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="displayAlert = false">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
        <!--End alert-->
        <!--Task done icon + title + subtitle + priority + edit icon-->
        <div class="md:flex md:flex-row md:justify-between items-center my-6">
            <div class="md:flex-col">
                <div class="flex items-center">
                    <button v-if="!task.done" @click="updateTask()">
                        <img src="@/assets/img/toDo.png" class="w-5 h-4"/>
                    </button>
                    <button v-else @click="updateTask()">
                        <img src="@/assets/img/done.png" class="w-5 h-4"/>
                    </button>
                    <h2 class="ml-4 font-medium md:text-lg"> {{ task.title }}</h2>
                    <span class="ml-4 font-medium md:text-lg"> - </span>
                    <h3 class="ml-4"> {{ task.subtitle }}</h3>
                    <img src="@/assets/img/expand.png" class="w-4 ml-4"/>
                </div>
                <div class="ml-8">
                    <p class="text-justify"> {{ task.description }}</p>
                </div>
                
            </div>
            <div class="md:flex-col text-right">
                <div class="md:flex md:justify-between md:mt-0 items-center mt-5 justify-start">
                    <div class="">
                        <BaseButton  rounded :text="task.priority === 0 ? 'High' : task.priority === 1 ? 'Medium' : 'Low'" 
                        :class="[`font-bold w-24 py-1 outline-2 cursor-default text-right`, 
                        task.priority === 0 ? ' text-high' : task.priority === 1 ? ' text-medium' : task.priority === 2 ? ' text-low' : '']"/>
                    </div>
                    <div class="">
                        <button @click="openEditModal = true">  
                            <img src="@/assets/img/edit.png" class="min-w-3 w-3"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!--Subtasks-->
        <Subtask :task="task" @updateAllTasks="updateAllTasks"/>
        
        <div class="text-right w-10/12">
          <BaseButton :text="'Add new subtask'" outline rounded class="outline-2 outline-primary text-primary py-1 mt-5 font-semibold text-xs" @click="openCreateNewSubtask = true"/>
        </div>
        <!--Edit Modal-->
        <EditTask v-if="openEditModal" @close="openEditModal = false" :task="task" :allTasks="allTasks" @updateAllTasks="updateAllTasks"/>
    </div>
</template>
