// noinspection JSUnusedGlobalSymbols

import { ConnectWalletButton as Component } from '@echo/ui/components/wallet/connect-wallet-button'
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
