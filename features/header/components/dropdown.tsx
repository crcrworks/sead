import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { FaUser } from 'react-icons/fa6'
import { LuAlignJustify } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAuth } from '@/hooks/useAuth'
import { authUserDataAtom } from '@/atoms/auth'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

export const Dropdown = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const [user, setUser] = useAtom(authUserDataAtom)

  const handleSettings = () => {
    router.push('/settings')
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-yellow">
          <LuAlignJustify className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-56 bg-white">
        <p className="m-1 text-sm opacity-60">{user?.email}</p>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSettings}>
            <IoMdSettings className="mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleSignOut}>
          <MdLogout className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
