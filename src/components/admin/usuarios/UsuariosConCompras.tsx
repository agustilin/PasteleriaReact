import React, { useState, useEffect } from 'react';
import type { Pedido } from '../../../interfaces/pedidoInterface';

interface UsuarioConCompras {
    email: string;
    cantidadPedidos: number;
    totalGastado: number;
    ultimaCompra: Date;
}

const UsuariosConCompras: React.FC = () => {
    const [usuariosConCompras, setUsuariosConCompras] = useState<UsuarioConCompras[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerUsuariosConCompras = () => {
        try {
            const savedPedidos = localStorage.getItem('pedidos');
            
            if (!savedPedidos) {
            setUsuariosConCompras([]);
            setLoading(false);
            return;
            }

            const pedidos: Pedido[] = JSON.parse(savedPedidos).map((p: any) => ({
            ...p,
            fecha: new Date(p.fecha)
            }));

            // Filtrar solo pedidos completados
            const pedidosCompletados = pedidos.filter(pedido => pedido.estado === 'completado');

            // Agrupar pedidos por email de usuario
            const usuariosMap = new Map<string, {
            cantidadPedidos: number;
            totalGastado: number;
            ultimaCompra: Date;
            }>();

            pedidosCompletados.forEach(pedido => {
            // Extraer email del ID del pedido (formato: email-timestamp)
            const email = pedido.id.substring(0, pedido.id.lastIndexOf('-'));
            
            if (usuariosMap.has(email)) {
                const datos = usuariosMap.get(email)!;
                datos.cantidadPedidos += 1;
                datos.totalGastado += pedido.total;
                if (pedido.fecha > datos.ultimaCompra) {
                datos.ultimaCompra = pedido.fecha;
                }
            } else {
                usuariosMap.set(email, {
                cantidadPedidos: 1,
                totalGastado: pedido.total,
                ultimaCompra: pedido.fecha
                });
            }
            });

            // Convertir Map a array y ordenar por total gastado (descendente)
            const usuariosArray: UsuarioConCompras[] = Array.from(usuariosMap.entries())
            .map(([email, datos]) => ({
                email,
                ...datos
            }))
            .sort((a, b) => b.totalGastado - a.totalGastado);

            setUsuariosConCompras(usuariosArray);
        } catch (error) {
            console.error('Error al obtener usuarios con compras:', error);
            setUsuariosConCompras([]);
        } finally {
            setLoading(false);
        }
        };

        obtenerUsuariosConCompras();
    }, []);

    const formatearFecha = (fecha: Date): string => {
        return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    const formatearMoneda = (cantidad: number): string => {
        return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
        }).format(cantidad);
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Cargando usuarios con compras...</div>
        </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
                Usuarios con Productos Comprados
            </h2>
            <p className="text-gray-600 mt-2">
                Total de usuarios con compras: {usuariosConCompras.length}
            </p>
            </div>

            {usuariosConCompras.length === 0 ? (
            <div className="p-8 text-center">
                <div className="text-gray-500 text-lg">
                No se encontraron usuarios con compras realizadas
                </div>
            </div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email del Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad de Pedidos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Gastado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Compra
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {usuariosConCompras.map((usuario, index) => (
                    <tr 
                        key={usuario.email} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                            {usuario.email}
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                            {usuario.cantidadPedidos} pedido{usuario.cantidadPedidos !== 1 ? 's' : ''}
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                            {formatearMoneda(usuario.totalGastado)}
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                            {formatearFecha(usuario.ultimaCompra)}
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}

            {usuariosConCompras.length > 0 && (
            <div className="p-6 bg-gray-50 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                    {usuariosConCompras.length}
                    </div>
                    <div className="text-sm text-gray-500">Usuarios Activos</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                    {formatearMoneda(
                        usuariosConCompras.reduce((sum, usuario) => sum + usuario.totalGastado, 0)
                    )}
                    </div>
                    <div className="text-sm text-gray-500">Ventas Totales</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                    {usuariosConCompras.reduce((sum, usuario) => sum + usuario.cantidadPedidos, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Pedidos Totales</div>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default UsuariosConCompras;