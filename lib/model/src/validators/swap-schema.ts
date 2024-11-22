import { serializeSwap } from '@echo/model/serializers/serialize-swap'
import type { HexString } from '@echo/model/types/hex-string'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { baseOfferSchema } from '@echo/model/validators/offer-schema'
import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { toLower } from 'ramda'
import { object } from 'zod'

export const swapSchema = object({
  receiver: baseOfferSchema.shape.receiver,
  receiverItems: baseOfferSchema.shape.receiverItems,
  sender: baseOfferSchema.shape.sender,
  senderItems: baseOfferSchema.shape.senderItems,
  slug: slugSchema,
  transactionId: hexStringSchema.transform(toLower<HexString>)
})

export const serializeSwapSchema = withSlugSchema.transform(serializeSwap)
