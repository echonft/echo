// noinspection JSUnusedGlobalSymbols

import { WalletButton as Component } from '@echo/ui/components/wallet/wallet-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connect Button',
  component: Component,
  args: {
    user: undefined
  },
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {}
