import React, { useContext } from 'react';
import { LuLogOut } from "react-icons/lu";
import userContext from '../context_api/context';

function Header() {
    const {user,handleUserLogout} = useContext(userContext);
    return (
        <div id="header--wrapper">
            {user?(
                <>
                  Welcome {user.name}
                  <LuLogOut className='header--link' onClick={handleUserLogout}/>
                </>):(
                    <button>Login</button>
                )}
        </div>
    );
}

export default Header;