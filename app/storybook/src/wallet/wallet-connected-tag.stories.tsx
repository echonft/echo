// noinspection JSUnusedGlobalSymbols

import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { WalletConnectedTag as Component } from '@echo/ui/components/wallet/wallet-connected-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connected Tag',
  component: Component,
  parameters: {
    controls: {
      exclude: ['wallet']
    }
  }
}

export default metadata

export const ConnectedTag: StoryObj<typeof Component> = {
  args: {
    wallet: walletMockCrew
  }
}
