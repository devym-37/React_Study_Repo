import { Product } from "../../types";

const ProductItem = ({ title, price, description, category, image, rating }: Product) => (
    <li>
        <p>{category}</p>
        <p>{title}</p>
        <p>{description}</p>
        <img src={image} />
        <span>${price}</span>
        <span>{rating.rate}</span>
    </li>
);

export default ProductItem;
