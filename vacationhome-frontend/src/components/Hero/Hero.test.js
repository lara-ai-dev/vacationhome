import { render, screen } from '@testing-library/react'
import Hero from './Hero'

const DEFAULT_CLASS = 'defaultHero'

describe('Hero', () => {
    test('displays its children in header tag with default className', () => {
        render(
            <Hero>
                <p>hello</p>
            </Hero>
        )

        const hero = screen.getByTestId('hero')

        expect(hero).toHaveTextContent('hello')
        expect(hero).toHaveClass(DEFAULT_CLASS)
    })

    test('passes className prop to header tag', () => {
        render(<Hero className="test"></Hero>)

        expect(screen.getByTestId('hero')).toHaveClass('test')
    })
})
