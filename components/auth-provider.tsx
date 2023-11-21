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
  login: ({ email, password }: { email: string; password: string }) => Promise<void>
  signup: ({ email, password }: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}
const AuthContext = createContext<AuthCtx | null>(null)
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth

  const [loading, setLoading] = useState<boolean>(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
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

  const login = async ({ email, password }: { email: string; password: string }) => {
    await auth.signInWithPassword({ email, password })
  }

  const signup = async ({ email, password }: { email: string; password: string }) => {
    await auth.signUp({ email, password })
  }

  const logout = async () => {
    await auth.signOut()
  }

  const exposed: AuthCtx = {
    session,
    loading,
    setLoading,
    signup,
    login,
    logout
  }

  return <AuthContext.Provider value={exposed}>{!loading && children}</AuthContext.Provider>
}

export { useAuth, AuthProvider }
