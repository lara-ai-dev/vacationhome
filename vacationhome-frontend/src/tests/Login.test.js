import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
    render,
    waitFor,
    screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../components-auth/Login'

const fakeLoginData = {
    id: 1,
    username: 'testname',
    email: 'test@example.com',
    roles: ['ROLE_USER'],
    tokenType: 'Bearer',
    accessToken: 'fake_access_token',
}

const server = setupServer(
    rest.post('http://localhost:8080/api/auth/signin', (req, res, ctx) => {
        const { username, password } = req.body
        if (username === 'testname' && password === 'testpass') {
            return res(ctx.json(fakeLoginData))
        } else {
            return res(ctx.status(401))
        }
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<Login />', () => {
    it('should render correctly and redirect to /profile when login is successful', async () => {
        const history = createMemoryHistory()
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        render(
            <Router history={history}>
                <Login />
                <Route exact path="/profile" component={() => <p>Profile</p>}/>
            </Router>
        )

        expect(screen.getByRole('button')).toHaveTextContent(/login/i)

        userEvent.type(screen.getByLabelText(/username/i), 'testname')
        userEvent.type(screen.getByLabelText(/password/i), 'testpass')
        userEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => screen.getByText(/profile/i))

        expect(history.location.pathname).toBe('/profile')

        expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(fakeLoginData))
    })

    it('should show error message when user enter wrong username and password', async () => {
        render(<Login />)

        userEvent.type(screen.getByLabelText(/username/i), 'wronguser')
        userEvent.type(screen.getByLabelText(/password/i), 'worngpass')
        userEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => screen.getByTestId('form-message'))

        expect(screen.getByTestId('form-message')).toHaveTextContent(/Request failed with status code 401/i)

    })
})