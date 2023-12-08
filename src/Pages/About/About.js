import React from 'react';

const About = () => {
    return (
        <div className='text-center my-32'>
            <h1 className='text-4xl'>This website is developed by <span className='font-bold'>Muntasir Al Abid</span></h1>
            <h4 className='mt-5'>Contact<p>Email: Muntasira7@hotmail.com</p><p>Mobile: +48792980810</p>
                <>Thanks for visiting :)</>
                <>
                    <p>To see all the features please login.</p>
                    <br />
                    <p className='font-semibold'>login as a Admin to see admin role </p> <p>Admin Email: muntasir@gmail.com <br />Password: AA1122</p>
                    <p className='font-semibold'>Login as a normal user</p> <p> Email: m@gmail.com <br />Password: AA1122</p>
                </>
            </h4>
        </div>
    );
};

export default About;