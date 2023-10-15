import { auth } from '@/Firebase'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import Welcome from './Welcome';
import YourBlogs from './YourBlogs';
import { ProtectedPage2 } from '@/userStateCheck';


export default function Profile() {
  
  return (
    <ProtectedPage2>
      <div>
        <Welcome />
        <YourBlogs />
      </div>
    </ProtectedPage2>
  );
}
