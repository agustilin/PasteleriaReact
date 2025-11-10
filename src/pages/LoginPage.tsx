import { Link } from "react-router-dom";
import { LoginHeader } from "../components/auth/LoginHeader";
import { LoginForm } from "../components/auth/LoginForm";

export const LoginPage = () => {
    return (
        <div className="bg-rose-200 mx-110 p-4 rounded-3xl">
            <div className="max-w-md mx-auto">
                <LoginHeader />
                <LoginForm />
                
                <div className="mt-6 text-center">
                    <Link to="/" className="text-gray-600 hover:text-black">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};
