import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthProvider';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(authContext);
    const [signUpError, setSignUpError] = useState()
    const navigate = useNavigate();

    const handleSignUp = (data) => {

        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message);
            });
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:12000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('save User', data);
                navigate('/');
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-error'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required", minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                            pattern: { value: /(?=.*[A-Z])(?=.*\d)/, message: 'password must contain at least a Uppercase and a Number' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}

                    </div>

                    <input className='mt-4 btn btn-accent w-full' value='Sign Up' type="submit" />
                    {signUpError && <p className='text-error'>{signUpError}</p>}
                </form>
                <p>Already have an account?<Link className='text-secondary' to='/login'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;