<script setup>
  import LoadingProductCard from '../components/LoadingProductCard.vue';
import ProductCard from '../components/ProductCard.vue'
  import Product from '../models/products';
  import Rarity from '../models/rarity';
  import axios from 'axios';
  
  var panels = ref(['rarity']);

  const PAGE_SIZE = 5;
  const SKELETON_ITEMS = 4;
  
  const isLoading = ref(false);
  const products = ref([]);

  const pageNow = ref(1);
  const lastPage = ref(2);

  // async function fetchProducts(rarity, merchant, priceLow, priceHigh, page){
  //   isLoading.value = true;
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/products?page=${pageNow}&pagesize=${PAGE_SIZE}');
  //     const productsData = response.data.products;
  //     const pagination = response.data.pagination;

  //     productsData.map(p => {
  //       products.value.push(
  //         new Product(
  //               p.id,
  //               p.name,
  //               p.description,
  //               p.price,
  //               p.image,
  //               new Rarity(p.rarity.id, p.rarity.name, p.rarity.level, p.rarity.color),
  //           )
  //       )
  //     });

  //   } catch (error) {
  //       console.error('Error fetching products:', error);
  //       return [];
  //   } finally{
  //     isLoading.value = false;
  //   }
  // }

onMounted(async () => {
  // Code to execute after the component has been mounted
  // await fetchProducts("","","","","");
});


</script>

<template>
  <v-app id="inspire">
    <v-app-bar>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-app-bar-title>CMarket</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="">
        <v-row>
          <v-col class="border-md rounded-lg" md="3">
            <div class="text-button">
              Filters
            </div>
            <div class="pl-2">
              <v-expansion-panels class="pa-0 ma-0 shadow-0 border-0" flat multiple v-model="panels">
                
                <v-expansion-panel class="" value="rarity">
                  <v-expansion-panel-title class="pa-0 ma-0 border-b-lg">
                    <div class="text-button">
                      Rarity
                    </div>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text class="pa-0 ma-0">
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Common</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Uncommon</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Rare</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Epic</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Legendary</div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel class="" value="merchant">
                  <v-expansion-panel-title class="pa-0 ma-0 border-b-lg">
                    <div class="text-button">
                      Merchant Type
                    </div>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text class="pa-0 ma-0">
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Local Merchant</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Traveling Merchant</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2"></v-checkbox>
                      <div>Black Merchant</div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel class="" value="price">
                  <v-expansion-panel-title class="pa-0 ma-0 border-b-lg">
                    <div class="text-button">
                      Price Range
                    </div>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text class="">
                    <SpaceBox sy="10"></SpaceBox>
                    <v-text-field density="compact"
                      label="Lowest Price" hide-details single-line variant="outlined">

                      <template v-slot:prepend-inner>
                          <v-img
                            :width="25"
                            cover
                            src="/diamond.png"
                          ></v-img> 
                      </template>

                    </v-text-field>

                    <SpaceBox sy="5"></SpaceBox>
                    <div class="text-h6 w-100 d-flex justify-center align-center" >
                      -
                    </div>
                    <SpaceBox sy="5"></SpaceBox>

                    <v-text-field density="compact"
                      label="Highest Price" hide-details single-line variant="outlined">

                      <template v-slot:prepend-inner>
                        <v-img
                            :width="25"
                            cover
                            src="/public/diamond.png"
                          ></v-img> 
                      </template>

                    </v-text-field>
                  </v-expansion-panel-text>
                </v-expansion-panel>

              </v-expansion-panels>
            </div>
          </v-col>
          <v-col>
            <v-row class="">
              <v-col v-for="idx in 12 + SKELETON_ITEMS" :key="idx" cols="3">
                <ProductCard rarity="1" v-if="idx < 15">
                  Transform you into giant with tremendous strength
                </ProductCard>
                <!-- <LoadingProductCard v-else></LoadingProductCard> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>