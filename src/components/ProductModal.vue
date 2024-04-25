<script setup>
import { useSlots } from 'vue';

const props = defineProps(["dialog", "product"]);
const dialog = props.dialog;
const product = props.product;


function getClass() {
    switch (parseInt(product.rarity.level)) {
        case 2:
            return "uncommon"
        case 3:
            return "rare"
        case 4:
            return "epic"
        case 5:
            return "legendary"
        default:
            return "common"
    }
}
</script>

<style scoped>

.basedialog{
  background-color: bisque;
}

.legendary{
  color: red;
}

.epic{
  color: purple;
}

.rare{
  color: blue;
}

.uncommon{
  color: green;
}


</style>

<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto px-2 basedialog" max-width="374" :class="getClass()">
      <v-card-title class="text-h5 mt-3">
        {{ product.name }}
        <div class="text-overline font-weight-black raritytext">
          {{ product.rarity.name }}
        </div>
        <div class="d-flex align-center justify-start">
          <v-img src="/diamond.png" height="20" class="me-2" style="max-width: 20px;"></v-img>
          <div class="text-overline font-weight-black" style="font-size: 1rem !important; color: black;">
            {{ product.price }}
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="">
          <v-img class="mb-5 mx-auto" max-width="170" :src="product.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6e/One_Ring.png'">
        </v-img>
        </div>
        <div class="text-caption description" style="color:black">
          {{ product.description }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="black darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>