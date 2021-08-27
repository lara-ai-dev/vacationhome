import {
    render,
    waitFor,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'
import Register from './Register'
import { AuthProvider } from 'context/auth'
import API from 'services/api'

const { baseURL } = API.defaults

const server = setupServer(
    rest.post(`${baseURL}/auth/signup`, (req, res, ctx) => {
        return req.body.username !== 'existing_name'
            ? res(ctx.json({ message: 'Success!' }))
            : res(ctx.status(400), ctx.json({ message: 'Username taken!' }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Register', () => {
    it('renders correctly and show success message from the server', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), 'testname')
        userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
        userEvent.type(screen.getByLabelText(/password/i), 'testpass')
        userEvent.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => screen.getByText('Success!'))

        expect(screen.queryByLabelText(/username/i)).toBeNull()
    })

    test('shows error message from server when entering existing username', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), 'existing_name')
        userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
        userEvent.type(screen.getByLabelText(/password/i), 'testpass')
        userEvent.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => screen.getByRole('alert'))

        expect(screen.getByRole('alert')).toHaveTextContent('Username taken!')
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    test('shows validation errors on invalid entries', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.type(screen.getByLabelText(/username/i), '')
        userEvent.type(screen.getByLabelText(/email/i), '')
        userEvent.type(screen.getByLabelText(/password/i), '')
        userEvent.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => screen.getAllByRole('alert'))
        expect(
            screen.getByText(/username is a required field/i)
        ).toBeInTheDocument()
        expect(screen.getByText(/email is a required field/i)).toBeInTheDocument()
        expect(
            screen.getByText(/password is a required field/i)
        ).toBeInTheDocument()

        userEvent.type(screen.getByLabelText(/username/i), 'aa')
        userEvent.type(screen.getByLabelText(/email/i), 'aaa')
        userEvent.type(screen.getByLabelText(/password/i), 'aa')

        await waitFor(() =>
            expect(screen.getByText('username must be at least 5 characters'))
        )
        expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument()
        expect(
            screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument()

        userEvent.type(screen.getByLabelText(/username/i), 'existing_name')
        userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
        userEvent.type(screen.getByLabelText(/password/i), 'testpass')

        await waitForElementToBeRemoved(
            screen.queryByText(/username must be at least 5 characters/i)
        )
    })
})
