import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { erc1155ItemComparator } from '@echo/model/helpers/item/erc1155-item-comparator'
import { erc721ItemComparator } from '@echo/model/helpers/item/erc721-item-comparator'
import type { Erc1155ItemIndex, Erc721ItemIndex } from '@echo/model/types/item'
import { collectionSchema } from '@echo/model/validators/collection-schema'
import { erc1155ItemIndexSchema, erc721ItemIndexSchema, nftItemSchema } from '@echo/model/validators/item-schema'
import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { userIndexSchema, userSchema } from '@echo/model/validators/user-schema'
import { concat, converge, groupBy, has, modify, type NonEmptyArray, path, pipe, propOr, sort, when } from 'ramda'
import { boolean, nativeEnum, number, object } from 'zod'

const listingTargetSchema = object({
  collection: collectionSchema,
  quantity: number().int().positive()
})

export const listingSchema = object({
  creator: userSchema,
  expiresAt: number().positive(),
  items: nftItemSchema.array().nonempty(),
  locked: boolean(),
  slug: slugSchema,
  state: nativeEnum(ListingState),
  target: listingTargetSchema
})

const listingTargetIndexSchema = object({
  collection: withSlugSchema,
  quantity: listingTargetSchema.shape.quantity
})

export const listingSignatureSchema = object({
  creator: listingSchema.shape.creator.pipe(userIndexSchema),
  items: erc721ItemIndexSchema
    .or(erc1155ItemIndexSchema)
    .array()
    .nonempty()
    .transform((data) => {
      return pipe<
        [NonEmptyArray<Erc721ItemIndex | Erc1155ItemIndex>],
        Partial<Record<TokenType.Erc721 | TokenType.Erc1155, (Erc721ItemIndex | Erc1155ItemIndex)[]>>,
        Partial<Record<TokenType.Erc721 | TokenType.Erc1155, (Erc721ItemIndex | Erc1155ItemIndex)[]>>,
        Partial<Record<TokenType.Erc721 | TokenType.Erc1155, (Erc721ItemIndex | Erc1155ItemIndex)[]>>,
        NonEmptyArray<Erc721ItemIndex | Erc1155ItemIndex>
      >(
        groupBy<Erc721ItemIndex | Erc1155ItemIndex, TokenType.Erc721 | TokenType.Erc1155>(
          path<Erc721ItemIndex | Erc1155ItemIndex, 'token', 'type'>(['token', 'type'])
        ),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        when(has(TokenType.Erc721), modify(TokenType.Erc721, sort(erc721ItemComparator))),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        when(has(TokenType.Erc1155), modify(TokenType.Erc1155, sort(erc1155ItemComparator))),
        converge(concat, [propOr([], TokenType.Erc721), propOr([], TokenType.Erc1155)])
      )(data)
    }),
  target: listingSchema.shape.target.pipe(listingTargetIndexSchema)
})
