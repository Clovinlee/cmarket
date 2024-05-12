import Product from "../../../models/products";

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