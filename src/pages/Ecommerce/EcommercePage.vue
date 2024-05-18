<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { fetchProducts } from './EcommerceScript';
import { ProductSearchDto } from './dto/ProductSearch.dto';
import { ProductSearchResponseDto } from './dto/ProductSearchResponse.dto';
import Product from '../../models/products';

var panels = ref(['rarity']);

const PAGE_SIZE = 3;
const SKELETON_ITEMS = 4;
const PRODUCT_COLS = ref(3);

const isLoading = ref(false);
const products = ref<Product[]>([]);

const pageNow = ref(1);
const lastPage = ref(2);

const minimumPriceFilter = ref(null);
const maximumPriceFilter = ref(null);

const rarityFilterDisplay = ref([]);
const merchantFilterDisplay = ref([]);

const textSearch = ref("");

const dialogProduct = ref(false);

var raritySearch = "";

const skeletonIndicator = ref(null);
const isSkeletonVisible = useElementVisibility(skeletonIndicator, { threshold: 0.3 });

let timerSearch = setTimeout(() => { }, 0);

const rarityMapping = {
  "Common": 1,
  "Uncommon": 2,
  "Rare": 3,
  "Epic": 4,
  "Legendary": 5,
  // Add more rarity names and their corresponding values as needed
};

// TODO : FETCH TWICE FIX

// WATCH FOR SEARCH
watch([merchantFilterDisplay, minimumPriceFilter, maximumPriceFilter, rarityFilterDisplay, textSearch], (newValue, oldValue) => {
  clearTimeout(timerSearch); // Clear any existing timer
  timerSearch = setTimeout(async () => {
    if (isLoading.value) {
      clearTimeout(timerSearch);
      return
    }
    pageNow.value = 1;
    lastPage.value = 2;

    let rarityQuery = "";
    for (let i = 0; i < rarityFilterDisplay.value.length; i++) {
      rarityQuery += rarityMapping[rarityFilterDisplay.value[i]] + ",";
    }

    raritySearch = rarityQuery;

    products.value = [];
    let response: ProductSearchResponseDto|null = await searchProduct();
    if(response != null){
      products.value = response.products;
    }

  }, 1500);
}, { deep: true });

// WATCH FOR LAZY LOAD
watch(isSkeletonVisible, async (newValue, oldValue) => {
  if ((oldValue == false || oldValue == null) && newValue == true) {
    let response: ProductSearchResponseDto|null = await searchProduct();
    if(response != null){
      products.value = products.value.concat(response.products);
    }
  }
});

const productSelected = ref<Product | null>(null);

async function searchProduct(): Promise<ProductSearchResponseDto | null>{
  console.log("Initiated Search on Page : "+pageNow.value)
  if(isLoading.value == true) return null;
  const paramSearch : ProductSearchDto = {
    pageNow: pageNow.value,
    pageSize: Math.ceil(12/PAGE_SIZE),
    raritySearch: raritySearch,
    merchantSearch: merchantFilterDisplay.value.join(","),
    minimumPriceSearch: minimumPriceFilter.value ?? -1,
    maximumPriceSearch: maximumPriceFilter.value ?? -1,
    nameSearch: textSearch.value ?? ""
  }

  isLoading.value = true;

  const response: ProductSearchResponseDto = await fetchProducts(paramSearch);

  pageNow.value += 1;
  lastPage.value = response.pagination.totalPages;

  isLoading.value = false;

  return response;
}

function setDialogProduct(idx: number) {

  productSelected.value = products.value[idx - 1]
  dialogProduct.value = true;
}


onMounted(async () => {
  let response: ProductSearchResponseDto|null = await searchProduct();
  if(response != null){
    products.value = response.products;
  }
});


