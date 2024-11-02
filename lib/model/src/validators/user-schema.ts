import { usernameSchema } from '@echo/model/validators/username-schema'
import { walletSchema } from '@echo/model/validators/wallet-schema'
import { object, string } from 'zod'

export const userSchema = object({
  discord: object({
    avatarUrl: string().url(),
    username: usernameSchema,
    globalName: string().optional()
  }),
  username: usernameSchema,
  wallet: walletSchema
})

export const userIndexSchema = userSchema.pick({ username: true })
