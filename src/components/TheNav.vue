<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
  <div>
    <nav
      class="
      flex
        py-4
        items-center
        justify-between
      "
    >
      <div class="flex pl-8">
        <img src="@/assets/img/clerk.svg" />
      </div>
      <div class="flex">
        <h1 class="title text-sm md:text-xl">My to do list</h1>
      </div>
      <div></div>

  </nav>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
.title {
  font-family: "Rubik", sans-serif;
  font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-color:  var(--primary);
}

</style>
