import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { authContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(authContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <p className="text-red-500">Something wrong happened!!</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button className='btn btn-sm btn-error' onClick={handleLogOut}>Sign Out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;