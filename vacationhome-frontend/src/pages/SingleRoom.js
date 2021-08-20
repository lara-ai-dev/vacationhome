import React, {Component} from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props)

        //access to props that react router DOMS provides
        //set property slug 
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    //access to the room context
    static contextType = RoomContext;



    render() {
        //destructure getRoom
        const {getRoom} = this.context;
        // run getRoom assign to room 
        const room = getRoom(this.state.slug);
        //check if the room is undefined
        if (!room) {
            return <div className="error">
                <h3>No such room could be found...</h3>
                <Link to='/rooms' className="btn btn--primary">Back to rooms</Link>
            </div>
        }
        //destructuring rooms
        const {name, description, capacity, price} = room
        //array destructuring - getting the rest items(defaultImg) I use the rest operator


        return (
            <>

                <StyledHero img={this.defaultBcg}>
                    <Banner title={`${name} room`}>


                        <Link to='/register' className='btn btn--primary'>
                            BOOK ROOM
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">

                    <div className="single-room--info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>
                                max capacity : {
                                capacity > 1 ? `${capacity} people` : `${capacity} person`
                            }
                            </h6>
                        </article>

                    </div>
                </section>

            </>
        )
    }
}
