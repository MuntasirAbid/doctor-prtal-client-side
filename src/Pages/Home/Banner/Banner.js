import React from 'react';
import img from '../../../assets/images/chair.png';

const Banner = () => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">

            <figure><img src={img} alt="" /></figure>

            <div className="card-body">

                <h1 className='text-5xl font-bold'>Your New Smile Starts <br />Here</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>

        </div>
    );
};

export default Banner;