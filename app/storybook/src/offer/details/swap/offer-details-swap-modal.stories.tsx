// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { chain } from '@echo/storybook/mocks/chain'
import { executeSwap } from '@echo/storybook/mocks/execute-swap'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval'
import { getOfferSignature } from '@echo/storybook/mocks/get-offer-signature'
import { OfferDetailsSwapModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Swap',
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
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'open', 'token', 'fetcher', 'provider']
    }
  }
}

export default metadata

export const Swap: StoryObj<typeof Component> = {
  args: {
    offer: pipe<[string], Offer, OfferWithRole>(
      getOfferMockById,
      assoc('role', OFFER_ROLE_SENDER)
    )('LyCfl6Eg7JKuD7XJ6IPi'),
    open: true,
    fetcher: {
      getOfferSignature,
      executeSwap,
      approveErc721Contract,
      getErc721ContractApproval: getErc721ContractApproval(false)
    },
    provider: {
      chain: chain('connected')
    }
  }
}
