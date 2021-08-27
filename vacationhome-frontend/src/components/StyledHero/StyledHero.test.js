import { render } from '@testing-library/react'
import StyledHero from './StyledHero'

describe('StyledHero', () => {
    test('renders correctly', () => {
        const { container } = render(
            <StyledHero>
                <p>hello</p>
            </StyledHero>
        )

        expect(container).toMatchSnapshot()
    })
})
