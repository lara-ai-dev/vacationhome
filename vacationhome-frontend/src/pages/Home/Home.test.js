import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'

import { ApartmentProvider } from 'context/apartments'
import API from 'services/api'
import Home from './Home'

const { baseURL } = API.defaults

const fakeAparments = [
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
        apartmentId: 2,
        name: 'test name 2',
        slug: 'test-slug-2',
        type: 'family',
        price: 33,
        capacity: 4,
        featured: false,
        description: 'test description 2',
    },
]

const fakeReviews = [
    {
        commentId: 1,
        comment: 'nice comment',
        userName: 'commenter1',
        rating: 5,
    },
    {
        commentId: 2,
        comment: 'mean comment',
        userName: 'commenter2',
        rating: 2,
    },
]

const server = setupServer(
    rest.get(`${baseURL}/apartment`, (req, res, ctx) => {
        return res(ctx.json(fakeAparments))
    }),
    rest.get(`${baseURL}/review`, (req, res, ctx) => {
        return res(ctx.json(fakeReviews))
    }),
    rest.get(`${baseURL}/files`, (req, res, ctx) => {
        return res(ctx.json([]))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home', () => {
    test('it renders all sections correctly', async () => {
        render(
            <ApartmentProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </ApartmentProvider>
        )

        // it render Loading while fetching apartments
        expect(screen.getByTestId('loading')).toBeInTheDocument()

        // hero section
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /APARTMENT/i })).toHaveAttribute(
            'href',
            '/apartments'
        )

        // OUR APARTMENTS section
        expect(screen.getByTestId('featured-apartments')).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getAllByTestId('apartment')).toHaveLength(1)
        )

        // map section
        expect(
            screen.getByRole('heading', { name: /Location information/i })
        ).toBeInTheDocument()
        expect(screen.getByTitle('home-google-map')).toHaveAttribute('width', '600')
        expect(screen.getByTitle('home-google-map')).toHaveAttribute(
            'src',
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.8056335945616!2d7.220488215727086!3d50.33287737945927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be5ba7d0c092a1%3A0x964f96b779a765ad!2sAn%20der%20Bleiche%2C%2056727%20Mayen%2C%20Duitsland!5e0!3m2!1snl!2snl!4v1612106416181!5m2!1snl!2snl'
        )

        // reviews section
        expect(
            screen.getByRole('heading', { name: /Reviews/i })
        ).toBeInTheDocument()

        await waitFor(() => screen.getByText(/nice comment/i))
        expect(screen.getAllByTestId('review-item')).toHaveLength(2)
    })
})
