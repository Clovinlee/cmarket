import { ProductSearchDto } from './dto/ProductSearch.dto';
import { ProductSearchResponseDto } from './dto/ProductSearchResponse.dto';
import Product from '../../models/Product';
import Rarity from '../../models/Rarity';
import { AxiosClient } from '../../api/AxiosClient';
import { PRODUCT_ENDPOINT } from '../../ApiEndpoints';


async function fetchProducts(paramSearch: ProductSearchDto): Promise<ProductSearchResponseDto> {
    let API_URL = PRODUCT_ENDPOINT + "?";

    if (paramSearch.raritySearch != "") {
        API_URL += `rarity=${paramSearch.raritySearch}&`;
    }
    if (paramSearch.merchantSearch != "") {
        API_URL += `merchant=${paramSearch.merchantSearch}&`;
    }
    if (paramSearch.minimumPriceSearch != -1) {
        API_URL += `minprice=${paramSearch.minimumPriceSearch}&`;
    }
    if (paramSearch.maximumPriceSearch != -1) {
        API_URL += `maxprice=${paramSearch.maximumPriceSearch}&`;
    }
    if (paramSearch.nameSearch != "" || paramSearch.nameSearch != null) {
        API_URL += `name=${paramSearch.nameSearch}&`;
    }
    API_URL += `page=${paramSearch.pageNow}&`;
    API_URL += `pagesize=${paramSearch.pageSize}`;

    try {
        // const response = await axios.get(API_URL);
        const response = await AxiosClient.getInstance().get(API_URL);

        const productsData = response.data.products.map(p => {
            return new Product(p.id, p.name, p.description, p.price, p.image, new Rarity(p.rarity.id, p.rarity.name, p.rarity.color, p.rarity.level))
        });
        const pagination = response.data.pagination;

        let productResponse: ProductSearchResponseDto = new ProductSearchResponseDto(productsData, pagination);
        productResponse.products = productsData;

        return productResponse;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;

    }
}

class Filter {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
  }

export { fetchProducts, Filter }