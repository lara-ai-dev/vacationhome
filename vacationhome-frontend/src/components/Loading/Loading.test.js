import { render, screen } from '@testing-library/react'
import loadingGif from 'images/gif/loading-animation.gif'
import Loading from './Loading'

describe('Loading', () => {
    test('display loading text and image', () => {
        render(<Loading />)

        expect(screen.getByRole('heading')).toHaveTextContent(
            'Apartments data loading...'
        )

        expect(screen.getByRole('img')).toHaveAttribute('alt', 'loading')
        expect(screen.getByRole('img')).toHaveAttribute('src', loadingGif)
    })
})
