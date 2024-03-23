import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-black mb-0 text-white flex flex-row justify-between items-center h-10 max-tablet:text-sm' style={{ marginBottom: 0, width:'100%'}}>
            <h1 className='text-center mx-4 my-2'>All rights reserved &copy; {new Date().getFullYear()}</h1>
            <div className='text-center mx-4'>
                <Link to='/about' className='text-light mx-2'>About</Link>|
                <Link to='/contact' className='text-light mx-2'>Contact</Link>|
                <Link to='/policy' className='text-light mx-2'>Policy</Link>
            </div>
        </div>
    );
}

export default Footer