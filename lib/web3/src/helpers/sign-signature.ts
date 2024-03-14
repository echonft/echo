import { echoAddress } from '@echo/web3/constants/echo-address'
import { mapSignatureToSignature } from '@echo/web3/mappers/map-signature-to-signature'
import type { SignSignatureArgs } from '@echo/web3/types/sign-signature-args'
import { privateKeyToAccount } from 'viem/accounts'

function getSignatureConfigForOffer(args: SignSignatureArgs) {
  const { chainId } = args
  return {
    domain: {
      name: 'Echo',
      version: '1',
      chainId,
      verifyingContract: echoAddress
    },
    types: {
      Signature: [{ name: 'signature', type: 'bytes' }]
    } as const,
    primaryType: 'Signature' as const,
    message: mapSignatureToSignature(args.signature)
  }
}

export async function signSignature(args: SignSignatureArgs) {
  const account = privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY)
  return await account.signTypedData(getSignatureConfigForOffer(args))
}
