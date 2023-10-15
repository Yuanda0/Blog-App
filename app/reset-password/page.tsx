import { auth } from '@/Firebase'
import React from 'react'
import ResetPasswordContent from '../../components/ResetPasswordContent'
import Link from 'next/link';
export default function ResetPassword() {
  return (
    <div className='w-full h-full mx-auto flex flex-col gap-4'>
      <h1 className="text-center mt-4">RESET PASSWORD</h1>
      <Link href="/login" className="p-4 w-40 mx-auto mt-5 text-center border-white border-2 rounded-md font-bold">
        Go to Login
      </Link>
      <ResetPasswordContent />
    </div>
  );
}
