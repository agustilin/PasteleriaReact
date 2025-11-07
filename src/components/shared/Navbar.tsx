import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom"
import { FaBarsStaggered } from "react-icons/fa6";
import { navbarLinks } from "../../constants/links";
import { Logo } from './Logo';

export const Navbar = () => {
    return (
    <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
        
        <Logo/>
        
        <nav className='space-x-5 hidden md:flex'>
            {
                navbarLinks.map(nbl => (
                    <NavLink

                    key = {nbl.id}
                    to = {nbl.href}
                    className={({isActive}) => `${isActive ? 'text-cyan-600 underline': ''} transition-all duration-300 font-medium
                        hover:text-cyan-600 hover:underline`} 
                    >
                        {nbl.title}
                    </NavLink>
                ))
            }
        </nav>

        <div className='flex gap-5 items-center'>
            {/*boton busqueda*/}
            <button>
                <HiOutlineSearch size = {25}/>
            </button>
            <div className="relative">
                <Link to={'/account'} className='border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font bold'>R</Link>
            </div>

            {/*boton compras*/}
            <button className="relative">
                <span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
                    0</span>
                <HiOutlineShoppingBag/>
            </button>
        </div>

        {/*Boton responsivo */}
        <button className='md:hidden'>
            <FaBarsStaggered size={25}/>
        </button>
    </header>
    );
};