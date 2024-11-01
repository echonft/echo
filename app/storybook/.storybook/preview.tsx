// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc721-contract'
import { areNftsInEscrow } from '@echo/storybook/mocks/are-nfts-in-escrow'
import { cancelListing } from '@echo/storybook/mocks/cancel-listing'
import { cancelOffer } from '@echo/storybook/mocks/cancel-offer'
import { createListing } from '@echo/storybook/mocks/create-listing'
import { createOffer } from '@echo/storybook/mocks/create-offer'
import { disconnectWallet } from '@echo/storybook/mocks/disconnect-wallet'
import { getAccount, watchAccount } from '@echo/storybook/mocks/get-account'
import { getAllErc20TokenBalances } from '@echo/storybook/mocks/get-all-erc20-token-balances'
import { getEchoTradingFees } from '@echo/storybook/mocks/get-echo-trading-fees'
import { getErc20TokenBalance } from '@echo/storybook/mocks/get-erc20-token-balance'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc721-contract-approval'
import { getOfferByIdContract } from '@echo/storybook/mocks/get-offer-by-id-contract'
import { getWalletStatus } from '@echo/storybook/mocks/get-wallet-status'
import { login } from '@echo/storybook/mocks/login'
import { logout } from '@echo/storybook/mocks/logout'
import { redeemOffer } from '@echo/storybook/mocks/redeem-offer'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { searchCollections } from '@echo/storybook/mocks/search-collections'
import { searchUsers } from '@echo/storybook/mocks/search-users'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { swap } from '@echo/storybook/mocks/swap'
import { switchChain } from '@echo/storybook/mocks/switch-chain'
import { ActionsProvider } from '@echo/ui/components/providers/actions-provider'
import { DependenciesProvider } from '@echo/ui/components/providers/dependencies-provider'
import { Web3Provider } from '@echo/ui/components/providers/web3-provider'
import { messages } from '@echo/ui/messages/en'
import { init } from '@sentry/nextjs'
import { type Preview } from '@storybook/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextIntlClientProvider } from 'next-intl'

dayjs.extend(relativeTime)

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <NextIntlClientProvider messages={messages} locale={'en'}>
          <Web3Provider>
            <ActionsProvider
              actions={{
                addWallet,
                getOfferByIdContract,
                getWalletStatus,
                rejectOffer,
                searchCollections,
                searchUsers
              }}
            >
              <DependenciesProvider
                dependencies={{
                  approveErc721Contract,
                  areNftsInEscrow,
                  cancelListing,
                  acceptOffer,
                  cancelOffer,
                  createOffer,
                  swap,
                  redeemOffer,
                  createListing,
                  disconnectWallet,
                  getAccount,
                  getErc20TokenBalance,
                  getAllErc20TokenBalances,
                  getEchoTradingFees,
                  getErc721ContractApproval,
                  login,
                  logout,
                  signNonce,
                  switchChain,
                  watchAccount
                }}
              >
                <Story />
              </DependenciesProvider>
            </ActionsProvider>
          </Web3Provider>
        </NextIntlClientProvider>
      )
    }
  ],
  loaders: [
    () => {
      init({
        enabled: false
      })
      return Promise.resolve({ sentry: 'disabled' })
    }
  ],
  argTypes: {},
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    exclude: /^on.*/,
    nextjs: {
      appDirectory: true
    }
  }
}

export default preview
