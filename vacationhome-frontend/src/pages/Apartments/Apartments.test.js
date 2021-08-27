import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'

import API from 'services/api'
import { ApartmentProvider } from 'context/apartments'
import Apartments from './Apartments'

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
]

const server = setupServer(
    rest.get(`${baseURL}/apartment`, (req, res, ctx) => {
        return res(ctx.json(fakeData))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Apartments', () => {
    test('renders Hero and FilteredApartmentContainer', async () => {
        render(
            <ApartmentProvider>
                <MemoryRouter>
                    <Apartments />
                </MemoryRouter>
            </ApartmentProvider>
        )

        await waitForElementToBeRemoved(() => screen.getByTestId('loading'))

        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('apartment-filter')).toBeInTheDocument()
        expect(screen.getByTestId('apartment-list')).toBeInTheDocument()
        expect(screen.getAllByTestId('apartment')).toHaveLength(2)
    })
})
