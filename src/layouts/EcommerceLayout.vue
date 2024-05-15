<script setup lang="ts">
import MainAppbar from './MainAppbar.vue';

</script>

<template>
      <v-app>
        <v-main>
            <MainAppbar />
            <slot></slot>
        </v-main>
  </v-app>
</template>