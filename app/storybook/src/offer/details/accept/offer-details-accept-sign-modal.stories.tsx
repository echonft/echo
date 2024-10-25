// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { OfferDetailsAcceptModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept/Sign',
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
      exclude: ['offer', 'open']
    }
  }
}

export default metadata

export const Sign: StoryObj<typeof Component> = {
  args: {
    offer: assoc('role', OfferRole.Receiver, offerMockToJohnnycage),
    open: true
  }
}
