// noinspection JSUnusedGlobalSymbols

import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { toLower } from 'ramda'
import { type FunctionComponent } from 'react'

const BANNER_COLOR = 'Color' as const
const BANNER_DEFAULT = 'Default' as const
const BANNER_IMAGE = 'Image' as const
const BANNERS = [BANNER_COLOR, BANNER_DEFAULT, BANNER_IMAGE] as const
type BannerType = (typeof BANNERS)[number]
type ComponentType = FunctionComponent<Record<'banner', BannerType> & Record<'bannerColor', string | undefined>>
const DEFAULT_DEFAULT_BANNER = BANNER_IMAGE
const DEFAULT_BANNER_COLOR = '#d11bd9'

const metadata: Meta<ComponentType> = {
  title: 'User/Details ',
  argTypes: {
    bannerColor: {
      defaultValue: DEFAULT_BANNER_COLOR,
      control: 'color',
      if: { arg: 'banner', eq: BANNER_COLOR }
    },
    banner: {
      defaultValue: DEFAULT_DEFAULT_BANNER,
      options: BANNERS,
      control: { type: 'radio' }
    }
  },
  parameters: {
    colorPicker: {
      primaryPalette: 'Colorful palette',
      applyColorTo: ['bannerColor'],
      theme: 'dark'
    }
  }
}

export default metadata
type Story = StoryObj<ComponentType>

export const Details: Story = {
  args: {
    bannerColor: DEFAULT_BANNER_COLOR,
    banner: DEFAULT_DEFAULT_BANNER
  },
  render: ({ bannerColor, banner }) => {
    return (
      <UserDetails
        wallet={{ address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'), chainId: 1 }}
        discordUsername={'johnnycagewins'}
        discordAvatarUrl={'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'}
        bannerUrl={
          banner === BANNER_IMAGE
            ? 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-banner.png?alt=media'
            : undefined
        }
        bannerColor={banner === BANNER_COLOR ? bannerColor : undefined}
      />
    )
  }
}
