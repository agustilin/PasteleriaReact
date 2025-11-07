import { FeatureGrid } from "../components/Home/FeatureGrid"
import { ProductoGrid } from "../components/Home/ProductoGrid"
import { TipoPastel } from "../components/Home/TipoPastel";
import { masVendidos, nuevosProductos } from "../data/pasteles";

export const HomePage = () => {
    return (
        <div>
            <FeatureGrid/>

            <ProductoGrid titulo='nuevos productos'
                        pasteles={nuevosProductos}
                        />
            <ProductoGrid titulo='productos populares'
                        pasteles={masVendidos}
                        />
            <TipoPastel/>
        </div>            
    );
};

