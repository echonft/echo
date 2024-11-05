import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/offer'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { always, applySpec, map, type NonEmptyArray, path, pipe, prop } from 'ramda'
import { getAddress } from 'viem'
import { sei } from 'viem/chains'

function mapItem(item: Item) {
  return applySpec({
    tokenAddress: path(['token', 'contract']),
    // FIXME Adjust to handle ERC20s
    tokenType: always(1),
    tokenIdOrAmount: path(['token', 'tokenId'])
  })(item)
}

function mapItems(items: NonEmptyArray<Item>) {
  return applySpec({
    chainId: always(sei.id),
    items: map(mapItem)
  })(items)
}

export function offerToEchoOffer(offer: BaseOffer): EchoOffer {
  return applySpec<EchoOffer>({
    sender: pipe(path<BaseOffer, 'sender', 'wallet'>(['sender', 'wallet']), getAddress),
    receiver: pipe(path<BaseOffer, 'receiver', 'wallet'>(['receiver', 'wallet']), getAddress),
    senderItems: pipe(prop('senderItems'), mapItems),
    receiverItems: pipe(prop('receiverItems'), mapItems),
    expiration: prop('expiresAt'),
    state: always(EchoOfferState.Open)
  })(offer)
}
