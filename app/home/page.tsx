'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ClassCard } from '@/components/class-card'

import { FaDiceD6 } from 'react-icons/fa'
import { MdOutlineHistory } from 'react-icons/md'
import { MdModeEdit } from 'react-icons/md'

const classes: { title: string }[] = [
  { title: '3-1' },
  { title: '3-2' },
  { title: '3-3' },
  { title: '3-4' },
  { title: '3-5' },
  { title: '3-6' },
  { title: '3-7' }
]

const Home = () => {
  const [nowSelect, setNowSelect] = useState<number | null>(null)

  return (
    <main>
      <div className="mt-10 flex h-screen w-screen flex-col items-center space-y-10">
        <div className="flex flex-row items-center justify-center space-x-3">
          <Button size="default" variant="outline" className="w-28">
            <MdOutlineHistory className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button size="lg" className="h-14 w-32">
            <FaDiceD6 className="mr-2" />
            ROLL
          </Button>
          <Button size="default" variant="outline" className="w-28">
            <MdModeEdit className="mr-2" />
            Edit
          </Button>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <p className="my-5 text-4xl font-bold">Class</p>
            <div className=" mx-2 flex max-w-screen-xl flex-row flex-wrap items-center justify-center gap-3">
              {classes.map((c, index) => {
                return <ClassCard key={index} title={c.title} isSelect={false} />
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
