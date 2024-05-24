// noinspection JSUnusedGlobalSymbols

import { CreateOfferSuccess as Component } from '@echo/ui/components/offer/create/create-offer-success'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    offerSlug: undefined
  },
  argTypes: {}
}

export default metadata

export const Success: StoryObj<typeof Component> = {}
