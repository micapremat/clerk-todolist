<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    search: string
    placeholder?: string
  }>()

const search = ref(props.search)

</script>

<template>
  <div class="flex lg:w-[400px]">
      <input
        type="search"
        id="search-dropdown"
        class="p-2 w-full text-sm text-black border border-primary focus:ring-primary rounded-lg
        focus:border-prmary "
        :placeholder="placeholder"
        v-model="search"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
  </div>
</template>
