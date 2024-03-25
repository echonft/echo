import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import type { SignSignatureArgs } from '@echo/web3/types/sign-signature-args'
import { hexToSignature } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export async function signSignature(args: SignSignatureArgs) {
  const privateKey = process.env.SIGNER_PRIVATE_KEY
  if (isNilOrEmpty(privateKey)) {
    throw new Error('SIGNER_PRIVATE_KEY env var is not defined')
  }
  const { chainId, signature } = args
  const { r, s, v } = hexToSignature(signature)
  const account = privateKeyToAccount(privateKey)
  return await account.signTypedData({
    domain: {
      name: 'Echo',
      version: '1',
      chainId,
      verifyingContract: ECHO_ADDRESS
    },
    types: {
      Signature: [
        { name: 'v', type: 'uint8' },
        { name: 'r', type: 'bytes32' },
        { name: 's', type: 'bytes32' }
      ]
    } as const,
    primaryType: 'Signature' as const,
    message: { v: v as unknown as number, r, s }
  })
}
