import { userAugmentation } from '@echo/model/validators/user-schema'
import { walletSchema } from '@echo/model/validators/wallet-schema'
import { object } from 'zod'

export const authUserSchema = object(userAugmentation).extend({
  wallets: walletSchema.array()
})
