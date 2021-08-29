import React from 'react';
import Title from 'components/Title/Title'

export default function ApartmentFilter({filters, highestPrice, uniqueCapacities, setFilter,}) {


    let capacityOptions = uniqueCapacities.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ))

    return (
        <section data-testid="apartment-filter" className="filter__container">
            <Title title="search apartments"/>
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
    )}




