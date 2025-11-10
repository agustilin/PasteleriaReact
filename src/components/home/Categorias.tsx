const categorias = [
    {
        Image: '/img/circulares/tortacircular1.webp',
        alt: 'Torta Circular'
    },
    {
        Image: '/img/cuadradas/tortacuadrada1.jpg',
        alt: 'Torta Cuadrada'
    }
]



export const Categoria = () => {
    return (
        <div className="bg-rose-200 flex flex-col items-center gap-3 pt-16 pb-12">
            <h2 className="font-bold text-5xl">
                Categorias Disponibles
            </h2>
            <p className="w-2/3 text-center text-sm md:text-base">
                La Pasteleria MilSabores cuenta con dos grandes grupos de tortas:
            </p>
            <p className="font-bold text-center text-xl">
                Circulares      y       Cuandradas
            </p>

            <div className="flex flex-wrap justify-center gap-8" >
                {
                    categorias.map((cat, index) => (
                        <div key={(index)}>
                            <img src={cat.Image} alt={cat.alt} 
                            className="w-150 h-100 object-center"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}