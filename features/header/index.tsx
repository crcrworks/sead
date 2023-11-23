'use client'
import { useState } from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import Logo from '@/public/logo.svg'

import Image from 'next/image'
import Link from 'next/link'
import { Dropdown } from './components/dropdown'
import { Notification } from './components/notification'

import { authSessionAtom } from '@/atoms/auth'

import { useAtom } from 'jotai'

type Checked = DropdownMenuCheckboxItemProps['checked']

const Header = () => {
  const [session, setSession] = useAtom(authSessionAtom)
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  return (
    <div className="flex flex-row items-center py-2">
      <Link href="/" className="flex flex-row items-center space-x-2 ">
        <Image src={Logo} width={35} height={35} alt="logo" className="ml-2 fill-black" />
        <p className="text-md font-bold">Sead</p>
      </Link>
      <div className="ml-auto mr-2 ">
        <Notification />
        {session && <Dropdown />}
      </div>
    </div>
  )
}

export default Header
