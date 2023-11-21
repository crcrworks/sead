'use client'
import { useState } from 'react'
import supabase from '@/lib/utils/supabase'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import Logo from '@/public/logo.svg'

import Image from 'next/image'
import Link from 'next/link'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { IoMenu } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

export const Dropdown = () => {
  const handleSignout = () => {
    supabase.auth.signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto mr-2 hover:bg-yellow">
          <IoMenu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 w-56 bg-white">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IoMdSettings className="mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleSignout}>
          <MdLogout className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Header = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)
  return (
    <div className="flex flex-row items-center py-2">
      <Link href="/" className="flex flex-row items-center space-x-2 ">
        <Image src={Logo} width={35} height={35} alt="logo" className="ml-2 fill-black" />
        <p className="text-md font-bold">Sead</p>
      </Link>
      <Dropdown />
    </div>
  )
}

export default Header
