'use client'

import supabase from '@/lib/utils/supabase'
import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { Session } from '@supabase/supabase-js'

type AuthCtx = {
  session: Session | null
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}
const AuthContext = createContext<AuthCtx | null>(null)
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth

  const [loading, setLoading] = useState<boolean>(true)
  const [session, setSession] = useState<Session | null>(null)

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
      if (_event === 'SIGNED_OUT') {
        setSession(null)
      }
    })
    return () => {
      mounted = false
      subscription?.subscription.unsubscribe()
    }
  }, [])

  const exposed: AuthCtx = {
    session,
    loading,
    setLoading
  }

  return <AuthContext.Provider value={exposed}>{!loading && children}</AuthContext.Provider>
}

export { useAuth, AuthProvider }
