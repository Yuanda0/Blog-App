"use client"
import { fetchClickedBlog } from '@/functions'
import { Blog } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "@/Firebase"
import { toast } from 'react-toastify';

export default function BlogPage({params}: {params: { blogId: string }}) {
  const Router = useRouter();

  const [clickedBlog, setClickedBlog] = useState<Blog | null>(null);
  const [likeList, setLikeList] = useState<string[] | undefined>([]);
  useEffect(() => {
    (async () => {
      if (params.blogId) {
        const blogRes = await fetchClickedBlog(params.blogId);
      setClickedBlog(blogRes);
      setLikeList(blogRes?.likeList || []);
      } else {
        console.log("Err occured");
        return;
      }
    })();
  }, [params.blogId])
  
  const handleLikeBlog = async (blogId: string) => {
    try {
      const blogRef = doc(firestore, 'all_blogs', blogId);
      if (auth.currentUser) {
        if (likeList?.includes(auth.currentUser?.uid)) {
          toast.error("You've already liked this blog!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
        } else {
          await updateDoc(blogRef, {
            likeList: arrayUnion(auth.currentUser?.uid)
          });
          toast.success("You've liked this blog!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000)
      }
      } else {
        toast.error("You have to sign in for liking blogs!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }
  

  return (
    <div>
      {clickedBlog ? (
        <div className="text-center items-center justify-center flex flex-col md:ga-10 gap-5 mt-5 md:mt-10">
          <h1 className="md:text-xl text-[20px]">
            Author: {clickedBlog?.creator}
          </h1>
          <div className="md:p-6 p-3 md:w-[600px] w-full mx-auto md:shadow-md md:shadow-white break-words flex flex-col border rounded-md gap-3 md:gap-7">
            <h2 className="font-bold border-b">Title:</h2>
            <h3 className="mb-7">{clickedBlog?.title}</h3>
            <h3 className="font-bold border-b">Blog:</h3>
            <p>{clickedBlog?.content}</p>
            <div className="flex justify-between">
              <h1 className="font-bold my-4 items-center mt-5">
                Likes: {clickedBlog.likeList.length}
              </h1>
              <button
                onClick={() => handleLikeBlog(params.blogId)}
                className="border-2 rounded-full p-4 text-center items-center"
              >
                <AiOutlineLike size={25} />
              </button>
            </div>
          </div>
          <button
            onClick={() => Router.push("/blogs")}
            className="mt-5 border px-4 py-2 rounded-md bg-white w-48 mx-auto text-black font-bold hover:bg-transparent hover:text-white duration-300 ease-in-out"
          >
            Go back to Blogs
          </button>
        </div>
      ) : (
        <div className="items-center justify-center min-h-screen flex flex-col gap-5 md:gap-10">
          <h1 className="font-bold md:text-xl text-[20px] text-center flex">
            This blog couldnt found! Blog Id: {params.blogId}
          </h1>
          <button
            onClick={() => Router.push("/blogs")}
            className="font-bold w-60 mx-auto p-4 border rounded-2xl bg-white text-black md:hover:bg-transparent md:hover:text-white duration-200 ease-linear"
          >
            Go back to blogs
          </button>
        </div>
      )}
    </div>
  );
}
