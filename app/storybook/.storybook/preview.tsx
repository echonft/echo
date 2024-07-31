// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { areNftsInEscrow } from '@echo/storybook/mocks/are-nfts-in-escrow'
import { cancelListing } from '@echo/storybook/mocks/cancel-listing'
import { contractAcceptOffer } from '@echo/storybook/mocks/contract-accept-offer'
import { contractCancelOffer } from '@echo/storybook/mocks/contract-cancel-offer'
import { contractCreateOffer } from '@echo/storybook/mocks/contract-create-offer'
import { contractExecuteOffer } from '@echo/storybook/mocks/contract-execute-offer'
import { contractRedeemOffer } from '@echo/storybook/mocks/contract-redeem-offer'
import { createListing } from '@echo/storybook/mocks/create-listing'
import { disconnectWallet } from '@echo/storybook/mocks/disconnect-wallet'
import { getAccount } from '@echo/storybook/mocks/get-account'
import { getEchoTradingFees } from '@echo/storybook/mocks/get-echo-trading-fees'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { getOfferByIdContract } from '@echo/storybook/mocks/get-offer-by-id-contract'
import { getWallets } from '@echo/storybook/mocks/get-wallets'
import { login } from '@echo/storybook/mocks/login'
import { logout } from '@echo/storybook/mocks/logout'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { searchCollections } from '@echo/storybook/mocks/search-collections'
import { searchUsers } from '@echo/storybook/mocks/search-users'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { switchChain } from '@echo/storybook/mocks/switch-chain'
import { Web3Provider } from '@echo/ui/components/base/web3-provider'
import { messages } from '@echo/ui/messages/en'
import { DependenciesProvider } from '@echo/ui/components/base/dependencies-provider'
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
            <DependenciesProvider
              dependencies={{
                addWallet,
                approveErc721Contract,
                areNftsInEscrow,
                cancelListing,
                contractAcceptOffer,
                contractCancelOffer,
                contractCreateOffer,
                contractExecuteOffer,
                contractRedeemOffer,
                createListing,
                disconnectWallet,
                getAccount,
                getEchoTradingFees,
                getErc721ContractApproval,
                getNonce,
                getOfferByIdContract,
                getWallets,
                login,
                logout,
                rejectOffer,
                searchCollections,
                searchUsers,
                signNonce,
                switchChain
              }}
            >
              <Story />
            </DependenciesProvider>
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
