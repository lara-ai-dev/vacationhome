import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ApartmentList from './ApartmentList'

describe('ApartmentList', () => {
    test('display a message if apartments prop is empty or undefined', () => {
        const { container: container1 } = render(<ApartmentList apartments={[]} />)
        const { container: container2 } = render(<ApartmentList />)

        expect(container1).toHaveTextContent(
            'unfortunately no apartments match your search parameters'
        )

        expect(container2).toHaveTextContent(
            'unfortunately no apartments match your search parameters'
        )
    })

    test('display all apartments if revived apartments array', () => {
        const apartments = [
            {
                apartmentId: 'apartment1-id',
                name: 'apartment1',
                slug: 'apartment1-slug',
                images: ['apartment1.jpeg', 'apartment1-a.jpeg'],
            },
            {
                apartmentId: 'apartment2-id',
                name: 'apartment2',
                slug: 'apartment2-slug',
                images: ['apartment2.jpeg'],
            },
        ]

        render(<ApartmentList apartments={apartments} />, { wrapper: MemoryRouter })

        expect(screen.getAllByTestId('apartment')).toHaveLength(2)
        expect(screen.getByText('apartment1')).toBeInTheDocument()
        expect(screen.getByText('apartment2')).toBeInTheDocument()
    })
})
