
import { auth } from '@/Firebase';
import ProtectedPage from '@/userStateCheck';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile",
  description: 'NextJS-Blog App',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ProtectedPage>
         <div>{children}</div>
      </ProtectedPage>
   );
}
