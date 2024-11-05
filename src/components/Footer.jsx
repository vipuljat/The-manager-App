import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-center gap-5 items-center bg-slate-900 text-white p-2 fixed bottom-0 w-full'>
            <div className='text-2xl font-bold'>
            <span className='text-green-600'>&lt;</span>
                    The 
                    <span className='text-green-600'>Manager/&gt;</span>
            </div>
            <div className='flex font-semibold'>
            Created with <img className='w-5' src="icons/heart.png" alt="" /> by Vipul
            </div>
        </div>
    )
}

export default Footer
