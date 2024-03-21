import { echoAddress } from '@echo/web3/constants/echo-address'
import type { SignSignatureArgs } from '@echo/web3/types/sign-signature-args'
import { recoverTypedDataAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

function getSignatureConfigForOffer(args: SignSignatureArgs) {
  const { chainId, signature } = args
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
    message: { signature }
  }
}

export async function signSignature(args: SignSignatureArgs) {
  const config = getSignatureConfigForOffer(args)
  const account = privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY)
  const signedData = await account.signTypedData(config)
  const address = await recoverTypedDataAddress({
    domain: config.domain,
    types: config.types,
    primaryType: config.primaryType,
    message: config.message,
    signature: signedData
  })
  console.log(`recovered address is ${address}`)
  return signedData
}
