import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Error from './Error'

describe('Error', () => {
    test('renders correctly with error code and link to home', () => {
        render(<Error />, { wrapper: MemoryRouter })

        expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: /Return Home/i })
        ).toBeInTheDocument()
    })
})
