import { UserDetails as Component, UserDetailsSkeleton } from '@echo/ui'
import { users } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Details ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = users['6rECUMhevHfxABZ1VNOm']!
export const Default: Story = {
  render: () => (
    <Component
      discordUsername={user.discordUsername}
      discordAvatar={user.discordAvatar}
      discordBanner={user.discordBanner}
      discordId={user.discordId}
    />
  )
}

export const Skeleton: Story = {
  render: () => <UserDetailsSkeleton />
}
