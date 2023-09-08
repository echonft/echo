import { UserProfilePictureSkeleton as Component } from '@echo/ui'
import { SizeLG } from '@echo/ui-model'
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
