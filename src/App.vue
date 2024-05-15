<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
  //
</script>
