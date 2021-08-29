import React from 'react'
import loadingGif from 'images/gif/loading-animation.gif'

//loading function for when data is loading
export default function Loading() {
    return (
        <div data-testid="loading" className="loading">
            <h4>Apartments data loading...</h4>
            <img src={loadingGif} alt="loading" />
        </div>
    )
}
