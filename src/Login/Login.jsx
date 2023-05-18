import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../firebase/firebase-config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // validation
        setError('');

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least two uppercase.')
            return;
        }else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please add a special character.')
        }else if(password.length<6){
            setError('Password must be 6 character')
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            if(!loggedUser.emailVerified){
                alert('You can not verified your email.')
            }
            setSuccess('User Login Successful');
            setError('');
        })
        .catch(error =>{
            setError(error.message);
        })
    }

    return (
        <div>
            <h2 className='text-center text-3xl font-bold'>Please Login</h2>
            <div className='mt-5 grid justify-items-stretch'>
                <div className='justify-self-center'>
                    <form onSubmit={handleLogin}>
                        <input type="email" name="email" id="email" placeholder='your email' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="password" name="password" id="password" placeholder='your password' required className='px-5 py-3 bg-slate-200 rounded-md' />
                        <p className='text-red-600'>{error}</p>
                        <br />
                        <label className='mb-3'>Remember me</label>
                        <br />
                        <input type="submit" value="Login" className='border border-slate-600 rounded-md bg-slate-200 hover:bg-slate-950 hover:text-white px-7 py-3' />
                    </form>
                    <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
                    <p className='text-bg-green-500'>{success}</p>
                </div>
            </div>
        </div>
    );
};

export default Login;