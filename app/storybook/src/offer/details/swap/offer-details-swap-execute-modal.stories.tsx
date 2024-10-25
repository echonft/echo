// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { OfferDetailsSwapModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{ onClose?: VoidFunction; onSuccess?: VoidFunction }>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details/Modal/Swap/Execute',
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
  }
}

export default metadata

export const Execute: StoryObj<ComponentType> = {
  render: ({ onClose, onSuccess }) => (
    <Component
      offer={assoc('role', OfferRole.Sender, offerMockToJohnnycage)}
      open={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  )
}
