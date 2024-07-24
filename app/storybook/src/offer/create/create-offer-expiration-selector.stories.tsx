// noinspection JSUnusedGlobalSymbols

import { EXPIRATIONS, ONE_DAY } from '@echo/model/constants/expiration'
import { ExpirationSelector as Component } from '@echo/ui/components/base/expiration/expiration-selector'
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
