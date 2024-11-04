import { addressSchema } from '@echo/model/validators/address-schema'
import { usernameSchema } from '@echo/model/validators/username-schema'
import { object, string } from 'zod'

export const userSchema = object({
  discord: object({
    avatarUrl: string().url(),
    username: usernameSchema,
    globalName: string().optional()
  }),
  username: usernameSchema,
  wallet: addressSchema.optional()
})

export const userWithWalletSchema = userSchema.omit({ wallet: true }).extend({ wallet: addressSchema })

export const userIndexSchema = userSchema.pick({ username: true })
