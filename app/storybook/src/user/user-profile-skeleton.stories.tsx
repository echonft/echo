// noinspection JSUnusedGlobalSymbols

import { UserProfileSkeleton as Component } from '@echo/ui/components/user/profile/skeleton/user-profile-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Profile',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
