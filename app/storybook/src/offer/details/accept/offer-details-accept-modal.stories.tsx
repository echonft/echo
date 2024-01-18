// noinspection JSUnusedGlobalSymbols

import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsAcceptModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_ACCEPTED, offer) }), 1200)
}
function signOffer(_args: SignOfferArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function chain() {
  return 1
}
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept',
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

type Story = StoryObj<typeof Component>

export const Accept: Story = {
  args: {
    offer,
    open: true,
    fetcher: {
      acceptOffer,
      signOffer,
      approveErc721Contract,
      getErc721ContractApproval
    },
    provider: {
      chain
    }
  }
}
