import { users } from '@echo/model'
import { UserProfilePicture as Component, UserProfilePictureSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/User Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = users['oE6yUEQBPn7PZ89yMjKn']!
export const Standard: Story = {
  render: () => (
    <Component discordAvatar={user.discordAvatar} discordId={user.discordId} discordUsername={user.discordUsername} />
  )
}

export const Default: Story = {
  render: () => (
    <Component discordAvatar={undefined} discordId={user.discordId} discordUsername={user.discordUsername} />
  )
}

export const Skeleton: Story = {
  render: () => <UserProfilePictureSkeleton />
}
