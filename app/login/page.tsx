"use client"
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "@/Firebase"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginPage () {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signInWithGoogle, error] = useSignInWithGoogle(auth);

  const router = useRouter();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
  ] = useSignInWithEmailAndPassword(auth);

  const handleGoogleSignIn = () => {
    if (error) {
      console.log("Error signing in with Google", error);
    } else {
      signInWithGoogle();
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(loginForm.email, loginForm.password);
    } catch(e) {
      console.log(e);
      
    } finally {
      router.push("/")
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (

      <div className="flex flex-col mt-20 items-center min-h-screen">
        <button
          onClick={handleGoogleSignIn}
          className="google-button border border-white rounded-lg p-4 flex items-center hover:scale-110 duration-300 ease-in font-bold"
        >
          <Image src="/google-icon.png" width={60} height={60} alt="" />
          SIGN IN WITH GOOGLE
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
              Log in
            </button>
          </form>
          <Link href="/reset-password" className="underline">
            Forgot your password?
          </Link>
        </div>
      </div>
  );
};

