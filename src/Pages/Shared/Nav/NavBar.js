import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../../Contexts/AuthProvider';

const NavBar = () => {

    const { user, logOut } = useContext(authContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const menuItems = <React.Fragment>

        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>


        {user?.uid ?
            <>
                <li><button onClick={handleLogOut}>Sign Out</button></li>
            </>
            :
            <li><Link to="/login">Login</Link></li>
        }

    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start bg-base-100">
                <div className="dropdown bg-base-100">
                    <label tabIndex={0} className="bg-base-100 btn btn-ghost lg:hidden ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden bg-base-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default NavBar;