import type { BaseOffer } from '@echo/model/types/base-offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { mapOfferItemsToContractOfferItems } from '@echo/web3-dom/mappers/map-offer-items-to-contract-offer-items'
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'
import { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'
import { always, applySpec, path, pipe, prop } from 'ramda'

export function mapOfferToContractCreateOffer(offer: BaseOffer): ContractCreateOffer {
  return applySpec<ContractCreateOffer>({
    sender: pipe(nonNullableReturn(path(['sender', 'wallet'])), formatAddress),
    receiver: pipe(nonNullableReturn(path(['receiver', 'wallet'])), formatAddress),
    senderItems: pipe(prop('senderItems'), mapOfferItemsToContractOfferItems),
    receiverItems: pipe(prop('receiverItems'), mapOfferItemsToContractOfferItems),
    expiration: prop('expiresAt'),
    state: always(ContractOfferState.OPEN)
  })(offer)
}
