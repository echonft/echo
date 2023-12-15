import { getItemTokenId } from '@echo/model/helpers/item/get-item-token-id'
import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { OfferSignature } from '@echo/web3/types/offer-signature'
import { applySpec, map, path, pick, pipe, prop } from 'ramda'

function formatWalletAddress(wallet: Wallet | Contract) {
  return pipe<[Wallet | Contract], Record<'address', HexString>, HexString>(pick(['address']), formatAddress)(wallet)
}
export function mapOfferToOfferSignature(offer: Offer): OfferSignature {
  return applySpec<OfferSignature>({
    id: prop('id'),
    creator: pipe(nonNullableReturn(path(['sender', 'wallet'])), formatWalletAddress),
    counterparty: pipe(nonNullableReturn(path(['receiver', 'wallet'])), formatWalletAddress),
    expiresAt: prop('expiresAt'),
    creatorCollections: pipe(prop('senderItems'), getItemsContracts, map(formatWalletAddress)),
    creatorIds: pipe(prop('senderItems'), map(getItemTokenId)),
    counterpartyCollections: pipe(prop('receiverItems'), getItemsContracts, map(formatWalletAddress)),
    counterpartyIds: pipe(prop('receiverItems'), map(getItemTokenId))
  })(offer)
}
