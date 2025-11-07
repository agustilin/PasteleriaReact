import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import type { Pastel } from '../data/pasteles';
import { fromatoPrecio } from '../helper/index';

interface Props {
    pastel:Pastel
}

export const CardProducts = ({pastel}:Props) => {
    
    
    return (
        <div className='flex flex-col gap-6 relative'>
            <Link to={`/pasteles/${pastel.titulo}`} className="flex relative group">
                <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                    <img src={pastel.imagen} alt={pastel.titulo} className="object-contain h-full w-full"/>
                </div>

                <button className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex 
                                    items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 trasnlate-y-[100%]
                                    transition-all duration-150 group-hover:trasnlate-y-0">
                    <FiPlus/>
                    Añadir
                </button>
            </Link>
            <div className="flex flex-col gap-1 items-center">
                <p className="text-[15px] font-medium">{pastel.titulo}</p>
                <p className="text-[15px] font-medium">{fromatoPrecio(pastel.precio)}</p>
            </div>

            <div className="absolute top-2 left-2">
                {
                    pastel.stock === 0 && <span>Agotado</span>
                }
            </div>

        </div>
    );
};

