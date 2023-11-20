import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
        <p className="text-8xl font-bold">Sead</p>
        <Button asChild>
          <Link href="/register">Start</Link>
        </Button>
      </div>
    </main>
  )
}
