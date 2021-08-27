import { render, screen } from '@testing-library/react'
import Title from './Title'

describe('Title', () => {
    test('renders a heading with the given title', () => {
        render(<Title title="test title" />)
        expect(screen.getByRole('heading')).toHaveTextContent('test title')
    })
})
