// noinspection JSUnusedGlobalSymbols

import { UserProfilePictureSkeleton as Component } from '@echo/ui/components/user/base/skeleton/user-profile-picture-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
