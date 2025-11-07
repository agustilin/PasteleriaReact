import type { Pastel } from "../../data/pasteles";
import { CardProducts } from "../../productos/CardProducts";

interface Props {
    titulo:string;
    pasteles: Pastel[];
}

export const ProductoGrid = ({titulo, pasteles}: Props) => {
    return (
        <div className="my-32">
            <h2 className="text-exl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
                {titulo}
            </h2>
            <div className='grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 '>
                {pasteles.map((pastel) => (
                    <CardProducts 
                        key={pastel.id}
                        pastel={pastel}
                    />
                ))}
            </div>
        </div>
    )
}


