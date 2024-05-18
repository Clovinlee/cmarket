<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
    <v-app>
        <v-main>
            <RouterLink :to="{name:'home'}" class="text-decoration-none">
                <v-sheet class="w-100 text-h2 text-center text-title mb-8 mt-3 pointer">CMarket</v-sheet>
            </RouterLink>
            <slot></slot>
        </v-main>
    </v-app>
</template>