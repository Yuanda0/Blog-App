"use client"
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "@/Firebase"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/userStateCheck';
import { toast } from 'react-toastify';

export default function SignUpPage () {
  const router = useRouter()
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
  });

  
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user,
    loading,
  ] = useCreateUserWithEmailAndPassword(auth);
  const handleGoogleSignUp = () => {
    if (error) {
      console.log("Error signing in with Google", error);
    } else {
      signInWithGoogle();
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(signUpForm.email, signUpForm.password);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProtectedPage>
      <div className="flex flex-col mt-20 items-center min-h-screen">
        <button
          onClick={handleGoogleSignUp}
          className="border border-white rounded-lg p-4 flex items-center hover:scale-105 hover:shadow-md hover:shadow-white duration-300 font-bold"
        >
          <Image src="/google-icon.png" width={60} height={60} alt="" />
          SIGN UP WITH GOOGLE
        </button>

        <div className="w-full max-w-md p-4 mt-10">
          <form onSubmit={onSubmit} className="text-black font-bold">
            <input
              required
              name="email"
              placeholder="Email"
              type="email"
              onChange={onChange}
              className="mb-2 p-2 border rounded-md w-full"
            />
            <input
              required
              name="password"
              placeholder="Password"
              type="password"
              onChange={onChange}
              className="mb-2 p-2 border rounded-md w-full"
            />
            <button
              className="w-full h-10 mt-2 bg-blue-500 text-white rounded-md"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </ProtectedPage>
  );
};


