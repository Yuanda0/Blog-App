"use client"
import { fetchBlogs } from '@/functions';
import { auth, firestore } from '@/Firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Blog } from '@/types';

export default function YourBlogs() {
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState<Blog[] | undefined>([]);
  const router = useRouter();
  
  const userId = user?.uid;
  useEffect(()=>{
    try {
      if (userId) {
        (async () => {
          const blogs = await fetchBlogs(userId);
          setBlogs(blogs);
        })();
      } else {
        console.log("No user id found!");
      }
    } catch (error) {
      console.log(error);
    }
  },[userId])
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold text-center mb-4 ">User Blogs</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mx-5 break-words">
        {blogs?.map((blog) => {
          const formattedTimestamp = blog.timestamp.toDate().toLocaleDateString();
          return (
            <Link href={`/profile/${blog.id}`}
              key={blog.id}
              className="bg-black rounded-lg p-4 relative overflow-hidden transform transition-all duration-300 md:hover:scale-105 md:hover:bg-gray-800"
            >
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <div className="text-gray-400 text-sm mb-4">
                By {blog.creator}
              </div>
              <span className='font-thin'>Created on -&gt; {formattedTimestamp}</span>
            </Link>
          );
        })}
        {
          blogs?.length === 0 && (<div className='text-center items-center w-80 mx-auto mt-5'>
            <h1 className='text-center font-bold'>You&apos;ve any blog yet!</h1>
            <button onClick={()=>router.push("/create-blog")} className='rounded-md border border-white p-4 shadow-md shadow-white mt-5 hover:scale-105 duration-300 ease-in-out'>Create Blogs!</button>
          </div>)
        }
      </ul>
    </div>
  );
}
