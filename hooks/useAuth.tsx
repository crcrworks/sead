import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { useToast } from '@/components/ui/use-toast'
import { useGetURL } from './useGetURL'

import supabase from '@/lib/utils/supabase'

import { Provider, AuthError } from '@supabase/supabase-js'

import { ToastAction } from '@/components/ui/toast'
import { useState } from 'react'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type authSchemaType = z.infer<typeof authSchema>

export const useAuth = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { getURL } = useGetURL()

  const [isLoading, setIsLoding] = useState<boolean>(false)

  const errorToast = (error: AuthError) => {
    switch (error.name) {
      case 'AuthApiError':
        toast({
          title: 'Invalid Account',
          description: error.message,
          action: (
            <ToastAction
              altText="Create Account"
              onClick={() => {
                router.push('/signup')
              }}
            >
              Create Account
            </ToastAction>
          )
        })
        break
      default:
        toast({
          title: 'Error occurred',
          description: error.message
        })
        break
    }
  }

  const loginWithPassword = async (authData: authSchemaType) => {
    setIsLoding(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password
    })
    setIsLoding(false)

    if (error) {
      errorToast(error)
    } else {
      router.push('/home')
    }
  }

  const signUp = async (authData: authSchemaType) => {
    setIsLoding(true)
    const { data, error } = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        emailRedirectTo: getURL()
      }
    })
    setIsLoding(false)

    if (error) {
      errorToast(error)
    } else {
      toast({
        title: 'Account has been created successfully',
        description: 'Please confirm your email'
      })
    }
  }

  const signInWithOauth = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: getURL()
      }
    })
  }

  const signOut = async () => {
    supabase.auth.signOut()
    router.push('/')
  }

  return {
    loginWithPassword,
    signUp,
    signInWithOauth,
    signOut,
    isLoading
  }
}
