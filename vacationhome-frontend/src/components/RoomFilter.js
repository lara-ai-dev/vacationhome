import React, { Component, useState, useEffect} from 'react'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DateRangePicker, isInclusivelyBeforeDay} from "react-dates";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

//get all unique values

const getUnique = (items, value) => {
    // set only accepts unique values
    return [...new Set(items.map(item => item[value]))]
}
const getAvailableApartments = (availableApartments, value) => {
    return [...new Set(availableApartments)]
}



export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    //value from my inputs

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(null);
    const [availableApartments, setAvaiableapartments] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };

    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const {
        handleChange,
        capacity,
        price,
        minPrice,
        maxPrice,

    } = context;

    const handleSubmit = event => {
        event.preventDefault()
        axios
            .post("/api/availableapartments", {
                startDate: startDate,
                endDate: endDate
            })
            .then((res) => {
                setAvaiableapartments(res.data);
                console.log(res.data);
            })
    }
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

    let availableApartment = getAvailableApartments(availableApartments, 'availableApartment');
    console.log(availableApartment);



    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">

                {/*guests*/}
                <div className="form-group">
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
                {/* room price*/}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price}
                           onChange={handleChange} className="form-control"/>
                </div>
                {/* end room price*/}
                {/* room date picker*/}
                <div className="form-group">
                    <label>Date</label>
                    <DateRangePicker
                        startDate = {startDate}
                        startDateId="startDate"
                        endDate={endDate}
                        endDateId="endDate"
                        onDatesChange={({startDate, endDate}) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        focusedInput={focusedInput}
                        onFocusChange={setFocusedInput}
                        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                        initialVisibleMonth={()=>moment().subtract(1,"month")}
                        orientation={"vertical"}
                    />
                </div>
                {/* end date picker*/}
            </form>
        </section>
    );
}