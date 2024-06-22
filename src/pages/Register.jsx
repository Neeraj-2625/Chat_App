import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../context_api/context';

function Register() {

    const {handleUserRegister,hadleUserLogin} = useContext(userContext);

    const email = useRef('');
    const password = useRef('');
    const username = useRef('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await handleUserRegister(email.current.value,password.current.value,username.current.value);
        navigate('/')
    }

    return (
        <div className='auth--container'>
            <div className='form--wrapper'>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='field--wrapper'>
                        <label htmlFor='username'>Username:</label>
                        <input
                          type='text'
                          required
                          name="username"
                          placeholder='Enter username...'
                          ref={username}
                          />
                    </div>
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
                        <input className='btn btn--lg btn--main' type="submit" value="Register" />
                    </div>
                </form>
                <p>
                    Already have an account. <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;