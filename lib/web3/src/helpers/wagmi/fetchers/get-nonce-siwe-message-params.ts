import { formatAddress } from '@echo/web3/helpers/format-address'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import { assoc, dissoc, lens, over, pipe, prop } from 'ramda'
import type { SiweMessage } from 'siwe'

export function getNonceSiweMessageParams(args: SignNonceArgs): Partial<SiweMessage> {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    over(lens(pipe(prop('wallet'), dissoc('chainId')), assoc('address')), formatAddress),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    over(lens(prop('wallet'), assoc('chainId')), prop('chainId')),
    dissoc('wallet'),
    assoc('statement', 'Sign this message to add your wallet to Echo'),
    assoc('version', '1')
  )(args) as Partial<SiweMessage>
}
