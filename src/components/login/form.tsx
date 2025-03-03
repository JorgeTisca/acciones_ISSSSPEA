"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaUserTie } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
export const LoginForm = () => {


    const router = useRouter();
    useEffect(() => {
        // router.push('/inicio');
    }, [router]);

    return (

        <form className="bg-white flex flex-col justify-center w-1/4 p-4   animate-fade-left shadow-lg shadow-zinc-800 ">
            <div className='w-full flex justify-center  '>   <FaUserTie size={180} className='mb-5 object-cove '></FaUserTie></div>
            <label className='text-xl mb-5  text-center '>INGRESAR A CUENTA</label>
            <div className='flex w-1/2  '><MdOutlineAlternateEmail size={20}></MdOutlineAlternateEmail ><label className='animate-fade-left pl-2' htmlFor="email">Correo electrónico</label></div>
            <input
                className="animate-fade-right text-slate-800 px-5 py-2 border border-slate-800 bg-gray-200 rounded mb-5"
                type="text"
                name="email"
                required
            />
            <div className='flex '><RiLockPasswordLine size={20}></RiLockPasswordLine ><label className='animate-fade-left pl-2' htmlFor="email">Contraseña</label></div>
            <input
                className="animate-fade-right text-slate-800 px-5 py-2 border border-slate-800 bg-gray-200 rounded mb-5"
                type="password"
                name="password"
                required
            />

            <Link href={`inicio`} >
                <div className="border-blue-500 border-2 h-10 text-center pt-1"> LOGIN</div>
            </Link>

        </form>



    );
};


