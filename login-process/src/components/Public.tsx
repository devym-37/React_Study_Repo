import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className='public'>
            <header>
                <h1>Welcome to Repair Store!</h1>
            </header>

            <footer>
                <Link to='/login'>Employee Login</Link>
            </footer>
        </section>
    );
    return content;
};

export default Public;
