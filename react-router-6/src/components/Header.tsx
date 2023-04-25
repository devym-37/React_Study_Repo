import { Link } from "react-router-dom";

const Header = () => {
    return (
        <h1>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
            </ul>
        </h1>
    );
};

export default Header;
