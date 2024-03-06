<script setup>
import TheNav from './components/TheNav.vue'
</script>

<template>
  <header class="w-full bg-white">
    <TheNav />
  </header>
  <body class="container mx-auto">
    <router-view />
  </body>
</template>

<style scoped>

</style>
