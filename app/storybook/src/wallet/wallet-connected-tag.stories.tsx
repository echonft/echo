// noinspection JSUnusedGlobalSymbols

import { WalletConnectedTag as Component } from '@echo/ui/components/wallet/wallet-connected-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Connected Tag',
  component: Component,
  parameters: {
    controls: {
      exclude: ['address', 'chainId']
    }
  }
}

export default metadata

export const ConnectedTag: StoryObj<typeof Component> = {
  args: {
    chainId: 1,
    address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'
  }
}
