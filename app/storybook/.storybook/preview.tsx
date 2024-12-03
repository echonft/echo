// noinspection JSUnusedGlobalSymbols

import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
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
import { login } from '@echo/storybook/mocks/login'
import { logout } from '@echo/storybook/mocks/logout'
import { redeemOffer } from '@echo/storybook/mocks/redeem-offer'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { searchCollections } from '@echo/storybook/mocks/search-collections'
import { searchUsers } from '@echo/storybook/mocks/search-users'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { swap } from '@echo/storybook/mocks/swap'
import { switchChain } from '@echo/storybook/mocks/switch-chain'
import { walletLinkedTo } from '@echo/storybook/mocks/wallet-linked-to'
import '@echo/ui-css/index.css'
import { ActionsProvider } from '@echo/ui/components/providers/actions-provider'
import { DependenciesProvider } from '@echo/ui/components/providers/dependencies-provider'
import { Web3Provider } from '@echo/ui/components/providers/web3-provider'
import { messages } from '@echo/ui/messages/en'
import { init } from '@sentry/nextjs'
import { type Preview } from '@storybook/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { isNil } from 'ramda'

dayjs.extend(relativeTime)

const preview: Preview = {
  decorators: [
    (Story) => {
      const user = authStore((state) => state.user)
      const session = isNil(user)
        ? { user: undefined, expires: dayjs().subtract(1, 'day').toISOString() }
        : { user, expires: dayjs().add(1, 'day').toISOString() }
      return (
        <NextIntlClientProvider messages={messages} locale={'en'}>
          <Web3Provider>
            <ActionsProvider
              actions={{
                cancelListing,
                createListing,
                getOfferByIdContract,
                rejectOffer,
                searchCollections,
                searchUsers,
                walletLinkedTo
              }}
            >
              <DependenciesProvider
                dependencies={{
                  approveErc721Contract,
                  areNftsInEscrow,
                  acceptOffer,
                  cancelOffer,
                  createOffer,
                  swap,
                  redeemOffer,
                  disconnectWallet,
                  getAccount,
                  // @ts-expect-error TO BE REMOVED
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  getEchoOffer: () => {},
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
                <SessionProvider session={session} refetchWhenOffline={false} refetchOnWindowFocus={false}>
                  <Story />
                </SessionProvider>
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
