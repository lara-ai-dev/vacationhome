import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();
// <RoomContext.Provider value={}>

 class RoomProvider extends Component {
    state={
     rooms:[],
     sortedRooms:[],
     featuredRooms: [],
     loading: true,
     type:"all",
     capacity: 1,
     price: 0,
     minPrice: 0,
     maxPrice: 0,
     minSize: 0,
     maxSize: 0,
     breakfast: false,
     pets: false
    };
    
    //getData life cycle method

    componentDidMount(){
        //this getData
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        //calculating the maxprice & minprice of the data 
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        })
    }
    //formatting data 
    formatData(items) {
        //loop through my items -> iterating over the array 
        let tempItems = items.map(item => {
          //get id   
          let id = item.sys.id;
          // get images 
          let images = item.fields.images.map(image => image.fields.file.url);
          // create new room object -> copy all the properties from the fields object & add images, id properties  
          let room = { ...item.fields, images, id };
          return room;
        });
        return tempItems;
      }
    //getroom function accept only specific slug  
    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        //find method to get the room that matches the slug that is passed in the function (find function bc we only need one object)
        const room = tempRooms.find((room) =>room.slug == slug);
        return room;
    };

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
            rooms,type,capacity, price, minSize, maxSize, breakfast,pets
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

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        
        //filter by breakfast 
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //flter by  pets
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
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