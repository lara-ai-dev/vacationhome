import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter, Route } from 'react-router-dom'
import Login from './Login'
import { AuthProvider } from 'context/auth'
import API from 'services/api'

const { baseURL } = API.defaults

const fakeLoginData = {
    id: 1,
    username: 'testname',
    email: 'test@example.com',
    roles: ['ROLE_USER'],
    tokenType: 'Bearer',
    accessToken: 'fake_access_token',
}

const server = setupServer(
    rest.post(`${baseURL}/auth/signin`, (req, res, ctx) => {
        const { username, password } = req.body
        if (username === 'testname' && password === 'testpass') {
            return res(ctx.json(fakeLoginData))
        } else {
            return res(ctx.status(401))
        }
    })
)

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    localStorage.removeItem('user')
})
afterAll(() => server.close())

describe('Login', () => {
    test('renders correctly and redirect to /profile when login is successful', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                    <Route exact path="/profile">
                        Profile Page
                    </Route>
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), 'testname')
        userEvent.type(screen.getByLabelText(/password/i), 'testpass')
        userEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => screen.getByText('Profile Page'))

        expect(localStorage.getItem('user')).toBe(JSON.stringify(fakeLoginData))
    })

    test('shows correct error when user enter wrong username and password', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), 'wronguser')
        userEvent.type(screen.getByLabelText(/password/i), 'worngpass')
        userEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => screen.getByTestId('form-message'))

        expect(screen.getByTestId('form-message')).toHaveTextContent(
            /Request failed with status code 401/i
        )
    })

    test('shows correct error when when it get server error', async () => {
        server.resetHandlers(
            rest.post('http://localhost:8080/api/auth/signin', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), 'wronguser')
        userEvent.type(screen.getByLabelText(/password/i), 'worngpass')
        userEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => screen.getByTestId('form-message'))

        expect(screen.getByTestId('form-message')).toHaveTextContent(
            /Request failed with status code 500/i
        )
    })
})
