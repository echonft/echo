// noinspection JSUnusedGlobalSymbols

import { CreatedOfferSuccess as Component } from '@echo/ui/components/offer/create/created/created-offer-success'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    offerSlug: undefined
  },
  argTypes: {
    offerSlug: {
      options: [undefined, 'defined'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Success: StoryObj<typeof Component> = {}
