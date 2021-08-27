import { render, screen } from '@testing-library/react'
import Profile from './Profile'

const fakeUser = {
    id: 123,
    username: 'testname',
    email: 'test@example.com',
    roles: ['ROLE_USER'],
    tokenType: 'Bearer',
    accessToken: 'fake_access_token',
}

describe('Login', () => {
    test('renders profile personal information and Make Reservation form', async () => {
        localStorage.setItem('user', JSON.stringify(fakeUser))
        render(<Profile />)

        // user info section

        const { username, email, roles } = fakeUser

        const personalInfoSection = screen.getByTestId('personal-info')

        expect(
            screen.getByRole('heading', {
                name: `${username} Profile`,
            })
        ).toBeInTheDocument()

        expect(personalInfoSection).toHaveTextContent(email, { exact: false })
        roles.forEach((role) => {
            expect(personalInfoSection).toHaveTextContent(role, { exact: false })
        })

        // MAKE RESERVATION

        expect(
            screen.getByRole('heading', { name: /MAKE RESERVATION/i })
        ).toBeInTheDocument()

        expect(screen.getByTestId('reservation-form')).toBeInTheDocument()

        expect(screen.getByLabelText(/Email address/i)).toHaveAttribute(
            'value',
            email
        )
        expect(screen.getByLabelText(/Select Apartment/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Checkin date/i)).toHaveAttribute(
            'type',
            'date'
        )
        expect(screen.getByLabelText(/Checkout date/i)).toHaveAttribute(
            'type',
            'date'
        )
        expect(screen.getByLabelText(/Number of Guests/i)).toHaveAttribute(
            'type',
            'number'
        )
        expect(screen.getByRole('button', { name: /Reserve/i })).toHaveAttribute(
            'type',
            'submit'
        )
    })
})
