import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/Home/Banner";
import { Informaciones } from "../components/Home/Informaciones";

export const RootLayout = () => {
    const { pathname } = useLocation();

    return (
    <div className='h-screen flex flex-col font-Lato'>
        
        <Navbar/>

        {pathname === '/' && <Banner/>}


        <main className='container my-8 flex-1'>
            <Outlet/>
        </main>

        {pathname === '/' && <Informaciones/>}
        <Footer/>
    </div>)
}