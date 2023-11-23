import React, { useEffect } from 'react'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import { authIsLoadingAtom, authSessionAtom } from '@/atoms/auth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session] = useAtom(authSessionAtom)
  const [loading] = useAtom(authIsLoadingAtom)

  const router = useRouter()
  useEffect(() => {
    ; (async () => {
      if (!session && !loading) {
        router.push('/login')
        return
      }
    })()
  }, [])
  return <>{session && children}</>
}

export default ProtectedRoute
