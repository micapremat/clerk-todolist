<script setup>
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['close', 'updateAllTasks']);

const props = defineProps(['task', 'allTasks'])

const task = ref(props.task)
const allTasks = ref(props.allTasks)

const deleteTask = () => {
    allTasks.value = allTasks.value.filter(task => task.id != props.task.id);
    emit('updateAllTasks', allTasks.value)
    emit('close')
}

const editTask = () => {   
    allTasks.value = allTasks.value.filter(task => task.id != props.task.id);  
    allTasks.value.push(task.value)
    emit('updateAllTasks', allTasks.value)
    emit('close')
}


</script>
<template>
  <div class="px-10 py-6">
        <BaseModal @close="$emit('close')" :width="'w-[500px]'">
            <template v-slot:header>
                <div>
                    <h2 class="text-2xl font-bold text-left mt-6 ml-3 border-b border-[#B5D9E2]">Edit task " {{task.title}} "</h2>
                </div>
            </template>
            <template v-slot:body>
                <div class=" w-[350px]">
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Title*</label>
                        <input type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] px-2" maxlength="30" v-model="task.title"/>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Subtitle</label>
                        <input type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] px-2" maxlength="30" v-model="task.subtitle"/>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Priority*</label>
                        <select class=" py-1 px-0 w-full text-sm text-black border-0 border-b-2 border-primary focus:outline-none focus:ring-0 focus:border-primary mt-1" v-model="task.priority">
                            <option selected > High</option>
                            <option > Medium</option>
                            <option > Low</option>
                        </select>
                    </div>
                    <div class="mt-6 text-left w-[350px]">
                        <label class="text-black text-left font-bold text-lg block">Description*</label>
                        <textarea type="text" class="text-left text-black rounded-lg border border-primary border-3 py-2 mt-1 w-[350px] h-[200px] px-2" v-model="task.description"></textarea>
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
                    :text="'Accept'"
                    @click="editTask()"
                    class="bg-primary text-white my-8 py-2 mx-5"
                />
                <BaseButton
                    rounded
                    :text="'Delete'"
                    @click="deleteTask()"
                    class="bg-high text-white my-8 py-2 mx-5"
                />
                </div>
            </template>
        </BaseModal>
  </div>
</template>
