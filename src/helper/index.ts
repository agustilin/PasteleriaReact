
//posible Eliminacion
//funcion para preárar los produtos
/*export const prepararProductos(products: any[]) => {
    return products.map(product => {

    })
}*/

//funcion para darle fromato a los precios
export const fromatoPrecio = (precio:number) => {
    return new Intl.NumberFormat('en-US', {
        style:"currency",
        currency:"USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(precio);
};