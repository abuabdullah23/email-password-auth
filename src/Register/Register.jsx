import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../firebase/firebase-config';

const auth = getAuth(app);

const Register = () => {
    // const [email, setEmail] = useState('');
    const [regError, setRegError] = useState('');
    const [success, setSuccess] = useState('');


    const handleRegister = (event) => {
        // 1. prevent data
        event.preventDefault();
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setRegError('');
                event.target.reset('');
                setSuccess('Account has been created Successfully!')
            })
            .catch(error => {
                console.log(error.message);
                setRegError(error.message)
            })
    }

    // const handleEmailChange = (event) => {
    //     console.log(event.target.value);
    //     setEmail(event.target.value)
    // }

    // const handlePasswordBlur = (event) => {
    //     console.log(event.target.value);
    // }
    return (
        <div>
            <h2 className='text-center text-3xl font-bold'>Please Register</h2>
            <div className='mt-5 grid justify-items-stretch'>
                <div className='justify-self-center'>
                    <form onSubmit={handleRegister}>
                        <input type="email" name="email" id="email" placeholder='your email' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="password" name="password" id="password" placeholder='your password' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <p className='text-red-600'>{regError}</p>
                        <br />
                        <input type="submit" value="Register" className='border border-slate-600 rounded-md bg-slate-200 hover:bg-slate-950 hover:text-white px-7 py-3' />
                    </form>
                    <p>{success}</p>
                </div>
            </div>
        </div>
    );
};

export default Register;