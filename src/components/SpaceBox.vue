<script setup>
    const props = defineProps({
        sx: Number,
        sy: Number
        });
</script>

<template>
 <div :style="{ height: `${props.sy || 0}px`, width: `${props.sx || 0}px` }">
    <!-- Your content here -->
  </div>
</template>