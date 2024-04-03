import { PublicKey } from '@solana/web3.js'
import { decode } from 'bs58'
import { sign } from 'tweetnacl'

export function verifySolanaSignature(message: string, publicKey: string, signature: string) {
  const encodedMessage = new TextEncoder().encode(message)
  const decodedSignature = decode(signature)

  if (!sign.detached.verify(encodedMessage, decodedSignature, new PublicKey(publicKey).toBytes())) {
    throw new Error(
      `could not validate Solana message ${message} with signature ${signature} for public key ${publicKey}`
    )
  }
}
