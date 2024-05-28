<script setup lang="ts">
import { AxiosResponse } from 'axios';
import { useFilterStore } from '../../../stores/ECommerce/FilterFormStore';
import { AxiosClient } from '../../../api/AxiosClient';
import { GET_MERCHANT_FILTERS, GET_RARITY_FILTERS } from '../../../ApiEndpoints';
import { onMounted, Ref, ref } from 'vue';
import { Filter } from '../EcommerceScript';

const filterStore = useFilterStore();

const rarityFilters: Ref<Filter[]> = ref([]);
const merchantFilters: Ref<Filter[]> = ref([]);

const loadingRarityFilters = ref(true);
const loadingMerchantFilters = ref(true);

onMounted(async () => {
    const rarityFilterResponse: AxiosResponse = await AxiosClient.getInstance().get(GET_RARITY_FILTERS);
    const merchantFilterResponse: AxiosResponse = await AxiosClient.getInstance().get(GET_MERCHANT_FILTERS);

    console.log(rarityFilterResponse);

    rarityFilters.value = rarityFilterResponse.data;
    merchantFilters.value = merchantFilterResponse.data;

    rarityFilters.value.forEach((filter: Filter) => {
        filterStore.addRarityFilterData(new Filter(filter.id, filter.name));
    });

    merchantFilters.value.forEach((filter: Filter) => {
        filterStore.addMerchantFilterData(new Filter(filter.id, filter.name));
    });
    
    loadingRarityFilters.value = false;
    loadingMerchantFilters.value = false;
});

</script>

<template>
    <v-expansion-panels class="pa-0 ma-0 shadow-0 border-0 mb-5" flat multiple v-model="filterStore.panels">

        <v-expansion-panel class="" value="rarity">
            <v-expansion-panel-title class="pa-0 ma-0 border-b-lg">
                <div class="text-button">
                    Rarity
                </div>
            </v-expansion-panel-title>
            
            <div class="d-flex align-center justify-center my-3" v-if="loadingRarityFilters">
                <v-progress-circular indeterminate class=""></v-progress-circular>
            </div>

            <v-expansion-panel-text class="pa-0 ma-0" v-else>
                <div class="d-flex align-center" v-for="filter in rarityFilters" :key="filter.id">
                    <v-checkbox hide-details density="compact" class="mr-2" :value="filter.id"
                        v-model="filterStore.rarityFilterDisplay"></v-checkbox>
                    <div>{{ filter.name }}</div>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="" value="merchant">
            <v-expansion-panel-title class="pa-0 ma-0 border-b-lg">
                <div class="text-button">
                    Merchant Type
                </div>
            </v-expansion-panel-title>

            <div class="d-flex align-center justify-center my-3" v-if="loadingMerchantFilters">
                <v-progress-circular indeterminate class=""></v-progress-circular>
            </div>

            <v-expansion-panel-text class="pa-0 ma-0">
                <div class="d-flex align-center"  v-for="filter in merchantFilters" :key="filter.id">
                    <v-checkbox hide-details density="compact" class="mr-2" v-model="filterStore.merchantFilterDisplay"
                        :value="filter.id"></v-checkbox>
                    <div>{{ filter.name }}</div>
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
                    v-model="filterStore.minimumPriceFilter" type="number">

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
                    v-model="filterStore.maximumPriceFilter" type="number">

                    <template v-slot:prepend-inner>
                        <v-img :width="25" cover src="/public/diamond.png"></v-img>
                    </template>

                </v-text-field>
            </v-expansion-panel-text>
        </v-expansion-panel>

    </v-expansion-panels>
</template>