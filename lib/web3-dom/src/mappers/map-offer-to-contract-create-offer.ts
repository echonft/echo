import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { mapOfferItemsToContractOfferItems } from '@echo/web3-dom/mappers/map-offer-items-to-contract-offer-items'
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'
import type { ContractOffer } from '@echo/web3-dom/types/contract-offer'
import { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'
import { always, applySpec, path, pick, pipe, prop } from 'ramda'

function formatWalletAddress(wallet: Wallet | Contract) {
  return pipe<[Wallet | Contract], Record<'address', HexString>, HexString>(pick(['address']), formatAddress)(wallet)
}
export function mapOfferToContractCreateOffer(offer: Offer): ContractCreateOffer {
  return applySpec<ContractOffer>({
    sender: pipe(nonNullableReturn(path(['sender', 'wallet'])), formatWalletAddress),
    receiver: pipe(nonNullableReturn(path(['receiver', 'wallet'])), formatWalletAddress),
    senderItems: pipe(prop('senderItems'), mapOfferItemsToContractOfferItems),
    receiverItems: pipe(prop('receiverItems'), mapOfferItemsToContractOfferItems),
    expiration: prop('expiresAt'),
    state: always(ContractOfferState.OPEN)
  })(offer)
}
