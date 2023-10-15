import ProtectedPage from '@/userStateCheck'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'NextJS-Blog App',
}

export default function LoginLayout({
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
