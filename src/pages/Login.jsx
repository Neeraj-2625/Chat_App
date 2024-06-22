import React, { useContext, useEffect, useRef } from 'react';
import userContext from '../context_api/context';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const {user,handleUserLogin} = useContext(userContext);
    const navigate = useNavigate();

    const email = useRef('');
    const password = useRef('');
    
    useEffect(()=>{

        if(user){
            navigate('/');
        }

    },[]);    

    const handleSubmit= async(e) =>{
        e.preventDefault();
        await handleUserLogin(email.current.value,password.current.value);
        navigate('/');
    }


    return (
        <div className='auth--container'>
            <div className='form--wrapper'>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='field--wrapper'>
                        <label htmlFor='email'>Email:</label>
                        <input
                          type='email'
                          required
                          name="email"
                          placeholder='Enter your email...'
                          ref={email}
                          />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor="email">Password:</label>
                        <input 
                          type="password"
                          required
                          name='password'
                          placeholder='Enter password...'
                          ref={password}
                           />
                    </div>
                    <div className='field--wrapper'>
                        <input className='btn btn--lg btn--main' type="submit" value="Login" />
                    </div>
                </form>
                <p>
                    Don't have an account ? <Link to="/register"> Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;