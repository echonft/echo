import '@echo/ui-css/index.css'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { cancelListing } from '@echo/storybook/mocks/cancel-listing'
import { cancelOffer } from '@echo/storybook/mocks/cancel-offer'
import { createListing } from '@echo/storybook/mocks/create-listing'
import { createOffer } from '@echo/storybook/mocks/create-offer'
import { disconnectWallet } from '@echo/storybook/mocks/disconnect-wallet'
import { executeSwap } from '@echo/storybook/mocks/execute-swap'
import { getAccount } from '@echo/storybook/mocks/get-account'
import { getCollections } from '@echo/storybook/mocks/get-collections'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { getOfferSignature } from '@echo/storybook/mocks/get-offer-signature'
import { getWallets } from '@echo/storybook/mocks/get-wallets'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { signIn } from '@echo/storybook/mocks/sign-in'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { signOffer } from '@echo/storybook/mocks/sign-offer'
import { signOut } from '@echo/storybook/mocks/sign-out'
import { switchChain } from '@echo/storybook/mocks/switch-chain'
import { messages } from '@echo/ui/messages/en'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
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
          <DependenciesProvider
            dependencies={{
              acceptOffer,
              addWallet,
              approveErc721Contract,
              cancelListing,
              cancelOffer,
              createListing,
              createOffer,
              disconnectWallet,
              executeSwap,
              getAccount,
              getCollections,
              getErc721ContractApproval,
              getNonce,
              getOfferSignature,
              getWallets,
              rejectOffer,
              signIn,
              signNonce,
              signOffer,
              signOut,
              switchChain
            }}
          >
            <Story />
          </DependenciesProvider>
        </NextIntlClientProvider>
      )
    }
  ],
  loaders: [
    () => {
      init({
        debug: false,
        enabled: false
      })
      return Promise.resolve({ sentry: 'disabled' })
    }
  ],
  argTypes: {},
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    exclude: /^on.*/
  }
}

export default preview
