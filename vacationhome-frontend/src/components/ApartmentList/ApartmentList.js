import React from 'react';
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