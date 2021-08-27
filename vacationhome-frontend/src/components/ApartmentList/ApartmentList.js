import Apartment from 'components/Apartment/Apartment'

export default function ApartmentList({ apartments }) {
    if (!apartments?.length || apartments.length === 0) {
        return (
            <div className="empty-search">
                <h3>unfortunately no apartments match your search parameters</h3>
            </div>
        )
    }

    return (
        <section data-testid="apartment-list" className="apartments__list">
            <div className="apartments__list--center">
                {apartments.map(({ apartmentId, name, slug, images }) => {
                    return (
                        <Apartment
                            key={apartmentId}
                            name={name}
                            slug={slug}
                            image={images[0]}
                        />
                    )
                })}
            </div>
        </section>
    )
}



/*import React from 'react';
import Apartment from '../Apartment/Apartment'

export default function ApartmentList({rooms}) {


    if(!rooms?.length || rooms.length === 0){
        return(
            <div className="empty-search">
                <h3>unfortunately no rooms match your search parameters</h3>
            </div>
        )
    }

    return (
        <section className="rooms__list">
            <div className="rooms__list--center">
                {rooms.map(({ id, name, slug, image }) => {
                    return <Apartment key={id} name={name} slug={slug} image={image[0]} />
                })}
            </div>
        </section>
    )


}*/