// noinspection JSUnusedGlobalSymbols

import { ProfilePictureSkeleton as Component } from '@echo/ui/components/base/profile/skeleton/profile-picture-skeleton'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component,
  argTypes: {
    border: {
      control: { type: 'boolean' }
    },
    size: {
      options: values(Size),
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {
  args: {
    size: Size.LG,
    border: true
  }
}
