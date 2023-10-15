"use client"
import { auth } from "@/Firebase"
import { fetchAllBlogs } from '@/functions'
import { Blog } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineLike } from 'react-icons/ai';

export default function DisplayBlogs() {
  const [blogList, setBlogList] = useState<Blog[] | undefined>([]);
  const [likeList, setLikeList] = useState<string[] | undefined>([]);
  const [user] = useAuthState(auth);

   useEffect(() => {
     (async () => {
       const blogRes = await fetchAllBlogs();
       setBlogList(blogRes);
     })();
   }, []);
   const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center">
      {blogList?.map((blog) => (
        <div key={blog.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="border border-gray-300 rounded-md shadow-md h-full break-words">
            <h1 className="text-center text-xl font-bold p-4">
              Author: {blog.creator}
            </h1>
            <h2 className="text-center text-lg font-semibold p-4">
              Title: {blog.title}
            </h2>
            <div className='flex items-center'>
              <button
                onClick={() => router.push(`/blogs/${blog.id}`)}
                className="p-3 border-2 border-white rounded-md mb-5 ml-3 md:hover:scale-110 md:hover:bg-white font-bold md:hover:text-black duration-300 ease-out"
              >
                Read Blog
              </button>
              <p className='ml-auto md:mr-10 mr-5'>Likes <span className='font-bold text-[20px]'>{blog.likeList.length}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
