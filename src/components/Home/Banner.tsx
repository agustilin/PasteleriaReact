import { Link } from "react-router-dom";


export const Banner = () => {
    return (
    <div className='relative bg-gray-500 text-white'>
            {/*Imagen*/}
            <div className='absolute inset-0 bg-cover bg-center opacity-70 h-full'
                style={{backgroundImage: 'https://media.istockphoto.com/id/507626460/es/foto/tienda-de-art%C3%ADculos-de-pasteler%C3%ADa-y-tortas-pantalla-ventana.jpg?s=612x612&w=0&k=20&c=RgddK7ujO5hR-YGGt0-R6LqMB6AuGsAqQmjlJD4_AFs='}}
            />

            <div className='absolute inset-0 bg-black opacity-50'/>

            <div className='relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8'>
                <h1 className="text-4xl font-bold mb-4 lg:text-6xl"> Los Pasteles mas ricos</h1>
                <p className='text-lg mb-8 lg:text-2xl'>
                    Pasteles Totalmente caseros
                </p>
                
                <Link to={'/pasteles'} className='bg-gray-900 hover:bg-gray-600 text-white font-semibold py-3 px px-6 rounded-lg shadow-lg'>
                    Ver Pasteles
                </Link>
                
            </div>
    </div>
    );
};

