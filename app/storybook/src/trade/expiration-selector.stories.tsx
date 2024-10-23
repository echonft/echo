// noinspection JSUnusedGlobalSymbols

import { Expiration } from '@echo/model/constants/expiration'
import { ExpirationSelector as Component } from '@echo/ui/components/trade/expiration-selector/expiration-selector'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Expiration Selector',
  args: {
    selectedExpiration: Expiration.OneDay,
    loading: false
  },
  argTypes: {
    onSelectExpiration: {
      table: {
        disable: true
      }
    }
  },
  component: Component,
  render: ({ onSelectExpiration, selectedExpiration }) => {
    const [expiration, setExpiration] = useState(selectedExpiration)
    return <Component onSelectExpiration={setExpiration} selectedExpiration={expiration} />
  }
}

export default metadata
export const ExpirationSelector: StoryObj<typeof Component> = {}
