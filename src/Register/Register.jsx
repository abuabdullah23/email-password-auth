import React from 'react';

const Register = () => {
    return (
        <div>
            <h2 className='text-center text-3xl font-bold'>Please Register</h2>
            <div className='mt-5 grid justify-items-stretch'>
                <div className='justify-self-center'>
                    <form>
                        <input type="email" name="email" id="email" placeholder='your email' className='px-5 py-3 bg-slate-200 rounded-md mb-3'/>
                        <br />
                        <input type="password" name="password" id="password" placeholder='your password' className='px-5 py-3 bg-slate-200 rounded-md mb-3'/>
                        <br />
                        <button className='border border-slate-600 rounded-md bg-slate-200 hover:bg-slate-950 hover:text-white px-7 py-3 '>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;