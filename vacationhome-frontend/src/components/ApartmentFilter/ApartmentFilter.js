import Title from 'components/Title/Title'

export default function ApartmentFilter({filters, highestPrice, uniqueCapacities, setFilter,}) {


    let capacityOptions = uniqueCapacities.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ))

    return (
        <section data-testid="apartment-filter" className="filter__container">
            <Title title="search apartments" />
            <form className="filter__form">
                {/*guests*/}
                <div className="filter__form--group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={filters.capacity}
                        className="form-control"
                        onChange={(e) => setFilter('capacity', +e.target.value)}
                    >
                        <option key={'unset'} value={0}>
                            All
                        </option>
                        {capacityOptions}
                    </select>
                </div>
                {/* end guests*/}
                {/* apartment price*/}
                <div className="filter__form--groupp">
                    <label htmlFor="price">Maximum price ${filters.maxPrice}</label>
                    <input
                        type="range"
                        name="price"
                        min={0}
                        max={highestPrice}
                        id="price"
                        value={filters.maxPrice}
                        onChange={(e) => setFilter('maxPrice', +e.target.value)}
                        className="form-control"
                    />
                </div>
                {/* end apartment price*/}
                {/* apartment date picker*/}
                {/* <div className="form-group">

          <DatePickerSearch
            id="availableApartment"
            value={{}}
            onChange={() => {})}
          />
        </div> */}
                {/* end date picker*/}
            </form>
        </section>
    )





/*import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../../context'
import Title from '../Title/Title';
import DatepickerSearch from "../DatepickerSearch/Datepickersearch";

//get all unique values
const getUnique = (items, value) => {
    // set only accepts unique values
    return [...new Set(items.map(item => item[value]))]
}
const getAvailableApartments = (availableApartments, value) => {
    return [...new Set(availableApartments)]
}

export default function ApartmentFilter({rooms}) {
    const context = useContext(RoomContext)
    //value from my inputs
    const {
        handleChange,
        handleSubmit,
        capacity,
        price,
        minPrice,
        maxPrice,
        availableApartments,

    } = context;


    //get people
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })


    //get apartmentIds
    let id = getUnique(rooms, 'id');
    id = id.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    const availableApartment = getAvailableApartments(availableApartments, 'availableApartment');



    return (
        <section className="filter__container">
            <Title title="search rooms"/>
            <form className="filter__form">

                {/*guests*/ /*
                <div className="filter__form--group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity" value={capacity}
                        className="form-control"
                        onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* end guests*/}
                {/* room price*//*
                <div className="filter__form--group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price}
                           onChange={handleChange} className="form-control"/>
                </div>
                {/* end room price*/}
                {/* room date picker*/ /*
                <div className="filter__form--group">
                    <DatepickerSearch
                    id = "availableApartment"
                    value={availableApartment}
                    onChange = {handleSubmit}
                    />
                </div>
                {/* end date picker*/}
/*
            </form>
        </section>
    )
}*/