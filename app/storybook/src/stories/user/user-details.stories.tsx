import { users } from '@echo/model'
import { UserDetails as Component, UserDetailsSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Details ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = users['oE6yUEQBPn7PZ89yMjKn']!
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
