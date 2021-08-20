import React from 'react';
import Room from './Room';
import DateRangePicker from './Datepickersearch';

export default function RoomList({rooms}) {


    if(rooms.length === 0){
        return(
            <div className="empty-search">
                <h3>unfortunately no rooms match your search parameters</h3>
            </div>
        )
    }

    return (
        <section className="rooms__list">
        <div className="rooms__list--center">
            {rooms.map(item => {
                return <Room key={item.id} room={item}/>;
            })}
        </div>
        </section>
    )


}
