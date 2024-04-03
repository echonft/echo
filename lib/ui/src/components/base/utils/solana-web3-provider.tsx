'use client'
import '@solana/wallet-adapter-react-ui/styles.css'
import { getSolanaRpcEndoint } from '@echo/ui/helius/constants/get-solana-rpc-endoint'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import dynamic from 'next/dynamic'
import { type FunctionComponent, type PropsWithChildren, useMemo } from 'react'

// TODO Fix this
const ReactUIWalletModalProviderDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false }
)
export const SolanaWeb3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={getSolanaRpcEndoint()}>
      <WalletProvider
        wallets={wallets}
        autoConnect={true}
        onError={(error) => pinoLogger.error(`SolanaWeb3Provider/WalletProvider error: ${JSON.stringify(error)}`)}
      >
        <ReactUIWalletModalProviderDynamic>{children}</ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  )
}
