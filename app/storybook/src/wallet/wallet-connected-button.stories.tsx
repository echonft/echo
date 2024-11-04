// noinspection JSUnusedGlobalSymbols

import { userMockCrew } from '@echo/model/mocks/user-mock'
import { WalletConnectedButton as Component } from '@echo/ui/components/wallet/wallet-connected-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connected Button',
  component: Component,
  parameters: {
    controls: {
      exclude: ['wallet']
    }
  }
}

export default metadata

export const ConnectedButton: StoryObj<typeof Component> = {
  args: {
    wallet: userMockCrew.wallet
  }
}
