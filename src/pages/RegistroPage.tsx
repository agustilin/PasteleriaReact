import { Link } from "react-router-dom";
import { RegistroHeader } from "../components/auth/RegistroHeader";
import { RegistroForm } from "../components/auth/RegistroForm";

export const RegistroPage = () => {
    return (
        <div className="py-8 px-4">
            <div className="bg-rose-200 mx-110 p-4 rounded-3xl">
                <RegistroHeader />
                <RegistroForm />
                
                <div className="mt-6 text-center">
                    <Link to="/" className="text-gray-600 hover:text-black">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};
