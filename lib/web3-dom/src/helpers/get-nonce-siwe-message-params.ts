import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import { assoc, dissoc, pipe } from 'ramda'
import type { SiweMessage } from 'siwe'

export function getNonceSiweMessageParams(args: SignNonceArgs): Partial<SiweMessage> {
  return pipe<
    [SignNonceArgs],
    SignNonceArgs & Record<'address', HexString>,
    SignNonceArgs & Record<'address', HexString> & Record<'chainId', number>,
    Omit<SignNonceArgs, 'wallet'> & Record<'address', HexString> & Record<'chainId', number>,
    Partial<SiweMessage>,
    Partial<SiweMessage>
  >(
    assoc('address', formatAddress({ address: args.wallet.address })),
    assoc('chainId', getChainId(args.wallet.chain)),
    dissoc('wallet'),
    assoc('statement', 'Sign this message to add your wallet to Echo'),
    assoc('version', '1')
  )(args)
}
