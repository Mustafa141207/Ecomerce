import { createContext, useState } from "react";

export let TokenContext=createContext();
export default function TokenContextProvider(props){
    let [Token,SetToken]=useState();
    return    <TokenContext.Provider value={{Token,SetToken}}>
    {props.children}
        </TokenContext.Provider>

}
