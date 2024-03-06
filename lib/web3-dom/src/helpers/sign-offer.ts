import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapOfferToOfferSignature } from '@echo/web3-dom/mappers/map-offer-to-offer-signature'
import type { SignOfferArgs } from '@echo/web3-dom/types/sign-offer-args'
import { partial, pipe } from 'ramda'
import { signTypedData } from 'wagmi/actions'

function getSignatureConfigForOffer(args: SignOfferArgs) {
  const { chainId } = args
  return {
    domain: {
      name: 'Echo',
      version: '1',
      chainId,
      verifyingContract: ECHO_ADDRESS
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
  return await pipe(getSignatureConfigForOffer, partial(signTypedData, [wagmiConfig]))(args)
}
