interface ProductImageProps {
    imagen: string;
    
}

export const ProductImage = ({ imagen}: ProductImageProps) => {
    return (
        <div className="w-full">
            <img 
                src={imagen} 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};
