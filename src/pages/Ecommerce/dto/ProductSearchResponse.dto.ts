import Product from "../../../models/Product";

class ProductSearchResponseDto {
    constructor(
        public products: Product[],
        public pagination: {
            page: number,
            pageSize: number,
            totalPages: number,
            totalItems: number
        }
    ) { }
}

export { ProductSearchResponseDto }