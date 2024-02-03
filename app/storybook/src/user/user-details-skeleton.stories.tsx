// noinspection JSUnusedGlobalSymbols

import { UserDetailsSkeleton as Component } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Details ',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
