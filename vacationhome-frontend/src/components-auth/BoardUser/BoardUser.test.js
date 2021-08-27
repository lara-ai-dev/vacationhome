import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import BoardUser from './BoardUser'
import API from 'services/api'
import userEvent from '@testing-library/user-event'

jest.spyOn(window, 'alert').mockImplementation(() => {})

const fakeUser = {
    id: 123,
    username: 'testname',
    email: 'test@example.com',
    roles: ['ROLE_USER'],
    tokenType: 'Bearer',
    accessToken: 'fake_access_token',
}

const { baseURL } = API.defaults
const server = setupServer(
    rest.post(`${baseURL}/review`, (req, res, ctx) => {
        const { comment, rating, userName } = req.body
        if (comment && rating && userName) {
            return res(ctx.json({ commentId: 123, comment, rating, userName }))
        } else {
            console.log('req.body:', req.body)
            return res(ctx.status(400))
        }
    })
)

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    localStorage.removeItem('user')
})
afterAll(() => server.close())

describe('BoardUser', () => {
    test('renders and submits review form correctly', async () => {
        localStorage.setItem('user', JSON.stringify(fakeUser))

        render(<BoardUser />)

        // assert initial values
        expect(screen.getByTestId('review-form')).toHaveFormValues({ comment: '' })

        // fill the form and assert values

        const myComment = 'test test',
            myRating = '4'
        userEvent.type(screen.getByLabelText(/Your Review/i), myComment)
        userEvent.click(document.getElementById(`rating_${myRating}`))

        expect(screen.getByTestId('review-form')).toHaveFormValues({
            comment: myComment,
            rating: myRating,
        })

        // submit the form
        userEvent.click(screen.getByRole('button', { name: /submit/i }))

        await waitFor(() =>
            expect(screen.getByTestId('review-form')).toHaveFormValues({
                comment: '',
            })
        )

        expect(window.alert).toHaveBeenCalled()
    })
})
