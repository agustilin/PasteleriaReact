interface Props {
    className?:string,
}

export const Separador = ({className}:Props) => {
    return (
        <div className={`bg-slate-200 h-px my-5 ${className}`}></div>
    );
};


