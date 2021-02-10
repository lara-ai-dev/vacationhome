import React, { Component, useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Room from './Room';

function DatepickerSearch({ rooms }) {

    const [startDate, setStartDate] = useState(new Date());
    const history = useHistory();
    const [endDate, setEndDate] = useState(new Date());
    const [availableApartments, setAvailableapartments] = useState([]);


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    } ;


    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }


    //const handleChange = (event) => setAvailableapartments(event.target.availableApartments);

    const onSearch = useEffect(() => {
            console.log("startDate: ", startDate);
            console.log("endDate: ", endDate);
            console.log("availableApartments", availableApartments)


            axios
                .post(`/availableapartments`, {
                    startDate,
                    endDate,

                    availableApartments
                })

                .then((res) => {
                    setAvailableapartments(res.data);
                    console.log(availableApartments);

                });

        }, []

    );



    return (
        <>
        <DatePicker
           selected={startDate}
           onChange={date => setStartDate(date)}
           selectsStart
           startDate = {startDate}
           endDate = {endDate}
           ranges={[selectionRange]}
        />
        <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            startDate = {startDate}
            endDate = {endDate}
            minDate = {startDate}
            ranges={[selectionRange]}
        />
        <hr/>

        <button onClick={onSearch}>Search Apartments</button>

        <div>
                    {availableApartments && availableApartments.map((apartment) =>  {
                    return (

                        <div className="datepickersearch--availableapartments-container-card">
                            <li>
                            <p>{apartment.apartmentNumber}</p>
                            </li>
                        </div>
                    )
            })
        }
        </div>

            </>

    );




}

export default DatepickerSearch;