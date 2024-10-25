import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
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
    assoc('address', formatWalletAddress(args.wallet)),
    assoc('chainId', chainId(args.wallet.chain)),
    dissoc('wallet'),
    assoc('statement', 'Sign this message to add your wallet to Echo'),
    assoc('version', '1')
  )(args)
}
