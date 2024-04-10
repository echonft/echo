import { createSignerFromKeypair, type KeypairSigner, type Umi } from '@metaplex-foundation/umi'
import bs58 from 'bs58'

export function createSignerFromKeyString(umi: Umi): (privateKey: string) => KeypairSigner {
  return function (privateKey: string) {
    return createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(bs58.decode(privateKey)))
  }
}
