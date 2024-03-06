<script setup>
import { ref } from 'vue'

const props = defineProps(['subtask'])

const subtask = props.subtask


</script>
<template>
    <div>
        <div class="flex items-center ml-8">
            <img src="@/assets/img/toDo.png" class="w-5 h-4" v-if="!subtask.done"/>
            <img v-else src="@/assets/img/done.png" class="w-5 h-4"/>
            <h2 class="ml-4 font-medium md:text-lg"> {{ subtask.title }}</h2>
            <span class="ml-4 font-medium md:text-lg"> - </span>
            <h3 class="ml-4"> {{ subtask.subtitle }}</h3>
            <img src="@/assets/img/expand.png" class="w-4 ml-4"/>
        </div>
        <p class="ml-16 mt-2 max-w-[800px] text-xs md:text-base"> {{ subtask.description }}</p>
    </div>
</template>
