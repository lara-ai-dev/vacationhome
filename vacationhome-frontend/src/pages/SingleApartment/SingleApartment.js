import { Link } from 'react-router-dom'

import Banner from 'components/Banner/Banner'
import StyledHero from 'components/StyledHero/StyledHero'
import defaultImg from 'images/apartment-1.jpeg'
import { useApartments } from 'context/apartments'

export default function SingleApartment({ match }) {
    const { getApartmentBySlug } = useApartments()
    const apartment = getApartmentBySlug(match.params.slug)

    //check if the apartment is undefined
    if (!apartment) {
        return (
            <div className="error">
                <h3>No such apartment could be found...</h3>
                <Link to="/apartments" className="btn btn--primary">
                    Back to apartments
                </Link>
            </div>
        )
    }

    const { name, description, capacity, price, images = [] } = apartment
    const capacityText =
        capacity > 1 ? `${capacity} people` : `${capacity} person`

    return (
        <>
            <StyledHero img={images[0] || defaultImg}>
                <Banner title={`${name} apartment`}>
                    <Link to="/register" className="btn btn--primary">
                        BOOK APARTMENT
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-apartment">
                <div className="single-apartment--info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price : ${price}</h6>
                        <h6>max capacity : {capacityText}</h6>
                    </article>
                </div>
            </section>
        </>
    )
}
