import { useState } from 'react';
import { AdminProvider } from '../context/AdminContext';
import { DashboardNav } from '../components/admin/DashboardNav';
import { ProductList } from '../components/admin/productos/ProductList';
import { UserList } from '../components/admin/usuarios/UserList';
import UsuariosConCompras from '../components/admin/usuarios/UsuariosConCompras';

export const AdministradorPage = () => {
    const [activeTab, setActiveTab] = useState<'productos' | 'usuarios' | 'UsuaiosConCompras'>('productos');

    return (
        <AdminProvider>
            <div className="min-h-screen bg-rose-200 rounded-4xl p-6 mx-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
                            Panel de Administración
                        </h1>
                        <p className="text-center text-gray-600">
                            Gestiona productos y usuarios de la pastelería
                        </p>
                    </div>

                    {/* Navegación del Dashboard */}
                    <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Contenido del Dashboard */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {activeTab === 'productos' ? (
                            <ProductList />
                        ) : activeTab === 'usuarios' ? (
                            <UserList />
                        ) : activeTab === 'UsuaiosConCompras' ? (
                            <UsuariosConCompras />
                        ) : null}
                    </div>
                </div>
            </div>
        </AdminProvider>
    );
};
