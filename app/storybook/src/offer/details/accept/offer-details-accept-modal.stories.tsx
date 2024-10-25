// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import { OfferDetailsAcceptModalSwitch as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal-switch'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept',
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
      exclude: ['offer', 'open', 'token']
    }
  }
}

export default metadata

export const Accept: StoryObj<typeof Component> = {
  args: {
    offer: assoc('role', OfferRole.Receiver, offerMockFromJohnnycage),
    open: true
  }
}
