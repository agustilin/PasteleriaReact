import { pasteles } from "../data/pasteles"
import { CardProducts } from "../productos/CardProducts"
import { FiltroContainer } from "../productos/FiltroContainer"

export const PastelesPage = () => {
    return (
        <>
            <h1 className="text-5xl font-semibold text-center mb-12"> 
                Pasteles
            </h1>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <FiltroContainer/>

                <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
                    <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                        {pasteles.map((pastel) => (
                            <CardProducts 
                                key={pastel.id}
                                pastel={pastel}/>
                        ))}
                    </div>
                    {/*Paginacion*/}
                </div>
            </div>
        </>
    )
}

