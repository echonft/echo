// noinspection JSUnusedGlobalSymbols

import { CreateOfferExpirationSelector as Component } from '@echo/ui/components/offer/create/create-offer-expiration-selector'
import { EXPIRATIONS, ONE_DAY } from '@echo/ui/constants/expiration'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    selectedExpiration: ONE_DAY
  },
  argTypes: {
    onSelect: {
      table: {
        disable: true
      }
    },
    selectedExpiration: {
      options: EXPIRATIONS,
      control: {
        type: 'select'
      }
    }
  }
}

export default metadata

export const ExpirationSelector: StoryObj<typeof Component> = {}
