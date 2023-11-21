'use client'

import { useEffect, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

import { FaGoogle } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { LuLoader2 } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ToastAction } from '@/components/ui/toast'

import supabase from '@/lib/utils/supabase'
import { getURL } from 'next/dist/shared/lib/utils'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const ProfileCard = () => {
  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })

      setIsLoading(false)

      if (error?.name === 'AuthApiError') {
        toast({
          title: 'Invalid Account',
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
      }
    } catch (error) {
      setIsLoading(false)
      toast({
        description: 'error occurred'
      })
    }
  }

  const onClickGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL()
      }
    })
  }

  return (
    <div className=" flex w-96 flex-col space-y-5 rounded-lg  p-10">
      <p className="text-4xl font-bold">Login</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@outlook.jp"
                    {...field}
                    className="border-black border-opacity-50 focus:border-opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="border-black border-opacity-50 focus:border-opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button type="submit" variant="default" disabled>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </Button>
          ) : (
            <Button type="submit" variant="default">
              Submit
            </Button>
          )}
        </form>
      </Form>

      <hr className="h-[1px] w-full bg-black opacity-30" />
      <Button variant="secondary" className="hover:opacity-80" onClick={onClickGoogle}>
        <FaGoogle className="mr-2" />
        Connect Google
      </Button>
      <Button
        variant={'link'}
        onClick={() => {
          router.push('/signup')
        }}
      >
        Create Account
        <FaArrowRight className="ml-2" />
      </Button>
    </div>
  )
}

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(sessionData => {
      if (sessionData.data.session !== null) {
        router.push('/home')
      }
    })
  }, [router])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <ProfileCard />
    </div>
  )
}

export default Login
