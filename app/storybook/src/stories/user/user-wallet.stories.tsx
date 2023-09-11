import { UserWallet as Component } from '@echo/ui/src/components/shared/user-wallet'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Wallet ',
  component: Component,
  parameters: {
    controls: {
      exclude: ['address']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D'
  }
}
