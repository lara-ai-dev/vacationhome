import Title from 'components/Title/Title'
import Apartment from 'components/Apartment/Apartment'
import Loading from 'components/Loading/Loading'
import { useApartments } from 'context/apartments'

export default function FeaturedApartments() {
    const { loading, featuredApartments } = useApartments()

    // loop through my apartments and set up JSX -- wrap apartment in apartment component pass apartment prop with all information about that specific apartment
    let apartmentItems = featuredApartments.map(
        ({ apartmentId, name, slug, images }) => {
            return (
                <Apartment
                    key={apartmentId}
                    name={name}
                    slug={slug}
                    image={images[0]}
                />
            )
        }
    )

    return (
        <section data-testid="featured-apartments" className="apartments--apartments">
            <Title className="apartments__title--featured" title="our apartments" />
            <div className="apartments--featured--center">
                {loading ? <Loading /> : apartmentItems}
            </div>
        </section>
    )
}


/*import React, { Component } from "react";
import Title from "./Title/Title";
import { RoomContext } from "../context";
import Apartment from "./Apartment/Apartment";
import Loading from "./Loading/Loading";


export default class FeaturedRooms extends Component {

  static contextType = RoomContext;


  render() {
    //access to the context  featuredRooms equals rooms
    let { loading, featuredRooms: rooms } = this.context;

    // loop through my rooms and set up JSX -- wrap room in room component pass room prop with all information about that specific room
     rooms = rooms.map(room => {

        return <Apartment key={room.id} room={room} />;

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
}*/