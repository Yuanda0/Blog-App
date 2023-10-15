"use client"

import { auth } from "@/Firebase"
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Welcome() {
   const [user] = useAuthState(auth);
   return (
     <h1 className='text-center mt-10 p-2 font-bold border-b w-60 mx-auto rounded-full welcome-text'>
       Welcome, &nbsp;
       {
        user?.displayName !== null ? user?.displayName : user?.email
       }
     </h1>
   );
}
