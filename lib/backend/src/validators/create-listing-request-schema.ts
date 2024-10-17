import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { assertItemsChain } from '@echo/backend/helpers/item/assert-items-chain'
import { assertUniqErc1155Items } from '@echo/backend/helpers/item/assert-uniq-erc1155-items'
import { assertUniqErc721Items } from '@echo/backend/helpers/item/assert-uniq-erc721-items'
import { assertNftsEqOwner } from '@echo/backend/helpers/nft/assert-nfts-eq-owner'
import { erc1155ItemRequestSchema } from '@echo/backend/validators/erc1155-item-request-schema'
import { erc721ItemRequestSchema } from '@echo/backend/validators/erc721-item-request-schema'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getListingsForCreatorAndTarget } from '@echo/firestore/crud/listing/get-listings-for-creator-and-target'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { Expiration } from '@echo/model/constants/expiration'
import { TokenType } from '@echo/model/constants/token-type'
import { eqErc1155Item } from '@echo/model/helpers/item/eq-erc1155-item'
import { eqErc721Item } from '@echo/model/helpers/item/eq-erc721-item'
import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import { erc1155NftToItem } from '@echo/model/mappers/nft/erc1155-nft-to-item'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Erc1155Nft } from '@echo/model/types/nft/erc1155-nft'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { OwnedErc721Nft } from '@echo/model/types/nft/owned-erc721-nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { eqListWith } from '@echo/utils/fp/eq-list-with'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toNonEmptyArray } from '@echo/utils/fp/to-non-empty-array'
import { getErc1155TokenBalance } from '@echo/web3/services/get-erc1155-token-balance'
import { and, assoc, dissoc, equals, head, isNil, map, type NonEmptyArray, pipe, prop } from 'ramda'
import { nativeEnum, NEVER, number, object, ZodIssueCode } from 'zod'

interface Erc721ItemRequestWithNft extends Erc721ItemRequest {
  nft: Erc721Nft
}

interface Erc1155ItemRequestWithNft extends Erc1155ItemRequest {
  nft: Erc1155Nft
}

interface Erc721ItemRequestWithOwnedNft extends Erc721ItemRequest {
  nft: OwnedErc721Nft
}

interface Erc1155ItemRequestWithOwnedNft extends Erc1155ItemRequest {
  nft: OwnedErc1155Nft
}

interface Erc721ItemWithOwner extends Erc721Item {
  owner: User
}

interface Erc721ItemWithOwner extends Erc721Item {
  owner: User
}

interface Erc1155ItemWithOwner extends Erc1155Item {
  owner: User
}

export async function createListingRequestSchema(username: string) {
  const user = await getUserByUsername(username)
  if (isNil(user)) {
    throw new UnauthorizedError()
  }
  return object({
    items: erc721ItemRequestSchema
      .or(erc1155ItemRequestSchema)
      .array()
      .nonempty()
      .transform(async (requests, ctx) => {
        async function addNft(
          request: Erc721ItemRequest | Erc1155ItemRequest
        ): Promise<Erc721ItemRequestWithNft | Erc1155ItemRequestWithNft> {
          const nft = await getNftByIndex(request.token)
          // Ensure the NFT exists
          if (isNil(nft)) {
            return Promise.reject(Error(NftError.NotFound))
          }
          // Ensure the token type matches the NFT type
          if (!equals(request.token.type, nft.type)) {
            return Promise.reject(Error(ItemError.Type))
          }
          if (request.token.type === TokenType.Erc721) {
            return assoc('nft', nft as Erc721Nft, request as Erc721ItemRequest)
          } else {
            return assoc('nft', nft as Erc1155Nft, request as Erc1155ItemRequest)
          }
        }

        try {
          return await pipe(map(addNft), promiseAll)(requests)
        } catch (err) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: prop('message', err as Error)
          })
          return NEVER
        }
      })
      .transform((requests, ctx) => {
        // ensure the NFTs all have the same owner
        const nfts = map(prop('nft'), requests)
        try {
          assertNftsEqOwner(nfts)
        } catch (err) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: prop('message', err as Error)
          })
          return NEVER
        }
        // ensure the owner is the current user and that the owner wallet is owned by the user
        const owner = pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(
          head,
          prop('owner')
        )(nfts as NonEmptyArray<OwnedNft>)
        if (owner.username !== user.username) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: NftError.Ownership
          })
          return NEVER
        }
        return requests as (Erc721ItemRequestWithOwnedNft | Erc1155ItemRequestWithOwnedNft)[]
      })
      .transform(async (params, ctx) => {
        async function mapItemRequest(
          request: Erc721ItemRequestWithOwnedNft | Erc1155ItemRequestWithOwnedNft
        ): Promise<Erc721ItemWithOwner | Erc1155ItemWithOwner> {
          if (request.token.type === TokenType.Erc721) {
            return pipe(erc721NftToItem, assoc('owner', request.nft.owner))(request.nft as Erc721Nft)
          } else {
            const item = request as Erc1155ItemRequestWithOwnedNft
            const collection = await getCollection(request.nft.collection.slug)
            if (isNil(collection)) {
              return Promise.reject(Error(CollectionError.NotFound))
            }
            // Ensure the item quantity <= wallet's balance
            const balance = await getErc1155TokenBalance({
              contract: collection.contract,
              wallet: request.nft.owner.wallet
            })
            if (item.quantity > balance) {
              return Promise.reject(Error(ItemError.Quantity))
            }
            return pipe(erc1155NftToItem(item.quantity), assoc('owner', request.nft.owner))(request.nft as Erc1155Nft)
          }
        }
        try {
          return await pipe(map(mapItemRequest), promiseAll)(params)
        } catch (err) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: prop('message', err as Error)
          })
          return NEVER
        }
      })
      .transform((items, ctx) => {
        // Ensure all items are unique and on the same chain
        try {
          return pipe(assertUniqErc721Items, assertUniqErc1155Items, assertItemsChain)(items)
        } catch (err) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: prop('message', err as Error)
          })
          return NEVER
        }
      }),
    target: object({
      collection: withSlugSchema,
      quantity: number().int().positive()
    }).transform(async (params, ctx) => {
      const collection = await getCollection(params.collection.slug)
      if (isNil(collection)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: CollectionError.NotFound
        })
        return NEVER
      }
      return assoc('collection', collection, params) as Listing['target']
    }),
    expiration: nativeEnum(Expiration)
  }).transform(async (params, ctx) => {
    function removeItemOwner(item: Erc721ItemWithOwner | Erc1155ItemWithOwner): Erc721Item | Erc1155Item {
      if (isErc721Item(item)) {
        return dissoc('owner', item)
      }
      return dissoc('owner', item)
    }
    const creator = pipe<
      [NonEmptyArray<Erc721ItemWithOwner | Erc1155ItemWithOwner>],
      Erc721ItemWithOwner | Erc1155ItemWithOwner,
      User
    >(
      head,
      prop('owner')
    )(params.items as NonEmptyArray<Erc721ItemWithOwner | Erc1155ItemWithOwner>)
    const items = pipe(map(removeItemOwner), toNonEmptyArray)(params.items)
    // Ensure listing is not a duplicate
    const creatorListings = await getListingsForCreatorAndTarget({ creator, target: params.target })
    for (const listing of creatorListings) {
      if (
        and(
          eqListWith(eqErc721Item, erc721Items(listing.items), erc721Items(items)),
          eqListWith(eqErc1155Item, erc1155Items(listing.items), erc1155Items(items))
        )
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: ListingError.Exists
        })
        return NEVER
      }
    }
    return pipe(assoc('items', items), assoc('creator', creator))(params)
  })
}
