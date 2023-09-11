import { UserProfilePictureSkeleton as Component } from '@echo/ui/src/components/shared/skeleton/user-profile-picture-skeleton'
import { SizeLG } from '@echo/ui/src/constants/size'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {
  args: {
    size: SizeLG
  }
}
