// noinspection JSUnusedGlobalSymbols

import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { ProfilePicture as Component } from '@echo/ui/components/base/profile-picture'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component,
  argTypes: {
    border: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    size: {
      defaultValue: Size.LG,
      options: values(Size),
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['pictureUrl', 'alt']
    }
  }
}

export default metadata

export const Picture: StoryObj<typeof Component> = {
  args: {
    size: Size.LG,
    border: true,
    alt: userMockJohnny.username,
    pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
  }
}
