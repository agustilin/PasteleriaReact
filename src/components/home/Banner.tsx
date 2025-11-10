import { Link } from "react-router-dom"

export const Banner = () => {
    return (
        <div className="relative bg-gray-900 text-white">
            {/*Imagen del banner */}
            <div className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
            style={{backgroundImage: 'url(https://media.istockphoto.com/id/623709028/es/foto/mesa-con-varias-galletas-tartas-pasteles-cupcakes-y-cakepops.jpg?s=612x612&w=0&k=20&c=sbiT27cs6EzZTQVfDGCl4T-SkVGc1ZgmlYx2dl5BhcM=)'}} ></div>

            {/*Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"/>

            {/*Contenido */}
            <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8">
                <h1 className="text-4xl font-bold mb-4 lg:text-6xl">Pastelería Mil Sabores</h1>
                <p className="text-lg mb-8 lg:text-2xl">
                    Los mejores pasteles
                </p>
                <Link to='/pasteles' className="bg-rose-300 hover:bg-rose-400 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
                Ver Pasteles
                </Link>

                
            </div>
        </div>
    )
}