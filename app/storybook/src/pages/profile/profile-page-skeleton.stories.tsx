// noinspection JSUnusedGlobalSymbols

import { ProfilePageSkeleton as Component } from '@echo/ui/pages/profile/skeleton/profile-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Profile',
  component: Component
}

export default metadata

export const Loading: StoryObj<typeof Component> = {}
