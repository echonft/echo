// noinspection JSUnusedGlobalSymbols

import { Expiration } from '@echo/model/constants/expiration'
import { ExpirationSelector as Component } from '@echo/ui/components/base/expiration/expiration-selector'
import type { Meta, StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    selectedExpiration: Expiration.OneDay
  },
  argTypes: {
    onSelect: {
      table: {
        disable: true
      }
    },
    selectedExpiration: {
      options: values(Expiration),
      control: {
        type: 'select'
      }
    }
  }
}

export default metadata

export const ExpirationSelector: StoryObj<typeof Component> = {}
