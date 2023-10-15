"use client"
import React, { useEffect, useState } from 'react'

import { Blog } from '@/types';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/Firebase';
import { fetchBlog } from '@/functions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function DetailPage({ params } : { params: { blogId: string } }) {

  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [displayContent, setDisplayContent] = useState(false);
  const [charsRemaining, setCharsRemaining] = useState(1344);
  const [charsRemainingTitle, setCharsRemainingTitle] = useState(32);
  const [blogContent, setBlogContent] = useState('');
  const [confirmContent, setConfirmContent] = useState(false);
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (params.blogId) {
      (async () => {
        const blog = await fetchBlog(params.blogId);
        setBlog(blog);
      })();
    } else {
      console.log("err occurred!");
    }
  }, [params.blogId]);

    const handleUpdateDoc = async () => {
      if (blogContent.trim().length == 0 || title.trim().length == 0) {
        toast.error("Blog and Title cannot be empty!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark"
        })
      } else {
        try {
          setLoading(true);
          const docRef = doc(firestore, 'all_blogs', params.blogId);
        const docRef2 = doc(
          firestore,
          `blogs/${auth.currentUser?.uid}/userBlogs/${params.blogId}`
        );
        await updateDoc(docRef, {
          content: blogContent,
          title: title
        });
        await updateDoc(docRef2, {
          content: blogContent,
          title: title,
        });
        } catch(e) {
          console.log(e);
        } finally {
          toast.success("Blog Has Updated!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark"
          })
          route.push("/profile");
          setTitle("");
          setBlogContent("");
        }
      }
    }
    const handleDeleteSubmit = async () => {
      setLoading(true);
      try {
        toast.loading("Deleting...", {
          autoClose: false,
          position: "top-left",
          theme: "dark",
          closeOnClick: false,
          pauseOnHover: false,
          hideProgressBar: false,
        })
        await deleteDoc(
            doc(
              firestore,
              `blogs/${auth.currentUser?.uid}/userBlogs/${params.blogId}`
            )
          );
          await deleteDoc(doc(firestore, `all_blogs/${params.blogId}`));
        
      } catch (e) {
        console.log(e);
      } finally {
        toast.success("Blog Has Deleted!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark"
        })
        
        setTimeout(()=>{
          toast.dismiss()
          route.push("/profile");
        }, 2000)
      }
    }
  return (
    <>
      {confirmContent ? (
        <div className="min-h-screen flex items-center justify-center ">
          <div className="text-center">
            <div className="w-full h-full flex flex-col items-center justify-center gap-10 border rounded-lg shadow-md shadow-white p-5">
              <h1>Delete Blog?</h1>
              <button
                className="w-60 mx-auto text-center p-3 rounded-md border hover:scale-110 duration-200 ease-out"
                onClick={handleDeleteSubmit}
              >
                Yes
              </button>
              <button
                className="w-60 mx-auto text-center p-3 rounded-md border hover:scale-110 duration-200 ease-out"
                onClick={() => setConfirmContent(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : displayContent ? (
        <>
          <h1 className="text-center mt-5">Edit Blog</h1>
          <div className="md:w-80 w-full mx-auto mt-10 flex flex-col gap-5 border p-10">
            <input
              onChange={(e) => {
                if (e.target.value.length > 32) {
                  return;
                }
                setTitle(e.target.value);
                setCharsRemainingTitle(32 - e.target.value.length);
              }}
              placeholder="Enter the title here."
              className="rounded-md text-black font-bold my-3 p-1"
            />
            <p>{charsRemainingTitle}</p>
            <textarea
              placeholder="Enter the blog here."
              className="p-4 rounded-md text-black font-bold"
              onChange={(e) => {
                if (e.target.value.length > 1344) {
                  return;
                }
                setBlogContent(e.target.value);
                setCharsRemaining(1344 - e.target.value.length);
              }}
            />
            <p>{charsRemaining}</p>
            <button
              onClick={() => setDisplayContent(!displayContent)}
              className="p-3 my-4 border rounded-lg w-40 mx-auto hover:scale-105 duration-300 ease-in-out"
            >
              Undo
            </button>
            <button
              onClick={handleUpdateDoc}
              className={
                loading
                  ? "mx-auto items-center justify-center bg-white text-black p-2 my-5 rounded-lg font-bold border border-white duration-300 ease-in-out"
                  : "w-24 border border-white mx-auto p-2 rounded-md hover:scale-105 duration-200 ease-in-out"
              }
            >
              {loading ? (
                <Image
                  src="https://www.svgrepo.com/show/7849/loading.svg"
                  width={60}
                  height={60}
                  className="loading-spinner"
                  alt=""
                />
              ) : (
                "Done!"
              )}
            </button>
          </div>
        </>
      ) : blog ? (
        <div>
          <div className="rounded-md text-center flex flex-col gap-10 border border-white mt-20 p-5 md:w-[400px] w-full mx-auto shadow-xl shadow-white font-bold break-words">
            <h1>Created By {blog?.creator}</h1>
            <hr />
            <h3>Title: {blog?.title}</h3>
            <hr />
            <p>Content: {blog?.content}</p>
            <hr />
            <button
              className="justify-center w-full border rounded-lg border-white p-2 my-5 hover:scale-105 duration-300 ease-linear"
              onClick={() => setDisplayContent(!displayContent)}
            >
              Edit Blog
            </button>
            <button
              onClick={() => setConfirmContent(true)}
              className={
                loading
                  ? "mx-auto items-center justify-center bg-white text-black p-2 my-5 rounded-lg font-bold border border-white duration-300 ease-in-out"
                  : "border rounded-md text-white border-white p-4 duration-300 ease-in-out"
              }
            >
              {loading ? (
                <Image
                  src="https://www.svgrepo.com/show/7849/loading.svg"
                  width={60}
                  height={60}
                  className="loading-spinner"
                  alt=""
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col gap-8 text-center border border-white shadow-md shadow-white md:w-[700px] w-full md:mt-7 mt-10 rounded-md">
            <h1 className="text-42 mt-5">
              {params.blogId} couldn&apos;t be found!
            </h1>
            <p>
              This blog cannot be found, it may have been deleted or you may
              have entered the wrong address.
            </p>
          </div>
          <Link
            href="/profile"
            className="hover:underline font-bold text-center mx-auto w-40 mt-5"
          >
            Go to Profile
          </Link>
        </div>
      )}
    </>
  );
}
