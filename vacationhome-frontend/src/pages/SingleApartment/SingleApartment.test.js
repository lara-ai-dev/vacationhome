import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import API from 'services/api'
import { ApartmentProvider } from 'context/apartments'
import SingleApartment from './SingleApartment'

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
    rest.get(`${baseURL}/apartment/all`, (req, res, ctx) => {
        return res(ctx.json(fakeData))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('SingleApartment', () => {
    test('renders the correct apartment', async () => {
        const apart = fakeData[1]
        const history = createMemoryHistory()
        history.push(`/apartments/${apart.slug}`)

        render(
            <ApartmentProvider>
                <Router history={history}>
                    <Route exact path="/apartments/:slug" component={SingleApartment} />
                </Router>
            </ApartmentProvider>
        )

        await waitFor(() =>
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
                apart.name
            )
        )

        expect(
            screen.getByRole('link', { name: /BOOK APARTMENT/i })
        ).toHaveAttribute('href', '/register')

        expect(
            screen.getByRole('heading', { name: /details/i }).nextSibling
        ).toHaveTextContent(apart.description)

        expect(
            screen.getByRole('heading', { name: /info/i }).nextSibling
        ).toHaveTextContent(apart.price)

        expect(screen.getByText(/max capacity/i)).toHaveTextContent(apart.capacity)
    })

    test('render correct message and link when apartment slug does not exist', async () => {
        const history = createMemoryHistory()
        history.push('/apartments/wrong-slug')

        render(
            <ApartmentProvider>
                <Router history={history}>
                    <Route exact path="/apartments/:slug" component={SingleApartment} />
                </Router>
            </ApartmentProvider>
        )

        await waitFor(() =>
            expect(screen.getByRole('heading')).toHaveTextContent(
                /No such apartment could be found.../i
            )
        )

        expect(
            screen.getByRole('link', { name: /Back to apartments/i })
        ).toHaveAttribute('href', '/apartments')

        await waitFor(() => Promise.resolve())
    })
})
