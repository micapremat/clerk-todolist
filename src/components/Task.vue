<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import Subtask from './Subtask.vue';
import EditTask from './EditTask.vue';
import CreateNewSubtask from './CreateNewSubtask.vue'

const props = defineProps(['task', 'allTasks'])
const emit = defineEmits(['updateAllTasks']);
const openCreateNewSubtask = ref(false)

const task = ref(props.task)
const allTasks = ref(props.allTasks)
const openEditModal = ref(false)

const updateAllTasks = (value) => {
    emit('updateAllTasks', value)
}

const updateTaskDone = () => {
    let taskToEdit = allTasks.value.find(task => task.id === props.task.id)
    if (taskToEdit) {
        taskToEdit.done = !taskToEdit.done
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
        <CreateNewSubtask v-if="openCreateNewSubtask" @close="openCreateNewSubtask = false" @updateAllTasks="updateAllTasks" :task="task" :allTasks="allTasks"/>
        <!--Task done icon + title + subtitle + priority + edit icon-->
        <div class="md:flex md:flex-row md:justify-between items-center my-6">
            <div class="md:flex-col">
                <div class="flex items-center">
                    <button v-if="!task.done" @click="updateTaskDone()">
                        <img src="@/assets/img/toDo.png" class="w-5 h-4"/>
                    </button>
                    <button v-else @click="updateTaskDone()">
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
                        <BaseButton  rounded :text="task.priority" 
                        :class="[`font-bold w-24 py-1 outline-2 cursor-default text-right`, 
                        task.priority === 'High' ? ' text-high' : task.priority === 'Medium' ? ' text-medium' : task.priority === 'Low' ? ' text-low' : '']"/>
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
        <div v-for="subtask in task.subtasks">
            <Subtask :subtask="subtask" :task="task" :allTasks="allTasks" @updateAllTasks="updateAllTasks"/>
        </div>
        <div class="text-right w-10/12">
          <BaseButton :text="'Add new subtask'" outline rounded class="outline-2 outline-primary text-primary py-1 mt-5 font-semibold text-xs" @click="openCreateNewSubtask = true"/>
        </div>
        <!--Edit Modal-->
        <EditTask v-if="openEditModal" @close="openEditModal = false" :task="task" :allTasks="allTasks" @updateAllTasks="updateAllTasks"/>
    </div>
</template>
