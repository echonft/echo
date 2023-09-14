import { UserProfilePicture as Component } from '@echo/ui/components/shared/user-profile-picture'
import { SizeLG } from '@echo/ui/constants/size'
import { getUserById } from '@mocks/model/user'
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
      exclude: ['discordUsername', 'discordAvatar', 'discordId']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const user = getUserById('6rECUMhevHfxABZ1VNOm')

export const Standard: Story = {
  args: {
    discordUsername: user.discordUsername,
    discordAvatar: user.discordAvatar,
    discordId: user.discordId,
    size: SizeLG
  }
}

export const Default: Story = {
  args: {
    discordUsername: user.discordUsername,
    discordAvatar: undefined,
    discordId: user.discordId,
    size: SizeLG
  }
}
