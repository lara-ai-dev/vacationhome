import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import NH_Logo from 'images/NH-Logo.png'
import { AuthProvider } from 'context/auth'
import userEvent from '@testing-library/user-event'

afterEach(() => localStorage.removeItem('user'))

describe('Navbar', () => {
    test('renders Logo and menu links correctly without user login', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        )

        const img1 = screen.getByRole('img')
        expect(img1).toHaveAttribute('src', NH_Logo)
        expect(img1.parentElement).toHaveAttribute('href', '/')


        const menu = screen.getByRole('list')
        expect(menu.childElementCount).toBe(4)

        const menuLinks = [
            { label: /home/i, href: '/' },
            { label: /apartments/i, href: '/apartments' },
            { label: /login/i, href: '/login' },
            { label: /sign up/i, href: '/register' },
        ]

        menuLinks.forEach((link) =>
            expect(screen.getByText(link.label)).toHaveAttribute('href', link.href)
        )
    })

    test('renders correct menu links when user is logged in with USER role', () => {
        const fakeUser = {
            id: 123,
            username: 'testname',
            email: 'test@example.com',
            roles: ['ROLE_USER'],
            tokenType: 'Bearer',
            accessToken: 'fake_access_token',
        }
        localStorage.setItem('user', JSON.stringify(fakeUser))

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        )

        const menu = screen.getByRole('list')
        expect(menu.childElementCount).toBe(5)

        const menuLinks = [
            { label: /home/i, href: '/' },
            { label: /apartments/i, href: '/apartments' },
            { label: /review/i, href: '/user' },
            { label: fakeUser.username, href: '/profile' },
            { label: /logout/i, href: '/login' },
        ]

        menuLinks.forEach((link) =>
            expect(screen.getByText(link.label)).toHaveAttribute('href', link.href)
        )
    })

    test('renders correct menu links when user is logged in with ADMIN role', () => {
        const fakeUser = {
            id: 123,
            username: 'testname',
            email: 'test@example.com',
            roles: ['ROLE_ADMIN'],
            tokenType: 'Bearer',
            accessToken: 'fake_access_token',
        }
        localStorage.setItem('user', JSON.stringify(fakeUser))

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        )

        const menu = screen.getByRole('list')
        expect(menu.childElementCount).toBe(5)

        const menuLinks = [
            { label: /home/i, href: '/' },
            { label: /apartments/i, href: '/apartments' },
            { label: /reservations/i, href: '/admin' },
            { label: fakeUser.username, href: '/profile' },
            { label: /logout/i, href: '/login' },
        ]

        menuLinks.forEach((link) =>
            expect(screen.getByText(link.label)).toHaveAttribute('href', link.href)
        )
    })

    test('logout correctly and redirect to /login when user click logout', async () => {
        const fakeUser = {
            id: 123,
            username: 'testname',
            email: 'test@example.com',
            roles: ['ROLE_USER'],
            tokenType: 'Bearer',
            accessToken: 'fake_access_token',
        }
        localStorage.setItem('user', JSON.stringify(fakeUser))

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Navbar />
                    <Route exact path="/login">
                        Login Page
                    </Route>
                </MemoryRouter>
            </AuthProvider>
        )

        userEvent.click(screen.getByText(/logout/i))

        await waitFor(() => screen.getByText('Login Page'))

        expect(localStorage.getItem('user')).toBeNull()
    })
})
