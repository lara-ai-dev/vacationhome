import React, { useState, useEffect, useContext, useMemo } from 'react'
import API from 'services/api'

import { attachImagesToApartments } from 'utils/utils'

const apartmentContext = React.createContext()

export const useApartments = () => {
    return useContext(apartmentContext)
}

export function ApartmentProvider({ children }) {
    const [apartments, setApartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const { data } = await API.get('/apartment')
                if (!data || data.length === 0) throw new Error('No apartments')
                const apartmentsWithImages = attachImagesToApartments(data)
                setApartments(apartmentsWithImages)
                setLoading(false)
                setError(null)
            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            }
        }

        fetchApartments()
    }, [])

    const featuredApartments = useMemo(
        () => apartments.filter((data) => data.featured === true),
        [apartments]
    )

    const highestPrice = useMemo(
        () => Math.max(0, ...apartments.map((data) => +data.price)),
        [apartments]
    )

    //get apartment from state by slug
    const getApartmentBySlug = (slug) =>
        apartments.find((apartment) => apartment.slug === slug)

    const value = {
        apartments,
        loading,
        error,
        featuredApartments,
        highestPrice,
        getApartmentBySlug,
    }

    return (
        <apartmentContext.Provider value={value}>
            {children}
        </apartmentContext.Provider>
    )
}



/*import React, { Component } from 'react'
import axios from 'axios'
import Items from '../data'

const RoomContext = React.createContext()
// <RoomContext.Provider value={}>

class RoomProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            images: [],
            loading: true,
            type: 'all',
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
        }
    }

    //getData life cycle method
    async getData() {
        try {
            const response = await axios.get('/apartment')
            const rooms = this.formatData(response.data)

            const featuredRooms = rooms.filter((data) => data.featured === true)
            const maxPrice = Math.max(...rooms.map((data) => data.price))

            this.setState({
                rooms,
                //images,
                featuredRooms,
                loading: false,
                price: maxPrice,
                maxPrice,
            })
        } catch (error) {}
    }

    componentDidMount() {
        this.getData()
    }

    formatImages(images) {
        const tempImages = images.map((images) => {
            const image = images.fields.images.map((image) => image.fields.file.url)

            const room = { ...images, image }
            return room
        })
        return tempImages
    }

    formatData(items, images) {
        images = this.formatImages(Items).map((images) => {
            const image = images.fields.images.map((image) => image.fields.file.url)
            return image
        })

        const tempItems = items.map((item) => {
            //get id
            const id = item.apartmentId
            //loop through my items -> iterating over the array
            let image = images

            if (id === 0) {
                image = image[0]
            }

            if (id === 1) {
                image = image[1]
            }

            if (id === 2) {
                image = image[2]
            }

            const room = { ...item, id, image: image }
            return room
        })

        return tempItems
    }

    //getroom function accept only specific slug
    getRoom = (slug) => {
        const tempRooms = [...this.state.rooms]

        //find method to get the room that matches the slug that is passed in the function (find function bc we only need one object)
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    getImages = (Items) => {
        const tempImg = this.formatImages(Items).map((images) => {
            const image = images.Items
            return image
        })
        return tempImg
    }

    handleChange = (event) => {
        const target = event.target
        //value = whatever we select
        const value = target.type === 'checkbox' ? target.checked : target.value
        //name = what we have in the state
        const name = event.target.name
        this.setState(
            {
                //check that value in the state & set it
                [name]: value,
                //change value of filterrooms
            },
            this.filterRooms
        )
    }

    filterRooms = () => {
        let { rooms, type, capacity, price } = this.state

        //all the rooms
        let tempRooms = [...rooms]

        //transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter((room) => room.type === type)
        }
        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter((room) => room.capacity >= capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter((room) => room.price <= price)

        // change state
        this.setState({
            sortedRooms: tempRooms,
        })
    }

    //giving getroom & handlechange available in the roomcontext
    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange,
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

//pass component in the function
export function withRoomConsumer(Component) {
    //higher order component return another function -> grabbing props
    return function ConsumerWrapper(props) {
        // return consumer
        return (
            <RoomConsumer>
                {(value) => <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}

export { RoomProvider, RoomConsumer, RoomContext }*/
