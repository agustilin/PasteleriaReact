import { Separador } from "../components/shared/Separador"

const FiltrosDisp = [
    'Pequeña',
    'Grande',
    'Cuadrada',
    'Circular',
]

export const FiltroContainer = () => {
    return (
        <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-xl mb-4">
                Filtros
            </h3>

            {/*Separador*/}
            <Separador/>

            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-black">Tipos de Pastel</h3>
                <div className="flex flex-col gap-2 ">
                    {FiltrosDisp.map(tipo => (
                        <label key={tipo} className="inline-flex items-center">
                            <input type="checkbox" className="text-black border-black focus:ring-black accent-black"/>
                            <span className="ml-2 text-black text-sm cursor-pointer">{tipo}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}


