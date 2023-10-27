import { isOwnerOfErc721Token } from '@echo/api/services/viem/is-owner-of-erc721-token'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { HexString } from '@echo/utils/types/hex-string'
import { all, equals, map } from 'ramda'
import type { PublicClient } from 'viem'

export async function assertOwnerOfOfferItems(client: PublicClient, owner: string, items: OfferItem[]) {
  // TODO Functional program this
  const owners = await Promise.all(
    map((item: OfferItem) =>
      // FIXME Typing
      isOwnerOfErc721Token(
        client,
        item.nft.collection.contract.address as HexString,
        owner as HexString,
        item.nft.tokenId
      )
    )(items)
  )
  if (!all(equals(true))(owners)) {
    throw Error(`${owner} is not the owner of all the items`)
  }
}
