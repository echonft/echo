import { addressSchema } from '@echo/model/validators/address-schema'
import { object, string } from 'zod'

export const userSchema = object({
  discord: object({
    avatarUrl: string().url(),
    username: string().min(1),
    globalName: string().optional()
  }),
  username: string().min(1),
  wallet: addressSchema
})

export const userIndexSchema = userSchema.pick({ username: true })
