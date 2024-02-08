// noinspection JSUnusedGlobalSymbols

import { ProfileBanner } from '@echo/ui/components/base/profile-banner'
import type { Nullable } from '@echo/utils/types/nullable'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type BannerType = 'Color' | 'Default' | 'Image'
type ComponentType = FunctionComponent<{ banner: BannerType; bannerColor: Nullable<string> }>

const metadata: Meta<ComponentType> = {
  title: 'Base/Profile/Banner',
  args: {
    bannerColor: '#d11bd9',
    banner: 'Image'
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
    }
  }
}

export default metadata

export const ProfilePicture: StoryObj<ComponentType> = {
  render: ({ bannerColor, banner }) => {
    const bannerUrl =
      banner === 'Image'
        ? 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-banner.png?alt=media'
        : undefined
    const color = banner === 'Color' ? bannerColor : undefined
    return <ProfileBanner bannerUrl={bannerUrl} bannerColor={color} />
  }
}
