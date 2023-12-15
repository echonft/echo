import type { AcceptOfferArgs } from '@echo/api/services/fetcher/accept-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsAcceptSignModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-sign-modal'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignOfferArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-offer'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_ACCEPTED, offer) }), 1200)
}
function signOffer(_args: SignOfferArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept/Sign',
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
      exclude: ['offer', 'open', 'chainId', 'token', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Sign: Story = {
  args: {
    offer,
    chainId: 1,
    token: 'token',
    open: true,
    fetcher: {
      acceptOffer,
      signOffer
    }
  }
}
