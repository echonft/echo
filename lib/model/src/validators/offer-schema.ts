import { ItemError } from '@echo/model/constants/errors/item-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { serializeOffer } from '@echo/model/serializers/serialize-offer'
import type { HexString } from '@echo/model/types/hex-string'
import type { Slug } from '@echo/model/types/slug'
import { itemsContainErc1155Duplicates } from '@echo/model/validators/helpers/items-contain-erc1155-duplicates'
import { itemsContainErc20Duplicates } from '@echo/model/validators/helpers/items-contain-erc20-duplicates'
import { itemsContainErc721Duplicates } from '@echo/model/validators/helpers/items-contain-erc721-duplicates'
import { itemsContainOnlyErc20Items } from '@echo/model/validators/helpers/items-contain-only-erc20-items'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { itemSchema } from '@echo/model/validators/item-schema'
import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { userWithWalletSchema } from '@echo/model/validators/user-schema'
import { as } from '@echo/utils/helpers/as'
import { complement, objOf, toLower } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

const offerItemsSchema = itemSchema
  .array()
  .nonempty()
  .refine(complement(itemsContainErc721Duplicates), { message: ItemError.Duplicates })
  .refine(complement(itemsContainErc1155Duplicates), { message: ItemError.Duplicates })
  .refine(complement(itemsContainErc20Duplicates), { message: ItemError.Duplicates })
  .refine(complement(itemsContainOnlyErc20Items), { message: ItemError.Erc20Only })

export const baseOfferSchema = object({
  expiresAt: number().int().positive(),
  receiver: userWithWalletSchema,
  receiverItems: offerItemsSchema,
  sender: userWithWalletSchema,
  senderItems: offerItemsSchema
})

export const offerSchema = baseOfferSchema.extend({
  idContract: hexStringSchema.transform(toLower<HexString>),
  locked: boolean(),
  slug: slugSchema,
  state: nativeEnum(OfferState)
})

export const serializeOfferSchema = withSlugSchema.transform(serializeOffer)

export const serializedOfferSchema = string()
  .regex(/^[a-z0-9-_]+$/)
  .transform(as<Slug, string>)
  .transform(objOf('slug'))
