// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { chain } from '@echo/storybook/mocks/chain'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval '
import { signOffer } from '@echo/storybook/mocks/sign-offer'
import { OfferDetailsAcceptModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Accept',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onSuccess: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['offer', 'open', 'token', 'fetcher', 'provider']
    }
  }
}

export default metadata

export const Modal: StoryObj<typeof Component> = {
  args: {
    offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'),
    open: true,
    fetcher: {
      acceptOffer: acceptOffer('LyCfl6Eg7JKuD7XJ6IPi'),
      signOffer,
      approveErc721Contract,
      getErc721ContractApproval: getErc721ContractApproval(false)
    },
    provider: {
      chain: chain('connected')
    }
  }
}
