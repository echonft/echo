import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { signTypedData } from '@wagmi/core'
import { pipe } from 'ramda'

function getSignatureConfigForOffer(args: SignOfferArgs) {
  const { chainId } = args
  return {
    domain: {
      name: 'Echo',
      version: '1',
      chainId,
      verifyingContract: getEchoAddress(chainId)
    },
    types: {
      Trade: [
        { name: 'id', type: 'string' },
        { name: 'creator', type: 'address' },
        { name: 'counterparty', type: 'address' },
        { name: 'expiresAt', type: 'uint256' },
        { name: 'creatorCollections', type: 'address[]' },
        { name: 'creatorIds', type: 'uint256[]' },
        { name: 'counterpartyCollections', type: 'address[]' },
        { name: 'counterpartyIds', type: 'uint256[]' }
      ]
    } as const,
    primaryType: 'Trade' as const,
    message: mapOfferToOfferSignature(args.offer)
  }
}

export async function signOffer(args: SignOfferArgs) {
  return await pipe(getSignatureConfigForOffer, signTypedData)(args)
}
