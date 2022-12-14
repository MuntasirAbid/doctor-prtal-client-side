
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthProvider';
import app from '../../firebase/Firebase.config';
import useToken from '../../hooks/useToken';

const auth = getAuth(app);

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(authContext);
    const [userEmail, setUserEmail] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {

        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);

            })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {

        if (!userEmail) {
            toast.error('Please enter your email');
            return;
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                toast.success('Password reset email send, Please check your email')
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", {
                            required: "Email Address is required",
                            onBlur: handleEmailBlur,
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "password is required",
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })} className="input input-bordered w-full max-w-xs" />

                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}

                        <p className='py-3'>Forgot password? <Link onClick={handleForgetPassword} className='text-secondary'>Reset password</Link></p>
                    </div>

                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                    <div>
                        {
                            loginError && <p className='text-error'>{loginError}</p>
                        }
                    </div>
                </form>
                <p>New to Doctors Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;