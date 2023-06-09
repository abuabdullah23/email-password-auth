import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase-config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    // const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleRegister = (event) => {
        // 1. prevent data
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name, email, password);

        // set validate/strong password
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please at least one uppercase')
            return;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers');
            return;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add a special character.')
            return;
        } else if (password.length < 6) {
            setError('Please add at least 6 characters in your password')
        }

        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset('');
                setSuccess('Account has been created Successfully!');

                sendVerificationEmail(result.user);

                updateUserData(result.user, name)
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }

    // send Email Verification
    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address')
            })
            .catch(error => {
                console.log(error)
            })
    }

    // update user data
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated')
            })
            .catch(error => {
                setError(error.message);
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
                        <input type="text" name="text" id="name" placeholder='Your Name' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="email" name="email" id="email" placeholder='your email' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="password" name="password" id="password" placeholder='your password' required className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <p className='text-red-600'>{error}</p>
                        <br />
                        <input type="submit" value="Register" className='border border-slate-600 rounded-md bg-slate-200 hover:bg-slate-950 hover:text-white px-7 py-3' />
                    </form>
                    <p><small>Already have an account? please <Link to='/login'>Login</Link></small></p>

                    <p>{success}</p>
                </div>
            </div>
        </div>
    );
};

export default Register;