// noinspection JSUnusedGlobalSymbols

import { Profile as Component } from '@echo/ui/components/base/profile'
import { PROFILE_PICTURE_SIZES } from '@echo/ui/constants/profile-picture-size'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import type { Nullable } from '@echo/utils/types/nullable'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type BannerType = 'Color' | 'Default' | 'Image'
type ComponentType = FunctionComponent<{
  banner: BannerType
  bannerColor: Nullable<string>
  pictureSize: ProfilePictureSize
  pictureBorder: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Base/Profile',
  args: {
    bannerColor: '#d11bd9',
    banner: 'Image',
    pictureSize: SIZE_LG,
    pictureBorder: true
  },
  argTypes: {
    bannerColor: {
      defaultValue: '#d11bd9',
      control: 'color',
      if: { arg: 'banner', eq: 'Color' }
    },
    banner: {
      defaultValue: 'Image',
      options: ['Color', 'Default', 'Image'],
      control: { type: 'radio' }
    },
    pictureBorder: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    pictureSize: {
      defaultValue: SIZE_LG,
      options: PROFILE_PICTURE_SIZES,
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Profile: StoryObj<ComponentType> = {
  render: ({ bannerColor, banner, pictureSize, pictureBorder }) => {
    const bannerUrl =
      banner === 'Image'
        ? 'https://i.seadn.io/gae/eASCOXqiarHXrJSwwN34-mX65lSSvSclmrG8qYk5cYdYgX-euMi5AVQa_8b3rvbVc9NYIeF1q2xTjU74ZkLQvRjGV4LZWGCiEp8J?auto=format&dpr=1&w=2048'
        : undefined
    const color = banner === 'Color' ? bannerColor : undefined
    return (
      <Component
        banner={{ bannerUrl, bannerColor: color }}
        picture={{
          alt: 'johnnycagewins',
          pictureUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          size: pictureSize,
          border: pictureBorder
        }}
      />
    )
  }
}
