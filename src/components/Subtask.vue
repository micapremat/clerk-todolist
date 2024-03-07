<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['allTasks','task','subtask'])
const emit = defineEmits(['updateAllTasks']);

const task = ref(props.task)

const updateTask = async (subtask) => {
    let subtaskToUpdate = subtask
    subtaskToUpdate.done = !subtaskToUpdate.done
    await axios.patch('https://localhost:7096/api/subtask/'+ subtask.id, subtaskToUpdate)
    .then(() => {
        emit('updateAllTasks')
    })
    .catch(e => {
        console.log(e)
        displayAlert.value = true
    })
}

const deleteTask = async (id) => {
    await axios.delete('https://localhost:7096/api/subtask/'+ id)
    .then(() => {
        emit('updateAllTasks')
    })
    .catch(e => {
        console.log(e)
    })
}


</script>
<template>
    <div>
        <div v-for="subtask in task.subtasks" :key="subtask.id">
            <div class="flex items-center ml-8">
                <button v-if="!subtask.done" @click="updateTask(subtask)">
                    <img src="@/assets/img/toDo.png" class="w-5 h-4"/>
                </button>
                <button v-else @click="updateTask(subtask)">
                    <img src="@/assets/img/done.png" class="w-5 h-4"/>
                </button>
                <h2 class="ml-4 font-medium md:text-lg"> {{ subtask.title }}</h2>
                <span class="ml-4 font-medium md:text-lg"> - </span>
                <h3 class="ml-4"> {{ subtask.subtitle }}</h3>
                <img src="@/assets/img/expand.png" class="w-4 ml-4"/>
                <button @click="deleteTask(subtask.id)">
                    <img src="@/assets/img/delete-button.svg" class="w-4 ml-4"/>
                </button>
            </div>
            <p class="ml-16 mt-2 max-w-[800px] text-xs md:text-base"> {{ subtask.description }}</p>

        </div>
    </div>
</template>
