import { UserWallet as Component } from '@echo/ui/components/shared/user-wallet'
import { type Meta, type StoryObj } from '@storybook/react'
import { toLower } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'User/Wallet ',
  component: Component,
  parameters: {
    controls: {
      exclude: ['wallet']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    wallet: { address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'), chainId: 1 }
  }
}
