import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { erc1155ItemComparator } from '@echo/model/helpers/item/erc1155-item-comparator'
import { erc1155ItemIndex } from '@echo/model/helpers/item/erc1155-item-index'
import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721ItemComparator } from '@echo/model/helpers/item/erc721-item-comparator'
import { erc721ItemIndex } from '@echo/model/helpers/item/erc721-item-index'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import { userIndex } from '@echo/model/helpers/user/user-index'
import type { Erc1155ItemIndex } from '@echo/model/types/erc1155-item'
import type { Erc721ItemIndex } from '@echo/model/types/erc721-item'
import type { Listing } from '@echo/model/types/listing'
import type { NftItem } from '@echo/model/types/nft-item'
import { quantitySchema } from '@echo/model/validators/quantity-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import objectHash from 'object-hash'
import { concat, converge, map, modify, type NonEmptyArray, pick, pipe, sort } from 'ramda'
import { number, object, string, z } from 'zod'

const nftTokenIndexSchema = object({
  collection: withSlugSchema,
  tokenId: number().int().positive()
})

const listingIndexSchema = object({
  creator: object({
    username: string().min(1).toLowerCase()
  }),
  items: object({
    token: nftTokenIndexSchema
  })
    .or(
      object({
        token: nftTokenIndexSchema,
        quantity: quantitySchema
      })
    )
    .array()
    .nonempty()
    .readonly(),
  target: object({
    collection: withSlugSchema,
    quantity: quantitySchema
  })
})
type ListingIndex = z.infer<typeof listingIndexSchema>

function itemsIndex(items: NonEmptyArray<NftItem>): NonEmptyArray<Erc721ItemIndex | Erc1155ItemIndex> {
  return converge(concat, [
    pipe(erc721Items, map(erc721ItemIndex), sort(erc721ItemComparator)),
    pipe(erc1155Items, map(erc1155ItemIndex), sort(erc1155ItemComparator))
  ])(items)
}

function targetIndex(target: Listing['target']) {
  return modify('collection', collectionIndex, target)
}

export function listingSignature(args: Pick<Listing, 'creator' | 'items' | 'target'>): string {
  return pipe<
    [Pick<Listing, 'creator' | 'items' | 'target'>],
    Pick<Listing, 'creator' | 'items' | 'target'>,
    Pick<Listing, 'items' | 'target'> & Pick<ListingIndex, 'creator'>,
    Pick<Listing, 'target'> & Pick<ListingIndex, 'creator' | 'items'>,
    ListingIndex,
    ListingIndex,
    string
  >(
    pick(['creator', 'items', 'target']),
    modify('creator', userIndex),
    modify('items', itemsIndex),
    modify('target', targetIndex),
    (index: ListingIndex) => listingIndexSchema.parse(index),
    objectHash
  )(args)
}
