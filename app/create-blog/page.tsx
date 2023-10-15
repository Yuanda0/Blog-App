"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, firestore } from "@/Firebase"
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { AiOutlineLike } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { ProtectedPage2 } from '@/userStateCheck';
export default function CreateBlogPage () {
  const router = useRouter();
  const [blogContent, setBlogContent] = useState('');
  const [charsRemainingTitle, setCharsRemainingTitle] = useState(32);
  const [charsRemainingBlog, setCharsRemainingBlog] = useState(1344);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [user] = useAuthState(auth);
  const handleCreateBlog = async () => {
    if (title.trim().length === 0 || blogContent.trim().length === 0) {
      toast.error("Blog and Title cannot be empty!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark"
      })
      return;
    }
    else {
      try {
        setLoading(true);
        const userId = user?.uid;

        if (!userId) {
          window.alert("You must be logged in for sharing blogs.");
          router.push("/login");
          return;
        }

        const commonId = nanoid();

        const docRef = await setDoc(
          doc(firestore, `/blogs/${userId}/userBlogs/${commonId}`),
          {
            title: title,
            creator: user.displayName !== null ? user.displayName : user.email,
            content: blogContent,
            timestamp: serverTimestamp(),
            likeList: [],
          }
        );
        const docRef2 = await setDoc(doc(firestore, `/all_blogs/${commonId}`), {
          title: title,
          creator: user.displayName !== null ? user.displayName : user.email,
          content: blogContent,
          timestamp: serverTimestamp(),
          likeList: [],
        });
        setBlogContent("");
        setTitle("");
      } finally {
        toast.success("Blog Has Created!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark"
        })
        setTimeout(() => {
          setLoading(false);
          setCharsRemainingBlog(1344);
          setCharsRemainingTitle(32);
        }, 2000);
      }
    }
  };


  return (
      <div className="w-full h-full items-center justify-center">
        <h1 className="text-center mt-5">Create Blog</h1>
        <div className="w-80 mx-auto mt-10 flex flex-col gap-5 border p-10">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              if (e.target.value.length > 32) {
                return;
              }
              setTitle(e.target.value);
              setCharsRemainingTitle(32 - e.target.value.length);
            }}
            value={title}
            className="p-2 rounded-md text-black font-bold"
          />
          <p>{charsRemainingTitle}</p>
          <textarea
            placeholder="Enter the blog here."
            className="p-4 rounded-md text-black font-bold"
            value={blogContent}
            onChange={(e) => {
              if (e.target.value.length > 1344) {
                return;
              }
              setBlogContent(e.target.value);
              setCharsRemainingBlog(1344 - e.target.value.length);
            }}
          />
          <p>{charsRemainingBlog}</p>
          <button
            onClick={handleCreateBlog}
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
              "Share!"
            )}
          </button>
        </div>

        <div className="p-4 mt-5 text-center">
          <button
            onClick={() => setPreview(!preview)}
            className="items-center p-3 rounded-lg border border-white hover:bg-transparent font-bold hover:text-white text-black bg-white duration-300 ease-in-out w-40"
          >
            Preview
          </button>
        </div>
        {preview && (
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 items-center justify-center mx-auto">
            <div className="border border-gray-300 rounded-md shadow-md h-full break-words">
              <h1 className="text-center text-xl font-bold p-4">
                Author:{" "}
                {user?.displayName !== null ? user?.displayName : user.email}
              </h1>
              <h2 className="text-center text-lg font-semibold p-4">
                Title: {title}
              </h2>
              <p className="text-center md:mt-5 font-bold">
                Blog: {blogContent}
              </p>
              <button
                className="p-3 border-2 border-white rounded-md mb-5 ml-3 
          md:hover:scale-110 md:hover:shadow-md md:hover:shadow-white duration-200 ease-in-out"
              >
                Read Blog
              </button>
            </div>
          </div>
        )}
      </div>
  );
};
