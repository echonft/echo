import { UserDiscordTag as Component } from '@echo/ui/components/shared/user-discord-tag'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    discordUsername: 'johnnycagewins'
  }
}
