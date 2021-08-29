import React from 'react'
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

