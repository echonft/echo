// noinspection JSUnusedGlobalSymbols

import { UserDetails as Component } from '@echo/ui/components/user/details/user-details'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { toLower } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'User/Details ',
  component: Component,
  argTypes: {
    size: {
      defaultValue: SIZE_MD,
      options: [SIZE_MD, SIZE_LG],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['discordUsername', 'discordBannerUrl', 'discordAvatarUrl', 'wallet']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Details: Story = {
  args: {
    discordUsername: 'johnnycagewins',
    bannerColor: '#d11bd9',
    bannerUrl: undefined,
    discordAvatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    wallet: { address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'), chainId: 1 },
    size: SIZE_LG
  }
}
