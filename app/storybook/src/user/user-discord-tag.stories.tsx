// noinspection JSUnusedGlobalSymbols

import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { UserDiscordTag as Component } from '@echo/ui/components/user/profile/user-discord-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    discordUsername: userMockJohnnyUsername()
  }
}
