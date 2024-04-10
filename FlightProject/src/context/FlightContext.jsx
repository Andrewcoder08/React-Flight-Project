import React, {createContext,useEffect,useState} from "react";
import { flightsDb } from "../flightDb";

export const FlightContext=createContext();


export function FlightProvider({children}){

    const [flights, setFlights] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(()=>{
        setFlights(flightsDb);
    },[])

 

    return(
        <FlightContext.Provider value={{flights,setFlights,sortBy,setSortBy}}>
            {children }
        </FlightContext.Provider>
    )
}


