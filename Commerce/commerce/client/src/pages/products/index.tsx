import { useQuery } from "react-query";
import ProductList from "../../components/product/list";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductListPage = () => {
    const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS));
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
            <h2>상품목록</h2>
            <ProductList list={data?.products || []} />
        </div>
    );
};

export default ProductListPage;
