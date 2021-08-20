import React, { Component } from "react";
import Title from "./Title";
import { RoomContext } from "../context";
import Room from "./Room";
import Loading from "./Loading";


export default class FeaturedRooms extends Component {
  
  static contextType = RoomContext;


  render() {
    //access to the context  featuredRooms equals rooms
    let { loading, featuredRooms: rooms } = this.context;

    // loop through my rooms and set up JSX -- wrap room in room component pass room prop with all information about that specific room
     rooms = rooms.map(room => {

        return <Room key={room.id} room={room} />;

    });


    return (
      <section className="rooms--featured">
        <Title className="rooms__title--featured" title="our rooms" />
        <div className="rooms--featured--center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}