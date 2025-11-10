import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link to='/' className={`text 2xl font-bold tracking-tighter transition-all`}>
            <p className='hidden lg:block'>
            Mil
            <span className='text-pink-300'>Sabores</span>
            </p>

            <p className='flex text-4xl lg:hidden'>
                <span className='-skew-6'>M</span>
                <span className='text-pink-300 skew-x-6'>S</span>
            </p>
        </Link>

    )

}