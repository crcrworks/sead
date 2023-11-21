'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

import { FaGoogle } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
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

import supabase from '@/lib/utils/supabase'
import { ChangeEvent, useEffect, useState } from 'react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
})

const ProfileCard = () => {
  const { toast } = useToast()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (password !== confirmPassword) return
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: password,
      options: {
        emailRedirectTo: '/home'
      }
    })
    setIsLoading(false)

    if (error) {
      toast({
        description: error.message
      })
    } else {
      toast({
        title: 'Account has been created successflly',
        description: 'Please confirm your email'
      })
    }
  }

  const handleClickGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/home'
      }
    })
  }

  const PasswordMismatch = () => {
    if (password !== confirmPassword && confirmPassword !== '') {
      return <FormMessage>passwords mismatch</FormMessage>
    }
  }

  return (
    <div className=" flex w-96 flex-col space-y-5 rounded-lg  p-10">
      <p className="text-4xl font-bold">Create Account</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
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
                    {...field}
                    type="password"
                    placeholder="********"
                    className="border-black border-opacity-50 focus:border-opacity-100"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    className="border-black border-opacity-50 focus:border-opacity-100"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </FormControl>
                <PasswordMismatch />
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
      <Button variant="secondary" className="hover:opacity-80" onClick={handleClickGoogle}>
        <FaGoogle className="mr-2" />
        Connect Google
      </Button>
      <Button
        variant={'link'}
        onClick={() => {
          router.push('/login')
        }}
      >
        <FaArrowLeft className="mr-2" />
        Login
      </Button>
    </div>
  )
}

const Register = () => {
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

export default Register
