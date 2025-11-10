import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from '../LoginForm'
import userEvent from '@testing-library/user-event';


//Pruebas unitaria Realizadas por @Dante

const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Link: ({ children, to }: any) => <a href={to}>{children}</a>, // ← AGREGAR Link
    }
})

vi.mock('../../../context/UserContext', () => ({
    useUser: () => ({
        login: mockLogin,
        user: null,
    }),
}))


const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })


const mockAlert = vi.fn()
Object.defineProperty(window, 'alert', { value: mockAlert })


vi.mock('../InputField', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InputField: ({ label, name, value, onChange, placeholder, type }: any) => (
        <div>
        <label htmlFor={name}>{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            data-testid={name}
        />
        </div>
    ),
}))

vi.mock('../RememberMeCheckbox', () => ({
    RememberMeCheckbox: () => (
        <div>
        <input type="checkbox" data-testid="remember-me" />
        <label>Recordarme</label>
        </div>
    ),
}))

vi.mock('../ForgotPasswordLink', () => ({
    ForgotPasswordLink: () => (
        <a href="/forgot-password" data-testid="forgot-password">
        ¿Olvidaste tu contraseña?
        </a>
    ),
}))

describe('LoginForm', () => {
    beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockClear()
    mockAlert.mockClear()
})

const renderComponent = () => {
    return render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    )
}

  //TEST 1: Renderizado del formulario
  // Se comprueba que el formulario de inicio de sesion se muestra correctamente en pantalla.
test('debe renderizar el formulario de login', () => {
    renderComponent()

    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('remember-me')).toBeInTheDocument()
    expect(screen.getByTestId('forgot-password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
})


  //TEST 2: Interacción con los campos de correo y contraseña
  // Se comprueba que el usuario pueda escribir su correo y contraseña correctamente y sin problemas.
test('debe permitir ingresar email y contraseña', async () => {
    renderComponent()
    const user = userEvent.setup()

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
})

  //TEST 3: no hay usuarios registrados
  // Simula que no hayan usuarios guardados dentro del sistema
  // El sistema debe mostrar una alerta y redirigirlo a registro.
test('debe mostrar error cuando no hay usuarios registrados', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    renderComponent()
    const user = userEvent.setup()

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(mockAlert).toHaveBeenCalledWith('No hay usuarios registrados. Por favor regístrate primero.')
    expect(mockNavigate).toHaveBeenCalledWith('/registro')
    })

  //TEST 4: Inicio de sesión exitoso
  // Simular que los datos ingresados coincidan con un usuario que ya este registrado.
  // Debe iniciar sesión, mostrar alerta y redirigir al perfil.
    test('debe iniciar sesión exitosamente con credenciales válidas', async () => {

    const mockUser = {
        email: 'encorbadinclipforzado@gmail.com',
        password: 'mish323',
        name: 'Usuario de Prueba',
        id: 1
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockUser]))
    
    renderComponent()
    const user = userEvent.setup()

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'encorbadinclipforzado@gmail.com')
    await user.type(passwordInput, 'mish323')
    await user.click(submitButton)


    expect(mockLogin).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenCalledWith(mockUser)
    expect(mockAlert).toHaveBeenCalledWith('¡Sesión iniciada exitosamente!')
    expect(mockNavigate).toHaveBeenCalledWith('/account')
    

    expect(localStorageMock.getItem).toHaveBeenCalledWith('usuariosRegistrados')
})

//TEST 5: Gmail no registrado
// Simula que el usuario esta intentando iniciar sesion con un correo que no existe dentro de los registros.
// Debe mostrar una alerta y redirigir a registro y no llamar al login.
test('debe mostrar error cuando el email no está registrado', async () => {

const existingUsers = [
    {
        email: 'otro@ejemplo.com',
        password: '123456',
        name: 'Otro Usuario'
    }
]

localStorageMock.getItem.mockReturnValue(JSON.stringify(existingUsers))

renderComponent()
const user = userEvent.setup()

const emailInput = screen.getByTestId('email')
const passwordInput = screen.getByTestId('password')
const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

await user.type(emailInput, 'noexiste@ejemplo.com')
await user.type(passwordInput, 'cualquiercontraseña')
await user.click(submitButton)

expect(mockAlert).toHaveBeenCalledWith('Email no registrado. Por favor regístrate primero.')
expect(mockNavigate).toHaveBeenCalledWith('/registro')
expect(mockLogin).not.toHaveBeenCalled()

expect(localStorageMock.getItem).toHaveBeenCalledWith('usuariosRegistrados')
})

})