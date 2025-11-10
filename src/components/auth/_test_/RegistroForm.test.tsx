import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegistroForm } from '../RegistroForm';
import { UserProvider } from '../../../context/UserContext';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock de window.alert
const mockAlert = vi.fn();
window.alert = mockAlert;

// Helper para renderizar el componente con los providers necesarios
const renderComponent = () => {
    return render(
        <BrowserRouter>
            <UserProvider>
                <RegistroForm />
            </UserProvider>
        </BrowserRouter>
    );
};

// Helper para llenar el formulario con datos válidos
const fillFormWithValidData = () => {
    const nombre = screen.getByLabelText(/nombre completo/i);
    const email = screen.getByLabelText(/correo electrónico/i);
    const telefono = screen.getByLabelText(/teléfono/i);
    const fechaNacimiento = screen.getByLabelText(/fecha de nacimiento/i);
    const direccion = screen.getByLabelText(/dirección/i);
    const password = screen.getByLabelText(/^contraseña$/i);
    const confirmPassword = screen.getByLabelText(/confirmar contraseña/i);

    fireEvent.change(nombre, { target: { value: 'alejandro' } });
    fireEvent.change(email, { target: { value: 'ale@gmail.com' } });
    fireEvent.change(telefono, { target: { value: '+56912345678' } });
    fireEvent.change(fechaNacimiento, { target: { value: '1990-05-15' } });
    fireEvent.change(direccion, { target: { value: 'Calle Principal 123' } });
    fireEvent.change(password, { target: { value: 'wacoldo12' } });
    fireEvent.change(confirmPassword, { target: { value: 'wacoldo12' } });
};

describe('RegistroForm', () => {
    beforeEach(() => {
        // Limpiar localStorage antes de cada prueba
        localStorage.clear();
        // Limpiar mocks
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    // ========== PRUEBA 1: formulario ==========
    it('debe renderizar todos los campos del formulario correctamente', () => {
        renderComponent();

        // Verificar que todos los campos estén presentes
        expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/código promocional/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();

        // Verificar botón de submit
        expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();

        // Verificar link de inicio de sesión
        expect(screen.getByText(/¿ya tienes cuenta\?/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /inicia sesión/i })).toBeInTheDocument();
    });

    // ========== PRUEBA 2: Registro exitoso de usuario normal ==========
    it('debe registrar un usuario exitosamente con datos válidos', async () => {
        // Asegurar limpieza total antes de iniciar
        localStorage.removeItem('usuariosRegistrados');
        renderComponent();
        fillFormWithValidData();

        // Hacer submit del formulario
        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        fireEvent.click(submitButton);

        // Esperar a que se procese el registro
        await waitFor(() => {
            // Verificar que se llamó alert con mensaje de éxito
            expect(mockAlert).toHaveBeenCalled();
            const alertMsg = mockAlert.mock.calls.at(-1)?.[0] as string | undefined;
            expect(alertMsg).toBeDefined();
            expect(alertMsg).toMatch(/Cuenta creada exitosamente/i);

            // Verificar que se guardó en localStorage solo el nuevo usuario
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
            expect(usuariosRegistrados).toHaveLength(1);
            const usuario = usuariosRegistrados[0];
            expect(usuario.email).toBe('ale@gmail.com');
            expect(usuario.nombre).toBe('alejandro');
            expect(usuario.descuentoPorcentaje).toBe(0); // Sin beneficios especiales

            // Verificar que se navegó a /account
            expect(mockNavigate).toHaveBeenCalledWith('/account');
        });
    });

    // ========== PRUEBA 3: Validación de contraseñas no coinciden ==========
    it('debe mostrar error cuando las contraseñas no coinciden', async () => {
        renderComponent();

        const nombre = screen.getByLabelText(/nombre completo/i);
        const email = screen.getByLabelText(/correo electrónico/i);
        const telefono = screen.getByLabelText(/teléfono/i);
        const fechaNacimiento = screen.getByLabelText(/fecha de nacimiento/i);
        const direccion = screen.getByLabelText(/dirección/i);
        const password = screen.getByLabelText(/^contraseña$/i);
        const confirmPassword = screen.getByLabelText(/confirmar contraseña/i);

        fireEvent.change(nombre, { target: { value: 'matiux' } });
        fireEvent.change(email, { target: { value: 'mat@gmail.com' } });
        fireEvent.change(telefono, { target: { value: '+56912345678' } });
        fireEvent.change(fechaNacimiento, { target: { value: '1990-05-15' } });
        fireEvent.change(direccion, { target: { value: 'Calle Principal 123' } });
        fireEvent.change(password, { target: { value: 'pollo12' } });
        fireEvent.change(confirmPassword, { target: { value: 'pollo12' } }); // Diferente

        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Las contraseñas no coinciden');
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    // ========== PRUEBA 4: Detección de correo Duoc UC y promoción ==========
    it('debe mostrar mensaje de promoción cuando se ingresa email Duoc UC', async () => {
        renderComponent();

        const email = screen.getByLabelText(/correo electrónico/i);
        
        // Ingresar email de Duoc UC
        fireEvent.change(email, { target: { value: 'estudiante@duoc.cl' } });

        // Verificar que aparece el mensaje de promoción
        await waitFor(() => {
            expect(screen.getByText(/correo duoc uc detectado/i)).toBeInTheDocument();
            expect(screen.getByText(/torta gratis en tu cumpleaños/i)).toBeInTheDocument();
        });
    });

    // ========== PRUEBA 5: Código promocional FELICES50 y beneficios ==========
    it('debe aplicar beneficios correctamente con código FELICES50', async () => {
        renderComponent();

        const nombre = screen.getByLabelText(/nombre completo/i);
        const email = screen.getByLabelText(/correo electrónico/i);
        const telefono = screen.getByLabelText(/teléfono/i);
        const fechaNacimiento = screen.getByLabelText(/fecha de nacimiento/i);
        const direccion = screen.getByLabelText(/dirección/i);
        const codigoPromocional = screen.getByLabelText(/código promocional/i);
        const password = screen.getByLabelText(/^contraseña$/i);
        const confirmPassword = screen.getByLabelText(/confirmar contraseña/i);

        // Llenar formulario con usuario menor de 50 años y código FELICES50
        fireEvent.change(nombre, { target: { value: 'gustaviño' } });
        fireEvent.change(email, { target: { value: 'gus@gmail.com' } });
        fireEvent.change(telefono, { target: { value: '+56987654321' } });
        fireEvent.change(fechaNacimiento, { target: { value: '2000-01-01' } }); // Menor de 50
        fireEvent.change(direccion, { target: { value: 'Av Principal 456' } });
        fireEvent.change(codigoPromocional, { target: { value: 'FELICES50' } });
        fireEvent.change(password, { target: { value: 'tussi123' } });
        fireEvent.change(confirmPassword, { target: { value: 'tussi123' } });

        // Verificar que aparece mensaje de código válido
        await waitFor(() => {
            expect(screen.getByText(/código válido/i)).toBeInTheDocument();
            expect(screen.getByText(/10% de descuento de por vida/i)).toBeInTheDocument();
        });

        // Hacer submit
        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Verificar que se aplicó el descuento del 10%
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
            expect(usuariosRegistrados[0].tieneDescuentoFelices50).toBe(true);
            expect(usuariosRegistrados[0].descuentoPorcentaje).toBe(10);
            
            // Verificar que el alert incluye el beneficio
            expect(mockAlert).toHaveBeenCalledWith(
                expect.stringContaining('10% de descuento de por vida con código FELICES50')
            );
        });
    });
});
