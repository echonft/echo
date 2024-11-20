// noinspection JSUnusedGlobalSymbols

import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { ProfilePicture as Component } from '@echo/ui/components/base/profile/profile-picture'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component,
  parameters: {
    controls: {
      exclude: ['pictureUrl', 'alt']
    }
  }
}

export default metadata

export const Picture: StoryObj<typeof Component> = {
  args: {
    alt: userMockJohnny.username,
    pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}
