import React, { Component, useState, useEffect} from 'react'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "react-datepicker";
import {Button} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function DatepickerSearch(props) {

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


    const handleChange = (event) => setStartDate(event.target.startDate);

    const onSearch = (() => {
            console.log("startDate: ", startDate);
            console.log("endDate: ", endDate);
            console.log("availableApartments", availableApartments)

            //axios post startdate and enddate --> returns apartments which are free the selected dates (-function is in the backend)
            axios
                .post(`/availableapartments`, {
                    startDate,
                    endDate,

                    availableApartments
                })

                .then((res) => {
                    setAvailableapartments(res.data);
                    console.log(res.data);

                });

        }

    );



    return (
        <>

            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                ranges={[selectionRange]}
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                ranges={[selectionRange]}
            />
            <hr/>

            <Button onClick={onSearch}>Search Apartments</Button>

            <div>
                {availableApartments && availableApartments.map((apartment) =>  {
                    return (

                        <div className="datepickersearch--availableapartments-container-card">
                            <li>{apartment.apartmentNumber}
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