import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Product } from "../../graphql/products";
import { cartItemSelector } from "../../recoils/cart";

const ProductItem = ({ id, title, price, imageUrl, description, createdAt }: Product) => {
    const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
    const addToCart = () => setCartAmount((prev) => (prev || 0) + 1);

    return (
        <li className='product-item'>
            <Link to={`/products/${id}`}>
                <p className='product-item__title'>{title}</p>
                <img className='product-item__image' src={imageUrl} />
                <span className='product-item__price'>${price}</span>
            </Link>
            <button className='product-item__add-cart' onClick={addToCart}>
                상품 담기
            </button>
            <span>{cartAmount || 0}</span>
        </li>
    );
};

export default ProductItem;
