import React, { useState } from 'react';

const Register = () => {
    // const [email, setEmail] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
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
                        <input type="email" name="email" id="email" placeholder='your email' className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="password" name="password" id="password" placeholder='your password' className='px-5 py-3 bg-slate-200 rounded-md mb-3' />
                        <br />
                        <input type="submit" value="Register" className='border border-slate-600 rounded-md bg-slate-200 hover:bg-slate-950 hover:text-white px-7 py-3' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;