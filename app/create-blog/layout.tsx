import { ProtectedPage2 } from '@/userStateCheck';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Blog',
  description: 'NextJS-Blog App',
}

export default function CreateBlogLayout({
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
