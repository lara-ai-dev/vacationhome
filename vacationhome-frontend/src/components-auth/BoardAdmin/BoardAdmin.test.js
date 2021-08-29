import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import BoardAdmin from './BoardAdmin'
import API from 'services/api'

const { baseURL } = API.defaults

const fakeReservatoins = [
    {
        id: 1,
        reservationId: null,
        apartmentId: 1,
        hasRoom: true,
        price: 12.9,
        noGuests: 12,
        payment: true,
        billingAddress: 'testreservation',
        checkInDate: '2021-02-28T22:00:00.000+00:00',
        checkOutDate: '2021-03-02T22:00:00.000+00:00',
        reservationNumber: 1234,
        email: 'admin@vacationhome.com',
        guest: null,
    },
]

const server = setupServer(
    rest.get(`${baseURL}/reservation/all`, (req, res, ctx) => {
        return res(ctx.json(fakeReservatoins))
    }),
    rest.delete(`${baseURL}/reservation/:id`, (req, res, ctx) => {
        return res(ctx.status(200))
    })
)

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    localStorage.removeItem('user')
})
afterAll(() => server.close())

describe('BoardAdmin', () => {
    test('renders reservations table', async () => {
        render(<BoardAdmin />)

        screen.debug()

        expect(
            screen.getByRole('heading', { name: /OVERVIEW RESERVATIONS/i })
        ).toBeInTheDocument()

        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
