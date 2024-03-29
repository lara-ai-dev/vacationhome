import React from 'react';
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-datepicker/dist/react-datepicker.css'
import API from 'services/api'

import Button from 'components/Button/Button'

function DatepickerSearch(props) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [availableApartments, setAvailableapartments] = useState([])

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    // function handleSelect(ranges) {
    //     setStartDate(ranges.selection.startDate);
    //     setEndDate(ranges.selection.endDate);
    // }
    // const handleChange = (event) => setStartDate(event.target.startDate);

    const handleSubmit = (event) => {
        event.preventDefault()
        API.post(`/apartments/available`, {
            startDate: startDate,
            endDate: endDate,
        })
            .then((res) => {
                setAvailableapartments(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                ranges={[selectionRange]}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                ranges={[selectionRange]}
            />
            <hr />

            <div>
                <Button className = "btn btn--registration" onClick={handleSubmit}>Search Apartments</Button>

                {availableApartments &&
                availableApartments.map((apartment) => {
                    return (
                        <div className="datepickersearch--availableapartments">
                            <li>{apartment.apartmentNumber}</li>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DatepickerSearch
