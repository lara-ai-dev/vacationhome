import React, { Component } from 'react';
import Items from './data';
import axios from 'axios';


const RoomContext = React.createContext();
// <RoomContext.Provider value={}>

class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms: [],
        images : [],
        loading: true,
        type:"all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,

    };

    //getData life cycle method
    async getData() {
        try{
            let response = await axios.get('/apartment');
            let rooms = this.formatData(response.data);
            console.log(rooms);

            let images = this.formatImages(Items);
            console.log(images);

            const featuredRooms = rooms.filter(data => data.featured === true);
            console.log(featuredRooms);
            let maxPrice = Math.max(...rooms.map(data => data.price));

            this.setState({
                rooms,
                images,
                featuredRooms,
                loading: false,
                price: maxPrice,
                maxPrice,

            });

        } catch(error){
            console.log(error);
        }}

    componentDidMount(){
        this.getData();
    }

   formatImages(images){
        let tempImages = images.map((images) =>{
            let image = images.fields.images.map(image =>
                image.fields.file.url);
           // let id = image.map(rooms => rooms.apartmentId );
            console.log(image);
            let room = {...images, image}
            return room;
        })
        return tempImages;
    }



    formatData(items, images) {

        var images = this.formatImages(Items).map((images) => {
            let image = images.fields.images.map(image => image.fields.file.url);
            console.log(image);
            return image;
        });

        let tempItems = items.map((item) => {
            //get id
            let id = item.apartmentId;
            //loop through my items -> iterating over the array
            let image = images;
            console.log(image);

            if (id === 0){
                console.log(id);
                image = image[0]
                console.log(image);
            }

            if (id === 1){
                console.log(id);
                image = image[1]
                console.log(image);
            }

            if (id === 2){
                console.log(id);
                image = image[2]
                console.log(image);
            }

            let room = { ...item, id, image: image};

            //let room = { ...item, id, image: images};

            console.log(room)
            return room;

        })

        return tempItems;


    }

    //getroom function accept only specific slug
    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        let tempImages = [...this.state.images];

        //find method to get the room that matches the slug that is passed in the function (find function bc we only need one object)
        const room = tempRooms.find((room) =>room.slug === slug);
        return room;
    };

    getImages = (Items) => {
        let tempImg = this.formatImages(Items).map((images) =>{

            let image = images.Items;
            console.log(image);
            return image;
        });
        console.log(tempImg);
        return tempImg;
    }

    handleChange = event => {
        const target = event.target
        //value = whatever we select
        const value = target.type === "checkbox" ?
            target.checked: target.value
        //name = what we have in the state
        const name = event.target.name
        this.setState({
            //check that value in the state & set it
            [name]:value
            //change value of filterrooms
        }, this.filterRooms)
    };

    filterRooms = () =>{
        let{
            rooms,type,capacity, price
        } = this.state

        //all the rooms
        let tempRooms = [...rooms];

        //transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by capacity
        if(capacity !== 1 ){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // change state
        this.setState({
            sortedRooms:tempRooms
        })
    }

    //giving getroom & handlechange available in the roomcontext
    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

//pass component in the function
export function withRoomConsumer(Component){
    //higher order component return another function -> grabbing props
    return function ConsumerWrapper(props){
        // return consumer
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export{RoomProvider, RoomConsumer, RoomContext};

/*import React, { Component } from 'react';

import axios from 'axios';
import Items from './data';


const RoomContext = React.createContext();
// <RoomContext.Provider value={}>

 class RoomProvider extends Component {
    state={
     rooms:[],
     sortedRooms:[],
     featuredRooms: [],
     images : [],
     loading: true,
     type:"all",
     capacity: 1,
     price: 0,
     minPrice: 0,
     maxPrice: 0,

    };


    async getData() {
        try{
            let response = await axios.get('/apartment');
            let rooms = this.formatData(response.data);
            console.log(rooms);
            let images = this.formatImages(Items);
            console.log(images);
            let test = this.getImages(Items);
            console.log(test);

            const featuredRooms = rooms.filter(data => data.featured === true);
            console.log(featuredRooms);
            let maxPrice = Math.max(...rooms.map(data => data.price));

            this.setState({
                rooms,
                images,
                featuredRooms,
                loading: false,
                price: maxPrice,
                maxPrice
            });

    } catch(error){
        console.log(error);
     }}


    componentDidMount(){
        this.getData();

    }

//formatting data


     //formatting data
     /*formatImages(images){
         let tempImages = images.map((images) =>{
             let image = images.fields.images.map(image =>
                 image.fields.file.url);
             console.log(image);
             let room = {...images, image}
             return room;
         })
         return tempImages;
     }*/
/*
    //formatting data
     formatImages(images){
         let tempImages = images.map((images) =>{
             let image = images.fields.images.map(image =>
                  image.fields.file.url);
             console.log(image);
             let room = {...images, image}
             return room;
         })
         return tempImages;
     }

     formatData(items) {
         //loop through my items -> iterating over the array
         let images = this.formatImages(Items).map(images => {
             if (images.image[0]) {
                this.getData(this.state.rooms[0]);
             }

         });
         console.log(images);
         let tempItems = items.map((item) => {
             //get id
             let id = item.apartmentId;

             let room = { ...item, id, images};
             console.log(room)
             return room;
             // get images
             // create new room object -> copy all the properties from the fields object & add images, id properties
         });


         return tempItems;
     }


    //getroom function accept only specific slug  
    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        let tempImages = [...this.state.images];


        //find method to get the room that matches the slug that is passed in the function (find function bc we only need one object)
        const room = tempRooms.find((data) =>data.slug === slug);

        return room;
    };

    getImages = (Items) => {
        let tempImg = this.formatImages(Items).map((images) =>{

            let image = images.Items;
            console.log(image);
            return image;
        });
        console.log(tempImg);
        return tempImg;
    }

    handleChange = event => {
        const target = event.target
        //value = whatever we select
        const value = target.type === "checkbox" ?
        target.checked: target.value
        //name = what we have in the state
        const name = event.target.name
        this.setState({
            //check that value in the state & set it 
            [name]:value
            //change value of filterrooms 
        }, this.filterRooms)
    }; 

    filterRooms = () =>{
        let{
            rooms,type,capacity, price
        } = this.state

        //all the rooms 
        let tempRooms = [...rooms];

        //transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by capacity
        if(capacity !== 1 ){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);


        // change state 
        this.setState({
            sortedRooms:tempRooms
        })
    }
*//*
    //giving getroom & handlechange available in the roomcontext
    render() {
        return (

            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                 {this.props.children}
            </RoomContext.Provider>
        );
    }
}
*//*
const RoomConsumer = RoomContext.Consumer;

//pass component in the function
export function withRoomConsumer(Component){
    //higher order component return another function -> grabbing props 
    return function ConsumerWrapper(props){
        // return consumer 
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export{RoomProvider, RoomConsumer, RoomContext};
*/