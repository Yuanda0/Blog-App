import React from 'react'
import UserState from './UserState'
import Link from 'next/link'

export default function Navbar() {

  return (
    <>
      <div className="md:flex hidden z-10 sticky shadow-lg shadow-white/50 top-0 h-[75px] border-b mx-auto justify-between bg-black">
        <Link
          href="/"
          className="mr-auto p-5 font-bold cursor-pointer text-[24px]"
        >
          BLOG-APP
        </Link>
        <Link
          className="my-auto mr-5 font-bold border rounded-md p-2 hover:bg-white hover:scale-90 hover:shadow-md hover:shadow-white hover:text-black duration-300 ease-in-out"
          href="/blogs"
        >
          Blogs
        </Link>
        <div className="">
          <UserState />
        </div>
      </div>
      <div className="md:hidden flex gap-10 z-10 relative mx-auto h-[75px] top-0 py-5 px-3">
        <Link href="/" className='mr-auto text-xl font-bold'>BLOG-APP</Link>
        <Link href="/blogs" className='mr-5 px-2 font-bold border border-white py-1 rounded-lg focus:scale-105 duration-150 ease-out'>Blogs</Link>
        <UserState  />
      </div>
    </>
  );
}
