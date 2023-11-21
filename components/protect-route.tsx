import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth()!
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      if (!session && !loading) {
        router.push('/login')
        return
      }
    })()
  }, [])
  return <>{session && children}</>
}

export default ProtectedRoute
