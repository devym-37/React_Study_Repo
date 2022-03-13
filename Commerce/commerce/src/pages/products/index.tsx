import { useQuery } from "react-query";
import ProductItem from "../../components/product/item";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";

const ProductList = () => {
    const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
        fetcher({
            method: "GET",
            path: "/products",
        })
    );
    /*
        id: 1
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        price: 109.95
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
        category: "men's clothing"
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    ▶ rating 2 items
        rate: 3.9
        count: 120
    */
    return (
        <div>
            <ul>
                {data?.map((product) => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
