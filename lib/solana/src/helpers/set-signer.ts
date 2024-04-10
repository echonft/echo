import { createSignerFromKeyString } from '@echo/solana/helpers/create-signer-from-key-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { type Signer, signerIdentity, type Umi, type UmiPlugin } from '@metaplex-foundation/umi'
import { identity, ifElse, is, isNil, partialRight, pipe } from 'ramda'

export function setSigner<T = Signer | string>(umi: Umi, signer: Nullable<T>) {
  if (isNil(signer)) {
    throw Error('private key undefined')
  }
  const plugin: UmiPlugin = pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ifElse<T, Exclude<string, T>, Signer, Signer>(is(String), createSignerFromKeyString(umi), identity<Signer>),
    partialRight(signerIdentity, [false])
  )(signer)
  return umi.use(plugin)
}
