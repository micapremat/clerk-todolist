<script setup lang="ts">
withDefaults(
  defineProps<{
    rounded?: boolean
    outline?: boolean
    text: string
  }>(),
  {
    rounded: false,
    outline: false
  }
)
</script>

<template>
  <button
    :class="[
      `px-4 py-2 `,
      rounded ? 'rounded-lg' : '',
      outline ? 'outline outline-1 hover:bg-white/30' : '',
    ]"
  >
    {{ text }}
  </button>
</template>
