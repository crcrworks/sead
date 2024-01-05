import { ChangeEvent, useCallback } from 'react'

import { Input } from '@/components/ui/input'

import { State } from '@/types/state'

export const NameContent = (name: State<string>) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		name.setState(e.target.value)
	}

	return (
		<div>
			<p className='mb-2'>Name</p>
			<Input
				placeholder='username'
				className='border-black border-opacity-50 focus:border-opacity-100'
				value={name.state}
				onChange={handleChange}
			/>
		</div>
	)
}
