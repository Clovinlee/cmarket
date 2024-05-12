class ProductSearchDto {
    constructor(
        public raritySearch: string = "",
        public merchantSearch: string = "",
        public minimumPriceSearch: number = -1,
        public maximumPriceSearch: number = -1,
        public nameSearch: string = "",
        public pageNow: number = 1,
        public pageSize: number = 4
    ) { }
}

export { ProductSearchDto }