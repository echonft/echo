import type { OfferItem, User, Wallet } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils'
import { getOwnersForNft } from '@server/helpers/alchemy/get-owners-for-nft'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { ServerError } from '@server/helpers/error/server-error'
import { equals, flatten, head, ifElse, intersection, length, map, pipe, uniq } from 'ramda'

export const getOfferItemsWallet = (items: NonEmptyArray<OfferItem>, user: User): Promise<Wallet> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Promise.all(map(async ({ nft }) => await getOwnersForNft(nft.collection.contract, nft.tokenId), items))
    .then(
      pipe(
        flatten,
        uniq,
        intersection(user.wallets),
        ifElse(pipe(length, equals(1)), head, () => {
          // FIXME edge case for ERC1155 where a user would hold them in multiple of their wallets
          throw new ForbiddenError(
            `user with id ${user.id} do not own all the NFTs in offer items ${JSON.stringify(items)}`
          )
        })
      )
    )
    .catch((e) => {
      throw new ServerError(
        `error fetching nft owners from alchemy for items ${JSON.stringify(items)} and user ${JSON.stringify(user)}`,
        e
      )
    })
