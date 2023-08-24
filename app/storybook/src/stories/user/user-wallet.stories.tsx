import { UserWallet as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Wallet ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => <Component address={'0xf672715f2bA85794659a7150e8C21F8d157bFe1D'} />
}
