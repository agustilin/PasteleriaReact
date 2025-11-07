import { createBrowserRouter} from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa6";
import { HomePage, NosotrosPage, PastelesPage } from "../pages";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout/>,
        children:[
            {
                index: true,
                element: <HomePage/>
            },
            {
                path:'pasteles',
                element: <PastelesPage/>
            },
            {
                path:'nosotros',
                element: <NosotrosPage/>
            }
        ]
    },
]);

export const iconoRedes = [

    {
        id:1,
        nombre:'Facebook',
        href:'https://www.facebook.com',
        icon:<FaFacebookF/>

    },
    {
        id:2,
        nombre:'Instagram',
        href:'https://www.instagram.com/',
        icon:<FaInstagram/>
    },
    {
        id:3,
        nombre:'GitHub',
        href:'https://github.com/',
        icon:<FaGithub/>
    },
    

];

