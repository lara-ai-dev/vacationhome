import { render, screen } from '@testing-library/react'
import Button from './Button'

const DEFAULT_LABEL = 'label'
const CLASS = 'btn btn--registration'

describe('Button', () => {
    test('displays a button with given label and specific className', () => {
        render(<Button>Click me</Button>)

        const btn = screen.getByRole('button')

        expect(btn).toHaveTextContent('Click me')
        expect(btn).toHaveClass(CLASS)
    })

    test('show default label when empty', () => {
        render(<Button />)

        expect(screen.getByRole('button')).toHaveTextContent(DEFAULT_LABEL)
    })
})
