// noinspection JSUnusedGlobalSymbols

import { ConnectWalletButton as Component } from '@echo/ui/components/wallet/connect-wallet-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connect Button',
  component: Component,
  argTypes: {
    onClick: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['isConnecting']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {}

export const Connecting: Story = {
  args: {
    isConnecting: true
  }
}
