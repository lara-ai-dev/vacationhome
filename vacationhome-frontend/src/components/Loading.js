import React from 'react'
import loadingGif from '../images/gif/loading-animation.gif'

//loading function for when data is loading
export default function Loading() {
    return (
        <div className="loading">
        <h4>Rooms data loading...</h4>
        <img src={loadingGif} alt=""/>
        </div>
    )
}
