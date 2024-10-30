import type { Chain } from '@echo/model/constants/chain'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import type { Address } from '@echo/model/types/address'
import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { SignNonceArgs } from '@echo/web3-dom/services/sign-nonce'
import { always, andThen, applySpec, assoc, includes, isNil, pipe, prop, T } from 'ramda'
import useSWR from 'swr'

interface Args {
  address: Address
  chain: Chain
}

export function useWallet({ address, chain }: Args): boolean {
  const { addWallet, disconnectWallet, getNonce, getWallets, signNonce } = useDependencies()
  const { data } = useSWR<boolean, Error, Args>(
    { address, chain },
    async ({ address, chain }: Args) => {
      const wallet = walletFromContract({ address, chain })
      const wallets = await pipe(getWallets, andThen(prop('wallets')))()
      if (includes(wallet, wallets)) {
        return true
      }
      return pipe(
        getNonce,
        andThen(
          pipe(
            applySpec<SignNonceArgs>({
              address: always(address),
              chain: always(chain),
              domain: always(window.location.origin),
              nonce: prop('nonce'),
              uri: always(window.location.origin)
            }),
            signNonce,
            andThen(pipe(assoc('address', address), assoc('chain', chain), addWallet, andThen(T)))
          )
        )
      )()
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      revalidateOnMount: true,
      onError(err) {
        void disconnectWallet()
        captureAndLogError(err, {
          logObject: {
            hook: useWallet.name,
            fetcher: getWallets.name
          },
          severity: 'warning'
        })
      }
    }
  )
  return isNil(data) ? false : data
}
