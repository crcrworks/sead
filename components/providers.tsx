'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './auth-provider'
import ProtectedRoute from './protect-route'
import { usePathname } from 'next/navigation'

const noAuthRequired = ['/', '/login', '/signup']

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <AuthProvider>
      {noAuthRequired.includes(pathname) ? (
        <div>{children}</div>
      ) : (
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </AuthProvider>
  )
}

export default Providers
