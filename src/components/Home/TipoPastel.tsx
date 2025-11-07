const tipoPastel = [
    {
        tipo:'Cuadrada'
    },
    {
        tipo:'circular'
    }
]

export const TipoPastel = () => {
    return (
        <div className='felx flex-col items-center gap-3 pt-16 pb-12'>
            <h2 className='font-bold text-2xl text-center'>Tipos de Pasteles</h2>
            <p className='w-2/3 text-center text-sm md:text-base'>No importa el tamaño ni forma, todas son igual de ricas</p>

            <div className='grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6'>
                {tipoPastel.map((tp,index) => (
                    <div key={index}>
                        {tp.tipo}
                    </div>
                ))}
            </div>
        </div>
    )
}


