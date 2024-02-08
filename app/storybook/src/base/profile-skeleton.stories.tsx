// noinspection JSUnusedGlobalSymbols

import { ProfileSkeleton } from '@echo/ui/components/base/profile-skeleton'
import { PROFILE_PICTURE_SIZES } from '@echo/ui/constants/profile-picture-size'
import { SIZE_LG } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  pictureSize: ProfilePictureSize
  pictureBorder: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Base/Profile',
  args: {
    pictureSize: SIZE_LG,
    pictureBorder: true
  },
  argTypes: {
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

export const Skeleton: StoryObj<ComponentType> = {
  render: ({ pictureSize, pictureBorder }) => {
    return (
      <ProfileSkeleton
        picture={{
          size: pictureSize,
          border: pictureBorder
        }}
      />
    )
  }
}
