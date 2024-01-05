'use client'

import { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'

import supabase from '@/lib/supabase'

import { authIsLoadingAtom, authSessionAtom, authUserDataAtom } from '@/atoms/auth'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth

  const [loading, setLoading] = useAtom(authIsLoadingAtom)
  const [session, setSession] = useAtom(authSessionAtom)
  const [userData, setUserData] = useAtom(authUserDataAtom)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        const { data: session } = await auth.getSession()
        if (mounted) {
          if (session) {
            setSession(session.session)
          }
          setLoading(false)
        }
      })()
    const { data: subscription } = auth.onAuthStateChange((_event, session) => {
      setSession(session)
      auth.getUser().then(res => {
        const user = res.data.user
        setUserData(user)
      })

      if (_event === 'SIGNED_OUT') {
        setSession(null)
        setUserData(null)
      }
    })
    return () => {
      mounted = false
      subscription?.subscription.unsubscribe()
    }
  }, [])

  return <>{!loading && children}</>
}

export { AuthProvider }
