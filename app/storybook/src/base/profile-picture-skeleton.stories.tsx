// noinspection JSUnusedGlobalSymbols

import { ProfilePictureSkeleton as Component } from '@echo/ui/components/base/profile-picture-skeleton'
import { PROFILE_PICTURE_SIZES } from '@echo/ui/constants/profile-picture-size'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component,
  argTypes: {
    border: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    size: {
      defaultValue: SIZE_LG,
      options: PROFILE_PICTURE_SIZES,
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {
  args: {
    size: SIZE_LG,
    border: true
  }
}
