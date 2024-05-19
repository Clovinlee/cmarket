// Utilities
import { defineStore } from 'pinia'
import { Filter } from '../../pages/Ecommerce/EcommerceScript';

export const useFilterStore = defineStore('filter-store', {
    state: () => ({
        rarityFilterData: [] as Filter[],
        merchantFilterData: [] as Filter[],
        
        minimumPriceFilter: null as number | null,
        maximumPriceFilter: null as number | null,
        rarityFilterDisplay: [] as string[],
        merchantFilterDisplay: [] as string[],
        textSearch: "" as string,
        panels: ['rarity'] as string[],
    }),
    getters: {

    },
    actions: {
        setMinimumPriceFilter(minimumPriceFilter: number | null) {
            this.minimumPriceFilter = minimumPriceFilter;
        },
        setMaximumPriceFilter(maximumPriceFilter: number | null) {
            this.maximumPriceFilter = maximumPriceFilter;
        },
        setRarityFilterDisplay(rarityFilterDisplay: string[]) {
            this.rarityFilterDisplay = rarityFilterDisplay;
        },
        setMerchantFilterDisplay(merchantFilterDisplay: string[]) {
            this.merchantFilterDisplay = merchantFilterDisplay;
        },
        setTextSearch(textSearch: string) {
            this.textSearch = textSearch;
        },
        addRarityFilterData(rarityFilterData: Filter) {
            this.rarityFilterData.push(rarityFilterData);
        },
        addMerchantFilterData(merchantFilterData: Filter) {
            this.merchantFilterData.push(merchantFilterData);
        },
        addPanel(panel: string) {
            if (!this.panels.includes(panel)) {
                this.panels.push(panel);
            }
        },
        removePanel(panel: string) {
            this.panels = this.panels.filter((p: string) => p !== panel);
        },
    }
})
