// noinspection JSUnusedGlobalSymbols

import { UserDiscordTagSkeleton as Component } from '@echo/ui/components/user/profile/skeleton/user-discord-tag-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Tag',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
