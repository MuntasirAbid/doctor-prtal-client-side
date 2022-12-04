import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import img from '../../../assets/images/appointment.png'

const ContactUs = () => {
    return (
        <div

            style={{
                background: `url(${img})`
            }}

            className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-primary text-center font-bold">Contact Us</h1>
                    <p className="py-6 text-4xl text-white">Stay Connected With Us</p>
                </div>
                <div className="card w-full">
                    <div className="card-body">
                        <div className="form-control">

                            <input type="text" placeholder="Email Address" className="input input-bordered" />
                        </div>
                        <div className="form-control">

                            <input type="text" placeholder="Subject" className="input input-bordered " />
                        </div>

                        <textarea style={{ height: "136px" }} className="textarea textarea-bordered" placeholder="Your message"></textarea>
                        <div className="form-control mt-6">
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;