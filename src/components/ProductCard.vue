<script setup>
import { ref, onMounted, useSlots } from 'vue';
const props = defineProps(["rarity"])
const rarity = props.rarity;

</script>

<template>
    <v-card color="indigo" variant="outlined" class="mx-auto pointer">
        <v-card-item class="pa-0">
            <div class="pa-3">
                <div class="text-overline mb-1 font-weight-black">
                    {{ rarity == 0 ? 'Common' : rarity == 1 ? 'Rare' : 'Epic' }}
                </div>
                <v-img
                height="200"
                src="https://upload.wikimedia.org/wikipedia/commons/6/6e/One_Ring.png">
                </v-img>
                <v-spacer></v-spacer>
                <div class="text-h6 mb-1">
                    Ring of Goliath
                </div>
                <div class="text-caption">
                    <slot></slot>
                </div>
            </div>
            <div class="bg-green">
                <div class="pa-2">
                    499 GEMS
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>