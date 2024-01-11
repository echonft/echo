import { DiscordUsernameTag as Component } from '@echo/ui/components/user/tag/discord-username-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const DiscordTag: Story = {
  args: {
    username: 'johnnycagewins'
  }
}
