import { Input } from '@/components/ui/input'
import { State } from '@/types/state'
import { Option } from '@/types/option'
import { useCallback, ChangeEvent } from 'react'

type States = {
  isDisable: boolean
  studentGrade: State<Option<number>>
  studentClass: State<Option<number>>
  studentNumber: State<Option<number>>
}

export const StudentNumberContent = (states: States) => {
  const { studentGrade, studentClass, studentNumber } = states
  const handleChangeGrade = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    studentGrade.setState(e.target.value)
  }, [])
  const handleChangeClass = useCallback((e: ChangeEvent<HTMLInputElement>) => { }, [])
  const handleChangeNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => { }, [])

  return (
    <div className="flex flex-row space-x-4">
      <div>
        <p className="mb-2">Grade</p>
        <Input
          onChange={handleChangeGrade}
          type="number"
          className="border-black border-opacity-50 focus:border-opacity-100"
        />
      </div>
      <div>
        <p className="mb-2">Class</p>
        <Input
          onChange={handleChangeClass}
          type="number"
          className="border-black border-opacity-50 focus:border-opacity-100"
        />
      </div>

      <div>
        <p className="mb-2">Number</p>
        <Input
          onChange={handleChangeNumber}
          type="number"
          className="border-black border-opacity-50 focus:border-opacity-100"
        />
      </div>
    </div>
  )
}
