"use client"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, firestore } from "@/Firebase";
import { Blog } from "./types";


export const fetchAllBlogs = async () => {

  try {
    const userBlogsRef = collection(firestore, "all_blogs");
    
    const snapshot = await getDocs(userBlogsRef);
  
    
    const blogData: Blog[] = snapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      creator: doc.data().creator,
      title: doc.data().title,
      timestamp: doc.data().timestamp,
      likeList: doc.data().likeList
    }));
    
    if(blogData){
      return blogData
    } 
  } catch (error) {
    console.error('Firestore data fetching err: ', error);
  }
}

export const fetchBlogs = async (userId:string) => {
   try {
     const userBlogsRef = collection(firestore, `blogs/${userId}/userBlogs`);
     
     const snapshot = await getDocs(userBlogsRef);     
     const blogData: Blog[] = snapshot.docs.map(doc => ({
       id: doc.id,
       content: doc.data().content,
       creator: doc.data().creator,
       title: doc.data().title,
       timestamp: doc.data().timestamp,
       likeList: doc.data().likeList
     }));
     
     if(blogData){
       return blogData
     } 
   } catch (error) {
     console.error('Firestore data fetching err: ', error);
   }
 };
 export const fetchBlog = async (blogId: string): Promise<Blog | null> => {
  try {
    const blogsRef = doc(
      firestore,
      `blogs/${auth.currentUser?.uid}/userBlogs/${blogId}`
    );
    const snapshot = await getDoc(blogsRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data) {
        const blog: Blog = {
          title: data.title,
          creator: data.creator,
          id: data.id,
          content: data.content,
          timestamp: data.timestamp,
          likeList: data.likeList
        };
        return blog;
      }
    }

    return null;
  } catch (error) {
    console.error('Firestore data fetching err: ', error);
    return null;
  } 
};

export const fetchClickedBlog = async (blogId: string): Promise<Blog | null> => {
  try {
    const blogsRef = doc(firestore, `all_blogs/${blogId}`);
    const snapshot = await getDoc(blogsRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data) {
        const blog: Blog = {
          title: data.title,
          creator: data.creator,
          id: data.id,
          content: data.content,
          timestamp: data.timestamp,
          likeList: data.likeList,
        };
        return blog;
      }
    } 
    
    return null;
  } catch (error) {
    console.error('Firestore data fetching err: ', error);
    return null;
  } 
};

