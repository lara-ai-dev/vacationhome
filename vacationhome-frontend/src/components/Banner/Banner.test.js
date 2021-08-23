import { render, screen } from '@testing-library/react'
import Banner from './Banner'

describe('Banner', () => {
    test('displays a heading with title and its children', () => {
        render(
            <Banner title="Test Title">
                <p>test child</p>
            </Banner>
        )

        expect(screen.getByRole('heading')).toHaveTextContent('Test Title')
    })
})
