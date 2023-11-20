'use client'

import { ReactNode, createContext, useState, useContext, useEffect } from 'react'
import supabase from '@/lib/utils/supabase'
import { useRouter, usePathname } from 'next/navigation'
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'

export type UserType = { id: string; email: string } | null

export type AuthContextProps = {
  user: User | null
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const isAvailableForViewing = pathname === '/' || pathname === '/login' || pathname === '/signup'
  const value = {
    user
  }

  useEffect(() => {
    const authStateChanged = (event: AuthChangeEvent, session: Session | null) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      !currentUser && !isAvailableForViewing && router.push('/login')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(authStateChanged)

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
