import React, { useEffect, useState } from 'react';
import userContext from './context';
import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';


function UserContextProvider({children}) {

    // const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(()=>{
        getUserOnLoad();
    },[])

    const getUserOnLoad = async()=>{
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
            
        } catch (error) {
            console.log("error in getUserOnLoad ",error);
        }
        setIsLoading(false);
    }



    const handleUserLogin = async (email,password) =>{
        try {
            const response = await account.createEmailPasswordSession(email,password);
            const accountDetails = await account.get();
            setUser(accountDetails);
            setIsLoading(false);

        } catch (error) {
            console.log("error in handleLoginUser ",error);
        }
    }

    const handleUserLogout = async()=>{
       await account.deleteSession('current');
       setUser(null);
    }

    const handleUserRegister = async(email,password,name)=>{
        try {
            const res = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if(res) 
              await handleUserLogin(email,password);

        } catch (error) {
            console.log("error in handleUserRegister",error);
        }
        
    }


    const contextData ={
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return (
        <userContext.Provider value={contextData}>
            {isLoading ? <p>Loading...</p> : children}
        </userContext.Provider>
    );
}

export default UserContextProvider;