import { ApiError } from '../api-error'
import { getOwnersForNft } from '@echo/alchemy'
import { OfferItem, User, Wallet } from '@echo/firestore'
import { flatten, head, intersection, map, pipe, uniq } from 'ramda'

export const getOfferItemsWallet = async (
  items: OfferItem[],
  user: User,
  errorStatus: number,
  errorMessage: string
) => {
  try {
    const owners = await Promise.all(
      map(
        async (item) =>
          await getOwnersForNft(
            { address: item.collection.contract.address, chainId: item.collection.contract.chainId },
            item.tokenId
          ),
        items
      )
    ).then(pipe(flatten, uniq))
    const walletIntersection = intersection<Wallet>(owners, user.wallets)
    if (walletIntersection.length !== 1) {
      // FIXME edge case for ERC1155 where a user would hold them in multiple of their wallets
      throw Error()
    }
    return head(walletIntersection) as Wallet
  } catch (e) {
    throw new ApiError(errorStatus, errorMessage)
  }
}
