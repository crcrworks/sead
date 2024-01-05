import { z } from 'zod'

const gender = z.union([z.literal('male'), z.literal('female'), z.literal('not-to-say')])

const Occupation = z.union([
  z.literal('student'),
  z.literal('teacher'),
  z.literal('others')
])

const name = z.string().min(2, {
  message: 'name must be at least 2 characters'
})
const studentGrade = z.string().max(2, {
  message: 'class must be more less than 2 characters'
})
const studentClass = z.string().max(2, {
  message: 'class must be more less than 2 characters'
})
const studentNumber = z.string().max(2, {
  message: 'class must be more less than 2 characters'
})

const baseSchema = z.object({
  name,
  gender
})

export const userProfileSchema = z.optional(
  z.discriminatedUnion('occupation', [
    z.object({
      occupation: z.literal('student'),
      studentGrade,
      studentClass,
      studentNumber
    }),
    z.object({
      occupation: z.literal('teacher')
    }),
    z.object({
      occupation: z.literal('others')
    })
  ])
)

export const schema = baseSchema.and(userProfileSchema)
export type InputSchema = z.infer<typeof schema>
