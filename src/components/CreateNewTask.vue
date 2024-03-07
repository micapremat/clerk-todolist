<script setup>
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import axios from 'axios'

const emit = defineEmits(['close', 'updateAllTasks']);

const newTask = ref(
  {
    id: undefined,
    title: '',
    subtitle: '',
    description: '',
    priority: 'High',
    done: false,
    subtasks: []
  },
)

const displayAlert = ref(false)
const alertText = ref("")

const createNewTask = () => {
    if (newTask.value.title.trim() === '' || newTask.value.priority.trim() === '' || newTask.value.description.trim() === '') {
        alertText.value = "Please complete the require fields."
        displayAlert.value = true
        return
    }
    newTask.priority = newTask.priority === 'High' ? newTask.priority = 0 : newTask.priority === 'Medium' ? newTask.priority = 1 : newTask.priority = 2 
    axios.post("https://localhost:7096/api/task", newTask.value)
    .then((response) => {
        emit('updateAllTasks')
        emit('close')
    })
    .catch((e) => {
        alertText.value = "There was an error. Please Try again later."
        console.log(e)
    })
}

</script>
<template>
  <div class="px-10 py-6">
        <BaseModal @close="$emit('close')" :width="'w-[500px]'">
            <template v-slot:header>
                <div>
                    <!--Alert-->
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="displayAlert">
                        <span class="block sm:inline"> {{ alertText }}</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="displayAlert = false">
                            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                    <!--End alert-->
                    <h2 class="text-2xl font-bold text-left mt-6 ml-3 border-b border-[#B5D9E2]">Create new task</h2>
                </div>
            </template>
            <template v-slot:body>
                <div class=" w-[350px]">
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Title*</label>
                        <input type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] px-2" maxlength="30" v-model="newTask.title"/>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Subtitle</label>
                        <input type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] px-2" maxlength="30" v-model="newTask.subtitle"/>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Priority*</label>
                        <select class=" py-1 px-0 w-full text-sm text-black border-0 border-b-2 border-primary focus:outline-none focus:ring-0 focus:border-primary mt-1" v-model="newTask.priority">
                            <option selected > High</option>
                            <option > Medium</option>
                            <option > Low</option>
                        </select>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Description*</label>
                        <textarea type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] h-[200px] px-2" v-model="newTask.description"></textarea>
                    </div>
                </div>
                <!-- <div class="text-left mt-6">
                    <BaseButton :text="'Add new subtask'" rounded class="bg-primary text-white"/>
                </div> -->
            </template>
            <template v-slot:footer>
                <div class="mt-5">
                <BaseButton
                    rounded
                    outline
                    :text="'Cancel'"
                    @click="$emit('close')"
                    class=" text-primary my-8 py-2 mx-5"
                />
                <BaseButton
                    rounded
                    :text="'Create task'"
                    @click="createNewTask()"
                    class="bg-primary text-white my-8 py-2 mx-5"
                />
                </div>
            </template>
        </BaseModal>
  </div>
</template>
