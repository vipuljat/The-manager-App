import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showpassword = () => {
        passwordRef.current.type = "text";

        if (ref.current.src.includes("/icons/eyecross.png")) {
            passwordRef.current.type = "password";
            ref.current.src = "/icons/eye.png"
        }

        else {
            ref.current.src = "/icons/eyecross.png"
        }
    }

    const savepassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 2) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
        }

        else {
            toast('Error! Enter valid details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",// yha problem hai
            });
        }

    }

    const deletepassword = (id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do you want to delete this password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
        }

    }

    const editpassword = (id) => {
        console.log("editing password with id", id)
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className=" w-[530px]  my-10 md:mycontainer">
                <h1 className='text-3xl font-bold text-center'> <span className='text-green-600'>&lt;</span>
                    The
                    <span className='text-green-600'>Manager/&gt;</span>
                </h1>
                <p className='text-lg text-center'>Your own password manager</p>

                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name='site' id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-700 w-full p-4 py-1' type="password" name='password' id='password' />

                            <span className='absolute right-0 bottom-[-2px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-2' width={40} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>


                    </div>

                    <button onClick={savepassword} className='flex justify-center items-center bg-green-500 rounded-full px-4 py-2 w-fit hover:bg-green-400 border border-black'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password</button>

                </div>

                <div className="passwords">
                    <h2 className='text-2xl text-center font-semibold py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center'>No Passwords saved yet!</div>}

                    {passwordArray.length != 0 && <table className="table-auto mx-3 md:w-full rounded-xl overflow-hidden mb-3">
                        <thead className='text-white bg-green-700'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>


                                    <td className='py-2 text-center'>
                                        <div className='flex justify-center gap-5'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='copybutton cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon className={""}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}
                                                >
                                                </lord-icon>
                                            </div></div>
                                    </td>



                                    <td className='py-2 text-center'>
                                        <div className='flex justify-center gap-5'>
                                            <span>{item.username}</span>
                                            <div className='copybutton cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 text-center'>
                                        <div className="flex justify-center gap-5">


                                            <span>{item.password}</span>
                                            <div className='copybutton cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon className={""}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 text-center flex justify-center gap-3'>
                                        <span className='cursor-pointer' onClick={() => { editpassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wkvacbiw.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                        <span className='cursor-pointer' onClick={() => { deletepassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div >



        </>



    )
}

export default Manager
