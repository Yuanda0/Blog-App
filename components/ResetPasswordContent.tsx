"use client"
import { auth } from '@/Firebase';
import Image from 'next/image';
import React, { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

export default function ResetPasswordContent() {
   const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
   const [email, setEmail] = useState('');
   const [success, setSuccess] = useState(false);
   const [sending, setSending] = useState(false);
   const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        await sendPasswordResetEmail(email);
        setSending(true);
      } finally {
        setTimeout(() => {
          setSuccess(true);
          setSending(false);
        }, 4000);
      }
    };
  return (

      <div className="text-center mt-10 flex flex-col w-72 mx-auto gap-3 border-2 border-white shadow-md shadow-white p-4 rounded-md">
        <h1 className="mt-2">Enter Your Email</h1>
        <input
          type="text"
          className="p-2 rounded-md border-none text-black font-bold"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={sending}
          onClick={onSubmit}
          className={sending ? "mx-auto items-center justify-center bg-white text-black p-2 my-5 rounded-lg font-bold border border-white duration-300 ease-in-out" : "bg-white text-black p-2 my-5 rounded-lg font-bold border border-white hover:text-white hover:bg-transparent duration-300"}
        >
          {
            sending ? (<Image src="https://www.svgrepo.com/show/7849/loading.svg" className='loading-spinner' width={60} height={60} alt='' />) : "Send"
          }
        </button>
        {success && (
          <h1 className="mt-5 font-bold text-[42px]">Check Your Email.</h1>
        )}
      </div>

  );
}
