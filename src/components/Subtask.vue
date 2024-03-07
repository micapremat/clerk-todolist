<script setup>
import { ref } from 'vue'

const props = defineProps(['allTasks','task','subtask'])
const emit = defineEmits(['updateAllTasks']);

const subtask = ref(props.subtask)
const allTasks = ref(props.allTasks)
const task = ref(props.task)

const updateTaskDone = () => {
    let taskToEdit = allTasks.value.find(task => task.id === props.task.id)
    if (taskToEdit) {
        let subtaskToEdit = taskToEdit.subtasks.find(st => st.id === props.subtask.id) 
        let allSubtasks = taskToEdit.subtasks.filter(st => st.id !== props.subtask.id)
        if (subtaskToEdit) {
            subtaskToEdit.done = !subtaskToEdit.done
            allSubtasks.push(subtaskToEdit)
            taskToEdit.subtasks = allSubtasks
        } else {
            return
        }
    } else {
        return
    }
    allTasks.value = allTasks.value.filter(task => task.id != props.task.id)
    allTasks.value.push(taskToEdit)
    emit('updateAllTasks', allTasks.value)
}


</script>
<template>
    <div>
        <div class="flex items-center ml-8">
            <button v-if="!subtask.done" @click="updateTaskDone()">
                <img src="@/assets/img/toDo.png" class="w-5 h-4"/>
            </button>
            <button v-else @click="updateTaskDone()">
                <img src="@/assets/img/done.png" class="w-5 h-4"/>
            </button>
            <h2 class="ml-4 font-medium md:text-lg"> {{ subtask.title }}</h2>
            <span class="ml-4 font-medium md:text-lg"> - </span>
            <h3 class="ml-4"> {{ subtask.subtitle }}</h3>
            <img src="@/assets/img/expand.png" class="w-4 ml-4"/>
        </div>
        <p class="ml-16 mt-2 max-w-[800px] text-xs md:text-base"> {{ subtask.description }}</p>
    </div>
</template>
