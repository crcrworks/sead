import React from 'react'
import { useTranslation } from 'react-i18next'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'

import { PiStudentFill } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'

import { InputSchema, schema } from '@/types/user'
typeof schema
import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormContents = (form: UseFormReturn<InputSchema>) => {
	const { t, i18n } = useTranslation()
	const occupation = form.watch('occupation')
	return (
		<div className='space-y-5'>
			<FormField
				control={form.control}
				name='name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('name')}</FormLabel>
						<FormControl>
							<Input placeholder='name' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='gender'
				render={({ field }) => (
					<FormItem>
						<FormLabel>性別</FormLabel>
						<FormControl>
							<Input placeholder='gender' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{occupation === 'student' && (
				<div className='flex flex-row space-x-4'>
					<FormField
						control={form.control}
						name='studentGrade'
						render={({ field }) => (
							<FormItem>
								<FormLabel>学年</FormLabel>
								<FormControl>
									<Input placeholder='grade' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='studentClass'
						render={({ field }) => (
							<FormItem>
								<FormLabel>組</FormLabel>
								<FormControl>
									<Input placeholder='class' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='studentNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number</FormLabel>
								<FormControl>
									<Input placeholder='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			)}
		</div>
	)
}

export const CreateProfile = () => {
	const form = useForm<InputSchema>({
		defaultValues: {
			occupation: 'student',
			name: '',
			gender: 'male',
			studentClass: undefined,
			studentGrade: undefined,
			studentNumber: undefined
		},
		resolver: zodResolver(schema),
		mode: 'onChange',
		shouldUnregister: true
	})

	const occupation = form.watch('occupation')

	const LabelCSS = (selected: boolean) => {
		const base =
			'bg-accent flex flex-col items-center justify-between rounded-md border border-muted p-4 hover:bg-secondary hover:text-accent-foreground'

		if (selected) return `${base} bg-secondary`

		return base
	}

	const { t, i18n } = useTranslation()

	return (
		<Dialog open={true}>
			<DialogContent showCloseButton={false} className='rounded-md'>
				<Form {...form}>
					<FormField
						control={form.control}
						name='occupation'
						render={({ field }) => (
							<FormItem className='space-y-5'>
								<FormLabel className='flex justify-center'>
									<p className='text-2xl font-bold'>Create your profile</p>
								</FormLabel>
								<RadioGroup
									className='flex flex-row justify-center  '
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormItem className=''>
										<FormControl>
											<RadioGroupItem
												value='student'
												id='student'
												className='peer sr-only'
											/>
										</FormControl>
										<FormLabel
											htmlFor='student'
											className={LabelCSS(occupation === 'student')}
										>
											Student
										</FormLabel>
									</FormItem>

									<FormItem>
										<FormControl>
											<RadioGroupItem
												value='teacher'
												id='teacher'
												className='peer sr-only'
											/>
										</FormControl>
										<FormLabel
											htmlFor='teacher'
											className={LabelCSS(occupation === 'teacher')}
										>
											{/* <FaChalkboardTeacher className='mb-2 h-6 w-6' /> */}
											Teacher
										</FormLabel>
									</FormItem>{' '}
									<FormItem>
										<FormControl>
											<RadioGroupItem
												value='others'
												id='others'
												className='peer sr-only'
											/>
										</FormControl>
										<FormLabel
											htmlFor='others'
											className={LabelCSS(occupation === 'others')}
										>
											{/* <FiUser className='mb-2 h-6 w-6' /> */}
											Others
										</FormLabel>
									</FormItem>
								</RadioGroup>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormContents {...form} />
				</Form>
			</DialogContent>
		</Dialog>
	)
}
