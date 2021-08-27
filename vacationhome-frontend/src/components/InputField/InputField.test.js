import { render, screen } from '@testing-library/react'
import InputField from './InputField'

describe('InputField', () => {
    test('renders input and label with correct text and attributes', () => {
        render(
            <InputField
                label="test label"
                name="testName"
                value="testValue"
                onChange={() => {}}
            />
        )

        const input = screen.getByLabelText('test label')

        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('name', 'testName')
        expect(input).toHaveAttribute('value', 'testValue')
        expect(input).toHaveClass('form-control')
        expect(input.parentElement).toHaveClass('form-group')
    })
})
