// noinspection JSUnusedGlobalSymbols

import { ProfilePictureSkeleton as Component } from '@echo/ui/components/base/profile/skeleton/profile-picture-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Profile Picture',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
