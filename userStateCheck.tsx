"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase'; 
import { toast } from 'react-toastify';
export default function ProtectedPage ({ children } : { children: React.ReactNode }){
   const [user] = useAuthState(auth);
   const router = useRouter();
 
   useEffect(() => {
     if (user) {
       toast.error("You cannot view this page", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark"
      })
       router.push('/');
     }
   }, [user, router]);
   return children
 };

 export function ProtectedPage2 ({ children } : { children: React.ReactNode }) {
  const [user] = useAuthState(auth);
   const router = useRouter();
 
   useEffect(() => {
     if (!user) {
       toast.error("You cannot view this page", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark"
      })
       router.push('/');
     }
   }, [user, router]);
   return children
 }
 

 