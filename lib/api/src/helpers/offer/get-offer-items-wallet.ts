import { ForbiddenError } from '../error/forbidden-error'
import { ServerError } from '../error/server-error'
import { getOwnersForNft } from '@echo/alchemy'
import { OfferItem, User, Wallet } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
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
          throw new ForbiddenError('User do not own all the NFTs')
        })
      )
    )
    .catch(() => {
      throw new ServerError('Error fetching NFTs owners')
    })
