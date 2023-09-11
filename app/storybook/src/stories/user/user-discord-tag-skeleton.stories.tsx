import { UserDiscordTagSkeleton as Component } from '@echo/ui/src/components/shared/skeleton/user-discord-tag-skeleton'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
