import { UserDiscordTag as Component, UserDiscordTagSkeleton } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    discordUsername: 'johnnycage#0890'
  }
}

export const Skeleton: Story = {
  render: () => <UserDiscordTagSkeleton />
}
