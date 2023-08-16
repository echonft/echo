import { users, UserWallet as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Wallet ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = users['6rECUMhevHfxABZ1VNOm']!
export const Default: Story = {
  render: () => <Component address={user.wallets![0]!.address} />
}
