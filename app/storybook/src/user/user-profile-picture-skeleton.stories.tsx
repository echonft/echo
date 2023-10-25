import { UserProfilePictureSkeleton as Component } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { SizeLG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

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
