<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { fetchProducts, Filter } from './EcommerceScript';
import { ProductSearchDto } from './dto/ProductSearch.dto';
import { ProductSearchResponseDto } from './dto/ProductSearchResponse.dto';
import { windowScreenSize } from "../../utils/ScreenSize"
import Product from '../../models/Product';
import { useFilterStore } from '../../stores/ECommerce/FilterFormStore';
import FormFilterComponent from './components/FormFilterComponent.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const PAGE_SIZE = 8; // fetch 8 items at a time
const SKELETON_ITEMS = ref(4);

const isLoading = ref(false);
const products = ref<Product[]>([]);

const pageNow = ref(1);
const lastPage = ref(2);

const dialogProduct = ref(false);

const { isMobile } = windowScreenSize(600);

const skeletonIndicator = ref(null);
const isSkeletonVisible = useElementVisibility(skeletonIndicator, { threshold: 0.3 });


// WATCH FOR LAZY LOAD
watch(isSkeletonVisible, async (newValue, oldValue) => {
  if ((oldValue == false || oldValue == null) && newValue == true) {
    let response: ProductSearchResponseDto | null = await searchProduct();
    if (response != null) {
      products.value = products.value.concat(response.products);
    }
  }
});

const productSelected = ref<Product | null>(null);

const filterStore = useFilterStore();

// WATCH FOR SEARCH
let timerSearch = setTimeout(() => { }, 0);

watch(
  filterStore.$state,
  (state) => {
    clearTimeout(timerSearch); // Clear any existing timer
    timerSearch = setTimeout(async () => {
      if (isLoading.value) {
        clearTimeout(timerSearch);
        return
      }
      pageNow.value = 1;
      lastPage.value = 2;

      console.log(filterStore.merchantFilterDisplay.join(","));

      products.value = [];
      let response: ProductSearchResponseDto | null = await searchProduct();
      if (response != null) {
        products.value = response.products;
      }

    }, 1500);
  }, { deep: true }
)

async function searchProduct(): Promise<ProductSearchResponseDto | null> {
  console.log("Initiated Search on Page : " + pageNow.value)
  if (isLoading.value == true) return null;
  const paramSearch: ProductSearchDto = {
    pageNow: pageNow.value,
    pageSize: PAGE_SIZE,
    raritySearch: filterStore.rarityFilterDisplay.join(","),
    merchantSearch: filterStore.merchantFilterDisplay.join(","),
    minimumPriceSearch: filterStore.minimumPriceFilter ?? -1,
    maximumPriceSearch: filterStore.maximumPriceFilter ?? -1,
    nameSearch: filterStore.textSearch ?? ""
  }

  isLoading.value = true;

  const response: ProductSearchResponseDto = await fetchProducts(paramSearch);

  pageNow.value += 1;
  lastPage.value = response.pagination.totalPages;

  isLoading.value = false;

  return response;
}

// function setDialogProduct(idx: number) {

//   productSelected.value = products.value[idx - 1]
//   dialogProduct.value = true;
// }


onMounted(async () => {
  let response: ProductSearchResponseDto | null = await searchProduct();
  if (response != null) {
    products.value = response.products;
  }
});


</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container :class="{ 'mt-5': !isMobile }">
        <v-row>
          <v-col class="border-md rounded-lg" cols="12" sm="3" v-if="!isMobile">
            <div class="text-button">
              Filters
            </div>
            <div class="pl-2">
              <FormFilterComponent />
            </div>
          </v-col>
          <v-col cols="12" sm="9">
            <div class="mb-3">
              <!--SEARCH BAR-->
              <div class="d-flex align-center justify-space-between mb-3">
                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Search items" clearable
                  variant="outlined" hide-details single-line v-model="filterStore.textSearch"></v-text-field>

                <!-- BOTTOM SHEET BAR FILTER (MOBILE) -->
                <v-bottom-sheet v-if="isMobile">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-filter-menu-outline" size="medium" class="ml-2 pa-2"
                      variant="flat"></v-btn>
                  </template>

                  <v-card title="Filters">

                    <v-card-text>
                      <!-- <FormFilterComponent /> -->
                    </v-card-text>
                  </v-card>
                </v-bottom-sheet>


              </div>
              <!--CHIP FILTERS-->
              <v-chip color="default" variant="flat" closable class="me-2"
                v-if="filterStore.rarityFilterDisplay.length > 0"
                @click:close="() => filterStore.setRarityFilterDisplay([])">
                {{ filterStore.rarityFilterDisplay.map(function(m: string) {return (filterStore.rarityFilterData as Filter[]).filter(f => f.id == m).map(f => f.name) }).join(', ') }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2"
                v-if="filterStore.merchantFilterDisplay.length > 0"
                @click:close="() => filterStore.setMerchantFilterDisplay([])">
                {{ filterStore.merchantFilterDisplay.map(function(m: string) {return (filterStore.merchantFilterData as Filter[]).filter(f => f.id == m).map(f => f.name) }).join(', ') }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2" v-if="filterStore.minimumPriceFilter > 0"
                @click:close="() => filterStore.setMinimumPriceFilter(null)">
                Minimum Price : {{ filterStore.minimumPriceFilter }}
              </v-chip>
              <v-chip color="default" variant="flat" closable class="me-2"
                v-if="(filterStore.minimumPriceFilter == null && filterStore.maximumPriceFilter != null) || parseInt(filterStore.maximumPriceFilter) > parseInt(filterStore.minimumPriceFilter)"
                @click:close="() => filterStore.setMaximumPriceFilter(null)">
                Maximum Price : {{ filterStore.maximumPriceFilter }}
              </v-chip>
            </div>
            <v-row class="">
              <div v-if="dialogProduct"> <!--Needed for rendering-->
                <ProductModal v-model="dialogProduct" :product="productSelected" />
              </div>
              <v-col v-for="product,idx in products" :key="idx" cols="6" sm="4" md="3" class="">
                <!-- idx begin at 1, not 0 -->
                <ProductCard :product="product" class="w-100" @click.stop="() => { router.push({ name:'productdetail', params: { slug: product.id+'-'+product.name }}); }" />
              </v-col>
              <v-col v-for="idx in (SKELETON_ITEMS - products.length % SKELETON_ITEMS)" :key="idx" cols="4" md="3"
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