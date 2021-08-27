import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ApartmentList from './ApartmentList'

describe('ApartmentList', () => {
    test('display a message if rooms prop is empty or undefined', () => {
        const { container: container1 } = render(<ApartmentList rooms={[]} />)
        const { container: container2 } = render(<ApartmentList />)

        expect(container1).toHaveTextContent(
            'unfortunately no rooms match your search parameters'
        )

        expect(container2).toHaveTextContent(
            'unfortunately no rooms match your search parameters'
        )
    })

    test('display all rooms if revived rooms array', () => {
        const rooms = [
            {
                id: 'room1-id',
                name: 'room1',
                slug: 'room1-slug',
                image: ['room1.jpeg', 'room1-a.jpeg'],
            },
            {
                id: 'room2-id',
                name: 'room2',
                slug: 'room2-slug',
                image: ['room2.jpeg'],
            },
        ]

        render(<ApartmentList rooms={rooms} />, { wrapper: MemoryRouter })

       // expect(screen.getAllByTestId('room')).toHaveLength(2)
        expect(screen.getByText('room1')).toBeInTheDocument()
        expect(screen.getByText('room2')).toBeInTheDocument()
    })
})
