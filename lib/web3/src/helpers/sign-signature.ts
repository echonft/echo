import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
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
      verifyingContract: ECHO_ADDRESS
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
  const privateKey = process.env.SIGNER_PRIVATE_KEY
  if (isNilOrEmpty(privateKey)) {
    throw new Error('SIGNER_PRIVATE_KEY env var is not defined')
  }
  const account = privateKeyToAccount(privateKey)
  const signedData = await account.signTypedData(config)
  return await recoverTypedDataAddress({
    domain: config.domain,
    types: config.types,
    primaryType: config.primaryType,
    message: config.message,
    signature: signedData
  })
}
