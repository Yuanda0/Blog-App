import { auth } from '@/Firebase';
import { ProtectedPage2 } from '@/userStateCheck';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile",
  description: 'NextJS-Blog App',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ProtectedPage2>
         <div>{children}</div>
      </ProtectedPage2>
   );
}
