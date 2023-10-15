"use client"
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from "@/Firebase"
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsCaretUp, BsCaretDown } from 'react-icons/bs'

import { toast } from 'react-toastify';

export default function UserState() {
   const [user] = useAuthState(auth);
   const [signOut] = useSignOut(auth);
   const [content, setContent] = useState(false);
   const [displayNav, setDisplayNav] = useState(false);
   const [displayContent, setDisplayContent] = useState(false);
   const handleSignOut = async () => {
    const res = window.confirm("Are you sure for sign out?");
    if (res) {
      try {
        await signOut();
      } finally {
        toast.success("You've successfully signed out!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
      }
    }
   }

   const handleContent = () => {
    if (displayContent) {
      return;
    } else {
      setContent(true);
    }
   }

  return (
    <>
      {user ? (
        <>
          <div className="hidden md:flex gap-10 p-4 mt-2 border border-white rounded-lg mr-10">
            <div></div>
            <h1>
              {user.displayName !== null ? user.displayName : user.email}{" "}
            </h1>
            <button
              onMouseEnter={handleContent}
              onMouseLeave={() => setContent(false)}
              className="items-center h-6"
              onClick={() => {
                setDisplayContent(!displayContent);
                setContent(false);
              }}
            >
              {displayContent ? <BsCaretUp /> : <BsCaretDown />}
            </button>
            {" | "}
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          {content ? (
            <div className="flex mt-5 font-bold border-2 opacity-100 bg-black rounded-md p-5 w-full py-6 shadow-md shadow-white duration-700 ease-in-out">
              <Link href="/profile" className="mr-auto">
                Profile
              </Link>
              <p className="font-bold mx-auto px-7">and</p>
              <Link href="/create-blog">Create Blog</Link>
            </div>
          ) : (
            <div className="absolute border-none top-10 right-5 pointer-events-none opacity-0 py-10 mt-10 px-14 bg-transparent duration-500 ease-in-out"></div>
          )}
          {displayContent ? (
            <div className="z-10 bg-black gap-4 w-60 flex flex-col border-2 rounded-lg text-center p-5 mt-10 opacity-100 duration-700 ease-out">
              <Link href="/profile" className="border-b-2 py-2">
                Profile
              </Link>
              <Link href="/create-blog">Create Blog</Link>
            </div>
          ) : (
            <div className="absolute border-none top-10 right-5 pointer-events-none opacity-0 py-10 mt-10 px-14 bg-transparent duration-500 ease-in-out"></div>
          )}
        </>
      ) : (
        <div className="h-full p-5 mt-1 md:flex hidden gap-5">
          <Link className="font-bold underline" href="/login">
            LOG IN
          </Link>
          <Link className="font-bold underline" href="/signup">
            SIGN UP
          </Link>
        </div>
      )}
      <>
        <div className="md:hidden flex w-full">
          <button
            className="ml-auto mb-5 relative right-5 focus:outline-none"
            onClick={() => setDisplayNav(!displayNav)}
          >
            <span
              className={`absolute inset-0 transition-opacity duration-500 ${
                displayNav ? "opacity-100" : "opacity-0"
              }`}
            >
              <AiOutlineClose size={25} />
            </span>
            <span
              className={`absolute inset-0 transition-opacity duration-500 ${
                displayNav ? "opacity-0" : "opacity-100"
              }`}
            >
              <AiOutlineMenu size={25} />
            </span>
          </button>

          <div
            className={
              displayNav
                ? "opacity-100 duration-700 ease-in-out"
                : "opacity-5 duration-700 ease-in-out"
            }
          >
            {displayNav ? (
              user ? (
                <div
                  className={
                    "absolute top-16 right-5 flex w-80 flex-col bg-white text-black border font-bold rounded-lg p-2 gap-5 duration-300"
                  }
                >
                  <h1 className="border-b-2 border-black">
                    {user?.displayName !== null
                      ? user?.displayName
                      : user.email}
                  </h1>
                  <Link href="/profile">Profile</Link>
                  <Link href="/create-blog">Create Blog</Link>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              ) : (
                <div className="absolute top-14 right-4 md:hidden flex flex-col border-2 p-4 rounded-lg gap-5">
                  <Link className="font-bold underline" href="/login">
                    LOG IN
                  </Link>
                  <Link className="font-bold underline" href="/signup">
                    SIGN UP
                  </Link>
                </div>
              )
            ) : (
              <div className="absolute top-10 right-10 pointer-events-none opacity-100 h-10 w-10 bg-transparent duration-700 ease-in-out"></div>
            )}
          </div>
        </div>
      </>
    </>
  );
}