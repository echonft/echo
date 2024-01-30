// noinspection JSUnusedGlobalSymbols

import { UserProfilePicture as Component } from '@echo/ui/components/user/base/user-profile-picture'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile Picture',
  component: Component,
  parameters: {
    controls: {
      exclude: ['discordUsername', 'discordAvatarUrl']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    discordUsername: 'johnnycagewins',
    discordAvatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}