</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="mt-5">
        <v-row>
          <v-col class="border-md rounded-lg" sm="2" md="3">
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
                      <v-checkbox hide-details density="compact" class="mr-2" value="Common"
                        v-model="rarityFilterDisplay"></v-checkbox>
                      <div>Common</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" value="Uncommon"
                        v-model="rarityFilterDisplay"></v-checkbox>
                      <div>Uncommon</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" value="Rare"
                        v-model="rarityFilterDisplay"></v-checkbox>
                      <div>Rare</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" value="Epic"
                        v-model="rarityFilterDisplay"></v-checkbox>
                      <div>Epic</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" value="Legendary"
                        v-model="rarityFilterDisplay"></v-checkbox>
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
                      <v-checkbox hide-details density="compact" class="mr-2" v-model="merchantFilterDisplay"
                        value="Local Merchant"></v-checkbox>
                      <div>Local Merchant</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" v-model="merchantFilterDisplay"
                        value="Traveling Merchant"></v-checkbox>
                      <div>Traveling Merchant</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-checkbox hide-details density="compact" class="mr-2" v-model="merchantFilterDisplay"
                        value="Black Merchant"></v-checkbox>
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
                    <SpaceBox :sy="10"></SpaceBox>
                    <v-text-field density="compact" label="Lowest Price" hide-details single-line variant="outlined"
                      v-model="minimumPriceFilter" type="number">

                      <template v-slot:prepend-inner>
                        <v-img :width="25" cover src="/diamond.png"></v-img>
                      </template>

                    </v-text-field>

                    <SpaceBox :sy="5"></SpaceBox>
                    <div class="text-h6 w-100 d-flex justify-center align-center">
                      -
                    </div>
                    <SpaceBox :sy="5"></SpaceBox>

                    <v-text-field density="compact" label="Highest Price" hide-details single-line variant="outlined"
                      v-model="maximumPriceFilter" type="number">

                      <template v-slot:prepend-inner>
                        <v-img :width="25" cover src="/public/diamond.png"></v-img>
                      </template>

                    </v-text-field>
                  </v-expansion-panel-text>
                </v-expansion-panel>

              </v-expansion-panels>
            </div>
          </v-col>
          <v-col>
            <div class="mb-3">
              <!--SEARCH BAR-->
              <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Search items" clearable variant="outlined"
                hide-details single-line v-model="textSearch" class="mb-3"></v-text-field>

              <!--CHIP FILTERS-->
              <v-chip color="default" variant="flat" closable class="me-2" v-if="rarityFilterDisplay.length > 0"
                @click:close="rarityFilterDisplay.length = 0">
                {{ rarityFilterDisplay.map(m => m).join(', ') }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2" v-if="merchantFilterDisplay.length > 0"
                @click:close="merchantFilterDisplay.length = 0">
                {{ merchantFilterDisplay.map(m => m).join(', ') }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2" v-if="minimumPriceFilter > 0"
                @click:close="minimumPriceFilter = 0">
                Minimum Price : {{ minimumPriceFilter }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2"
                v-if="(minimumPriceFilter == null && maximumPriceFilter != null) || parseInt(maximumPriceFilter) > parseInt(minimumPriceFilter)"
                @click:close="maximumPriceFilter = 0">
                Maximum Price : {{ maximumPriceFilter }}
              </v-chip>
            </div>
            <v-row class="">
              <div v-if="dialogProduct"> <!--Needed for rendering-->
                <ProductModal v-model="dialogProduct" :product="productSelected" />
              </div>
              <v-col v-for="idx in products.length" :key="idx" :cols="PRODUCT_COLS" class="">
                <!-- idx begin at 1, not 0 -->
                <ProductCard :product="products[idx - 1]" class="w-100" @click.stop="() => { setDialogProduct(idx) }" />
              </v-col>
              <v-col v-for="idx in (SKELETON_ITEMS - products.length % SKELETON_ITEMS)" :key="idx" :cols="PRODUCT_COLS"
                class="" ref="skeletonIndicator">
                <LoadingProductCard v-if="pageNow < lastPage" :id="'skeletonproduct' + idx">
                </LoadingProductCard>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>