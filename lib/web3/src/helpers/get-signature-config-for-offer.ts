import type { Offer } from '@echo/model/types/offer'
import { getSignatureDomain } from '@echo/web3/helpers/get-signature-domain'
import { getSignatureTypes } from '@echo/web3/helpers/get-signature-types'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'

export function getSignatureConfigForOffer(offer: Offer, chainId: number) {
  return {
    domain: getSignatureDomain(chainId),
    types: getSignatureTypes(),
    primaryType: 'Trade' as const,
    message: mapOfferToOfferSignature(offer)
  }
}
