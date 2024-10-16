import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { mapOfferItemsToContractOfferItems } from '@echo/web3/mappers/map-offer-items-to-contract-offer-items'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { ContractOfferState } from '@echo/web3/types/contract-offer-state'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { always, applySpec, path, pipe, prop } from 'ramda'

export function mapOfferToContractOffer(offer: BaseOffer): ContractOffer {
  return applySpec<ContractOffer>({
    sender: pipe(nonNullableReturn(path(['sender', 'wallet'])), formatWalletAddress),
    receiver: pipe(nonNullableReturn(path(['receiver', 'wallet'])), formatWalletAddress),
    senderItems: pipe(prop('senderItems'), mapOfferItemsToContractOfferItems),
    receiverItems: pipe(prop('receiverItems'), mapOfferItemsToContractOfferItems),
    expiration: prop('expiresAt'),
    state: always(ContractOfferState.Open)
  })(offer)
}
