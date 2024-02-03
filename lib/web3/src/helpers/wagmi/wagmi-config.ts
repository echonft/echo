import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Nullable } from '@echo/utils/types/nullable'
import { getChain } from '@echo/web3/helpers/get-chain'
import { isNil, reject } from 'ramda'
import { type Chain, webSocket } from 'viem'
import { type Config, createConfig, type CreateConnectorFn } from 'wagmi'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const chains: NonEmptyArray<Chain> = [getChain()]
const walletConnectProjectId: Nullable<string> = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const walletConnectConnector = isNilOrEmpty(walletConnectProjectId)
  ? undefined
  : walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: 'Echo',
        // TODO
        description: 'TODO',
        url: process.env.VERCEL_URL,
        icons: [`${process.env.VERCEL_URL}/favicon.ico`]
      }
    })
const connectors: CreateConnectorFn[] = reject(isNil, [
  injected(),
  coinbaseWallet({
    appName: 'Echo'
  }),
  walletConnectConnector
])
export const wagmiConfig: Config = createConfig({
  connectors,
  chains,
  transports: {
    [getChain().id]: webSocket()
  }
})
