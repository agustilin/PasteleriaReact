export const Novedades = () => {
    return <div className="relative bg-gray-500 text-white py-20 px-7">

        <div className="absolute inset-0 bg-cover bg-center opacity-70 h-full"
            style={{backgroundImage: 'url(https://png.pngtree.com/background/20250127/original/pngtree-table-with-loads-of-cakes-cupcakes-cookies-and-cake-pops-picture-image_15628161.jpg)'}} >
            </div>

            <div className="container z-10 relative p-5 md:p-0">
                <div className="w-full text-black bg-rose-100 p-12 space-y-5 md:w-[50%] lg:2-[40%]">
                    <p className="text-xl font-semibold ">
                        Introduce tu correo para recibir ofertas
                    </p>
                    <form className="flex flex-col gap-5 xl:flex-row">
                        <input type="email" className="border border-slate-200 focus:outline-none rounded-full 
                                                                            py-3 px-5 w-full text-xs font-medium"
                        placeholder="Correo Electronico"/>
                        <button className="bg-black text-white font-semibold rounded-full uppercase 
                                                        tracking-wider py-3 text-xs xl:px-5">Enviar</button>
                    </form>
                </div>
            </div>
    </div>
}