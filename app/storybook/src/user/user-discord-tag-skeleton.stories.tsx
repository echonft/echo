// noinspection JSUnusedGlobalSymbols

import { UserDiscordTagSkeleton as Component } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
