import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'

import { ApartmentProvider } from 'context/apartments'
import API from 'services/api'
import FilteredApartmentsContainer from './FilteredApartmentsContainer'

const { baseURL } = API.defaults

const fakeData = [
    {
        apartmentId: 0,
        name: 'test name 0',
        slug: 'test-slug-0',
        type: 'family',
        price: 50,
        capacity: 2,
        featured: true,
        description: 'test description 0',
    },
    {
        apartmentId: 1,
        name: 'test name 1',
        slug: 'test-slug-1',
        type: 'friends',
        price: 10,
        capacity: 4,
        featured: true,
        description: 'test description 1',
    },
    {
        apartmentId: 2,
        name: 'test name 2',
        slug: 'test-slug-2',
        type: 'family',
        price: 33,
        capacity: 4,
        featured: true,
        description: 'test description 2',
    },
    {
        apartmentId: 3,
        name: 'test name 3',
        slug: 'test-slug-3',
        type: 'couple',
        price: 200,
        capacity: 1,
        featured: false,
        description: 'test description 3',
    },
]

const server = setupServer(
    rest.get(`${baseURL}/apartment`, (req, res, ctx) => {
        return res(ctx.json(fakeData))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('FilteredApartmentsContainer', () => {
    test('renders filters and filtered apartments list correctly initially and when filters changes', async () => {
        render(
            <ApartmentProvider>
                <MemoryRouter>
                    <FilteredApartmentsContainer />
                </MemoryRouter>
            </ApartmentProvider>
        )

        // it render Loading while fetching
        expect(screen.getByTestId('loading')).toBeInTheDocument()

        // wait and check if it renders ApartmentFilter and ApartmentList
        await waitFor(() => screen.getByTestId('apartment-filter'))
        expect(screen.getByTestId('apartment-list')).toBeInTheDocument()

        const guestsInput = screen.getByLabelText(/guests/i)
        const priceInput = screen.getByLabelText(/maximum price/i)

        // initially it renders all apartments
        expect(screen.getAllByTestId('apartment')).toHaveLength(fakeData.length)
        expect(screen.getByText(/test name 0/i)).toBeInTheDocument()

        // it renders all filters with correct attributes and default values
        expect(screen.getAllByRole('option')).toHaveLength(4)
        expect(guestsInput).toHaveValue('0')
        expect(priceInput).toHaveAttribute('min', '0')
        expect(priceInput).toHaveAttribute('max', '200')
        expect(priceInput).toHaveValue('200')

        // changing guests filter will filter the list correctly

        // change capacity to 2
        userEvent.selectOptions(guestsInput, '2')
        await waitFor(() =>
            expect(screen.getAllByTestId('apartment')).toHaveLength(1)
        )

        // change capacity to 4
        userEvent.selectOptions(guestsInput, '4')
        await waitFor(() =>
            expect(screen.getAllByTestId('apartment')).toHaveLength(2)
        )

        // reset capacity to All
        userEvent.selectOptions(guestsInput, '0')
        await waitFor(() =>
            expect(screen.getAllByTestId('apartment')).toHaveLength(4)
        )

        // change price to 40
        fireEvent.change(priceInput, { target: { value: '40' } })
        await waitFor(() =>
            expect(screen.getAllByTestId('apartment')).toHaveLength(2)
        )
        expect(screen.getByText(/test name 1/i)).toBeInTheDocument()
        expect(screen.getByText(/test name 2/i)).toBeInTheDocument()
    })
})
