import React from 'react';

const PrimaryButton = ({ children }) => {
    return (
        <div className='flex justify-center'>
            <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary text-white">{children}</button>
        </div>
    );
};

export default PrimaryButton;