import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Apartment from './Apartment'

describe('Apartment', () => {
    test('display apartment image, name and link to details', () => {
        // had to wrap it in Router cause it uses react-router's Link
        render(
            <Apartment
                key="test-apartment-id"
                name="test apartment"
                slug="test-apartment"
                image="test-apartment.jpeg"
            />,
            { wrapper: MemoryRouter }
        )

        const link = screen.getByRole('link')
        expect(link).toHaveTextContent('Features')
        expect(link).toHaveAttribute('href', '/apartments/test-apartment')
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'test-apartment.jpeg'
        )
        expect(screen.getByText('test apartment')).toBeInTheDocument()
    })
})
