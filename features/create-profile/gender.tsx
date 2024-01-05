import { State } from '@/types/state'
import { Gender } from '@/types/user'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCallback } from 'react'

export const GenderContent = (gender: State<Gender>) => {
  const handleChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  return (
    <div>
      <p className="mb-2">Gender</p>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="not-to-say">Not to say</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
