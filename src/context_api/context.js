import { createContext } from "react";

const userContext =  createContext(
    {
        user:null,
        hadleUserLogin:()=>{},
    }
);


export default userContext