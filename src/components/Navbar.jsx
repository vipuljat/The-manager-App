import React from 'react';

const Navbar = () => {
    return (
        <nav className='bg-slate-900 text-white w-[530px] md:w-full'>
            <div className="mycontainer flex justify-between md:justify-between items-center px-4 py-6 h-16">
                <div className="logo font-bold text-2xl px-1 md:px-10">
                    <span className='text-green-600'>&lt;</span>
                    The 
                    <span className='text-green-600'>Manager/&gt;</span>
                </div>

                <a href="https://www.linkedin.com/in/vipul-jat-5699a4258/" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center gap-3'>
                    <img className='w-10 invert rounded-full' src="/icons/linkedin.png" alt="github" />
                    <span className='font-semibold'>Linkedin</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
