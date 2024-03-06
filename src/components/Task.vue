<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import Subtask from './Subtask.vue';

const props = defineProps(['task'])

const task = props.task


</script>
<template>
    <div>
        <!--Task title + subtitle + priority + edit icon-->
        <div class="md:flex md:flex-row md:justify-between items-center my-6">
            <div class="md:flex-col">
                <div class="flex items-center">
                    <img src="@/assets/img/toDo.png" class="w-5 h-4" v-if="!task.done"/>
                    <img v-else src="@/assets/img/done.png" class="w-5 h-4"/>
                    <h2 class="ml-4 font-medium md:text-lg"> {{ task.title }}</h2>
                    <span class="ml-4 font-medium md:text-lg"> - </span>
                    <h3 class="ml-4"> {{ task.subtitle }}</h3>
                    <img src="@/assets/img/expand.png" class="w-4 ml-4"/>
                </div>
                <div class="ml-8">
                    <p> {{ task.description }}</p>
                </div>
                
            </div>
            <div class="md:flex-col text-right">
                <div class="flex flex-row md:justify-between md:mt-0 items-center mt-5 justify-start">
                    <div class="flex-col px-5">
                        <BaseButton  rounded :text="task.priority" 
                        :class="[`font-bold w-24 py-1 outline-2 cursor-default text-right`, 
                        task.priority === 'High' ? ' text-high' : task.priority === 'Medium' ? ' text-medium' : task.priority === 'Low' ? ' text-low' : '']"/>
                    </div>
                    <div class="flex-col">
                        <button>  
                            <img src="@/assets/img/edit.png" class="min-w-4 w-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Subtasks-->
        <div v-for="subtask in task.subtasks">
            <Subtask :subtask="subtask"/>
        </div>
    </div>
</template>
