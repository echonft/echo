import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { erc1155ItemComparator } from '@echo/model/helpers/item/erc1155-item-comparator'
import { erc721ItemComparator } from '@echo/model/helpers/item/erc721-item-comparator'
import { serializeListing } from '@echo/model/serializers/serialize-listing'
import type { Erc1155ItemIndex, Erc721ItemIndex } from '@echo/model/types/item'
import type { Slug } from '@echo/model/types/slug'
import { collectionSchema } from '@echo/model/validators/collection-schema'
import { itemsContainErc1155Duplicates } from '@echo/model/validators/helpers/items-contain-erc1155-duplicates'
import { itemsContainErc721Duplicates } from '@echo/model/validators/helpers/items-contain-erc721-duplicates'
import { erc1155ItemIndexSchema, erc721ItemIndexSchema, nftItemSchema } from '@echo/model/validators/item-schema'
import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { userIndexSchema, userWithWalletSchema } from '@echo/model/validators/user-schema'
import { as } from '@echo/utils/helpers/as'
import {
  complement,
  concat,
  converge,
  groupBy,
  has,
  modify,
  type NonEmptyArray,
  objOf,
  path,
  pipe,
  propOr,
  sort,
  when
} from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

const listingTargetSchema = object({
  collection: collectionSchema,
  quantity: number().int().positive()
})

export const listingSchema = object({
  creator: userWithWalletSchema,
  expiresAt: number().int().positive(),
  items: nftItemSchema
    .array()
    .nonempty()
    .refine(complement(itemsContainErc721Duplicates), { message: ItemError.Duplicates })
    .refine(complement(itemsContainErc1155Duplicates), { message: ItemError.Duplicates }),
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

export const serializeListingSchema = withSlugSchema.transform(serializeListing)

export const serializedListingSchema = string()
  .regex(/^[a-z0-9-_]+$/)
  .transform(as<Slug, string>)
  .transform(objOf('slug'))
