import React, { useState, useEffect, useContext, useMemo } from 'react'
import API from 'services/api'

import { attachImagesToApartments } from 'utils/utils'

const apartmentContext = React.createContext()

export const useApartments = () => {
    return useContext(apartmentContext)
}

export function ApartmentProvider({ children }) {
    const [apartments, setApartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const { data } = await API.get('/apartment/all')
                if (!data || data.length === 0) throw new Error('No apartments')
                const apartmentsWithImages = attachImagesToApartments(data)
                setApartments(apartmentsWithImages)
                setLoading(false)
                setError(null)
            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            }
        }

        fetchApartments()
    }, [])

    const featuredApartments = useMemo(
        () => apartments.filter((data) => data.featured === true),
        [apartments]
    )

    const highestPrice = useMemo(
        () => Math.max(0, ...apartments.map((data) => +data.price)),
        [apartments]
    )

    //get apartment from state by slug
    const getApartmentBySlug = (slug) =>
        apartments.find((apartment) => apartment.slug === slug)

    const value = {
        apartments,
        loading,
        error,
        featuredApartments,
        highestPrice,
        getApartmentBySlug,
    }

    return (
        <apartmentContext.Provider value={value}>
            {children}
        </apartmentContext.Provider>
    )
}


