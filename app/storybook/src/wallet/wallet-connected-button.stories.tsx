// noinspection JSUnusedGlobalSymbols

import { WalletConnectedButton as Component } from '@echo/ui/components/wallet/wallet-connected-button'
import { type Meta, type StoryObj } from '@storybook/react'
import { toLower } from 'ramda'

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
    wallet: { chain: 1, address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E') }
  }
}
