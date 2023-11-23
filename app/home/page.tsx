'use client'

import supabase from '@/lib/utils/supabase'

import { useToast } from '@/components/ui/use-toast'

const Home = () => {
  const { toast } = useToast()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast({ title: error.message })
    }
  }

  return (
    <main>
      <p>home</p>
    </main>
  )
}

export default Home
