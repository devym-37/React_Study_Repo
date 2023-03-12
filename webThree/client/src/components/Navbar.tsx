import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavbarItem = ({ title, classProps }: { title: string; classProps?: string }) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const ListData = ["Market", "Exchange", "Tutorials", "Wallets"];

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleClickCloseMenu = () => {
        setToggleMenu(false);
    };

    const handleClickOpenMenu = () => {
        setToggleMenu(true);
    };

    return (
        <nav className='w-full flex md:justify-center jusitfy-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt='logo' className='w-32 cursor-pointer' />
            </div>
            <ul className='text-white md:flex hiddent list-none flex-row justify-between item-center flex-initial'>
                {ListData.map((item, index) => {
                    return <NavbarItem key={item + index} title={item} />;
                })}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>

                <div className='flex relative'>
                    {toggleMenu ? (
                        <AiOutlineClose
                            fontSize={28}
                            className='text-white md:hidden cursor-pointer'
                            onClick={handleClickCloseMenu}
                        />
                    ) : (
                        <HiMenuAlt4
                            fontSize={28}
                            className='text-white md:hidden cursor-pointer'
                            onClick={handleClickOpenMenu}
                        />
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
