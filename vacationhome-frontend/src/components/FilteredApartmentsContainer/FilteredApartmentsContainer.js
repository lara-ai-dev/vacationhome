import { useEffect, useMemo, useState } from 'react'

import ApartmentsFilter from 'components/ApartmentFilter/ApartmentFilter'
import ApartmentsList from 'components/ApartmentList/ApartmentList'
import Loading from 'components/Loading/Loading'
import { useApartments } from 'context/apartments'
import { filterApartments, getUnique } from 'utils/utils'

export default function FilteredApartmentsContainer() {
    const { apartments, loading, error, highestPrice } = useApartments()

    const [filters, setFilters] = useState({
        capacity: 0,
        maxPrice: highestPrice,
        minPrice: 0,
        type: 'all',
    })

    useEffect(() => {
        setFilters((filters) => ({
            ...filters,
            maxPrice: highestPrice,
        }))
    }, [highestPrice])

    const filteredApartments = useMemo(
        () => filterApartments(apartments, filters),
        [apartments, filters]
    )

    const setFilter = (name, value) => {
        if (filters.hasOwnProperty(name))
            setFilters({
                ...filters,
                [name]: value,
            })
    }

    const uniqueCapacities = getUnique(apartments, 'capacity')

    if (loading) return <Loading />
    if (error) return <p>{error.message}</p>

    return (
        <>
            <ApartmentsFilter
                apartments={apartments}
                filters={filters}
                highestPrice={highestPrice}
                uniqueCapacities={uniqueCapacities}
                setFilter={setFilter}
            />
            <ApartmentsList apartments={filteredApartments} />
        </>
    )
}



/*import React from 'react'
import ApartmentFilter from '../ApartmentFilter/ApartmentFilter';
import ApartmentList from '../ApartmentList/ApartmentList';
import { withRoomConsumer } from '../../context';
import Loading from '../Loading/Loading';


function FilteredApartmentsContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <ApartmentFilter rooms={rooms} />
            <ApartmentList rooms={sortedRooms} />
        </>
        );

}


export default withRoomConsumer(FilteredApartmentsContainer)*/
