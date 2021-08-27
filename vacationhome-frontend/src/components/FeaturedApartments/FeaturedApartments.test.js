import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'

import { ApartmentProvider } from 'context/apartments'
import API from 'services/api'
import FeaturedApartments from './FeaturedApartments'

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
        featured: false,
        description: 'test description 1',
    },
    {
        apartmentId: 2,
        name: 'test name 2',
        slug: 'test-slug-2',
        type: 'family',
        price: 33,
        capacity: 4,
        featured: false,
        description: 'test description 2',
    },
    {
        apartmentId: 3,
        name: 'test name 3',
        slug: 'test-slug-3',
        type: 'couple',
        price: 200,
        capacity: 1,
        featured: true,
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

describe('FeaturedApartments', () => {
    test('display list of all featured apartments', async () => {
        render(
            <ApartmentProvider>
                <MemoryRouter>
                    <FeaturedApartments />
                </MemoryRouter>
            </ApartmentProvider>
        )

        // it render Loading while fetching
        expect(screen.getByTestId('loading')).toBeInTheDocument()

        let featured
        // wait and check if it renders ApartmentFilter and ApartmentList
        await waitFor(() => (featured = screen.getAllByTestId('apartment')))
        expect(featured).toHaveLength(2)

        const featNames = fakeData
            .filter((ap) => ap.featured === true)
            .map((ap) => ap.name)

        featNames.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument()
        })
    })
})
