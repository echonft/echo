import { UserProfilePicture as Component } from '@echo/ui/components/shared/user-profile-picture'
import { SizeLG } from '@echo/ui/constants/size'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile Picture',
  component: Component,
  argTypes: {
    size: {
      options: ['Medium', 'Large'],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['discordUsername', 'discordAvatarUrl']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ProfilePicture: Story = {
  args: {
    discordUsername: 'johnnycagewins',
    discordAvatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
    size: SizeLG
  }
}
